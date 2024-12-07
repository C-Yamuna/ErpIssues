import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RdAccountsService } from '../../../shared/rd-accounts.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { MemberGroupDetailsModel, MembershipBasicDetail, MembershipInstitutionDetailsModel, RdAccountGuardian, RdAccountNominee } from '../../../shared/membership-basic-detail.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { RdAccountNomineeService } from '../../../shared/rd-account-nominee.service';
import { RdAccountGuardianService } from '../../../shared/rd-account-guardian.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { RdAccountsModel } from '../../../shared/term-depost-model.model';

@Component({
  selector: 'app-recurring-deposit-nominee',
  templateUrl: './recurring-deposit-nominee.component.html',
  styleUrls: ['./recurring-deposit-nominee.component.css']
})
export class RecurringDepositNomineeComponent implements OnInit{
  
  nomineeForm: FormGroup;
  guarantorDetailsForm: any;
  nominee: any;
  nomineeList: any[] = [];
  checked: any;
  newNominee: boolean = false;
  sameAsMembershipNominee: boolean = false;
  noNominee: boolean = false;
  responseModel!: Responsemodel;
  msgs: any[] = [];
  rdAccountsModel:RdAccountsModel = new RdAccountsModel();
  rdAccountNomineeModel: RdAccountNominee = new RdAccountNominee();
  rdAccountGuardianModel: RdAccountGuardian = new RdAccountGuardian();
  membershipBasicDetailsModel: MembershipBasicDetail = new MembershipBasicDetail();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();

  fileName: any;
  rdAccId: any;
  isEdit: boolean = false;
  age: any;
  guarntorDetailsFalg: boolean = false;
  relationTypesList: any[] = [];

  flagForNomineeTypeValue: any;
  accountOpeningDateVal: any;
  applicationType: any;
  accountType: any;
  minBalence: any;
  orgnizationSetting: any;

  accountNumber: any;
  productName: any;
  statesList: any;
  districtsList: any;
  mandalsList: any;
  villageList: any;
  guadianTypesList: any[] = [];
  guardain :any;
  showForm: any;
  memberTypeName: any;
  institutionPromoter: any;
  promoterDetails: any;
  admissionNumber: any;

  nomineeEdit : Boolean = false;
  nomineeHistoryList : any[] = [];
  nomineeFields: any[] = [];

  courtAppointedGuardain :any;
  multipleFilesList: any;
  uploadFileData: any;
  isFileUploaded: any;
  sameAsMemberGuardain: boolean = false;
  noGuardain: boolean = true;
  nomineeTypeDisable: boolean = false;
  guardainTypeDisable: boolean = false;
  historyFLag: boolean = false;
  flag: boolean = false;
  relationshipTypeName: any;
  relationshipTypeId: any;
  guardianName: any;
  guardianAadharNumber: any;
  guardianMobileNumber: any;
  guardianEmailId: any;
  memberFilePath: any;
  depositDate: any;


