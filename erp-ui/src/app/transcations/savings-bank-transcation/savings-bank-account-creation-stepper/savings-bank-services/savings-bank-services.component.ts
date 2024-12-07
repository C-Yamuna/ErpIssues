import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table/table';
import { SavingsBankServicesService } from './shared/savings-bank-services.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SavingsBankServiceModel } from './shared/savings-bank-service-model';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SavingBankApplicationService } from '../savings-bank-application/shared/saving-bank-application.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { MemberGroupDetailsModel, MembershipBasicRequiredDetails, MembershipInstitutionDetailsModel } from '../membership-basic-required-details/shared/membership-basic-required-details';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Component({
  selector: 'app-savings-bank-services',
  templateUrl: './savings-bank-services.component.html',
  styleUrls: ['./savings-bank-services.component.css']
})
export class SavingsBankServicesComponent implements OnInit{
  @ViewChild('dt', { static: false })
  private dt!: Table;
  
  serviceForm:FormGroup;
  servicesDetails:any;
  tempServices:any;
  checked:any;
  addButton: boolean = false;
  services:any;
  serviceList :any [] = [];
  editing : any ;
  responseModel!: Responsemodel;
  addButtonService: boolean = false;
  accountOpeningDateVal: any;
  applicationType: any;
  accountType: any;
  minBalence: any;
  savingsBankServiceModel : SavingsBankServiceModel = new SavingsBankServiceModel();
  membershipBasicRequiredDetails: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();

  msgs: any[] = [];
  @ViewChild('cv', { static: false })
  private cv!: Table;
  sbAccId: any;
  serviceTypesList: any[] = [];
  isEdit: boolean = false;
  orgnizationSetting: any;
  productName: any;
  showForm: boolean = false;
  memberTypeName: any;
  institutionPromoter: any[]=[];
  promoterDetails: any[]=[];
  admissionNumber: any;
  accountNumber: any;
  serviceCofigDetailsList: any;
  productId: any;
  displayDialog: boolean = false;
  deleteId: any;
  editDeleteDisable: boolean = false;
  saveAndNextDisable: boolean = false;
  multipleFilesList: any[] = [];
  uploadFileData: any;
  statusList: any[] = [];

