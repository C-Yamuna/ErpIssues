import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { FdCumulativeNominee, MemberGuardianDetailsModelDetails } from './shared/fd-cumulative-nominee.model';
import { MemberGroupDetailsModel, MembershipInstitutionDetailsModel, NewMembershipAdd } from '../new-membership-add/shared/new-membership-add.model';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { FdCumulativeNomineeService } from './shared/fd-cumulative-nominee.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { FdCumulativeApplicationService } from '../fd-cumulative-application/shared/fd-cumulative-application.service';
import { FdCumulativeApplication } from '../fd-cumulative-application/shared/fd-cumulative-application.model';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';

@Component({
  selector: 'app-fd-cumulative-nominee',
  templateUrl: './fd-cumulative-nominee.component.html',
  styleUrls: ['./fd-cumulative-nominee.component.css']
})
export class  FdCumulativeNomineeComponent implements OnInit {

  nomineeForm: FormGroup;
  guarantorDetailsForm: any;
  nominee: any;
  nomineeList: any;
  checked: any;
  newNominee: boolean = false;
  sameAsMembershipNominee: boolean = false;
  noNominee: boolean = false;
  responseModel!: Responsemodel;
  msgs: any[] = [];
  fdCumulativeApplicationModel: FdCumulativeApplication = new  FdCumulativeApplication();
  fdCumulativeNomineeModel:  FdCumulativeNominee = new  FdCumulativeNominee();
  memberGuardianDetailsModelDetails: MemberGuardianDetailsModelDetails = new MemberGuardianDetailsModelDetails();
  membershipBasicRequiredDetails: NewMembershipAdd = new NewMembershipAdd();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();