  constructor(private router: Router, private formBuilder: FormBuilder,
     private rdAccountsService: RdAccountsService, 
     private commonComponent: CommonComponent, 
     private activateRoute: ActivatedRoute, 
     private encryptDecryptService: EncryptDecryptService, 
     private rdAccountNomineeService: RdAccountNomineeService,
     private rdAccountGuardianService:RdAccountGuardianService,
     private commonFunctionsService: CommonFunctionsService, 
     private datePipe: DatePipe , 
     private fileUploadService :FileUploadService) {
    this.nomineeForm = this.formBuilder.group({
      relationName:['', ],
      nomineeName: ['', ],
      aadhaar: ['', ],
      mobileNumber:['', ],
      email: ['', ],
      dateOfBirth: new FormControl('', ),
      remarks: new FormControl('', ),
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
    this.nomineeFields = [
      { field: 'name', header: 'Name' },
      { field: 'accountNumber', header: 'Account Number' },
      { field: 'aadharNumber', header: 'Aadhar Number' },
      { field: 'mobileNumber', header: 'Mobile Number' },
      { field: 'nomineeEmail',header:'Email'},
      { field: 'statusName', header: 'Status' },
    ]

  }

  // @bhargavi
  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.showForm = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);
    if(this.showForm){
      this.nomineeList = [
        { label: 'New Nominee', value: 1 },
        { label: 'No Nominee', value: 3 },
      ]
    }
    else{
      this.nomineeList = [
        { label: 'New Nominee', value: 1 },
        { label: 'Same As Membership Nominee', value: 2 },
        { label: 'No Nominee', value: 3 },
      ]
    }
   if(this.showForm){
    this.guadianTypesList = [
      { label: 'New Guardain', value: 1 },
      { label: 'No Guardain', value: 3 },
    ]
   }else{
    this.guadianTypesList= [
      { label: 'New Guardain', value: 1 },
      { label: 'Same as Member Guardain', value: 2 },
      { label: 'No Guardain', value: 3 },
    ];
   }
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined || params['preview'] != undefined) {
        if(params['preview'] != undefined && params['preview'] != null){
          let edit = this.encryptDecryptService.decrypt(params['preview']);
          this.historyFLag = true;
        }
        if(params['id'] != undefined && params['id'] != null){
          let queryParams = this.encryptDecryptService.decrypt(params['id']);
          this.rdAccId = Number(queryParams);
          this.getRdAccountApplicationById(this.rdAccId);
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
  updateData() {
    if(this.relationTypesList != null && this.relationTypesList != undefined && this.relationTypesList.length > 0){
      let nominee = this.relationTypesList.find((data: any) => null != data && this.rdAccountNomineeModel.relationTypeId != null && data.value == this.rdAccountNomineeModel.relationTypeId);
      if (nominee != null && undefined != nominee && nominee.label != null && nominee.label != undefined) {
        this.rdAccountNomineeModel.relationTypeName = nominee.label;
      }
      let guardain = this.relationTypesList.find((data: any) => null != data && this.rdAccountGuardianModel.relationshipTypeId != null && data.value == this.rdAccountGuardianModel.relationshipTypeId);
      if (guardain != null && undefined != guardain && nominee.label != null && guardain.label != undefined) {
        this.rdAccountGuardianModel.relationshipTypeName = guardain.label;
      }
    }
    if (this.age <= 18) {
      this.rdAccountGuardianModel.rdAccId = this.rdAccId ;
      this.rdAccountGuardianModel.accountNumber = this.accountNumber;
      this.rdAccountNomineeModel.RdAccountGuardian = this.rdAccountGuardianModel;
    }
    this.rdAccountNomineeModel.accountNumber = this.accountNumber;
    this.rdAccountNomineeModel.rdAccId = this.rdAccId;
    this.rdAccountsService.changeData({
      formValid: !this.nomineeForm.valid ? true : false,
      data: this.rdAccountNomineeModel,
      isDisable: (!this.nomineeForm.valid),
      // isDisable:false,
      stepperIndex: 5,
    });
  }
  save() {
    this.updateData();
  }
  //on change nominee type need to update validation
  onChange(event: any ,flag :boolean) {
    if (event == 1) {//new nominee
      this.newNomineeType(flag);
    }
    else if (event == 2) {//same as membership nominee
      this.samAsMemberNomineeType(flag);
    }
    else if (event == 3) {//no nominee
      this.noNomineeType(flag);
    } 
  }

  /**
   * @implements onChange Guardain Type 
   * @param event guardain Type
   */
  onChangeGuardain(event: any , flag :boolean) {
    if (event == 1) {//new guardain
      this.newGuardainType(flag);
    }
   else if (event == 2) {//same as member guardain
      this.sameAsMemberGuardianType(flag);
    }
    else if (event == 3) {//no guardain
      this.noGuardainaType(flag);
    }
  }

  //get fd account details for header data  
  getRdAccountApplicationById(id: any) {
    this.rdAccountsService.getRdAccounts(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            if (this.responseModel.data[0].depositDate != null && this.responseModel.data[0].depositDate != undefined) {
              this.depositDate = this.datePipe.transform(this.responseModel.data[0].depositDate, this.orgnizationSetting.datePipe);
            }
            if (this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined) {
              this.memberTypeName = this.responseModel.data[0].memberTypeName;
            }
            if (this.responseModel.data[0].adminssionNumber != null && this.responseModel.data[0].adminssionNumber != undefined) {
              this.admissionNumber = this.responseModel.data[0].adminssionNumber;
            }
            if (this.responseModel.data[0].accountNumber != null && this.responseModel.data[0].accountNumber != undefined) {
              this.accountNumber = this.responseModel.data[0].accountNumber;
              if (this.historyFLag) {
                this.getNomineeHistoryByRdAccountNumber(this.accountNumber);
              }
            }

            this.rdAccountsModel = this.responseModel.data[0];
            if (this.rdAccountsModel != null && this.rdAccountsModel != undefined) {
              if (this.rdAccountsModel.termAccountNomineeList != null && this.rdAccountsModel.termAccountNomineeList != undefined &&
                this.rdAccountsModel.termAccountNomineeList[0] != null && this.rdAccountsModel.termAccountNomineeList[0] != undefined)
                this.rdAccountNomineeModel = this.rdAccountsModel.termAccountNomineeList[0];
              if (this.rdAccountNomineeModel.nomineeFilePath != null && this.rdAccountNomineeModel.nomineeFilePath != undefined) {
                this.rdAccountNomineeModel.nomineeMultiPartList = this.fileUploadService.getFile(this.rdAccountNomineeModel.nomineeFilePath, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.rdAccountNomineeModel.nomineeFilePath);
              }
              if (this.rdAccountsModel.termAccountGaurdianList != null && this.rdAccountsModel.termAccountGaurdianList != undefined &&
                this.rdAccountsModel.termAccountGaurdianList[0] != null && this.rdAccountsModel.termAccountGaurdianList[0] != undefined)
                this.rdAccountGuardianModel = this.rdAccountsModel.termAccountGaurdianList[0];

              if (this.rdAccountGuardianModel.uploadFilePath != null && this.rdAccountGuardianModel.uploadFilePath != undefined) {
                this.rdAccountGuardianModel.guardainMultipartList = this.fileUploadService.getFile(this.rdAccountGuardianModel.uploadFilePath, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.rdAccountGuardianModel.uploadFilePath);
              }

              if (this.rdAccountNomineeModel.nomineeType != null && this.rdAccountNomineeModel.nomineeType != undefined) {
                this.onChange(this.rdAccountNomineeModel.nomineeType, this.flag);
              }
              if (this.guarntorDetailsFalg && this.rdAccountGuardianModel.gaurdianType != null && this.rdAccountGuardianModel.gaurdianType != undefined) {
                this.onChangeGuardain(this.rdAccountGuardianModel.gaurdianType, this.flag);
              }

            if (this.responseModel.data[0].memberShipBasicDetailsDTO.age != null && this.responseModel.data[0].memberShipBasicDetailsDTO.age != undefined) {
              this.age = this.responseModel.data[0].memberShipBasicDetailsDTO.age;
              if (this.age < 18) {
                this.guarntorDetailsFalg = true;
              }
            }
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
          }
        }
        else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }
  //get all relation types list
  getAllRelationTypes() {
    this.rdAccountsService.getAllRelationTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.relationTypesList = this.responseModel.data
            this.relationTypesList = this.responseModel.data.filter((nominee: any) => nominee.status == applicationConstants.ACTIVE).map((count: any) => {
              return { label: count.name, value: count.id }
            });
          let  nominee= this.relationTypesList.find((data: any) => null != data && this.rdAccountNomineeModel.relationTypeId  != null && data.value == this.rdAccountNomineeModel.relationTypeId);
          if (nominee != null && undefined != nominee && nominee.label != null && nominee.label != undefined){
                this.rdAccountNomineeModel.relationTypeName = nominee.label;
            }
            let  guardain= this.relationTypesList.find((data: any) => null != data && this.rdAccountGuardianModel.relationshipTypeId  != null && data.value == this.rdAccountGuardianModel.relationshipTypeId);
            if (guardain != null && undefined != guardain && nominee.label != null && guardain.label != undefined){
                this.rdAccountGuardianModel.relationshipTypeName = guardain.label;
            }
          }
        }
      }
    });
  }

  //get guardian details by account Number
  getGuardianDetails(accountNumber: any) {
    this.rdAccountGuardianService.getGuardianDetails(accountNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.rdAccountGuardianModel = this.responseModel.data[0];
            if (this.rdAccountGuardianModel.dateOfBirth != null && this.rdAccountGuardianModel.dateOfBirth != undefined) {
              this.rdAccountGuardianModel.dateOfBirth = this.datePipe.transform(this.rdAccountGuardianModel.dateOfBirth, this.orgnizationSetting.datePipe);
            }
            if(this.rdAccountGuardianModel.gaurdianType != null && this.rdAccountGuardianModel.gaurdianType != undefined){
              this.onChangeGuardain(this.rdAccountGuardianModel.gaurdianType , this.flag);
            }
            this.updateData();
          }
        }
        else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }
    });
  }

  /**
   * @implements getNominee from member module
   * @param admissionNumber 
   */
  getMemberNomineDetailsByAdmissionNumber(admissionNumber : any){
    this.rdAccountsService.getNomineeFromMembeshipByAdmissionNumber(admissionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.membershipBasicDetailsModel = this.responseModel.data[0];
            if (this.responseModel.data[0].memberShipNomineeDetailsDTOList != null && this.responseModel.data[0].memberShipNomineeDetailsDTOList != undefined &&
              this.responseModel.data[0].memberShipNomineeDetailsDTOList[0] != null && this.responseModel.data[0].memberShipNomineeDetailsDTOList[0] != undefined) {
              this.rdAccountNomineeModel = this.responseModel.data[0].memberShipNomineeDetailsDTOList[0];
            }
            if(this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].relationTypeId != null && this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].relationTypeId != undefined){
              this.rdAccountNomineeModel.relationTypeId = this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].relationTypeId;
              // this.getAllRelationTypes();
            }
            if (this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].relationTypeName != null && this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].relationTypeName != undefined) {
              this.rdAccountNomineeModel.relationTypeName = this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].relationTypeName;
            }
            if (this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].nomineeName != null && this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].nomineeName != undefined) {
              this.rdAccountNomineeModel.nomineeName = this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].nomineeName;
            }
            if (this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].nomineeAadharNumber != null && this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].nomineeAadharNumber != undefined) {
              this.rdAccountNomineeModel.nomineeAadharNumber = this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].nomineeAadharNumber;
            }
            if (this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].nomineeMobileNumber != null && this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].nomineeMobileNumber != undefined) {
              this.rdAccountNomineeModel.nomineeMobileNumber = this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].nomineeMobileNumber;
            }
            if (this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].nomineeEmailId != null && this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].nomineeEmailId != undefined) {
              this.rdAccountNomineeModel.nomineeEmailId = this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].nomineeEmailId;
            }
            if (this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].nomineeFilePath != null && this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].nomineeFilePath != undefined) {
              this.rdAccountNomineeModel.nomineeMultiPartList = this.fileUploadService.getFile(this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].nomineeFilePath , 
                ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.responseModel.data[0].memberShipNomineeDetailsDTOList[0].nomineeFilePath );
            }
            this.rdAccountNomineeModel.nomineeType = 2;
          }
        } else {
          this.commonComponent.stopSpinner();
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  }

  /**
   * @implements get guardain from member module
   * @param admissionNumber
   */
  getGaurdainFromMemberModule(admissionNumber : any){
    this.rdAccountsService.getGardianFromMemberModuleByAdmissionNumber(admissionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0].relationshipTypeId != null && this.responseModel.data[0].relationshipTypeId != undefined) {
            this.rdAccountGuardianModel.relationshipTypeId = this.responseModel.data[0].relationshipTypeId;
          }
          if (this.responseModel.data[0].relationshipTypeName != null && this.responseModel.data[0].relationshipTypeName != undefined) {
            this.rdAccountGuardianModel.relationshipTypeName = this.responseModel.data[0].relationshipTypeName;
            
          }
          if (this.responseModel.data[0].guardianName != null && this.responseModel.data[0].guardianName != undefined) {
            this.rdAccountGuardianModel.guardianName = this.responseModel.data[0].guardianName;
            
          }
          if (this.responseModel.data[0].guardianAadharNumber != null && this.responseModel.data[0].guardianAadharNumber != undefined) {
            this.rdAccountGuardianModel.guardianAadharNumber = this.responseModel.data[0].guardianAadharNumber;
          }
          if (this.responseModel.data[0].guardianMobileNumber != null && this.responseModel.data[0].guardianMobileNumber != undefined) {
            this.rdAccountGuardianModel.guardianMobileNumber = this.responseModel.data[0].guardianMobileNumber;
          }
          if (this.responseModel.data[0].guardianEmailId != null && this.responseModel.data[0].guardianEmailId != undefined) {
            this.rdAccountGuardianModel.guardianEmailId = this.responseModel.data[0].guardianEmailId;
          }
          if (this.responseModel.data[0].uploadFilePath != null && this.responseModel.data[0].uploadFilePath != undefined) {
            this.rdAccountGuardianModel.guardainMultipartList = this.fileUploadService.getFile(this.responseModel.data[0].uploadFilePath, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.responseModel.data[0].uploadFilePath);
          }
        } else {
          this.commonComponent.stopSpinner();
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  }

  /**
   * @implements fileUpload service
   * @param event 
   * @param fileUpload 
   * @param filePathName 
   */
  fileUploader(event: any, fileUpload: FileUpload , filePathName:any) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipleFilesList = [];
    if(this.rdAccountNomineeModel != null && this.rdAccountNomineeModel != undefined && this.isEdit && this.rdAccountNomineeModel.filesDTOList == null || this.rdAccountNomineeModel.filesDTOList == undefined){
        this.rdAccountNomineeModel.filesDTOList = [];
    }
    if(this.isEdit && this.rdAccountGuardianModel != null && this.rdAccountGuardianModel != undefined && this.rdAccountGuardianModel.filesDTOList == null || this.rdAccountGuardianModel.filesDTOList == undefined){
      this.rdAccountGuardianModel.filesDTOList = [];
    }
    let files: FileUploadModel = new FileUploadModel();
    for (let file of event.files) {
      let reader = new FileReader();
      reader.onloadend = (e) => {
        let files = new FileUploadModel();
        this.uploadFileData = e.currentTarget;
        files.fileName = file.name;
        files.fileType = file.type.split('/')[1];
        files.value = this.uploadFileData.result.split(',')[1];
        files.imageValue = this.uploadFileData.result;
        
          this.multipleFilesList.push(files);
          // Add to filesDTOList array
        let timeStamp = this.commonComponent.getTimeStamp();
        if (filePathName === "Nominee") {
          this.rdAccountNomineeModel.filesDTOList.push(files); 
          this.rdAccountNomineeModel.nomineeFilePath = null;
          this.rdAccountNomineeModel.filesDTOList[this.rdAccountNomineeModel.filesDTOList.length-1].fileName = "RD_NOMINEE" + this.rdAccId + "_" + timeStamp + "_" + file.name;
          this.rdAccountNomineeModel.nomineeFilePath = "RD_NOMINEE" + this.rdAccId + "_" +timeStamp+"_"+ file.name; 
        }
        if (filePathName === "Guardain") {
          this.rdAccountGuardianModel.filesDTOList.push(files); 
          this.rdAccountGuardianModel.uploadFilePath = null;
          this.rdAccountGuardianModel.filesDTOList[this.rdAccountGuardianModel.filesDTOList.length-1].fileName = "RD_GUARDAIN" + "_" + timeStamp + "_" + file.name;
          this.rdAccountGuardianModel.uploadFilePath = "RD_GUARDAIN" + "_" + timeStamp + "_" + file.name; 
        }
        this.updateData();
      }
      reader.readAsDataURL(file);
    }
  }


  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileName = file.name;
    }
  }
