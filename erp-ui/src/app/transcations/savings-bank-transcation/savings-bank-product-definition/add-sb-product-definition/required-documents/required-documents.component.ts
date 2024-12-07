import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequiredDocuments } from './shared/required-documents.model';
import { GeneralConfig } from '../general-config/shared/general-config.model';
import { Table } from 'primeng/table';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { GeneralConfigService } from '../general-config/shared/general-config.service';
import { ProductDefinitionService } from '../shared/product-definition.service';
import { RequiredDocumentsService } from './shared/required-documents.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DocumentTypesService } from 'src/app/configurations/sb-config/document-types/shared/document-types.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-required-documents',
  templateUrl: './required-documents.component.html',
  styleUrls: ['./required-documents.component.css']
})
export class RequiredDocumentsComponent {

  requiredDocumentsModelList: any[] = [];
  requiredDocumentsModel :RequiredDocuments =new RequiredDocuments();
  generalConfigModel: GeneralConfig = new GeneralConfig();
  displayDialog: boolean = applicationConstants.FALSE;
  orgnizationSetting: any;
  productId: any;
  @ViewChild('dt', { static: applicationConstants.FALSE }) private dt!: Table;
  msgs: any[] = [];
  responseModel!: Responsemodel;
  isEdit: any;
  requiredDocumentsForm:FormGroup;
  buttonDisabled: boolean = applicationConstants.FALSE;
  addButton: boolean = applicationConstants.FALSE;
  editDeleteDisable: boolean = applicationConstants.FALSE;
  deleteId: any;
  backButtonDisables: boolean = applicationConstants.FALSE;
  submitButtonDisabled: boolean = applicationConstants.FALSE;
  documenttypelist: any[]=[];
  requiredlist: any[]=[];
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;
  constructor(private router: Router, private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService,
    private datePipe: DatePipe, private commonComponent: CommonComponent,
    private generalConfigService: GeneralConfigService,
    private productDefinitionService: ProductDefinitionService, private requiredDocumentsService: RequiredDocumentsService,
    private commonFunctionsService: CommonFunctionsService,
    private documentTypesService: DocumentTypesService) {

      
    this.requiredDocumentsForm = this.formBuilder.group({
      'documentTypeName': new FormControl('',),
      'isRequired': new FormControl(''),
      'effectiveStartDate': new FormControl('',),
  
    });
  }
  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.requiredlist = this.commonComponent.requiredlist();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        this.productId = Number(this.encryptService.decrypt(params['id']));
        this.isEdit = applicationConstants.TRUE;
        this.getGeneralConfigById(this.productId);
      } else {
        this.isEdit = applicationConstants.FALSE;
      }
    })
    this.requiredDocumentsForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.requiredDocumentsForm.valid) {
        this.save();
      }
    });
    this.save();
 
    this.getallDocumentTypes();
  }


  updateData() {
    this.requiredDocumentsModel.productId = this.productId
    this.productDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.requiredDocumentsModel,
      savedId:this.productId,
      stepperIndex: 4,
      isDisable: !this.requiredDocumentsForm.valid ? applicationConstants.TRUE:applicationConstants.FALSE,
    });
  }
  save() {
    this.updateData();
  }