  fileName: any;
  fdCummulativeAccId: any;
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
  filesDTOList: any[] = [];
  constructor(private router: Router, private formBuilder: FormBuilder, 
    private fdCumulativeApplicationService: FdCumulativeApplicationService,
     private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, 
     private encryptDecryptService: EncryptDecryptService, 
     private fdCumulativeNomineeService: FdCumulativeNomineeService, 
     private commonFunctionsService: CommonFunctionsService, 
     private datePipe: DatePipe ,
      private fileUploadService :FileUploadService) {
        this.nomineeForm = this.formBuilder.group({
          relationName:['', ],
          nomineeName: ['', ],
          aadhaar:['',],
          mobileNumber:['', ],
          email: ['', ],
          dateOfBirth: new FormControl('', ),
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
              this.fdCummulativeAccId = Number(queryParams);
              this.getFdCummApplicationById(this.fdCummulativeAccId);
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
          let nominee = this.relationTypesList.find((data: any) => null != data && this.fdCumulativeNomineeModel.relationType != null && data.value == this.fdCumulativeNomineeModel.relationType);
          if (nominee != null && undefined != nominee && nominee.label != null && nominee.label != undefined) {
            this.fdCumulativeNomineeModel.relationTypeName = nominee.label;
          }
          let guardain = this.relationTypesList.find((data: any) => null != data && this.memberGuardianDetailsModelDetails.relationType != null && data.value == this.memberGuardianDetailsModelDetails.relationType);
          if (guardain != null && undefined != guardain && nominee.label != null && guardain.label != undefined) {
            this.memberGuardianDetailsModelDetails.relationTypeName = guardain.label;
          }
        }
        if (this.age <= 18) {
          this.memberGuardianDetailsModelDetails.fdCummulativeAccId = this.fdCummulativeAccId ;
          this.memberGuardianDetailsModelDetails.accountNumber = this.accountNumber;
          this.fdCumulativeNomineeModel.memberGuardianDetailsModelDetails = this.memberGuardianDetailsModelDetails;
        }
        this.fdCumulativeNomineeModel.accountNumber = this.accountNumber;
        this.fdCumulativeNomineeModel.fdCummulativeAccId = this.fdCummulativeAccId;
        this.fdCumulativeApplicationService.changeData({
          formValid: !this.nomineeForm.valid ? true : false,
          data: this.fdCumulativeNomineeModel,
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
    
      //nominee details by fd account id
    
      getNomineDetailsByFdId(fdCummulativeAccId: any) {
        this.fdCumulativeNomineeService.getNomineeDetailsByFdAccId(fdCummulativeAccId).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel != null && this.responseModel != undefined) {
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data.length > 0 &&  this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.fdCumulativeNomineeModel = this.responseModel.data[0];
                if (this.fdCumulativeNomineeModel.dateOfBirth != null && this.fdCumulativeNomineeModel.dateOfBirth != undefined) {
                  this.fdCumulativeNomineeModel.dateOfBirthVal = this.datePipe.transform(this.fdCumulativeNomineeModel.dateOfBirth, this.orgnizationSetting.datePipe);
                }
                if (this.fdCumulativeNomineeModel.nomineeType!= 0) {
                    this.onChange(this.fdCumulativeNomineeModel.nomineeType, this.flag);
                }
                this.nomineeEdit = true;
              }
              this.updateData();
            }
            else {
              this.msgs = [];
              this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
              setTimeout(() => {
                this.msgs = [];
              }, 2000);
            }
          }
        })
      }
    
    
    
    
      //get fd account details for header data  
      getFdCummApplicationById(id: any) {
        this.fdCumulativeApplicationService.getFdCummApplicationById(id).subscribe((data: any) => {
          this.responseModel = data;
          if (this.responseModel != null && this.responseModel != undefined) {
            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                if (this.responseModel.data[0].accountOpenDate != null && this.responseModel.data[0].accountOpenDate != undefined) {
                  this.accountOpeningDateVal = this.datePipe.transform(this.responseModel.data[0].accountOpenDate, this.orgnizationSetting.datePipe);
                } 
                if(this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined){
                  this.memberTypeName = this.responseModel.data[0].memberTypeName;
                }
                if(this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined){
                  this.admissionNumber = this.responseModel.data[0].admissionNumber;
                }
                if(this.responseModel.data[0].accountNumber != null && this.responseModel.data[0].accountNumber != undefined){
                  this.accountNumber = this.responseModel.data[0].accountNumber;
                  if(this.historyFLag){
                    this.getNomineeHistoryByfdAccountNumber(this.accountNumber);
                  }
                }
    
                if(this.responseModel.data[0].memberShipBasicDetailsDTO.age != null && this.responseModel.data[0].memberShipBasicDetailsDTO.age != undefined){
                  this.age = this.responseModel.data[0].memberShipBasicDetailsDTO.age;
                  if(this.age < 18){
                    this.guarntorDetailsFalg = true;
                  }
                }
                this.fdCumulativeApplicationModel = this.responseModel.data[0];
                if (this.fdCumulativeApplicationModel != null && this.fdCumulativeApplicationModel != undefined) {
                  if (this.fdCumulativeApplicationModel.fdCummulativeAccountNomineeList != null && this.fdCumulativeApplicationModel.fdCummulativeAccountNomineeList != undefined &&
                    this.fdCumulativeApplicationModel.fdCummulativeAccountNomineeList[0] != null && this.fdCumulativeApplicationModel.fdCummulativeAccountNomineeList[0] != undefined)
                    this.fdCumulativeNomineeModel = this.fdCumulativeApplicationModel.fdCummulativeAccountNomineeList[0];
                  if (this.fdCumulativeNomineeModel.signedCopyPath != null && this.fdCumulativeNomineeModel.signedCopyPath != undefined) {
                    this.fdCumulativeNomineeModel.nomineeSighnedFormMultiPartList = this.fileUploadService.getFile(this.fdCumulativeNomineeModel.signedCopyPath, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.fdCumulativeNomineeModel.signedCopyPath);
                            }
                            if (this.fdCumulativeApplicationModel.fdCummulativeAccountGaurdianList != null && this.fdCumulativeApplicationModel.fdCummulativeAccountGaurdianList != undefined &&
                    this.fdCumulativeApplicationModel.fdCummulativeAccountGaurdianList[0] != null && this.fdCumulativeApplicationModel.fdCummulativeAccountGaurdianList[0] != undefined)
                    this.memberGuardianDetailsModelDetails = this.fdCumulativeApplicationModel.fdCummulativeAccountGaurdianList[0];
    
                  if (this.memberGuardianDetailsModelDetails.signedCopyPath != null && this.memberGuardianDetailsModelDetails.signedCopyPath != undefined) {
                    this.memberGuardianDetailsModelDetails.guardainSighnedMultipartFiles = this.fileUploadService.getFile(this.memberGuardianDetailsModelDetails.signedCopyPath, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberGuardianDetailsModelDetails.signedCopyPath);
                         }
                
                if(this.fdCumulativeNomineeModel.nomineeType != null && this.fdCumulativeNomineeModel.nomineeType != undefined){
                  this.onChange(this.fdCumulativeNomineeModel.nomineeType, this.flag);
                }
                if( this.guarntorDetailsFalg && this.memberGuardianDetailsModelDetails.gaurdianType != null && this.memberGuardianDetailsModelDetails.gaurdianType != undefined){
                  this.onChangeGuardain(this.memberGuardianDetailsModelDetails.gaurdianType , this.flag);
                }
              }
                else if(this.guarntorDetailsFalg){
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
        this.fdCumulativeApplicationService.getAllRelationTypes().subscribe((res: any) => {
          this.responseModel = res;
          if (this.responseModel != null && this.responseModel != undefined) {
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.relationTypesList = this.responseModel.data
                this.relationTypesList = this.responseModel.data.filter((kyc: any) => kyc.status == applicationConstants.ACTIVE).map((count: any) => {
                  return { label: count.name, value: count.id }
                });
              let  nominee= this.relationTypesList.find((data: any) => null != data && this.fdCumulativeNomineeModel.relationType  != null && data.value == this.fdCumulativeNomineeModel.relationType);
              if (nominee != null && undefined != nominee && nominee.label != null && nominee.label != undefined){
                    this.fdCumulativeNomineeModel.relationTypeName = nominee.label;
                }
                let  guardain= this.relationTypesList.find((data: any) => null != data && this.memberGuardianDetailsModelDetails.relationType  != null && data.value == this.memberGuardianDetailsModelDetails.relationType);
                if (guardain != null && undefined != guardain && nominee.label != null && guardain.label != undefined){
                    this.memberGuardianDetailsModelDetails.relationTypeName = guardain.label;
                }
              }
            }
          }
        });
      }
    
      //get guardian details by account Number
      getGuardianDetails(accountNumber: any) {
        this.fdCumulativeNomineeService.getGuardianDetails(accountNumber).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel != null && this.responseModel != undefined) {
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.memberGuardianDetailsModelDetails = this.responseModel.data[0];
                if (this.memberGuardianDetailsModelDetails.dateOfBirth != null && this.memberGuardianDetailsModelDetails.dateOfBirth != undefined) {
                  this.memberGuardianDetailsModelDetails.dateOfBirthVal = this.datePipe.transform(this.memberGuardianDetailsModelDetails.dateOfBirth, this.orgnizationSetting.datePipe);
                }
                if(this.memberGuardianDetailsModelDetails.gaurdianType != null && this.memberGuardianDetailsModelDetails.gaurdianType != undefined){
                  this.onChangeGuardain(this.memberGuardianDetailsModelDetails.gaurdianType , this.flag);
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
      getMemberDetailsByAdmissionNumber(admisionNumber: any) {
        this.fdCumulativeApplicationService.getMemberByAdmissionNumber(admisionNumber).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel != null && this.responseModel != undefined) {
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.membershipBasicRequiredDetails = this.responseModel.data[0];
                if (this.membershipBasicRequiredDetails.dob != null && this.membershipBasicRequiredDetails.dob != undefined) {
                  this.membershipBasicRequiredDetails.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetails.dob, this.orgnizationSetting.datePipe);
                }
                if (this.membershipBasicRequiredDetails.admissionDate != null && this.membershipBasicRequiredDetails.admissionDate != undefined) {
                  this.membershipBasicRequiredDetails.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetails.admissionDate, this.orgnizationSetting.datePipe);
                }
                if(this.membershipBasicRequiredDetails.age != null && this.membershipBasicRequiredDetails.age != undefined){
                  
                }
              }
            }
            else {
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
      //get group details
      getGroupByAdmissionNumber(admissionNumber: any) {
        this.fdCumulativeApplicationService.getGroupByAdmissionNumber(admissionNumber).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel != null && this.responseModel != undefined) {
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.memberGroupDetailsModel = this.responseModel.data[0];
                if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
                  this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDateVal, this.orgnizationSetting.datePipe);
                }
                if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
                  this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
                }
                if (this.memberGroupDetailsModel.groupPromoterList.length > 0) {
                  this.promoterDetails = this.memberGroupDetailsModel.groupPromoterList;
                  this.promoterDetails = this.memberGroupDetailsModel.groupPromoterList.map((member: any) => {
                    member.memDobVal = this.datePipe.transform(member.dob, this.orgnizationSetting.datePipe);
                    member.startDateVal = this.datePipe.transform(member.startDate, this.orgnizationSetting.datePipe);
                    return member;
                  });
                }
              }
    
            }
            else {
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
      //get institution details
      getInstitutionByAdmissionNumber(admissionNumber: any) {
        this.fdCumulativeApplicationService.getInstitutionDetails(admissionNumber).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel != null && this.responseModel != undefined) {
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.membershipInstitutionDetailsModel = this.responseModel.data[0];
                if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined) {
                  this.membershipInstitutionDetailsModel.registrationDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDateVal, this.orgnizationSetting.datePipe);
                }
                if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined) {
                  this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
                }
                if (this.membershipInstitutionDetailsModel.institutionPromoterList.length > 0)
                  this.institutionPromoter = this.membershipInstitutionDetailsModel.institutionPromoterList;
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
       * @implements load membermodule data
       */
      loadMembershipData(){
        if (this.memberTypeName == "Individual") {
          this.getMemberDetailsByAdmissionNumber(this.admissionNumber);
        } else if (this.memberTypeName == "Group") {
          this.getGroupByAdmissionNumber(this.admissionNumber);
        } else if (this.memberTypeName == "Institution") {
          this.getInstitutionByAdmissionNumber(this.admissionNumber);
        }
      }
    
      /**
       * @implements getNominee from member module
       * @param admissionNumber 
       */
      getNomineeFromMemberModule(admissionNumber : any){
        this.fdCumulativeNomineeService.getNomineeFromMembeshipByAdmissionNumber(admissionNumber).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel != null && this.responseModel != undefined) {
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.fdCumulativeNomineeModel = this.responseModel.data[0];
                if (this.fdCumulativeNomineeModel.dateOfBirth != null && this.fdCumulativeNomineeModel.dateOfBirth != undefined) {
                  this.fdCumulativeNomineeModel.dateOfBirthVal = this.datePipe.transform(this.fdCumulativeNomineeModel.dateOfBirthVal, this.orgnizationSetting.datePipe);
                }
                if (this.fdCumulativeNomineeModel.nominatedDate != null && this.fdCumulativeNomineeModel.nominatedDate != undefined) {
                  this.fdCumulativeNomineeModel.nominatedDateVal = this.datePipe.transform(this.fdCumulativeNomineeModel.nominatedDateVal, this.orgnizationSetting.datePipe);
                }
                if(this.responseModel.data[0].nomineeEmailId != null && this.responseModel.data[0].nomineeEmailId != undefined){
                  this.fdCumulativeNomineeModel.nomineeEmail = this.responseModel.data[0].nomineeEmailId;
                }
                if(this.responseModel.data[0].relationTypeId != null && this.responseModel.data[0].relationTypeId != undefined){
              this.fdCumulativeNomineeModel.relationType = this.responseModel.data[0].relationTypeId;
                  this.getAllRelationTypes();
                }
                if(this.responseModel.data[0].relationTypeName != null && this.responseModel.data[0].relationTypeName != undefined){
                  this.fdCumulativeNomineeModel.relationTypeName = this.responseModel.data[0].relationTypeName;
                }
                if(this.responseModel.data[0].nomineeAadharNumber != null && this.responseModel.data[0].nomineeAadharNumber != undefined){
                  this.fdCumulativeNomineeModel.aadharNumber = this.responseModel.data[0].nomineeAadharNumber;
                }
                if(this.responseModel.data[0].nomineeMobileNumber != null && this.responseModel.data[0].nomineeMobileNumber != undefined){
                  this.fdCumulativeNomineeModel.mobileNumber = this.responseModel.data[0].nomineeMobileNumber;
                }
                if(this.responseModel.data[0].nomineeName != null && this.responseModel.data[0].nomineeName != undefined){
                  this.fdCumulativeNomineeModel.name = this.responseModel.data[0].nomineeName;
                }
                if(this.responseModel.data[0].nomineeFilePath != null && this.responseModel.data[0].nomineeFilePath != undefined){
                  this.fdCumulativeNomineeModel.addressProofDocPath = this.responseModel.data[0].nomineeFilePath;
                }
                
                this.fdCumulativeNomineeModel.nomineeType = 2;
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
        this.fdCumulativeNomineeService.getGardianFromMemberModuleByAdmissionNumber(admissionNumber).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel != null && this.responseModel != undefined) {
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                if (this.responseModel.data[0].guardianDob != null && this.responseModel.data[0].guardianDob != undefined) {
                  this.memberGuardianDetailsModelDetails.dateOfBirthVal = this.datePipe.transform(this.responseModel.data[0].guardianDob, this.orgnizationSetting.datePipe);
                }
                if (this.responseModel.data[0].guardianName != null && this.responseModel.data[0].guardianName != undefined) {
                  this.memberGuardianDetailsModelDetails.name = this.responseModel.data[0].guardianName;
                }
                if (this.responseModel.data[0].guardianAadharNumber != null && this.responseModel.data[0].guardianAadharNumber != undefined) {
                  this.memberGuardianDetailsModelDetails.aadharNumber = this.responseModel.data[0].guardianAadharNumber;
                }
                if (this.responseModel.data[0].guardianMobileNumber != null && this.responseModel.data[0].guardianMobileNumber != undefined) {
                  this.memberGuardianDetailsModelDetails.mobileNumber = this.responseModel.data[0].guardianMobileNumber;
                }
                if (this.responseModel.data[0].guardianEmailId != null && this.responseModel.data[0].guardianEmailId != undefined) {
                  this.memberGuardianDetailsModelDetails.email = this.responseModel.data[0].guardianEmailId;
                }
                if (this.responseModel.data[0].relationType != null && this.responseModel.data[0].relationType != undefined) {
                  this.memberGuardianDetailsModelDetails.relationType = this.responseModel.data[0].relationType;
                  this.getAllRelationTypes();
                }
                if(this.responseModel.data[0].relationTypeName != null && this.responseModel.data[0].relationTypeName != undefined){
                  this.memberGuardianDetailsModelDetails.relationTypeName = this.responseModel.data[0].relationTypeName;
                }
                if (this.responseModel.data[0].guardianDob != null && this.responseModel.data[0].guardianDob != undefined) {
                  this.memberGuardianDetailsModelDetails.dateOfBirth = this.responseModel.data[0].guardianDob;
                }
                if (this.responseModel.data[0].guardianAge != null && this.responseModel.data[0].guardianAge != undefined) {
                  this.memberGuardianDetailsModelDetails.age = this.responseModel.data[0].guardianAge;
                }
                if (this.responseModel.data[0].guardianAge != null && this.responseModel.data[0].guardianAge != undefined) {
                  this.memberGuardianDetailsModelDetails.age = this.responseModel.data[0].guardianAge;
                }
                if (this.responseModel.data[0].guardianAge != null && this.responseModel.data[0].guardianAge != undefined) {
                  this.memberGuardianDetailsModelDetails.age = this.responseModel.data[0].guardianAge;
                }
    
                this.updateData();
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
        if(this.fdCumulativeNomineeModel != null && this.fdCumulativeNomineeModel != undefined && this.isEdit && this.fdCumulativeNomineeModel.filesDTOList == null || this.fdCumulativeNomineeModel.filesDTOList == undefined){
            this.fdCumulativeNomineeModel.filesDTOList = [];
        }
        if(this.isEdit && this.memberGuardianDetailsModelDetails != null && this.memberGuardianDetailsModelDetails != undefined && this.memberGuardianDetailsModelDetails.filesDTOList == null || this.memberGuardianDetailsModelDetails.filesDTOList == undefined){
          this.memberGuardianDetailsModelDetails.filesDTOList = [];
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
              this.fdCumulativeNomineeModel.filesDTOList.push(files); 
              this.fdCumulativeNomineeModel.signedCopyPath = null;
          this.fdCumulativeNomineeModel.filesDTOList[this.fdCumulativeNomineeModel.filesDTOList.length-1].fileName = "FD_CUMMULATIVE_NOMINEE" + this.fdCummulativeAccId + "_" + timeStamp + "_" + file.name;
          this.fdCumulativeNomineeModel.signedCopyPath = "FD_CUMMULATIVE_NOMINEE" + this.fdCummulativeAccId + "_" +timeStamp+"_"+ file.name; 
            }
            if (filePathName === "Guardain") {
              this.memberGuardianDetailsModelDetails.filesDTOList.push(files); 
              this.memberGuardianDetailsModelDetails.signedCopyPath = null;
          this.memberGuardianDetailsModelDetails.filesDTOList[this.memberGuardianDetailsModelDetails.filesDTOList.length-1].fileName = "FD_CUMMULATIVE_GUARDAIN" + "_" + timeStamp + "_" + file.name;
          this.memberGuardianDetailsModelDetails.signedCopyPath = "FD_CUMMULATIVE_GUARDAIN" + "_" + timeStamp + "_" + file.name; 
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
          const controlSix = this.nomineeForm.get('guardianEmail');
          if (controlSix) {
            controlSix.setValidators([
              Validators.pattern(applicationConstants.EMAIL_PATTERN)
            ]);
            controlSix.updateValueAndValidity();
          }
          this.updateData();
        }
      }
    
      /**
       * @implements getNomineeHistory
       * @param accountNumber 
       */
      getNomineeHistoryByfdAccountNumber(accountNumber: any) {
        this.fdCumulativeNomineeService.getNomineeDetailsByFdAccId(accountNumber).subscribe((response: any) => {
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
        const controlSix = this.nomineeForm.get('email');
        if (controlSix) {
          controlSix.setValidators([
            Validators.pattern(applicationConstants.EMAIL_PATTERN)
          ]);
          controlSix.updateValueAndValidity();
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
        const controlSix = this.nomineeForm.get('email');
        if (controlSix) {
          controlSix.setValidators(null); // Set the required validator null
          controlSix.updateValueAndValidity();
        }
        this.updateData();
      }
    
      /**
       * @implements onFileremove from file value
       * @param fileName 
       */
      fileRemoeEvent(fileName :any){
        if(fileName == "Nominee"){
          if(this.fdCumulativeNomineeModel.filesDTOList != null && this.fdCumulativeNomineeModel.filesDTOList != undefined && this.fdCumulativeNomineeModel.filesDTOList.length > 0){
            let removeFileIndex = this.fdCumulativeNomineeModel.filesDTOList.findIndex((obj:any) => obj && obj.fileName === this.fdCumulativeNomineeModel.signedCopyPath);
            this.fdCumulativeNomineeModel.filesDTOList[removeFileIndex] = null;
            this.fdCumulativeNomineeModel.signedCopyPath = null;
          }
        }
        if(fileName == "Guardain"){
          if(this.memberGuardianDetailsModelDetails.filesDTOList != null && this.memberGuardianDetailsModelDetails.filesDTOList != undefined && this.memberGuardianDetailsModelDetails.filesDTOList.length > 0){
            let removeFileIndex = this.memberGuardianDetailsModelDetails.filesDTOList.findIndex((obj:any) => obj && obj.fileName === this.memberGuardianDetailsModelDetails.signedCopyPath);
            this.memberGuardianDetailsModelDetails.filesDTOList[removeFileIndex] = null;
            this.memberGuardianDetailsModelDetails.signedCopyPath = null;
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
            if(this.fdCumulativeNomineeModel != null && this.fdCumulativeNomineeModel != undefined && this.fdCumulativeNomineeModel.id  != null && this.fdCumulativeNomineeModel.id  != undefined){
              nomineeId = this.fdCumulativeNomineeModel.id ;
            }
            this.fdCumulativeNomineeModel = new FdCumulativeNominee();
            if(nomineeId != null && nomineeId != undefined){
              this.fdCumulativeNomineeModel.id = nomineeId;
            }
          }
          this.fdCumulativeNomineeModel.nomineeType = 1;
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
          if(this.fdCumulativeNomineeModel != null && this.fdCumulativeNomineeModel != undefined && this.fdCumulativeNomineeModel.id  != null && this.fdCumulativeNomineeModel.id  != undefined){
            nomineeId = this.fdCumulativeNomineeModel.id ;
          }
          this.fdCumulativeNomineeModel = new FdCumulativeNominee();
          if(nomineeId != null && nomineeId != undefined){
            this.fdCumulativeNomineeModel.id = nomineeId;
          }
          if(this.admissionNumber != null && this.admissionNumber != undefined){
            this.getNomineeFromMemberModule(this.admissionNumber);
          }
        }
        this.fdCumulativeNomineeModel.nomineeType = 2;
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
          if(this.fdCumulativeNomineeModel != null && this.fdCumulativeNomineeModel != undefined){
            if(this.fdCumulativeNomineeModel.id  != null && this.fdCumulativeNomineeModel.id  != undefined){
              nomineeId = this.fdCumulativeNomineeModel.id ;
            }
            if(this.fdCumulativeNomineeModel.signedCopyPath  != null && this.fdCumulativeNomineeModel.signedCopyPath  != undefined){
              signedCopyPath = this.fdCumulativeNomineeModel.signedCopyPath ;
              this.fdCumulativeNomineeModel.signedCopyPath = this.fileUploadService.getFile(this.fdCumulativeNomineeModel.signedCopyPath , ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.fdCumulativeNomineeModel.signedCopyPath);
            }
          }
          this.fdCumulativeNomineeModel = new FdCumulativeNominee();
          if(nomineeId != null && nomineeId != undefined){
            this.fdCumulativeNomineeModel.id = nomineeId;
          }
          this.fdCumulativeNomineeModel.nomineeType = 3;
          if(signedCopyPath != null && signedCopyPath != undefined){
          this.fdCumulativeNomineeModel.signedCopyPath = signedCopyPath;
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
            if(this.memberGuardianDetailsModelDetails != null && this.memberGuardianDetailsModelDetails != undefined && this.memberGuardianDetailsModelDetails.id  != null && this.memberGuardianDetailsModelDetails.id  != undefined){
              guardainId = this.memberGuardianDetailsModelDetails.id ;
            }
            this.memberGuardianDetailsModelDetails = new MemberGuardianDetailsModelDetails();
            this.memberGuardianDetailsModelDetails.id = guardainId;
          }
          this.memberGuardianDetailsModelDetails.gaurdianType = 1;
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
          if(this.memberGuardianDetailsModelDetails != null && this.memberGuardianDetailsModelDetails != undefined && this.memberGuardianDetailsModelDetails.id  != null && this.memberGuardianDetailsModelDetails.id  != undefined){
            guardainId = this.memberGuardianDetailsModelDetails.id ;
          }
          this.memberGuardianDetailsModelDetails = new MemberGuardianDetailsModelDetails();
          this.memberGuardianDetailsModelDetails.id = guardainId;
          this.getGaurdainFromMemberModule(this.admissionNumber);//get from member module
        }
        this.memberGuardianDetailsModelDetails.gaurdianType = 2;
        this.guardaindisable();
      }
    
      noGuardainaType(flag:boolean){
    
        this.courtAppointedGuardain = true;
        this.sameAsMemberGuardain = false;
        this.noGuardain  = true;
        //onchange on update
        let guardainId = null;
        if(flag){
          let signedCopyPath = null;
          if(this.memberGuardianDetailsModelDetails != null && this.memberGuardianDetailsModelDetails != undefined){
            if(this.memberGuardianDetailsModelDetails.id  != null && this.memberGuardianDetailsModelDetails.id  != undefined){
              guardainId = this.memberGuardianDetailsModelDetails.id ;
            }
           
            if(this.memberGuardianDetailsModelDetails.signedCopyPath  != null && this.memberGuardianDetailsModelDetails.signedCopyPath  != undefined){
              signedCopyPath = this.memberGuardianDetailsModelDetails.signedCopyPath ;
              this.memberGuardianDetailsModelDetails.guardainSighnedMultipartFiles =this.fileUploadService.getFile(this.memberGuardianDetailsModelDetails.signedCopyPath , ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberGuardianDetailsModelDetails.signedCopyPath);
            }
          }
      
          this.memberGuardianDetailsModelDetails = new MemberGuardianDetailsModelDetails();
          if(guardainId != null && guardainId != undefined){
            this.memberGuardianDetailsModelDetails.id = guardainId;
          }
         
        }
        this.memberGuardianDetailsModelDetails.gaurdianType = 3;
        this.guardaindisable();
      }
}