/**
 * @implements gurdaind from validation
 */
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
   * @implements getNomineeHistory
   * @param accountNumber 
   */
  getNomineeHistoryByRdAccountNumber(accountNumber: any) {
    this.rdAccountNomineeService.getNomineeByAccountNumber(accountNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
            this.nomineeHistoryList = this.responseModel.data;
          }
        }
        else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  }

  /**
   * @implements gurdain form validation based on guardain type
   */
  guardaindisable(){
    this.nomineeForm.get('relationNameOfGuardian')?.disable();
    this.nomineeForm.get('guardianName')?.disable();
    this.nomineeForm.get('guardianAadhar')?.disable();
    this.nomineeForm.get('guardianMobile')?.disable();
    this.nomineeForm.get('guardianEmail')?.disable();
    this.updateData();
  }

  /**
   * @implements nominee form validation
   */
  nomineeFormValidation() {
    this.nomineeForm.get('relationName')?.disable();
    this.nomineeForm.get('nomineeName')?.disable();
    this.nomineeForm.get('aadhaar')?.disable();
    this.nomineeForm.get('mobileNumber')?.disable();
    this.nomineeForm.get('email')?.disable();
    this.nomineeForm.get('fileUpload')?.disable();
    this.updateData();
  }
  /**
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
   * @implements onFileremove from file value
   * @param fileName 
   */
  fileRemoeEvent(fileName :any){
    if(fileName == "Nominee"){
      if(this.rdAccountNomineeModel.filesDTOList != null && this.rdAccountNomineeModel.filesDTOList != undefined && this.rdAccountNomineeModel.filesDTOList.length > 0){
        let removeFileIndex = this.rdAccountNomineeModel.filesDTOList.findIndex((obj:any) => obj && obj.fileName === this.rdAccountNomineeModel.nomineeFilePath);
        this.rdAccountNomineeModel.filesDTOList[removeFileIndex] = null;
        this.rdAccountNomineeModel.nomineeFilePath = null;
      }
    }
    if(fileName == "Guardain"){
      if(this.rdAccountGuardianModel.filesDTOList != null && this.rdAccountGuardianModel.filesDTOList != undefined && this.rdAccountGuardianModel.filesDTOList.length > 0){
        let removeFileIndex = this.rdAccountGuardianModel.filesDTOList.findIndex((obj:any) => obj && obj.fileName === this.rdAccountGuardianModel.uploadFilePath);
        this.rdAccountGuardianModel.filesDTOList[removeFileIndex] = null;
        this.rdAccountGuardianModel.uploadFilePath = null;
      }
    }
  }
