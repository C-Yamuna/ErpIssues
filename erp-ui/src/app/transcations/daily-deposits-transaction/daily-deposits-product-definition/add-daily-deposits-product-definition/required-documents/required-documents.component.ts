import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { RequiredDocuments } from './shared/required-documents.model';
import { DailyDepositsProductDefinition } from '../../shared/daily-deposits-product-definition.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { RequiredDocumentsService } from './shared/required-documents.service';
import { DocumentTypesService } from 'src/app/configurations/daily-deposits-config/document-types/shared/document-types.service';
import { DailyDepositsProductDefinitionService } from '../../shared/daily-deposits-product-definition.service';

@Component({
  selector: 'app-required-documents',
  templateUrl: './required-documents.component.html',
  styleUrls: ['./required-documents.component.css']
})
export class RequiredDocumentsComponent {
  @ViewChild('dt', { static: applicationConstants.FALSE }) private dt!: Table;
  dailyDepositsProductDefinitionModel:DailyDepositsProductDefinition = new DailyDepositsProductDefinition();
  requiredDocumentsModel : RequiredDocuments = new RequiredDocuments();
  requiredDocumentsList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  requiredDocumentsForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;
  maxDate = new Date();
  minDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  productId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;
  docTypeList: any[]=[];
  requiredlist: any[]=[];

  constructor(private formBuilder: FormBuilder,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private commonFunctionService: CommonFunctionsService,
    private encryptService: EncryptDecryptService,
    private dailyDepositsProductDefinitionService: DailyDepositsProductDefinitionService,
    private requiredDocumentsService : RequiredDocumentsService,
    private documentTypesService: DocumentTypesService
  )
  { 
    this.requiredDocumentsForm = this.formBuilder.group({
      'documentTypeId': new FormControl('', Validators.required),
      'isRequired': new FormControl('', Validators.required),
      // 'effectiveStartDate': new FormControl('', Validators.required)
    });
  }
 
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.requiredlist = this.commonComponent.requiredlist();
    this.activateRoute.queryParams.subscribe(params => {
      let encrypted = params['id'];
      if (encrypted!= undefined) {
        this.isEdit = applicationConstants.TRUE;
        this.productId = Number(this.encryptService.decrypt(encrypted));
        this.getRequiredDocumentsDetails(this.productId);
      } else {
        this.isEdit = applicationConstants.FALSE;
      }
      this.updateData();
    });
  
