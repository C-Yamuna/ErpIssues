import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DistrictService } from 'src/app/configurations/common-config/district/shared/district.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { StatesService } from 'src/app/transcations/term-deposits-transcation/shared/states.service';
import { SubDistrictService } from 'src/app/transcations/term-deposits-transcation/shared/sub-district.service';
import { VillagesService } from 'src/app/transcations/term-deposits-transcation/shared/villages.service';
import { MembershipBasicDetailsService } from '../../shared/membership-basic-details.service';
import { MembershipCommunicationDetailsService } from '../../shared/membership-communication-details.service';
import { MemberBasicDetailsStepperService } from '../shared/membership-individual-stepper.service';
import { MemberBasicDetails, MemberGuardianDetailsModel, MemberNomineeDetails, MemberNomoineeGuardianDetailsModel } from '../../shared/member-basic-details.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { RelationshipTypesService } from 'src/app/transcations/term-deposits-transcation/shared/relationship-types.service';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { RelationshipTypeService } from 'src/app/configurations/common-config/relationship-type/shared/relationship-type.service';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Component({
  selector: 'app-nominee',
  templateUrl: './nominee.component.html',
  styleUrls: ['./nominee.component.css']
})
export class NomineeComponent {
  nomineeForm: FormGroup;
  nominee: any;
  nomineeList: any;
  newNominee: boolean = false;
  noNominee: boolean = false;
  responseModel!: Responsemodel;
  msgs: any[] = [];
  memberNomineeDetailsModel: MemberNomineeDetails = new MemberNomineeDetails();
  memberBasicDetailsModel: MemberBasicDetails = new MemberBasicDetails();
  memberGuardianDetailsModel: MemberGuardianDetailsModel = new MemberGuardianDetailsModel();
  fileName: any;
  isEdit: boolean = false;
  age: any;
  guarntorDetailsFalg: boolean = false;
  relationTypesList: any[] = [];
  orgnizationSetting: any;
  guadianTypesList: any[] = [];
  showForm: any;
  memberTypeName: any;
  courtAppointedGuardain :any;
  multipleFilesList: any;
  uploadFileData: any;
  isFileUploaded: any;
  sameAsMemberGuardain: boolean = false;
  noGuardain: boolean = true;
  flag: boolean = false;
  memberId: any;
  subProductName: any;
  multipartFileList: any[]=[];
  multipartsFileList: any[]=[];

  constructor(private router: Router, private formBuilder: FormBuilder, private membershipBasicDetailsService: MembershipBasicDetailsService, private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService, private relationshipTypeService: RelationshipTypeService, private commonFunctionsService: CommonFunctionsService, private datePipe: DatePipe , private memberBasicDetailsStepperService : MemberBasicDetailsStepperService , private fileUploadService :FileUploadService) {
    this.nomineeForm = this.formBuilder.group({
      relationName:['', ],
      nomineeName: ['', ],
      // age: new FormControl(['', [Validators.pattern(applicationConstants.ALLOW_NEW_NUMBERS), Validators.maxLength(40), Validators.pattern(/^[^\s]+(\s.*)?$/), Validators.compose([Validators.required])]],),
      aadhaar: ['', ],
      mobileNumber:['', ],
      email: ['', ],
      dateOfBirth: new FormControl('', ),
      remarks: new FormControl('', ),
      // 'nomineeAddres': new FormControl('', Validators.required),
      nomineeType: ['', Validators.required],

      //guardian form fields
      relationNameOfGuardian: ['', ],
      guardianName: ['', ],
      guardianAge: ['', ],
      guardianAadhar: ['', ],
      guardianMobile: ['', ],
      guardianEmail: ['', ],
      guardianAddress: ['', ],
      guardainType: [''],
      fileUpload : ['', ],
      guardianRemarks: new FormControl('', ),

    });
  }