/**
 * @implements onChange new Nominee
 * @param flag 
 */
  newNomineeType(flag:boolean){
    this.newNominee = true;
      this.noNominee = false;
      //onchange on update
      if(flag){
        let nomineeId = null;
        if(this.rdAccountNomineeModel != null && this.rdAccountNomineeModel != undefined && this.rdAccountNomineeModel.id  != null && this.rdAccountNomineeModel.id  != undefined){
          nomineeId = this.rdAccountNomineeModel.id ;
        }
        this.rdAccountNomineeModel = new RdAccountNominee();
        if(nomineeId != null && nomineeId != undefined){
          this.rdAccountNomineeModel.id = nomineeId;
        }
      }
      this.rdAccountNomineeModel.nomineeType = 1;
      this.nomineeValidatorsRequired();
  }

  /**
   * @implements sameAsmemberNominee onChange
   * @param flag 
   */
  samAsMemberNomineeType(flag:boolean){
    this.newNominee = true;
    this.noNominee = false;
    //onchange on update
    if(flag){
      let nomineeId = null;
      if(this.rdAccountNomineeModel != null && this.rdAccountNomineeModel != undefined && this.rdAccountNomineeModel.id  != null && this.rdAccountNomineeModel.id  != undefined){
        nomineeId = this.rdAccountNomineeModel.id ;
      }
      this.rdAccountNomineeModel = new RdAccountNominee();
      if(nomineeId != null && nomineeId != undefined){
        this.rdAccountNomineeModel.id = nomineeId;
      }
      if(this.admissionNumber != null && this.admissionNumber != undefined){
        this.getMemberNomineDetailsByAdmissionNumber(this.admissionNumber);
      }
    }
    this.rdAccountNomineeModel.nomineeType = 2;
    this.nomineeFormValidation();
  }

  /**
   * @implements noNomineeType OnChange
   * @param flag 
   */
  noNomineeType(flag : boolean){
    this.noNominee = true;
    this.newNominee = false;
    this.sameAsMembershipNominee = false;
    if(flag){
      let nomineeId = null;//onchange on update

      let signedCopyPath = null;
      if(this.rdAccountNomineeModel != null && this.rdAccountNomineeModel != undefined){
        if(this.rdAccountNomineeModel.id  != null && this.rdAccountNomineeModel.id  != undefined){
          nomineeId = this.rdAccountNomineeModel.id ;
        }
        if(this.rdAccountNomineeModel.nomineeFilePath  != null && this.rdAccountNomineeModel.nomineeFilePath  != undefined){
          signedCopyPath = this.rdAccountNomineeModel.nomineeFilePath ;
          this.rdAccountNomineeModel.nomineeFilePath = this.fileUploadService.getFile(this.rdAccountNomineeModel.nomineeFilePath , ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.rdAccountNomineeModel.nomineeFilePath);
        }
      }
      this.rdAccountNomineeModel = new RdAccountNominee();
      if(nomineeId != null && nomineeId != undefined){
        this.rdAccountNomineeModel.id = nomineeId;
      }
      this.rdAccountNomineeModel.nomineeType = 3;
      if(signedCopyPath != null && signedCopyPath != undefined){
      this.rdAccountNomineeModel.nomineeFilePath = signedCopyPath;
      }
    }
    this.nomineeValidatorsFormNotRequired();
    // this.newNominee = false;
  }

  /**
   * @implements new guardain Onchage
   * @param flag 
   */
  newGuardainType(flag : boolean){
    this.courtAppointedGuardain = false;
      this.sameAsMemberGuardain = true;
      this.noGuardain  = false;
      //onchange on update
      if(flag){
        let guardainId = null;
        if(this.rdAccountGuardianModel != null && this.rdAccountGuardianModel != undefined && this.rdAccountGuardianModel.id  != null && this.rdAccountGuardianModel.id  != undefined){
          guardainId = this.rdAccountGuardianModel.id ;
        }
        this.rdAccountGuardianModel = new RdAccountGuardian();
        this.rdAccountGuardianModel.id = guardainId;
      }
      this.rdAccountGuardianModel.gaurdianType = 1;
      this.guardainFormValidation();
  }
