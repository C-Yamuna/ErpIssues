import { SiLoanGenealogyTreeService } from './../../../shared/si-loans/si-loan-genealogy-tree.service';
import { SiLoanGenealogyTree } from './../../../shared/si-loans/si-loan-genealogy-tree.model';
import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { MembershipBasicRequiredDetails, MemberGroupDetailsModel, MembershipInstitutionDetailsModel } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-basic-required-details';
import { SiLoanApplicationService } from '../../../shared/si-loans/si-loan-application.service';

@Component({
  selector: 'app-si-loan-genealogy-tree',
  templateUrl: './si-loan-genealogy-tree.component.html',
  styleUrls: ['./si-loan-genealogy-tree.component.css']
})
export class SiLoanGenealogyTreeComponent {
  siGenealogyTreeForm: FormGroup;
  siLoanGenealogyTreeList: any[] = [];

  carrats: any[] = [];
  gender: any[] | undefined;
  maritalstatus: any[] | undefined;
  checked: boolean = false;
  responseModel!: Responsemodel;
  productsList: any[] = [];
  operationTypesList: any[] = [];
  schemeTypesList: any[] = [];
  orgnizationSetting: any;
  msgs: any[] = [];
  columns: any[] = [];
  insuranceVendorDetailsList: any[] = [];
  occupationTypesList: any[] = [];
  gendersList: any[] = [];
  relationshipTypesList: any[] = [];
  accountOpeningDateVal: any;
  minBalence: any;
  accountType: any;
  productName: any;
  isMemberCreation: boolean = false;
  membershipBasicRequiredDetails: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  siLoanGenealogyTreeModel: SiLoanGenealogyTree = new SiLoanGenealogyTree();

  memberTypeName: any;
  loanAccId: any;
  isEdit: boolean = false;
  admissionNumber: any;

  siLoanGenealogyTreeModelList: any[] = [];

  institutionPromoter: any[] = [];
  visible: boolean = false;
  isFormValid: Boolean = false;

  @ViewChild('genealogy', { static: false }) private genealogy!: Table;

  addButton: boolean = false;
  newRow: any;
  EditDeleteDisable: boolean = false;
  promoterColumns: any[] = [];

  collateralType: any;

  tempGeneaolgyTreeDetailsList: any[] = [];
  mainGeneaolgyTreeDetailsList: any[] = [];
  updatedGeneaolgyTreeDetailsList: any[] = [];

  genealogyTreeDetails: any[] = [];
  addButtonService: boolean = false;