  // @k.yamuna
  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.showForm = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);

      this.nomineeList = [
        { label: 'New Nominee', value: 1 },
        { label: 'No Nominee', value: 2 },
      ]
   
    this.guadianTypesList = [
      { label: 'New Guardian', value: 1 },
      { label: 'No Guardian', value: 2 },
    ]
   
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined ) {
        if(params['id'] != undefined && params['id'] != null){
          let queryParams = this.encryptDecryptService.decrypt(params['id']);
          this.memberId = Number(queryParams);
          this.getMembershipBasicDetailsById(this.memberId);
          this.isEdit = true;
        }
      } else {
        this.isEdit = false;
      }
    });
    this.nomineeForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.nomineeForm.valid) {
        this.save();
      }
    });
    this.getAllRelationTypes();
  }
  //update model data to stepper component
  //@k.yamuna
  updateData() {
    if (this.age <= 18) {
      this.memberGuardianDetailsModel.memberId = this.memberId ;
      this.memberNomineeDetailsModel.memberGuardianDetailsModel = this.memberGuardianDetailsModel;
    }
    this.memberNomineeDetailsModel.memberShipId = this.memberId;
    this.memberBasicDetailsStepperService.changeData({
      formValid: !this.nomineeForm.valid ? true : false,
      data: this.memberNomineeDetailsModel,
      isDisable: (!this.nomineeForm.valid),
      stepperIndex: 4,
    });
  }
  save() {
    this.updateData();
  }
  //on change nominee type need to update validation
  //@k.yamuna
  onChange(event: any ,flag :boolean) {
    if (event == 1) {//new nominee
      this.newNomineeType(flag);
    }
    else if (event == 2) {//same as membership nominee
      this.noNimineeType(flag);
    }
  }

  /**
   *  @author k.yamuna
   * @implements onChange Guardain Type 
   * @param event guardain Type
   */
  onChangeGuardain(event: any , flag :boolean) {
    if (event == 1) {//new guardain
      this.newGuardainType(flag);
    }
    else if (event == 2) {//no guardain
      this.noGuardainaType(flag);
    }
  }

 
  getMembershipBasicDetailsById(id: any) {
    this.membershipBasicDetailsService.getMembershipBasicDetailsById(this.memberId).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0]) {
        this.memberBasicDetailsModel = this.responseModel.data[0];
        this.subProductName = this.memberBasicDetailsModel.subProductName
        this.updateData();
        if (this.memberBasicDetailsModel.age != null && this.memberBasicDetailsModel.age != undefined) {
          this.age = this.memberBasicDetailsModel.age;
          if (this.age < 18) {
            this.guarntorDetailsFalg = true;
            this.noGuardain = false;
            this.courtAppointedGuardain = false
          }
        }
        if (this.memberBasicDetailsModel.memberShipGuadianDetailsDTOList != null && this.memberBasicDetailsModel.memberShipGuadianDetailsDTOList != undefined && this.memberBasicDetailsModel.memberShipGuadianDetailsDTOList.length > 0 && this.memberBasicDetailsModel.memberShipGuadianDetailsDTOList[0] != null && this.memberBasicDetailsModel.memberShipGuadianDetailsDTOList[0] != undefined) {
          this.memberGuardianDetailsModel = this.memberBasicDetailsModel.memberShipGuadianDetailsDTOList[0];
          if (this.memberGuardianDetailsModel.guardianType != null && this.memberGuardianDetailsModel.guardianType != undefined) {
            this.onChangeGuardain(this.memberGuardianDetailsModel.guardianType, this.flag);
          }
          else if (this.guarntorDetailsFalg) {
            const controlName = this.nomineeForm.get('guardainType');
            if (controlName) {
              controlName.setValidators([
                Validators.required,
              ]);
              controlName.updateValueAndValidity();
            }
          }
          if (this.memberGuardianDetailsModel.guardianDob != null && this.memberGuardianDetailsModel.guardianDob != undefined) {
            this.memberGuardianDetailsModel.guardianDobVal = this.datePipe.transform(this.memberGuardianDetailsModel.guardianDob, this.orgnizationSetting.datePipe);
          }
          if(this.memberGuardianDetailsModel.uploadFilePath != null && this.memberGuardianDetailsModel.uploadFilePath != undefined)
            this.memberGuardianDetailsModel.multipartsFileList = this.fileUploadService.getFile(this.memberGuardianDetailsModel.uploadFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberGuardianDetailsModel.multipartsFileList);
        }

        if (this.memberBasicDetailsModel.memberShipNomineeDetailsDTOList != null && this.memberBasicDetailsModel.memberShipNomineeDetailsDTOList != undefined && this.memberBasicDetailsModel.memberShipNomineeDetailsDTOList.length > 0 && this.memberBasicDetailsModel.memberShipNomineeDetailsDTOList[0] != null && this.memberBasicDetailsModel.memberShipNomineeDetailsDTOList[0] != undefined) {//nominee details
          this.memberNomineeDetailsModel = this.memberBasicDetailsModel.memberShipNomineeDetailsDTOList[0];
          // this.memberNomineeDetailsModel.subProductId = this.memberBasicDetailsModel.subProductId
          if (this.memberNomineeDetailsModel.nomineeType != null && this.memberNomineeDetailsModel.nomineeType != undefined) {
            this.onChange(this.memberNomineeDetailsModel.nomineeType, this.flag);
          }
          if (this.memberNomineeDetailsModel.nomineeDob != null && this.memberNomineeDetailsModel.nomineeDob != undefined) {
            this.memberNomineeDetailsModel.nomineeDobVal = this.datePipe.transform(this.memberNomineeDetailsModel.nomineeDob, this.orgnizationSetting.datePipe);
          }
          if (this.memberNomineeDetailsModel.nomineeFilePath != null && this.memberNomineeDetailsModel.nomineeFilePath != undefined)
            this.memberNomineeDetailsModel.multipartFileList = this.fileUploadService.getFile(this.memberNomineeDetailsModel.nomineeFilePath, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberNomineeDetailsModel.nomineeFilePath);

        }
        if (this.memberBasicDetailsModel.id != null && this.memberBasicDetailsModel.id != undefined) {
          this.memberGuardianDetailsModel.memberId = this.memberBasicDetailsModel.id;
        }
        if (this.memberBasicDetailsModel.id != null && this.memberBasicDetailsModel.id != undefined) {
          this.memberNomineeDetailsModel.memberShipId = this.memberBasicDetailsModel.id;
        }
        if (this.memberBasicDetailsModel.admissionNumber != null && this.memberBasicDetailsModel.admissionNumber != undefined) {
          this.memberNomineeDetailsModel.admissionNumber = this.memberBasicDetailsModel.admissionNumber
        }

        if (this.memberBasicDetailsModel.admissionNumber != null && this.memberBasicDetailsModel.admissionNumber != undefined) {
          this.memberGuardianDetailsModel.admissionNumber = this.memberBasicDetailsModel.admissionNumber
        }
      }
      this.updateData();
    });
  }

  //get all relation types list
  getAllRelationTypes() {
    this.relationshipTypeService.getAllRelationshipType().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.relationTypesList = this.responseModel.data
            this.relationTypesList = this.responseModel.data.filter((kyc: any) => kyc.status == applicationConstants.ACTIVE).map((count: any) => {
              return { label: count.name, value: count.id }
            });
         
            
          }
        }
      }
    });
  }

  onChangeRelationForNominee() {
    let  nominee= this.relationTypesList.find((data: any) => null != data && this.memberNomineeDetailsModel.relationTypeId  != null && data.value == this.memberNomineeDetailsModel.relationTypeId);
    if (nominee != null && undefined != nominee && nominee.label != null && nominee.label != undefined){
      this.memberNomineeDetailsModel.relationTypeName = nominee.label;
    }
  }
  onChangeRelationForGaurdian() {
    let  guardain= this.relationTypesList.find((data: any) => null != data && this.memberGuardianDetailsModel.relationshipTypeId  != null && data.value == this.memberGuardianDetailsModel.relationshipTypeId);
    if (guardain != null && undefined != guardain && guardain.label != null && guardain.label != undefined){
          this.memberGuardianDetailsModel.relationshipTypeName = guardain.label;
    }
  }

 
 

  /**
   * @implements fileUpload service
   * @param event 
   * @param fileUpload 
   * @param filePathName 
   */
 //upload documnet for nominee
  fileUploaderForNominee(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.memberNomineeDetailsModel.multipartFileList = [];
    this.multipartFileList = [];
    this.memberNomineeDetailsModel.filesDTO = null; // Initialize as a single object
    this.memberNomineeDetailsModel.nomineeFilePath = null;
    let file = event.files[0]; // Only one file
    let reader = new FileReader();
    reader.onloadend = (e) => {
      let filesDTO = new FileUploadModel();
      this.uploadFileData = e.target as FileReader;
      filesDTO.fileName = "MEMBER_NOMINEE_" + this.memberId + "_" + this.commonComponent.getTimeStamp() + "_" + file.name;
      filesDTO.fileType = file.type.split('/')[1];
      filesDTO.value = (this.uploadFileData.result as string).split(',')[1];
      filesDTO.imageValue = this.uploadFileData.result as string;
      this.memberNomineeDetailsModel.filesDTO = filesDTO;
      this.memberNomineeDetailsModel.nomineeFilePath = filesDTO.fileName;
      let index1 = event.files.indexOf(file);
      if (index1 > -1) {
        fileUpload.remove(event, index1);
      }
      fileUpload.clear();
    };

    reader.readAsDataURL(file);
  }

  //remove documnet for nominee
  fileRemoveEventForNominee() {
    this.memberNomineeDetailsModel.multipartFileList = [];
    if (this.memberNomineeDetailsModel.filesDTO != null && this.memberNomineeDetailsModel.filesDTO != undefined) {
      this.memberNomineeDetailsModel.nomineeFilePath = null;
      this.memberNomineeDetailsModel.filesDTO = null;
    }
  }
  //upload documnet for gaurdian
  fileUploaderForGaurdian(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.memberGuardianDetailsModel.multipartsFileList = [];
    this.multipartsFileList = [];
    this.memberGuardianDetailsModel.filesDTO = null; // Initialize as a single object
    this.memberGuardianDetailsModel.uploadFilePath = null;
    let file = event.files[0]; // Only one file
    let reader = new FileReader();
    reader.onloadend = (e) => {
      let filesDTO = new FileUploadModel();
      this.uploadFileData = e.target as FileReader;
      filesDTO.fileName = "MEMBER_GAUDIAN_" + this.memberId + "_" + this.commonComponent.getTimeStamp() + "_" + file.name;
      filesDTO.fileType = file.type.split('/')[1];
      filesDTO.value = (this.uploadFileData.result as string).split(',')[1];
      filesDTO.imageValue = this.uploadFileData.result as string;
      this.memberGuardianDetailsModel.filesDTO = filesDTO;
      this.memberGuardianDetailsModel.uploadFilePath = filesDTO.fileName;
      let index1 = event.files.indexOf(file);
      if (index1 > -1) {
        fileUpload.remove(event, index1);
      }
      fileUpload.clear();
    };

    reader.readAsDataURL(file);
  }

  //remove documnet for gaurdian
  fileRemoveEventForGaurdian() {
    this.memberGuardianDetailsModel.multipartsFileList = [];
    if (this.memberGuardianDetailsModel.filesDTO != null && this.memberGuardianDetailsModel.filesDTO != undefined) {
      this.memberGuardianDetailsModel.uploadFilePath = null;
      this.memberGuardianDetailsModel.filesDTO = null;
    }
  }
  guardainFormValidation() {
    if (this.age <= 18) {
      this.nomineeForm.get('relationNameOfGuardian')?.enable();
    this.nomineeForm.get('guardianName')?.enable();
    this.nomineeForm.get('guardianAadhar')?.enable();
    this.nomineeForm.get('guardianMobile')?.enable();
    this.nomineeForm.get('guardianEmail')?.enable();
   

      this.guarntorDetailsFalg = true;
      const controlName = this.nomineeForm.get('relationNameOfGuardian');
      if (controlName) {
        controlName.setValidators([
          Validators.required,
        ]);
        controlName.updateValueAndValidity();
      }
      const controlTow = this.nomineeForm.get('guardianName');
      if (controlTow) {
        controlTow.setValidators([
          Validators.required,
          Validators.pattern(applicationConstants.NAME_PATTERN)
        ]);
        controlTow.updateValueAndValidity();
      }
      const controlFour = this.nomineeForm.get('guardianAadhar');
      if (controlFour) {
        controlFour.setValidators([
          Validators.required,
          Validators.pattern(applicationConstants.AADHAR_PATTERN)
        ]);
        controlFour.updateValueAndValidity();
      }
      const controlFive = this.nomineeForm.get('guardianMobile');
      if (controlFive) {
        controlFive.setValidators([
          Validators.required,
          Validators.pattern(applicationConstants.MOBILE_PATTERN)
        ]);
        controlFive.updateValueAndValidity();
      }
      this.updateData();
    }
  }
 
  /**
   * @author k.yamuna
   * @implements nominee required valdation
   */
  nomineeValidatorsRequired(){
    this.nomineeForm.get('relationName')?.enable();
    this.nomineeForm.get('nomineeName')?.enable();
    this.nomineeForm.get('aadhaar')?.enable();
    this.nomineeForm.get('mobileNumber')?.enable();
    this.nomineeForm.get('email')?.enable();
    this.nomineeForm.get('fileUpload')?.enable();
    const controlName = this.nomineeForm.get('relationName');
    if (controlName) {
      controlName.setValidators([
        Validators.required,
      ]);
      controlName.updateValueAndValidity();
    }
    
    const controlTow = this.nomineeForm.get('nomineeName');
    if (controlTow) {
      controlTow.setValidators([
        Validators.required,
        Validators.pattern(applicationConstants.NAME_PATTERN)
      ]);
      controlTow.updateValueAndValidity();
    }
    const controlFour = this.nomineeForm.get('aadhaar');
    if (controlFour) {
      controlFour.setValidators([
        Validators.required,
        Validators.pattern(applicationConstants.AADHAR_PATTERN)
      ]);
      controlFour.updateValueAndValidity();
    }
    const controlFive = this.nomineeForm.get('mobileNumber');
    if (controlFive) {
      controlFive.setValidators([
        Validators.required,
        Validators.pattern(applicationConstants.MOBILE_PATTERN)
      ]);
      controlFive.updateValueAndValidity();
    }
    this.updateData();
  }

  /**
   * @author k.yamuna
   * @implements nominee not required validation 
   */
  nomineeValidatorsFormNotRequired(){
    const controlName = this.nomineeForm.get('relationName');
    if (controlName) {
      controlName.setValidators(null); // Set the required validator null
      controlName.updateValueAndValidity();
    }

    const controlTow = this.nomineeForm.get('nomineeName');
    if (controlTow) {
      controlTow.setValidators(null); // Set the required validator null
      controlTow.updateValueAndValidity();
    }
    const controlFour = this.nomineeForm.get('aadhaar');
    if (controlFour) {
      controlFour.setValidators(null); // Set the required validator null
      controlFour.updateValueAndValidity();
    }
    const controlFive = this.nomineeForm.get('mobileNumber');
    if (controlFive) {
      controlFive.setValidators(null); // Set the required validator null
      controlFive.updateValueAndValidity();
    }
    this.updateData();
  }

 