/**
 * @implements sameAsMember gurdain Onchage
 * @param flag 
 */
  sameAsMemberGuardianType(flag:boolean){
    this.sameAsMemberGuardain = true;
    this.courtAppointedGuardain = false;
    this.noGuardain  = false;
    //onchange on update
    if(flag){
      let guardainId = null;
      if(this.rdAccountGuardianModel != null && this.rdAccountGuardianModel != undefined && this.rdAccountGuardianModel.id  != null && this.rdAccountGuardianModel.id  != undefined){
        guardainId = this.rdAccountGuardianModel.id ;
      }
      this.rdAccountGuardianModel = new RdAccountGuardian();
      this.rdAccountGuardianModel.id = guardainId;
      this.getGaurdainFromMemberModule(this.admissionNumber);//get from member module
    }
    this.rdAccountGuardianModel.gaurdianType = 2;
    this.guardaindisable();
  }

  noGuardainaType(flag:boolean){
    this.courtAppointedGuardain = true;
    this.sameAsMemberGuardain = false;
    this.noGuardain  = true;
    //onchange on update
    let guardainId = null;
    if(flag){
      let uploadFilePath = null;
      if(this.rdAccountGuardianModel != null && this.rdAccountGuardianModel != undefined){
        if(this.rdAccountGuardianModel.id  != null && this.rdAccountGuardianModel.id  != undefined){
          guardainId = this.rdAccountGuardianModel.id ;
        }
       
        if(this.rdAccountGuardianModel.uploadFilePath  != null && this.rdAccountGuardianModel.uploadFilePath  != undefined){
          uploadFilePath = this.rdAccountGuardianModel.uploadFilePath ;
          this.rdAccountGuardianModel.guardainMultipartList =this.fileUploadService.getFile(this.rdAccountGuardianModel.uploadFilePath , ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.rdAccountGuardianModel.uploadFilePath);
        }
      } 
      this.rdAccountGuardianModel = new RdAccountGuardian();
      if(guardainId != null && guardainId != undefined){
        this.rdAccountGuardianModel.id = guardainId;
      }
     
    }
    this.rdAccountGuardianModel.gaurdianType = 3;
    this.guardaindisable();
  }
}