  editDeleteDisable: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private translate: TranslateService, private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService, private commonComponent: CommonComponent,
    private datePipe: DatePipe,
    private commonFunction: CommonFunctionsService,
    private activateRoute: ActivatedRoute,
    private siLoanApplicationService: SiLoanApplicationService,
    private siLoanGenealogyTreeService: SiLoanGenealogyTreeService
  ) {

    this.genealogyTreeDetails = [
      { field: 'name', header: 'NAME' },
      { field: 'relationWithApplicant', header: 'RELATION WITH MEMBER' },
      // { field: 'remarks', header: 'REMARKS' },
      // { field: 'Action', header: 'ACTION' },
    ];

    this.siGenealogyTreeForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      relationWithApplicant: new FormControl(''),
      // remarks: new FormControl('')
    })
  }

  ngOnInit() {
    this.isMemberCreation = this.commonFunctionsService.getStorageValue('b-class-member_creation');
    this.getAllRelationshipTypes();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptDecryptService.decrypt(params['id']);
        this.loanAccId = Number(id);
        this.isEdit = true;
        this.getSILoanGenealogyTreeDetailsByLoanAccId(this.loanAccId);
        this.commonComponent.stopSpinner();
      } else {
        this.isEdit = false;
        this.commonComponent.stopSpinner();
      }
    });

    this.siGenealogyTreeForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.siGenealogyTreeForm.valid) {
        this.save();
      }
    });
  }

  save() {
    this.updateData();
  }

  updateData() {
    // this.saveAndNextDisable = !this.serviceForm.valid;
    if (this.editDeleteDisable != null) {
      // this.saveAndNextDisable = this.editDeleteDisable;
    }
    this.siLoanGenealogyTreeModel.loanAccId = this.loanAccId;
    this.siLoanApplicationService.changeData({
      formValid: this.siGenealogyTreeForm.valid,
      data: this.siLoanGenealogyTreeModel,
      isDisable: (!this.siGenealogyTreeForm.valid),
      stepperIndex: 9,
    });
  }

  getAllRelationshipTypes() {
    this.siLoanGenealogyTreeService.getAllRelationshipTypes().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.relationshipTypesList = this.responseModel.data;
            this.relationshipTypesList = this.responseModel.data.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
            let relationshiptype = this.relationshipTypesList.find((data: any) => null != data && data.value == this.siLoanGenealogyTreeModel.relationWithApplicant);
            if (relationshiptype != null && undefined != relationshiptype)
              this.siLoanGenealogyTreeModel.relationWithApplicantName = relationshiptype.label;
          } else {
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        }
      }
    }, error => {
      this.msgs = [];
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }

  getSILoanGenealogyTreeDetailsByLoanAccId(loanAccId: any) {
    
    this.commonFunctionsService
    this.siLoanGenealogyTreeService.getSILoanGenealogyTreeById(loanAccId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data != null && this.responseModel.data != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.siLoanGenealogyTreeList = this.responseModel.data;
            this.updateData();
          }
        }
      }
    });
  }

  addService() {
    this.siLoanGenealogyTreeModel = new SiLoanGenealogyTree();
    this.addButtonService = true;
    this.editDeleteDisable = true;
    /**
     * for update validation
     */
    this.updateData();
    this.genealogy._first = 0;
    this.genealogy.value.unshift({ relationWithApplicant: '' });
    this.genealogy.initRowEdit(this.genealogy.value[0]);
    this.getAllRelationshipTypes();
  }

  saveService(row: any) {
    
    this.addButtonService = false;
    this.editDeleteDisable = false;
    this.siLoanGenealogyTreeModel = row;

    const relation = this.relationshipTypesList.find((item: { value: any; }) => item.value === row.relationWithApplicant);
      this.siLoanGenealogyTreeModel.relationWithApplicantName = relation.label;

    this.siLoanGenealogyTreeModel.siLoanApplicationId = this.loanAccId;
    this.siLoanGenealogyTreeModel.status = applicationConstants.ACTIVE;
    if (row.id != null && row.id != undefined) {
      this.siLoanGenealogyTreeService.updateSILoanGenealogyTree(this.siLoanGenealogyTreeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siLoanGenealogyTreeModel = this.responseModel.data;
              this.addButtonService = false;
              if (this.responseModel.data[0].siLoanApplicationId != null && this.responseModel.data[0].siLoanApplicationId != undefined) {
                this.getSILoanGenealogyTreeDetailsByLoanAccId(this.responseModel.data[0].siLoanApplicationId);
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
    else {
      this.siLoanGenealogyTreeService.addSILoanGenealogyTree(this.siLoanGenealogyTreeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siLoanGenealogyTreeModel = this.responseModel.data;
              this.addButtonService = false;
              if (this.responseModel.data[0].siLoanApplicationId != null && this.responseModel.data[0].siLoanApplicationId != undefined) {
                this.getSILoanGenealogyTreeDetailsByLoanAccId(this.responseModel.data[0].siLoanApplicationId);
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
  }

  cancelService() {
    this.siLoanGenealogyTreeList = [];
    this.addButtonService = false;
    this.editDeleteDisable = false;
    this.getSILoanGenealogyTreeDetailsByLoanAccId(this.loanAccId);
  }

  editService(rowData: any) {
    this.addButtonService = true;
    this.editDeleteDisable = true;
    this.updateData();
    // this.getAllRelationshipTypes();
    this.siLoanGenealogyTreeService.getSIGenealogyTreeDetailsByLoanApplicationId(rowData.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.siLoanGenealogyTreeModel = this.responseModel.data[0];
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

  delete(row: any) {
    this.siLoanGenealogyTreeService.deleteSILoanGenealogyTree(row.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.siLoanGenealogyTreeList = this.responseModel.data;
        this.getSILoanGenealogyTreeDetailsByLoanAccId(this.loanAccId);
      }
    });
  }

  onChangeRelationTypeType(event: any) {
    
    if (event.value != null && event.value != undefined) {
      const relation = this.relationshipTypesList.find((item: { value: any; }) => item.value === event.value);
      this.siLoanGenealogyTreeModel.relationWithApplicantName = relation.label;
      this.updateData();
    }
  }

}