    this.requiredDocumentsForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.requiredDocumentsForm.valid) {
        this.save();
      }
    });
    this.getAllDocumnetsTypes();   
  }
  /**
    @author Bhargavi
    @implements Integrating Investments Configuration details To Main Stepper Component
   */
  updateData() {
    this.requiredDocumentsModel.productId = this.productId
    this.dailyDepositsProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.requiredDocumentsModel,
      savedId:this.productId,
      stepperIndex: 3,
      isDisable: !this.requiredDocumentsForm.valid ? applicationConstants.TRUE : applicationConstants.FALSE,
    });
  }
   /**
    @author Bhargavi
    @implements To Call update Data function to integrate data to main stepper
   */
  save() {
    this.updateData();
  }
  
  addInlineRow() {
    this.addNewEntry();
    this.editDeleteDisable = applicationConstants.TRUE;
    this.addButton = applicationConstants.TRUE;
    this.dt._first = 0;
    this.dt.value.unshift(this.newRow);
    this.dt.initRowEdit(this.dt.value[0]);
    this.enableSaveAndNextButton = applicationConstants.FALSE;  
    this.updateData();
  }

  addNewEntry()
  {
    this.newRow = {documentTypeId: '', isRequired: '', effectiveStartDate: ''}
  }
   /**
    @author Bhargavi
    @implementsRow Row Edit Cancel
   
   */
  onRowEditCancel() {
    this.addButton=applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
    this.enableSaveAndNextButton = applicationConstants.TRUE;
    const index = this.dt.value.indexOf(this.newRow);
    if (index > -1) {
      this.dt.value.splice(index, 1);
    }
    this.addNewEntry();
    this.updateData();
  }
  /**
    @author Bhargavi
    @implements edit inline row
   
   */
  editInlineRow(row:any) {
    this.addButton = applicationConstants.TRUE;
    this.editDeleteDisable = applicationConstants.TRUE; 
    this.enableSaveAndNextButton = applicationConstants.FALSE;  
    this.updateData();
  }
   /**
    @author Bhargavi
    @implements Investments Configuration details 
    @argument ProductId
   */
    getRequiredDocumentsDetails(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.requiredDocumentsList=[]
    this.dailyDepositsProductDefinitionService.getProductOverviewById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.dailyDepositsProductDefinitionModel = this.responseModel.data[0];
        if (this.dailyDepositsProductDefinitionModel != null && this.dailyDepositsProductDefinitionModel != undefined) {

          if(null!=this.dailyDepositsProductDefinitionModel.effectiveStartDate && undefined!=this.dailyDepositsProductDefinitionModel.effectiveStartDate)
            this.dailyDepositsProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.dailyDepositsProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
        if (this.dailyDepositsProductDefinitionModel.requiredDocumentsConfigList != null && this.dailyDepositsProductDefinitionModel.requiredDocumentsConfigList != undefined &&
            this.dailyDepositsProductDefinitionModel.requiredDocumentsConfigList.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.requiredDocumentsList = this.dailyDepositsProductDefinitionModel.requiredDocumentsConfigList;

          
          // this.requiredDocumentsList = this.requiredDocumentsList.filter((data:any) => data !=null &&data.effectiveStartDate !=null).map((object:any) => {
          //   object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
          //   return object;
          // });
        }else{
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
   /**
    @author Bhargavi
  @implements It Saves the Investments Interest Policy data 
    @argument ProductId
   */
  saveInlineRow(rowData: any) {
  if(null!=this.requiredDocumentsModel.productId && undefined!=this.requiredDocumentsModel.productId)
    rowData.productId = this.requiredDocumentsModel.productId;
  this.addButton = applicationConstants.FALSE;
  this.editDeleteDisable = applicationConstants.FALSE;
  // if(rowData.effectiveStartDate != undefined && rowData.effectiveStartDate != null)
  //   rowData.effectiveStartDate = this.commonFunctionService.getUTCEpoch(new Date(rowData.effectiveStartDate));

  if (this.documenttypeDuplicateCheck(this.requiredDocumentsModel.documentTypeId)) {
    return;
  }
  this.requiredDocumentsModel.isRequired = this.requiredDocumentsModel.isRequired;
   if(rowData.id != null)
    {
        this.requiredDocumentsService.updateRequiredDocuments(rowData).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
            if (this.responseModel != null&& this.responseModel.data!= undefined) {

            // if(null != this.requiredDocumentsModel.effectiveStartDate && undefined != this.requiredDocumentsModel.effectiveStartDate)
            //   rowData.effectiveStartDateString=this.datePipe.transform(this.requiredDocumentsModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          if(null != rowData.productId && undefined!=rowData.productId)
            this.getRequiredDocumentsDetails(rowData.productId);
            this.commonComponent.stopSpinner();
            this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];  
            }, 2000);
          }
          } else {
           this.commonComponent.stopSpinner();
            this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];  
            }, 2000);
           
          }
        },
          error => {
            this.commonComponent.stopSpinner();
            this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];  
            }, 2000);
          });
  } else {
     this.requiredDocumentsService.addRequiredDocuments(rowData).subscribe((response: any) => {
       this.responseModel = response;
       if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        if (this.responseModel != null&& this.responseModel.data!= undefined) {
        // if(null != this.requiredDocumentsModel.effectiveStartDate && undefined != this.requiredDocumentsModel.effectiveStartDate)
        //   rowData.effectiveStartDateString=this.datePipe.transform(this.requiredDocumentsModel.effectiveStartDate, this.orgnizationSetting.datePipe);
        this.requiredDocumentsList.unshift(this.responseModel.data[0]);
        this.requiredDocumentsList.splice(1, 1);
        if(null != rowData.productId && undefined!=rowData.productId)
          this.getRequiredDocumentsDetails(rowData.productId);
         this.commonComponent.stopSpinner();
         this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
         setTimeout(() => {
           this.msgs = [];  
         }, 2000);
        }
       } else {
         this.commonComponent.stopSpinner();
         this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
         setTimeout(() => {
           this.msgs = [];  
         }, 2000);
       }
     },
       error => {
         this.commonComponent.stopSpinner();
         this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
         setTimeout(() => {
           this.msgs = [];  
         }, 2000);
       });
   }
   }
   /**
    @author Bhargavi
  @implements get document types
    @argument ProductId
   */
   getAllDocumnetsTypes() {
    this.commonComponent.startSpinner();
    this.docTypeList =[];
    this.documentTypesService.getAllDocumentType().subscribe((res: any) => {
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
          this.docTypeList = this.responseModel.data.filter((documenttype:any) => documenttype.status == applicationConstants.ACTIVE).map((count:any) => {
            return { label: count.name, value: count.id }
          });
  
          let kycDocumentType=  this.docTypeList.find((data:any) => null != data && data.value ==this.requiredDocumentsModel.documentTypeId);
          if(kycDocumentType != null && undefined != kycDocumentType)
             this.requiredDocumentsModel.documentTypeName = kycDocumentType.label;
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
  documenttypeDuplicateCheck(selecteddocumentTypeId: any) {
    const isDuplicate = this.requiredDocumentsList.some(row => 
      row.documentTypeId === selecteddocumentTypeId &&
      row.id !== this.requiredDocumentsModel.id
    );
  
    if (isDuplicate) {
      this.requiredDocumentsForm.get('documentTypeName')?.reset();
      this.msgs = [{ severity: 'error',  detail:applicationConstants.DOCUMENT_TYPE_ALREADY_EXIST}];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
      return applicationConstants.TRUE;
    }
    return applicationConstants.FALSE;
  }

}
