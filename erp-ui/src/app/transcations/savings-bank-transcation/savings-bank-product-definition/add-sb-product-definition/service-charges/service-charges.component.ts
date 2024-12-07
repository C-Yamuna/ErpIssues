import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralConfig } from '../general-config/shared/general-config.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { GeneralConfigService } from '../general-config/shared/general-config.service';
import { ProductDefinitionService } from '../shared/product-definition.service';
import { DatePipe } from '@angular/common';
import { ServiceCharges } from './shared/service-charges.model';
import { ServiceChargesService } from './shared/service-charges.service';
import { Table } from 'primeng/table';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { ServiceTypesService } from 'src/app/configurations/sb-config/service-types/shared/service-types.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';

@Component({
  selector: 'app-service-charges',
  templateUrl: './service-charges.component.html',
  styleUrls: ['./service-charges.component.css']
})
export class ServiceChargesComponent {
  generalConfigModel: GeneralConfig = new GeneralConfig();
  serviceChargesModel: ServiceCharges = new ServiceCharges();
  servicecharges: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  orgnizationSetting: any;
  productId: any;
  @ViewChild('dt', { static:  applicationConstants.FALSE }) private dt!: Table;
  msgs: any[] = [];
  responseModel!: Responsemodel;
  isEdit: any;
  servicechargesform: any;
  buttonDisabled: boolean =  applicationConstants.FALSE;
  servicechargesModelList: any[] = [];
  servicetypeList: any[] = [];
  addButton: boolean =  applicationConstants.FALSE;
  editDeleteDisable: boolean =  applicationConstants.FALSE;
  servicetchargescollectionList: any[] = [];
  deleteId: any;
  backButtonDisables: boolean =  applicationConstants.FALSE;
  submitButtonDisabled: boolean =  applicationConstants.FALSE;
  duplicateServiceTypeError: boolean =  applicationConstants.FALSE; 
  minDate = new Date();
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;
  constructor(private router: Router, private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService,
    private datePipe: DatePipe, private commonComponent: CommonComponent,
    private generalConfigService: GeneralConfigService,
    private productDefinitionService: ProductDefinitionService, private serviceChargesService: ServiceChargesService,
    private commonFunctionsService: CommonFunctionsService,
    private servicetypesservice: ServiceTypesService) {
    this.servicechargesform = this.formBuilder.group({
      'serviceTypeName': new FormControl('',),
      'serviceCharges': new FormControl(''),
      'chargesNotApplicableCount': new FormControl('',),
      'chargesCollectionFrequency': new FormControl(''),
      'sgstPercentage': new FormControl('', [Validators.pattern(applicationConstants.RATE_OF_INTERST)]),
      'sgstAmount': [{ value: '', disabled: true }],
      'cgstPercentage':  new FormControl('', [Validators.pattern(applicationConstants.RATE_OF_INTERST)]),
      'cgstAmount': [{ value: '', disabled: true }],
      'igstPercentage':  new FormControl('', [Validators.pattern(applicationConstants.RATE_OF_INTERST)]),
      'igstAmount': [{ value: '', disabled: true }],
    });
  }
  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.servicetchargescollectionList = this.commonComponent.interestPaymentFrequency();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        this.productId = Number(this.encryptService.decrypt(params['id']));
        this.isEdit = applicationConstants.TRUE;
        this.getGeneralConfigById(this.productId);
      } else {
        this.isEdit =  applicationConstants.FALSE;
      }
    })
    this.servicechargesform.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.servicechargesform.valid) {
        this.save();
      }
    });
    this.save();
 
    this.getAllservicetypes();
  }
  updateData() {
    this.serviceChargesModel.productId = this.productId
    this.productDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.serviceChargesModel,
      savedId:this.productId,
      stepperIndex: 3,
      isDisable: !this.servicechargesform.valid ? applicationConstants.TRUE:applicationConstants.FALSE,
    });
  }

  
  save() {
    this.updateData();
  }


  getGeneralConfigById(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.servicechargesModelList=[]
    this.generalConfigService.getGeneralConfigById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.generalConfigModel = this.responseModel.data[0];
        if (this.generalConfigModel != null && this.generalConfigModel != undefined) {

          if(null!=this.generalConfigModel.effectiveStartDate && undefined!=this.generalConfigModel.effectiveStartDate)
            this.generalConfigModel.effectiveStartDate = this.datePipe.transform(this.generalConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          
        if (this.generalConfigModel.accServiceConfigChargesList != null && this.generalConfigModel.accServiceConfigChargesList != undefined &&
            this.generalConfigModel.accServiceConfigChargesList.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.servicechargesModelList = this.generalConfigModel.accServiceConfigChargesList;

        
        }
        else{
          this.enableSaveAndNextButton = applicationConstants.FALSE;
        }
      }
      this.updateData();
      }else {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }, error => {
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      this.commonComponent.stopSpinner();
    });
  }
  getServiceChargesByProductId(productId: any) {

    this.serviceChargesService.getServiceChargesByProductId(productId).subscribe((res: Responsemodel) => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        this.servicechargesModelList = this.responseModel.data;
        if (this.generalConfigModel != null && this.generalConfigModel != undefined) {
        if (this.serviceChargesModel.effectiveStartDate != null && this.serviceChargesModel.effectiveStartDate != undefined && this.serviceChargesModel.effectiveStartDate != null && this.serviceChargesModel.effectiveStartDate != undefined) {
          this.serviceChargesModel.effectiveStartDate = this.datePipe.transform(this.serviceChargesModel.effectiveStartDate, this.orgnizationSetting.datePipe);
        }
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
      } else {
        this.commonComponent.stopSpinner();
        this.buttonDisabled = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    });
  }

  getAllservicetypes() {
    this.commonComponent.startSpinner();
    this.servicetypeList =[];
    this.servicetypesservice.getAllServiceTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        if (this.responseModel.data == null || (this.responseModel.data != null && this.responseModel.data.length == 0)) {
          this.commonComponent.stopSpinner();
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: applicationConstants.RELATIONSHIP_TYPE_NO_DATA_MESSAGE }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }else{
          this.servicetypeList = this.responseModel.data.filter((documenttype:any) => documenttype.status == applicationConstants.ACTIVE).map((count:any) => {
            return { label: count.name, value: count.id }
          });
  
          let serviceType=  this.servicetypeList.find((data:any) => null != data && data.value ==this.serviceChargesModel.serviceTypeId);
          if(serviceType != null && undefined != serviceType)
             this.serviceChargesModel.serviceTypeName = serviceType.label;
          this.commonComponent.stopSpinner();
        }
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
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
  addOrUpdateServiceCharges(rowData: any) {
    this.msgs = [];
    this.duplicateServiceTypeError =  applicationConstants.FALSE;
    this.addButton =  applicationConstants.FALSE;
    this.editDeleteDisable =  applicationConstants.FALSE;
    this.serviceChargesModel = rowData;
    this.serviceChargesModel.productId = this.productId;

    this.servicetypeList.filter((servicetype: any) => servicetype != null && servicetype.value == this.serviceChargesModel.serviceTypeId).map((act: { label: any; }) => {
      this.serviceChargesModel.serviceTypeName = act.label;
    });
    this.servicetchargescollectionList.filter((servicechargeslist: any) => servicechargeslist != null && servicechargeslist.value == this.serviceChargesModel.chargesCollectionFrequency).map((act: { label: any; }) => {
      this.serviceChargesModel.chargesCollectionFrequencyName = act.label;
    });
    if (this.servicetypeDuplicateCheck(this.serviceChargesModel.serviceTypeId)) {
      return;
    }
    if(rowData.effectiveStartDate != undefined && rowData.effectiveStartDate != null)
      rowData.effectiveStartDate = this.commonFunctionsService.getUTCEpoch(new Date(rowData.effectiveStartDate));
    
    if (this.serviceChargesModel.id != undefined) {
      this.serviceChargesService.updateServiceCharges(this.serviceChargesModel).subscribe((res: any) => {
        this.responseModel = res;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {
          this.getGeneralConfigById(this.productId);
          if(null != this.serviceChargesModel.effectiveStartDate)
            this.serviceChargesModel.effectiveStartDate=this.datePipe.transform(this.serviceChargesModel.effectiveStartDate, this.orgnizationSetting.datePipe);
                  
          this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
        } else {
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, (error: any) => {
        this.msgs = [{ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      })
    } else {
      this.serviceChargesService.addServiceCharges(this.serviceChargesModel).subscribe((res: any) => {
        this.responseModel = res;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {         
          this.getGeneralConfigById(this.productId);
          this.servicechargesModelList.unshift(this.responseModel.data[0]);
          this.servicechargesModelList.splice(1, 1);
          this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
      
          setTimeout(() => {
       
            this.msgs = [];
          }, 2000);
        }
        } else {
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, (error: any) => {
        this.msgs = [({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST })];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      })
    }
  }

  // duplicate check for servicetype
servicetypeDuplicateCheck(selectedServiceTypeId: any) {
  // Check if there is any row in the list with the same serviceTypeId as the selected one
  const isDuplicate = this.servicechargesModelList.some(row => 
    row.serviceTypeId === selectedServiceTypeId &&
    row.id !== this.serviceChargesModel.id  // Exclude the current row being edited (if applicable)
  );

  if (isDuplicate) {
    this.servicechargesform.get('serviceTypeName')?.reset();
    this.msgs = [{ severity: 'error',  summary: applicationConstants.STATUS_ERROR,detail: applicationConstants.SERVICE_TYPE_ALREADY_EXIST }];
    setTimeout(() => {
      this.msgs = [];
    }, 2000);
    return applicationConstants.TRUE;
  }

  // Otherwise, proceed with the new service type
  return  applicationConstants.FALSE;
}

  // add method for new row
  addServiceCharges() {
    this.editDeleteDisable = applicationConstants.TRUE;
    this.addButton = applicationConstants.TRUE;
    this.enableSaveAndNextButton = applicationConstants.FALSE;  
    this.dt._first = 0;
    this.dt.value.unshift({
      serviceTypeName: '', serviceCharges: '', chargesNotApplicableCount: '', chargesCollectionFrequency: '',
      sgstPercentage: '', sgstAmount: '', cgstPercentage: '', cgstAmount: '', igstPercentageL: '', igstAmount: '', effectiveStartDate: '',

    });
    this.dt.initRowEdit(this.dt.value[0]);
  }
  
  ediServiceChargesRow(row: any) {
    this.addButton = applicationConstants.TRUE;
    this.editDeleteDisable = applicationConstants.TRUE;
    this.enableSaveAndNextButton = applicationConstants.FALSE;  
    this.serviceChargesModel = row;
   

  }
 
  cancelServiceCharges() { 
    this.addButton =  applicationConstants.FALSE;
    this.editDeleteDisable =  applicationConstants.FALSE;
    this.enableSaveAndNextButton = applicationConstants.TRUE;
    this.getGeneralConfigById(this.productId);
  }

  navigateToBack() {
    this.router.navigate([]);
  }

}
