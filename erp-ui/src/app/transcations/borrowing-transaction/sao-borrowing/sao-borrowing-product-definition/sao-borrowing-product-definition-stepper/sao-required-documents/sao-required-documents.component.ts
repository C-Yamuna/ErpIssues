import { Component, ViewChild } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SaoBorrowingProductDefinition } from '../../shared/sao-borrowing-product-definition.model';
import { SaoRequiredDocuments } from './shared/sao-required-documents.model';
import { Table } from 'primeng/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SaoRequiredDocumentsService } from './shared/sao-required-documents.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { SaoBorrowingProductDefinitionService } from '../../shared/sao-borrowing-product-definition.service';
import { DocumentTypesService } from 'src/app/configurations/borrowing-config/document-types/shared/document-types.service';

@Component({
  selector: 'app-sao-required-documents',
  templateUrl: './sao-required-documents.component.html',
  styleUrls: ['./sao-required-documents.component.css']
})
export class SaoRequiredDocumentsComponent {
  @ViewChild('dt', { static: applicationConstants.FALSE }) private dt!: Table;
  saoProductDefinitionModel :SaoBorrowingProductDefinition = new SaoBorrowingProductDefinition();
  saoRequiredDocumentsModel : SaoRequiredDocuments = new SaoRequiredDocuments();
  requiredDocumentsList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  requiredDocumentsForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;

  maxDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  saoProductId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;
  docTypeList: any[]=[];
  requiredlist: any[]=[];

  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private commonFunctionService: CommonFunctionsService,private encryptService: EncryptDecryptService,
    private saoBorrowingProductDefinitionService : SaoBorrowingProductDefinitionService,
    private saoRequiredDocumentsService : SaoRequiredDocumentsService,private documentTypesService: DocumentTypesService
  )
  { 
    this.requiredDocumentsForm = this.formBuilder.group({
      'documentType': new FormControl('', Validators.required),
      'isRequired': new FormControl('', Validators.required),
    });
  }
 
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.requiredlist = this.commonComponent.mandatoryList();
    this.activateRoute.queryParams.subscribe(params => {
      let encrypted = params['id'];
      if (encrypted!= undefined) {
        this.isEdit = applicationConstants.TRUE;
        this.saoProductId = Number(this.encryptService.decrypt(encrypted));
        this.getPreviewDetailsByProductId(this.saoProductId);
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
    @implements Integrating SAO Borrowings Product Definition Configuration details To Main Stepper Component
   */
  updateData() {
    this.saoRequiredDocumentsModel.saoProductId = this.saoProductId
    this.saoBorrowingProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.saoRequiredDocumentsModel,
      savedId:this.saoProductId,
      stepperIndex: 5,
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
    this.newRow = {documentType: '', isRequired: ''}
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
    @implements SAO Borrowings Product Definition Configuration details 
    @argument ProductId
   */
    getPreviewDetailsByProductId(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.requiredDocumentsList=[]
    this.saoBorrowingProductDefinitionService.getPreviewByProductId(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.saoProductDefinitionModel = this.responseModel.data[0];
        if (this.saoProductDefinitionModel != null && this.saoProductDefinitionModel != undefined) {

          if(null!=this.saoProductDefinitionModel.effectiveStartDate && undefined!=this.saoProductDefinitionModel.effectiveStartDate)
            this.saoProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.saoProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
        if (this.saoProductDefinitionModel.saoProductRequiredDocumentsConfigDTO != null && this.saoProductDefinitionModel.saoProductRequiredDocumentsConfigDTO != undefined &&
            this.saoProductDefinitionModel.saoProductRequiredDocumentsConfigDTO.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.requiredDocumentsList = this.saoProductDefinitionModel.saoProductRequiredDocumentsConfigDTO;

          
        
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
  @implements It Saves the SAO Borrowings Product Definition Configuration required documents data 
    @argument ProductId
   */
  saveInlineRow(rowData: any) {
  if(null!=this.saoRequiredDocumentsModel.saoProductId && undefined!=this.saoRequiredDocumentsModel.saoProductId)
    rowData.saoProductId = this.saoRequiredDocumentsModel.saoProductId;
  this.addButton = applicationConstants.FALSE;
  this.editDeleteDisable = applicationConstants.FALSE;
 
  if (this.documenttypeDuplicateCheck(this.saoRequiredDocumentsModel.documentType)) {
    return;
  }
  this.saoRequiredDocumentsModel.isRequired = this.saoRequiredDocumentsModel.isRequired;
   if(rowData.id != null)
    {
        this.saoRequiredDocumentsService.updateSaoRequiredDocuments(rowData).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
            if (this.responseModel != null&& this.responseModel.data!= undefined) {

          
          if(null != rowData.saoProductId && undefined!=rowData.saoProductId)
            this.getPreviewDetailsByProductId(rowData.saoProductId);
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
     this.saoRequiredDocumentsService.addSaoRequiredDocuments(rowData).subscribe((response: any) => {
       this.responseModel = response;
       if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        if (this.responseModel != null&& this.responseModel.data!= undefined) {
       
        this.requiredDocumentsList.unshift(this.responseModel.data[0]);
        this.requiredDocumentsList.splice(1, 1);
        if(null != rowData.saoProductId && undefined!=rowData.saoProductId)
          this.getPreviewDetailsByProductId(rowData.saoProductId);
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
  
          let kycDocumentType=  this.docTypeList.find((data:any) => null != data && data.value ==this.saoRequiredDocumentsModel.documentType);
          if(kycDocumentType != null && undefined != kycDocumentType)
             this.saoRequiredDocumentsModel.documentTypeName = kycDocumentType.label;
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
  documenttypeDuplicateCheck(selecteddocumentType: any) {
    // Check if there is any row in the list with the same serviceTypeId as the selected one
    const isDuplicate = this.requiredDocumentsList.some(row => 
      row.documentType === selecteddocumentType &&
      row.id !== this.saoRequiredDocumentsModel.id  // Exclude the current row being edited (if applicable)
    );
  
    if (isDuplicate) {
      this.requiredDocumentsForm.get('documentType')?.reset();
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