  constructor(private router:Router, private formBuilder:FormBuilder , private savingsBankServicesService : SavingsBankServicesService,private commonComponent : CommonComponent  ,private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService ,private savingBankApplicationService : SavingBankApplicationService , private commonFunctionsService : CommonFunctionsService , private datePipe : DatePipe,private fileUploadService :FileUploadService ){
    this.serviceForm = this.formBuilder.group({
      'serviceType': new FormControl('', [Validators.required, Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'serviceCharges': new FormControl({ value: '', disabled: true },),
      'isChargeApplicable': new FormControl('',),
      'fileUpload': new FormControl('', ),
      "frequencyType" : new FormControl({ value: '', disabled: true }, ),
      "status" : new FormControl('',[Validators.required]),
     });
  }
  ngOnInit(): void {
    this.statusList = this.commonComponent.status();
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.showForm = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        let queryParams = this.encryptDecryptService.decrypt(params['id']);
        this.sbAccId = Number(queryParams);
        this.isEdit = true;
        this.getSbAccountDetailsById(this.sbAccId);
      } else {
        this.isEdit = false;
      }
    });
    this.servicesDetails =[
      { field: 'serviceTypeName', header: 'SERVICE TYPE' },
      { field: 'isChargeApplicable', header: 'IS CHARGE APPLICAPABLE' },
      { field: 'chargesCollectionFrequencyName', header: 'FREQUENCY_TYPE' },
      { field: 'serviceCharges', header: 'SERVICE CHARGES'},
      { field: 'requestDocPath', header: 'REQUESTED DOC PATH' },
      { field: 'status', header: 'STATUS' },
      { field: 'Action', header: 'ACTION' },
    ];
    this.serviceForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.serviceForm.valid) {
        this.save();
      }
    });
  }

  save() {
    this.updateData();
  }
  updateData() {
    if(this.serviceList == null || this.serviceList == undefined || this.serviceList.length == 0){
      this.saveAndNextDisable = true;
    }
    else {
      this.saveAndNextDisable = false;
    }
    if(this.addButtonService){
      this.saveAndNextDisable = true;
    }
    this.savingsBankServiceModel.sbAccId = this.sbAccId;
    this.savingBankApplicationService.changeData({
      formValid: this.saveAndNextDisable,
      data: this.savingsBankServiceModel,
      isDisable: this.saveAndNextDisable,
      stepperIndex: 7,
    });
  }

  /**
   * @author jyothi.naidana
   * @implements getAll service Types List (Master Data)
   */
  getAllServicesTypes(){
    this.savingsBankServicesService.getAllSbServicesTypes().subscribe((response : any ) =>{
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
        this.serviceTypesList = this.responseModel.data.filter((serviceTypes : any) => serviceTypes.status == applicationConstants.ACTIVE).map((count: any) => {
          return { label: count.name, value: count.id }
        });
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

  /**
   * @author jyothi.naidana
   * @implements add inline service charges
   */
    addService(){
    this.savingsBankServiceModel = new SavingsBankServiceModel();
    this.addButtonService = true;
    this.editDeleteDisable = true;
    /**
     * for update validation
     */
    this.updateData();
    
    this.cv._first = 0;
    this.cv.value.unshift({ serviceTypeId: ''});
    this.cv.initRowEdit(this.cv.value[0]);
    this.getAllServicesTypes();

  }

  /**
   * @author jyothi.naidana
   * @implements save service charges
   * @param rowData
   */
  saveService(row: any) {
    this.addButtonService = false;
    this.editDeleteDisable = false;
    this.savingsBankServiceModel = row;
    this.savingsBankServiceModel.sbAccId = this.sbAccId;
    this.savingsBankServiceModel.accountNumber = this.accountNumber;
    if (row.id != null && row.id != undefined) {
      this.savingsBankServicesService.updateSbServices(this.savingsBankServiceModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.savingsBankServiceModel = this.responseModel.data;
              this.addButtonService = false;
              if(this.responseModel.data[0].sbAccId != null && this.responseModel.data[0].sbAccId != undefined){
                this.getAllServicesBySbId(this.responseModel.data[0].sbAccId);
              }
              this.msgs = [];
              this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
              setTimeout(() => {
                this.msgs = [];
              }, 2000);
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
    else {
      this.savingsBankServiceModel.status = applicationConstants.ACTIVE;
      this.savingsBankServicesService.addSbServices(this.savingsBankServiceModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.savingsBankServiceModel = this.responseModel.data;
              this.addButtonService = false;
              if(this.responseModel.data[0].sbAccId != null && this.responseModel.data[0].sbAccId != undefined){
                this.getAllServicesBySbId(this.responseModel.data[0].sbAccId);
              }
              this.msgs = [];
              this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
              setTimeout(() => {
                this.msgs = [];
              }, 2000);
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
   

  }

   /**
   * @author jyothi.naidana
   * @implements getAllServices Charges by Sb Account Id
   * @param sbAccId
   */
  getAllServicesBySbId(id : any){
    this.savingsBankServicesService.getSbServicesBySbId(id).subscribe((response : any ) =>{
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.serviceList = this.responseModel.data;
          this.serviceList = this.responseModel.data.map((sb: any) => {
            if (sb != null && sb != undefined && sb.requestDocPath != null && sb.requestDocPath != undefined) {
              sb.requestedDocPathMultipartFileList = this.fileUploadService.getFile(sb.requestDocPath , ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + sb.requestDocPath);
            }
            return sb
          });
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
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  /**
   * @author jyothi.naidana
   * @implements cancle inline servie charges
   */
  cancelService(){
    this.serviceList = [];
    this.addButtonService = false;
    this.editDeleteDisable = false;
    this.getAllServicesBySbId(this.sbAccId);
  }

 
  /**
   * @author jyothi.naidana
   * @implements delete service charges
   * @argument rowId
   */
  delete(rowId : any){
    this.savingsBankServicesService.deleteSbServices(rowId).subscribe((response : any ) => {
      this.responseModel = response;
      if(this.responseModel.status == applicationConstants.STATUS_SUCCESS){
        if(this.sbAccId != null && this.sbAccId != undefined){
          this.getAllServicesBySbId(this.sbAccId);
          this.msgs = [];
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }  
      }
        else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    }

 /**
   * @author jyothi.naidana
   * @implements get SbAccount Details By sbAccId (Load strip data )
   * @argument sbAccId
   */
  getSbAccountDetailsById(id: any) {
    this.savingBankApplicationService.getSbApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            if (this.responseModel.data[0].accountOpenDate != null && this.responseModel.data[0].accountOpenDate != undefined) {
              this.accountOpeningDateVal = this.datePipe.transform(this.responseModel.data[0].accountOpenDate, this.orgnizationSetting.datePipe);
            }
            if (this.responseModel.data[0].productName != null && this.responseModel.data[0].productName != undefined) {
              this.productName = this.responseModel.data[0].productName;
            }
            if (this.responseModel.data[0].productId != null && this.responseModel.data[0].productId != undefined) {
              this.productId = this.responseModel.data[0].productId;
            }
            if (this.responseModel.data[0].accountTypeName != null && this.responseModel.data[0].accountTypeName != undefined) {
              this.accountType = this.responseModel.data[0].accountTypeName;
            }
            if (this.responseModel.data[0].minBalance != null && this.responseModel.data[0].minBalance != undefined) {
              this.minBalence = this.responseModel.data[0].minBalance
            }
            if(this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined){
              this.memberTypeName = this.responseModel.data[0].memberTypeName;
            }
            if(this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined){
              this.admissionNumber = this.responseModel.data[0].admissionNumber;
            }
            if(this.responseModel.data[0].accountNumber != null && this.responseModel.data[0].accountNumber != undefined){
              this.accountNumber = this.responseModel.data[0].accountNumber;
            }
            if(this.responseModel.data[0].id != null && this.responseModel.data[0].id != undefined){
              this.getAllServicesBySbId(this.responseModel.data[0].id);
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
  
 
  
  /**
   * @author jyothi.naidana
   * @implements get service configuration by product Id 
   * @argument productId
   */
  getServiceConfigDetailsByProductIdAndServiceType(serviceTypeId : any){
    // let duplicate = this.serviceTypeDuplicateCheck(serviceTypeId);
    // if(duplicate != null && duplicate != undefined && !duplicate){
      this.savingsBankServicesService.getServiceChargesConfigDetailsByProductIdAndServiceTypeId(this.productId).subscribe((response : any ) =>{
        this.responseModel = response;
        if(this.responseModel != null && this.responseModel != undefined){
        if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if(this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined){
            this.serviceCofigDetailsList = this.responseModel.data;
            let serviceConfigObj = this.serviceCofigDetailsList.find((obj:any) => obj.serviceTypeId == serviceTypeId);
            if(serviceConfigObj != null && serviceConfigObj != undefined){
              if(serviceConfigObj.chargesCollectionFrequencyName != null && serviceConfigObj.chargesCollectionFrequencyName != undefined){
                this.savingsBankServiceModel.chargesCollectionFrequencyName  = serviceConfigObj.chargesCollectionFrequencyName ;
              }
              if(serviceConfigObj.serviceCharges != null && serviceConfigObj.serviceCharges != undefined){
                this.savingsBankServiceModel.serviceCharges  = serviceConfigObj.serviceCharges ;
              }
            }
          }
          // this.updateData();
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
    // }
  }

  /**
   * @author jyothi.naidana
   * @implements get service types By Id 
   * @argument productId
   */
  getServiceTypesById(rowData : any){
    this.addButtonService = true;
    this.editDeleteDisable = true;
   /**
     * for update validation
     */
   this.updateData();
    this.getAllServicesTypes();
    this.savingsBankServicesService.getSbServices(rowData.id).subscribe((response : any ) =>{
      this.responseModel = response;
      if(this.responseModel != null && this.responseModel != undefined){
      if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if(this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined){
          this.savingsBankServiceModel = this.responseModel.data[0];
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

   /**
   * @author jyothi.naidana
   * @implements on click delete
   */
   deletDilogBox(rowData:any){
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }

  /**
   * @author jyothi.naidana
   * @implements cancle delete dialog box
   */
  cancelForDialogBox() {
    this.displayDialog = false;
  }

  /**
   * @author jyothi.naidana
   * @implements submit delete diloge 
   */
  submitDelete(){
    this.delete(this.deleteId);
    this.displayDialog = false;
  }

  /**
   * @implements service type duplicate check 
   * @param serviceTypeId
   * @author jyothi.naidana
   */
  serviceTypeDuplicateCheck(serviceTypeId: any) {
    let duplicate = false;
    if (this.serviceList != null && this.serviceList != undefined && this.serviceList.length > 0) {
      let duplicate = this.serviceList.find((obj: any) => obj && obj.serviceTypeId === serviceTypeId);
      if (duplicate != null && duplicate != undefined) {
        duplicate = true;
        this.serviceForm.reset();
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: "selected duplicate service Type" }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
      else{
        this.getServiceConfigDetailsByProductIdAndServiceType(serviceTypeId);
      }
    }
    return duplicate;
  }

  /**
   * @implements file upload service
   * @param event
   * @param fileUpload
   * @author jyothi.naidana
   */
  fileUploader(event:any ,fileUpload: FileUpload ){
    this.multipleFilesList = [];
    this.savingsBankServiceModel.filesDTOList = [];
    this.savingsBankServiceModel.requestDocPath = null;
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
        let index = this.multipleFilesList.findIndex(x => x.fileName == files.fileName);
        if (index === -1) {
          this.multipleFilesList.push(files);
          this.savingsBankServiceModel.filesDTOList.push(files); // Add to filesDTOList array
        }
        let timeStamp = this.commonComponent.getTimeStamp();
        this.savingsBankServiceModel.filesDTOList[0].fileName = "SB_SERVICE" + this.sbAccId + "_" +timeStamp+ "_"+ file.name ;
        this.savingsBankServiceModel.requestDocPath = "SB_SERVICE" + this.sbAccId + "_" +timeStamp+"_"+ file.name; // This will set the last file's name as docPath
      }
      reader.readAsDataURL(file);
    }
  }

  /**
   * @implements onFileremove from file value
   * @author jyothi.naidana
   */
  fileRemoeEvent() {
    if (this.savingsBankServiceModel.filesDTOList != null && this.savingsBankServiceModel.filesDTOList != undefined && this.savingsBankServiceModel.filesDTOList.length > 0) {
      let removeFileIndex = this.savingsBankServiceModel.filesDTOList.findIndex((obj: any) => obj && obj.fileName === this.savingsBankServiceModel.requestDocPath);
      this.savingsBankServiceModel.filesDTOList[removeFileIndex] = null;
      this.savingsBankServiceModel.requestDocPath = null;
    }
  }
  
}
  

