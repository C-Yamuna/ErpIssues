import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SaoLoanJointMember } from './shared/sao-loan-joint-member.mode';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SaoLoanJointMemberService } from './shared/sao-loan-joint-member.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SaoLoanApplication } from '../../shared/sao-loan-application.model';
import { SaoLoanApplicationService } from '../../../shared/sao-loans/sao-loan-application.service';
import { MembershipBasicDetailsService } from '../membership-basic-details/shared/membership-basic-details.service';

@Component({
  selector: 'app-sao-loan-joint-member',
  templateUrl: './sao-loan-joint-member.component.html',
  styleUrls: ['./sao-loan-joint-member.component.css']
})
export class SaoLoanJointMemberComponent {
  jointHolderForm: any;
  savedId: any;
  msgs: any[] = [];
  isEdit: boolean = false;
  selectedMembers: any[] = [];
  selectedList: any[]=[];
  filteredFruits: any;
  admissionNumberList: any[]= [];
  allTypesOfmembershipList: any[] = [];
  showForm: boolean = false;
  rowEdit: any;
  responseModel!: Responsemodel;
  admissionNumber:any;
  saoLoanJointMemberModel : SaoLoanJointMember = new SaoLoanJointMember();
  saoLoanApplicatonModel: SaoLoanApplication = new SaoLoanApplication();
  pacsId: any;
  branchId: any;
  constructor( private formBuilder: FormBuilder, private commonComponent : CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private saoLoanJointMemberService: SaoLoanJointMemberService,private saoLoanApplicationService: SaoLoanApplicationService,private membershipBasicDetailsService: MembershipBasicDetailsService
  ) {
    this.jointHolderForm = this.formBuilder.group({
      admissionNo: [''],
      noOfJointHolders:[''],
    });

  }
  ngOnInit(): void {
    this.pacsId = 1;
    this.branchId = 1;
    this.getAllTypeOfMembershipDetails(this.pacsId, this.branchId);
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined ||  params['admissionNumber'] != undefined) {
        this.commonComponent.startSpinner();
        if (params['admissionNumber'] != undefined) {
          this.admissionNumber = this.encryptDecryptService.decrypt(params['admissionNumber']);
        }
        let id = this.encryptDecryptService.decrypt(params['id']);
        this.savedId = id ;
        this.isEdit = true;
        this.commonComponent.stopSpinner();
        this.getSaoLoanJointHolderDetailsByApplicationId(this.savedId);
      } else {
        this.isEdit = false;
        this.commonComponent.stopSpinner();
      }
    })
    this.updateData();
    this.getSaoLoanApplicationDetailsById(this.savedId);
  }
  updateData() {
    this.saoLoanJointMemberModel.jointHolderList = this.selectedList;
    this.saoLoanJointMemberModel.admissionNo = this.admissionNumber;
    this.saoLoanJointMemberModel.saoLoanApplicationId = this.savedId;
    if(this.saoLoanJointMemberModel.jointHolderList != null && this.saoLoanJointMemberModel.jointHolderList.length > 0)
      this.saoLoanJointMemberModel.jointHolderList.applicationId = this.savedId
    this.saoLoanApplicationService.changeData({
      formValid: !this.jointHolderForm.valid ? true : false,
      data: this.saoLoanJointMemberModel,
      isDisable: (!this.jointHolderForm.valid),
      // isDisable:false,
      stepperIndex: 3,
    });
  }
  save() {
    this.updateData();
  }
  onChange() {
    this.showForm = !this.showForm;
  }
   // Method triggered on multiSelect change
   OnChangeAdmissionNumber(selectedAdmissionNumbers: any[]) {
    // Clear existing selected details
    this.selectedList = [];
    const newlySelectedIds = selectedAdmissionNumbers;
    this.selectedMembers = newlySelectedIds;
    this.jointHolderForm.get('admissionNo')?.setValue(this.selectedMembers);
  
    // Loop through selected admission numbers
    selectedAdmissionNumbers.forEach(admissionNumber => {
      const selectedMember = this.allTypesOfmembershipList.find((item: any) => item.value === admissionNumber);
      if (selectedMember) {
        this.selectedList.push({
          name: selectedMember.data.name,
          mobileNumber: selectedMember.data.mobileNumber,
          aadharNumber: selectedMember.data.aadharNumber,
          emailId: selectedMember.data.emailId,
          saoLoanApplicationId:this.savedId,
          status:applicationConstants.ACTIVE,
          admissionNo:selectedMember.data.admissionNumber,
          // Add more fields as needed
        });
        this.updateData();
      }
    });
  }
  onClear(admissionNumber: any) {
    const index = this.allTypesOfmembershipList.indexOf(admissionNumber);
    if (index >= 0) {
      this.allTypesOfmembershipList.splice(index, 1);
      this.selectedList.push(this.responseModel.data);
      const existingIndex = this.selectedList.findIndex(
        promoter => promoter.admissionNumber === admissionNumber);
      this.selectedList[existingIndex] = null;
      this.updateData();
    }
  }
  initializeFormWithadmissionNumber(admissionNumber: any[]) {
    this.selectedMembers =admissionNumber.filter((data: any) => data.status == applicationConstants.ACTIVE).map((collateral: any) => collateral.admissionNo);
  
    this.jointHolderForm.get('admissionNo')?.setValue(this.selectedMembers);
  }
  getAllTypeOfMembershipDetails(pacsId: any, branchId: any) {
    this.membershipBasicDetailsService.getAllTypeOfMemberDetailsListFromMemberModule(this.pacsId, this.branchId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data && this.responseModel.data.length > 0) {
            this.allTypesOfmembershipList = this.responseModel.data.map((relationType: any) => {
              return {
                label: `${relationType.name} - ${relationType.admissionNumber} - ${relationType.memberTypeName}`,
                value: relationType.admissionNumber,
                data: relationType // Optional: Include entire data object for further details
              };
            });
          }
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
  getSaoLoanJointHolderDetailsByApplicationId(loanId: any){
    this.saoLoanJointMemberService.getSaoLoanJointMemsDetailsByLoanApplicationId(loanId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.selectedList = this.responseModel.data;
        this.initializeFormWithadmissionNumber(this.selectedList);
      }
      else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
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
}