/**
 * @implements onChange new Nominee
 * @param flag 
 * @author k.yamuna
 */
  newNomineeType(flag:boolean){
    this.newNominee = true;
      this.noNominee = false;
      //onchange on update
      if(flag){
        let nomineeId = null;
        if(this.memberNomineeDetailsModel != null && this.memberNomineeDetailsModel != undefined && this.memberNomineeDetailsModel.id  != null && this.memberNomineeDetailsModel.id  != undefined){
          nomineeId = this.memberNomineeDetailsModel.id ;
        }
        this.memberNomineeDetailsModel = new MemberNomineeDetails();
        if(nomineeId != null && nomineeId != undefined){
          this.memberNomineeDetailsModel.id = nomineeId;
        }
      }
      this.memberNomineeDetailsModel.nomineeType = 1;
      this.nomineeValidatorsRequired();
  }

  
  /**
   * @implements noNimineeType OnChange
   * @param flag 
   * @author k.yamuna
   */
  noNimineeType(flag : boolean){
    this.noNominee = true;
    this.newNominee = false;
    if(flag){
      let nomineeId = null;//onchange on update
      let remarks = null;
      if(this.memberNomineeDetailsModel != null && this.memberNomineeDetailsModel != undefined){
        if(this.memberNomineeDetailsModel.id  != null && this.memberNomineeDetailsModel.id  != undefined){
          nomineeId = this.memberNomineeDetailsModel.id ;
        }
        if(this.memberNomineeDetailsModel.remarks  != null && this.memberNomineeDetailsModel.remarks  != undefined){
          remarks = this.memberNomineeDetailsModel.remarks ;
        }
        // if(this.memberNomineeDetailsModel.signedNomineeForm  != null && this.memberNomineeDetailsModel.signedNomineeForm  != undefined){
        //   signedNomineeForm = this.memberNomineeDetailsModel.signedNomineeForm ;
        //   this.memberNomineeDetailsModel.signedNomineeForm = this.fileUploadService.getFile(this.memberNomineeDetailsModel.signedNomineeForm , ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberNomineeDetailsModel.signedNomineeForm);
        // }
      }
      this.memberNomineeDetailsModel = new MemberNomineeDetails();
      if(nomineeId != null && nomineeId != undefined){
        this.memberNomineeDetailsModel.id = nomineeId;
      }
      if(remarks != null && remarks != undefined){
        this.memberNomineeDetailsModel.remarks = remarks;
      }
      this.memberNomineeDetailsModel.nomineeType = 2;
      // if(signedNomineeForm != null && signedNomineeForm != undefined){
      // this.memberNomineeDetailsModel.signedNomineeForm = signedNomineeForm;
      // }
    }
    this.nomineeValidatorsFormNotRequired();
    // this.newNominee = false;
  }

  /**
   * @implements new guardain Onchage
   * @param flag 
   * @author k.yamuna
   */
  newGuardainType(flag : boolean){
    this.courtAppointedGuardain = true;
      this.noGuardain  = false;
      //onchange on update
      if(flag){
        let guardainId = null;
        if(this.memberGuardianDetailsModel != null && this.memberGuardianDetailsModel != undefined && this.memberGuardianDetailsModel.id  != null && this.memberGuardianDetailsModel.id  != undefined){
          guardainId = this.memberGuardianDetailsModel.id ;
        }
        this.memberGuardianDetailsModel = new MemberGuardianDetailsModel();
        this.memberGuardianDetailsModel.id = guardainId;
      }
      this.memberGuardianDetailsModel.guardianType = 1;
      this.guardainFormValidation();
  }


  noGuardainaType(flag:boolean){

    this.courtAppointedGuardain = false;
   
    this.noGuardain  = true;
    //onchange on update
    let guardainId = null;
    let remarks = null;
    if(flag){
      let gaurdianSignedCopyPath = null;
      if(this.memberGuardianDetailsModel != null && this.memberGuardianDetailsModel != undefined){
        if(this.memberGuardianDetailsModel.id  != null && this.memberGuardianDetailsModel.id  != undefined){
          guardainId = this.memberGuardianDetailsModel.id ;
        }
        if(this.memberGuardianDetailsModel.remarks  != null && this.memberGuardianDetailsModel.remarks  != undefined){
          remarks = this.memberGuardianDetailsModel.remarks ;
        }
        // if(this.memberGuardianDetailsModel.gu  != null && this.memberGuardianDetailsModel.gaurdianSignedCopyPath  != undefined){
        //   gaurdianSignedCopyPath = this.memberGuardianDetailsModel.gaurdianSignedCopyPath ;
        //   this.memberGuardianDetailsModel.guardainSighnedMultipartFiles =this.fileUploadService.getFile(this.memberGuardianDetailsModel.gaurdianSignedCopyPath , ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberGuardianDetailsModel.gaurdianSignedCopyPath);
        // }
      }
  
      this.memberGuardianDetailsModel = new MemberGuardianDetailsModel();
      if(guardainId != null && guardainId != undefined){
        this.memberGuardianDetailsModel.id = guardainId;
      }
      if(remarks != null && remarks != undefined){
        this.memberGuardianDetailsModel.remarks = remarks;
      }
    }
    this.memberGuardianDetailsModel.guardianType = 2;
   
  }
}

