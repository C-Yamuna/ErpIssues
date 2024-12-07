import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { FdNonCumulativeProductDefinition } from '../../shared/fd-non-cumulative-product-definition.model';
import { FdNonCumulativeRequiredDocuments } from './shared/fd-non-cumulative-required-documents.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { FdNonCumulativeProductDefinitionService } from '../../shared/fd-non-cumulative-product-definition.service';
import { FdNonCumulativeRequiredDocumentsService } from './shared/fd-non-cumulative-required-documents.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { DocumentTypesService } from 'src/app/configurations/term-deposit-config/document-types/shared/document-types.service';

@Component({
  selector: 'app-fd-non-cumulative-required-documents',
  templateUrl: './fd-non-cumulative-required-documents.component.html',
  styleUrls: ['./fd-non-cumulative-required-documents.component.css']
})
export class FdNonCumulativeRequiredDocumentsComponent {
  @ViewChild('dt', { static: applicationConstants.FALSE }) private dt!: Table;
  fdNonCumulativeProductDefinitionModel :FdNonCumulativeProductDefinition = new FdNonCumulativeProductDefinition();
  fdNonCumulativeRequiredDocumentsModel : FdNonCumulativeRequiredDocuments = new FdNonCumulativeRequiredDocuments();
  requiredDocumentsList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  requiredDocumentsForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;

  maxDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  fdNonCummProductId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;
  docTypeList: any[]=[];
  requiredlist: any[]=[];

  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private commonFunctionService: CommonFunctionsService,private encryptService: EncryptDecryptService,
    private fdNonCumulativeProductDefinitionService:FdNonCumulativeProductDefinitionService,
    private fdNonCumulativeRequiredDocumentsService : FdNonCumulativeRequiredDocumentsService,private documentTypesService: DocumentTypesService
  )
  { 
    this.requiredDocumentsForm = this.formBuilder.group({
      'documentTypeId': new FormControl('', Validators.required),
      'isRequired': new FormControl('', Validators.required),
    });
  }
 
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.requiredlist = this.commonComponent.requiredlist();
    this.activateRoute.queryParams.subscribe(params => {
      let encrypted = params['id'];
      if (encrypted!= undefined) {
        this.isEdit = applicationConstants.TRUE;
        this.fdNonCummProductId = Number(this.encryptService.decrypt(encrypted));
        this.getFdNonCumulativeRequiredDocumentsDetails(this.fdNonCummProductId);
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
    @author vinitha
    @implements Integrating Fd Cummulative Configuration details To Main Stepper Component
   */
  updateData() {
    this.fdNonCumulativeRequiredDocumentsModel.fdNonCummProductId = this.fdNonCummProductId
    this.fdNonCumulativeProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.fdNonCumulativeRequiredDocumentsModel,
      savedId:this.fdNonCummProductId,
      stepperIndex: 2,
      isDisable: !this.requiredDocumentsForm.valid ? applicationConstants.TRUE : applicationConstants.FALSE,
    });
  }
   /**
    @author vinitha
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
    this.newRow = {documentTypeId: '', isRequired: ''}
  }
   /**
    @author vinitha
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
    @author vinitha
    @implements edit inline row
   
   */
  editInlineRow(row:any) {
    this.addButton = applicationConstants.TRUE;
    this.editDeleteDisable = applicationConstants.TRUE; 
    this.enableSaveAndNextButton = applicationConstants.FALSE;  
    this.updateData();
  }
   /**
    @author vinitha
    @implements Fd Cummulative Configuration details 
    @argument ProductId
   */
  getFdNonCumulativeRequiredDocumentsDetails(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.requiredDocumentsList=[]
    this.fdNonCumulativeProductDefinitionService.getFdNonCumulativeProductDefinitionOverviewDetailsById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.fdNonCumulativeProductDefinitionModel = this.responseModel.data[0];
        if (this.fdNonCumulativeProductDefinitionModel != null && this.fdNonCumulativeProductDefinitionModel != undefined) {

          if(null!=this.fdNonCumulativeProductDefinitionModel.effectiveStartDate && undefined!=this.fdNonCumulativeProductDefinitionModel.effectiveStartDate)
            this.fdNonCumulativeProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.fdNonCumulativeProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
        if (this.fdNonCumulativeProductDefinitionModel.fdNonCummulativeRequiredDocumentsConfigList != null && this.fdNonCumulativeProductDefinitionModel.fdNonCummulativeRequiredDocumentsConfigList != undefined &&
            this.fdNonCumulativeProductDefinitionModel.fdNonCummulativeRequiredDocumentsConfigList.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.requiredDocumentsList = this.fdNonCumulativeProductDefinitionModel.fdNonCummulativeRequiredDocumentsConfigList;

          
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
    @author vinitha
  @implements It Saves the Fd Non Cummulative Interest Policy data 
    @argument ProductId
   */
  saveInlineRow(rowData: any) {
  if(null!=this.fdNonCumulativeRequiredDocumentsModel.fdNonCummProductId && undefined!=this.fdNonCumulativeRequiredDocumentsModel.fdNonCummProductId)
    rowData.fdNonCummProductId = this.fdNonCumulativeRequiredDocumentsModel.fdNonCummProductId;
  this.addButton = applicationConstants.FALSE;
  this.editDeleteDisable = applicationConstants.FALSE;

  if (this.documenttypeDuplicateCheck(this.fdNonCumulativeRequiredDocumentsModel.documentTypeId)) {
    return;
  }
  this.fdNonCumulativeRequiredDocumentsModel.isRequired = this.fdNonCumulativeRequiredDocumentsModel.isRequired;
   if(rowData.id != null)
    {
        this.fdNonCumulativeRequiredDocumentsService.updateFdNonCumulativeRequiredDocuments(rowData).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
            if (this.responseModel != null&& this.responseModel.data!= undefined) {

           
          if(null != rowData.fdNonCummProductId && undefined!=rowData.fdNonCummProductId)
            this.getFdNonCumulativeRequiredDocumentsDetails(rowData.fdNonCummProductId);
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
     this.fdNonCumulativeRequiredDocumentsService.addFdNonCumulativeRequiredDocuments(rowData).subscribe((response: any) => {
       this.responseModel = response;
       if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        if (this.responseModel != null&& this.responseModel.data!= undefined) {
        this.requiredDocumentsList.unshift(this.responseModel.data[0]);
        this.requiredDocumentsList.splice(1, 1);
        if(null != rowData.fdNonCummProductId && undefined!=rowData.fdNonCummProductId)
          this.getFdNonCumulativeRequiredDocumentsDetails(rowData.fdNonCummProductId);
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
    @author vinitha
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
  
          let kycDocumentType=  this.docTypeList.find((data:any) => null != data && data.value ==this.fdNonCumulativeRequiredDocumentsModel.documentTypeId);
          if(kycDocumentType != null && undefined != kycDocumentType)
             this.fdNonCumulativeRequiredDocumentsModel.documentTypeName = kycDocumentType.label;
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
    // Check if there is any row in the list with the same serviceTypeId as the selected one
    const isDuplicate = this.requiredDocumentsList.some(row => 
      row.documentTypeId === selecteddocumentTypeId &&
      row.id !== this.fdNonCumulativeRequiredDocumentsModel.id  // Exclude the current row being edited (if applicable)
    );
  
    if (isDuplicate) {
      this.requiredDocumentsForm.get('documentTypeId')?.reset();
      this.msgs = [{ severity: 'error',  detail:applicationConstants.DOCUMENT_TYPE_ALREADY_EXIST}];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
      return applicationConstants.TRUE;
    }
  
    // Otherwise, proceed with the new service type
    return applicationConstants.FALSE;
  }
}