// get general config by product id
 //  @author vinitha


  getGeneralConfigById(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.requiredDocumentsModelList=[]
    this.generalConfigService.getGeneralConfigById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.generalConfigModel = this.responseModel.data[0];
        if (this.generalConfigModel != null && this.generalConfigModel != undefined) {

          if(null!=this.generalConfigModel.effectiveStartDate && undefined!=this.generalConfigModel.effectiveStartDate)
            this.generalConfigModel.effectiveStartDate = this.datePipe.transform(this.generalConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          
        if (this.generalConfigModel.requiredDocumentsConfigList != null && this.generalConfigModel.requiredDocumentsConfigList != undefined &&
            this.generalConfigModel.requiredDocumentsConfigList.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.requiredDocumentsModelList = this.generalConfigModel.requiredDocumentsConfigList;

        
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
  
//get all document types
 //  @author vinitha
 getallDocumentTypes() {
    this.commonComponent.startSpinner();
    this.documenttypelist =[];
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
          this.documenttypelist = this.responseModel.data.filter((documenttype:any) => documenttype.status == applicationConstants.ACTIVE).map((count:any) => {
            return { label: count.name, value: count.id }
          });
  
          let kycDocumentType=  this.documenttypelist.find((data:any) => null != data && data.value ==this.requiredDocumentsModel.documentTypeId);
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
 //add or update required documents
  //  @author vinitha
  addOrUpdaterequiredDocuments(rowData: any) {

    this.addButton = applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
    this.requiredDocumentsModel = rowData;
    this.requiredDocumentsModel.productId = this.productId;
    this.documenttypelist.filter((documenttype: any) => documenttype != null && documenttype.value == this.requiredDocumentsModel.documentTypeId).map((act: { label: any; }) => {
      this.requiredDocumentsModel.documentTypeName = act.label;
    });
    if (this.documenttypeDuplicateCheck(this.requiredDocumentsModel.documentTypeId)) {
      return;
    }
    this.requiredDocumentsModel.isRequired = this.requiredDocumentsModel.isRequired;
    if (this.requiredDocumentsModel.id != undefined) {
      this.requiredDocumentsService.updateRequiredDocuments(this.requiredDocumentsModel).subscribe((res: any) => {
        this.responseModel = res;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {
            this.getGeneralConfigById(this.productId);
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
        this.msgs = [{ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      })
    } else {
      this.requiredDocumentsService.addRequiredDocuments(this.requiredDocumentsModel).subscribe((res: any) => {
        this.responseModel = res;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {
            this.getGeneralConfigById(this.productId);
          this.requiredDocumentsModelList.unshift(this.responseModel.data[0]);
          this.requiredDocumentsModelList.splice(1, 1);
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
        this.msgs = [({ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST })];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      })
    }
  }

  documenttypeDuplicateCheck(selecteddocumentTypeId: any) {
    // Check if there is any row in the list with the same serviceTypeId as the selected one
    const isDuplicate = this.requiredDocumentsModelList.some(row => 
      row.documentTypeId === selecteddocumentTypeId &&
      row.id !== this.requiredDocumentsModel.id  // Exclude the current row being edited (if applicable)
    );
  
    if (isDuplicate) {
      this.requiredDocumentsForm.get('documentTypeName')?.reset();
      this.msgs = [{ severity: 'error',  detail:applicationConstants.DOCUMENT_TYPE_ALREADY_EXIST}];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
      return applicationConstants.TRUE;
    }
  
    // Otherwise, proceed with the new service type
    return applicationConstants.FALSE;
  }


  //add method for new row
  addRequirdDocuments() {
    this.editDeleteDisable = applicationConstants.TRUE;
    this.addButton = applicationConstants.TRUE;
    this.enableSaveAndNextButton = applicationConstants.FALSE;  
    this.dt._first = 0;
    this.dt.value.unshift({
      documentTypeName: '', isRequired: '', fileUpload: '', effectiveStartDate: ''});
    this.dt.initRowEdit(this.dt.value[0]);
  }
  // edit inline editor
 //  @author vinitha

  edirequiredDocumentsRow(row: any) {
    this.addButton = applicationConstants.TRUE;
    this.editDeleteDisable = applicationConstants.TRUE;
    this.enableSaveAndNextButton = applicationConstants.FALSE;  
    this.requiredDocumentsModel = row;


  }

  cancelrequiredDocuments() {

    this.addButton = applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
    this.enableSaveAndNextButton = applicationConstants.TRUE;
    this.getGeneralConfigById(this.productId);
 
  }


 
}
