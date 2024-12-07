import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaoLoanGenealogy } from './shared/sao-loan-genealogy.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SaoLoanGenealogyTreeService } from '../../../shared/sao-loans/sao-loan-genealogy-tree.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { SaoLoanApplicationService } from '../../../shared/sao-loans/sao-loan-application.service';
import { SaoLoanApplication } from '../../shared/sao-loan-application.model';
import { DatePipe } from '@angular/common';
import { MembershipBasicDetailsService } from '../membership-basic-details/shared/membership-basic-details.service';
import { SaoLoanNomineeDetailsService } from '../../../shared/sao-loans/sao-loan-nominee-details.service';

@Component({
  selector: 'app-sao-loan-genealogy-tree',
  templateUrl: './sao-loan-genealogy-tree.component.html',
  styleUrls: ['./sao-loan-genealogy-tree.component.css']
})
export class SaoLoanGenealogyTreeComponent {
  @ViewChild('dt', { static: false })
  private dt!: Table;
  genealogyForm: FormGroup;
  date: Date | undefined;
  genealogytreedetails: any[] = [];
  displayDialog: boolean = false;
  admissionnumber:any;
  relationTypeList: any;
  addButton: boolean = false;
  gridList: any[] = [];
  carrats: any[] | undefined;
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit:boolean = false;
  buttonDisabled: boolean = false;
  loanId: any;
  orgnizationSetting: any;
  editDeleteDisable: boolean = false;
  saveAndNextDisable: boolean = false;
  saoLoanGenealogyModel: SaoLoanGenealogy = new SaoLoanGenealogy();
  saoLoanApplicatonModel: SaoLoanApplication = new SaoLoanApplication();
  statusList: any[] = [];
  deleteId: any;
  constructor(private router: Router,private formBuilder: FormBuilder,private saoLoanGenealogyTreeService: SaoLoanGenealogyTreeService,private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,private saoLoanApplicationService : SaoLoanApplicationService,
    private saoLoanNomineeDetailsService:SaoLoanNomineeDetailsService
   )
  { 
    this.genealogyForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'relationWithApplicantName': ['', Validators.required],
      'remarks': new FormControl(''),
      'statusName' : ['', Validators.required]
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        this.loanId = Number(this.encryptDecryptService.decrypt(params['id']));
        this.isEdit = true;
        this.getSaoGenealogyTreeDetailsByLoanApplicationId(this.loanId);
      } else {
        this.isEdit = false;
      }
    }) 
    this.updateData();
    this.getSaoLoanApplicationDetailsById(this.loanId);
    this.getAllRelationTypes();
}
getAllRelationTypes(){
  this.saoLoanNomineeDetailsService.getAllRelationTypes().subscribe((res: any) => {
    this.responseModel = res;
    if (this.responseModel != null && this.responseModel != undefined) {
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined ) {
          this.relationTypeList = this.responseModel.data
          this.relationTypeList = this.responseModel.data.filter((kyc: any) => kyc.status == applicationConstants.ACTIVE).map((count: any) => {
            return { label: count.name, value: count.name }
          });
        }
      }
    }
  });
  }

getSaoLoanApplicationDetailsById(id: any) {
  this.saoLoanApplicationService.getSaoLoanApplicationDetailsById(id).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
      this.saoLoanApplicatonModel = this.responseModel.data[0];
     
    }
    else {
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    }
  });
}
updateData() {
  this.saveAndNextDisable = !this.genealogyForm.valid;
  if(this.editDeleteDisable != null){
    this.saveAndNextDisable = this.editDeleteDisable;
  }
  this.saoLoanGenealogyModel.saoLoanApplicationId = this.loanId
  this.saoLoanApplicationService.changeData({
    formValid: !this.genealogyForm.valid ? true : false,
    data: this.saoLoanGenealogyModel,
    isDisable: this.saveAndNextDisable,
    stepperIndex: 8,
  });
}
save() {
  this.updateData();
}
addGenology(){
  this.addButton = true;
  this.editDeleteDisable = true;
  this.updateData(); 
  this.dt._first = 0;
  this.dt.value.unshift({ securityType: ''});
  this.dt.initRowEdit(this.dt.value[0]);
  }
  addOrUpdateGenealogyDetails(saoLoanGenealogyModel:any) {
    this.addButton = false;
    this.editDeleteDisable = false;
    saoLoanGenealogyModel.saoLoanApplicationId = this.loanId;
    if (saoLoanGenealogyModel.id != undefined) {
      this.saoLoanGenealogyTreeService.updateSaoLoanGenealogyTree(saoLoanGenealogyModel).subscribe((res: any) => {
        this.responseModel = res;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        } else {
         this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
         setTimeout(() => {
          this.msgs = [];
        }, 2000);
        }
      }, error => {
        this.msgs = [{ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      })
    } else {
      this.saoLoanGenealogyTreeService.addSaoLoanGenealogyTree(saoLoanGenealogyModel).subscribe((res: any) => {
        this.responseModel = res;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.getSaoGenealogyTreeDetailsByLoanApplicationId(this.loanId);
          this.gridList.unshift(this.responseModel.data[0]);
          this.gridList.splice(1, 1);
          this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        } else {
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        this.msgs =[({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST })];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      })
    }
  }
  getSaoGenealogyTreeDetailsByLoanApplicationId(loanId:any) {
    this.saoLoanGenealogyTreeService.getSaoGenealogyTreeDetailsByLoanApplicationId(loanId).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.gridList = this.responseModel.data;
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      } else {
        this.commonComponent.stopSpinner();
        this.buttonDisabled = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
      this.updateData(); 
    });
  }
  editGenealogyDetailsRow(row:any){
    this.addButton = true;
    this.editDeleteDisable = true;
    this.saoLoanGenealogyModel = row;
    this.saoLoanGenealogyModel.saoLoanApplicationId = this.loanId;
    this.saoLoanGenealogyTreeService.getSaoLoanGenealogyTreeById(this.saoLoanGenealogyModel.id).subscribe((response : any ) => {
      this.responseModel = response;
      if(this.responseModel.status == applicationConstants.STATUS_SUCCESS){
        this.saoLoanGenealogyModel = this.responseModel.data;
      }
      this.getSaoGenealogyTreeDetailsByLoanApplicationId(this.responseModel.data[0].saoLoanApplicationId);
    });
    this.updateData(); 
  }
  deletDilogBox(rowData:any){
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  submitDelete(){
    this.delete(this.deleteId);
    this.displayDialog = false;
  }
  cancelForDialogBox() {
    this.displayDialog = false;
  }
  delete(rowId : any){
    this.saoLoanGenealogyTreeService.deleteSaoLoanGenealogyTree(rowId).subscribe((response : any ) => {
      this.responseModel = response;
      if(this.responseModel.status == applicationConstants.STATUS_SUCCESS){
        if(this.loanId != null && this.loanId != undefined){
          this.getSaoGenealogyTreeDetailsByLoanApplicationId(this.loanId);
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
  cancelGenealogyDetails() {
    this.addButton = false;
    this.editDeleteDisable = false;
    this.getSaoGenealogyTreeDetailsByLoanApplicationId(this.loanId);
    this.updateData();       
  }
 
  
}
