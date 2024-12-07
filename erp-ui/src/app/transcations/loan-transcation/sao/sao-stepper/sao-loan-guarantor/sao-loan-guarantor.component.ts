import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SaoLoanApplication } from '../../shared/sao-loan-application.model';
import { SaoLoanApplicationService } from '../../../shared/sao-loans/sao-loan-application.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SaoLoanGuarantor } from './shared/sao-loan-guarantor.model';
import { MembershipBasicDetailsService } from '../membership-basic-details/shared/membership-basic-details.service';
import { DatePipe } from '@angular/common';
import { IndividualMemberDetailsModel, MemInstitutionModel, MemberShipGroupDetailsModel } from '../membership-basic-details/shared/membership-basic-details.model';
import { SaoLoanGuarantorDetailsService } from './shared/sao-loan-guarantor-details.service';

@Component({
  selector: 'app-sao-loan-guarantor',
  templateUrl: './sao-loan-guarantor.component.html',
  styleUrls: ['./sao-loan-guarantor.component.css']
})
export class SaoLoanGuarantorComponent {
  guarantorform: FormGroup;
  gender: any[] | undefined;
  msgs: any[] = [];
  selectedList: any[]=[];
  selectedMembers: any[] = [];
  allTypesOfmembershipList: any;
  responseModel!: Responsemodel;
  admissionNumber:any;
  loanId: any;
  pacsId: any;
  branchId: any;
  isEdit:boolean = false;
  individualFlag: boolean = true;
  groupFlag: boolean = false;
  institutionFlag: boolean = false;
  orgnizationSetting: any;
  saoLoanApplicatonModel: SaoLoanApplication = new SaoLoanApplication();
  saoLoanGuarantorModel : SaoLoanGuarantor = new SaoLoanGuarantor();
  individualMemberDetailsModel: IndividualMemberDetailsModel = new IndividualMemberDetailsModel();
  memberShipGroupDetailsModel: MemberShipGroupDetailsModel = new MemberShipGroupDetailsModel();
  memInstitutionModel: MemInstitutionModel = new MemInstitutionModel();
  constructor(private router: Router, private formBuilder: FormBuilder,private saoLoanApplicationService : SaoLoanApplicationService,private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent ,private encryptDecryptService: EncryptDecryptService,private membershipBasicDetailsService: MembershipBasicDetailsService,private datePipe: DatePipe,
    private saoLoanGuarantorDetailsService : SaoLoanGuarantorDetailsService
  )
  { 
    this.guarantorform = this.formBuilder.group({
      admissionNo: [''],

    })
  }
  ngOnInit() {
   
    this.pacsId = 1;
    this.branchId = 1;
    this.getAllTypeOfMembershipDetails(this.pacsId, this.branchId);
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined ||  params['admissionNumber'] != undefined) {
        if (params['admissionNumber'] != undefined) {
          this.admissionNumber = this.encryptDecryptService.decrypt(params['admissionNumber']);
        }
        this.commonComponent.startSpinner();
       // if(params['id'] != undefined && params['id'] != null){
        this.loanId = Number(this.encryptDecryptService.decrypt(params['id']));
        this.isEdit = true;
        this.getSaoLoanGuarantorDetailsByApplicationId(this.loanId);
       // }
      } else {
        this.isEdit = false;
      }
    }) 
    this.updateData();
    this.guarantorform.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.guarantorform.valid) {
        this.save();
      }
    });
    this.getSaoLoanApplicationDetailsById(this.loanId);
    
  }
  updateData() {
    this.saoLoanGuarantorModel.saoLoanApplicationId = this.loanId;
    this.saoLoanGuarantorModel.admissionNo = this.admissionNumber;
    this.saoLoanGuarantorModel.gurantorList = this.selectedList;
    if(this.saoLoanGuarantorModel.gurantorList != null && this.saoLoanGuarantorModel.gurantorList.length > 0)
      this.saoLoanGuarantorModel.gurantorList.applicationId = this.loanId
    this.saoLoanApplicationService.changeData({
      formValid: !this.guarantorform.valid ? true : false,
      data: this.saoLoanGuarantorModel,
      isDisable: (!this.guarantorform.valid),
      // isDisable:false,
      stepperIndex: 6,
    });
  }
  save() {
    this.updateData();
  }
  
   // Method triggered on multiSelect change
   OnChangeAdmissionNumber(selectedAdmissionNumbers: any[]) {
    // Clear existing selected details
    this.selectedList = [];
    const newlySelectedIds = selectedAdmissionNumbers;
    this.selectedMembers = newlySelectedIds;
    this.guarantorform.get('admissionNo')?.setValue(this.selectedMembers);
    // Loop through selected admission numbers
    selectedAdmissionNumbers.forEach(admissionNumber => {
      const selectedMember = this.allTypesOfmembershipList.find((item: any) => item.value === admissionNumber);
      if (selectedMember) {
        this.selectedList.push({
          name: selectedMember.data.name,
          mobileNumber: selectedMember.data.mobileNumber,
          aadharNumber: selectedMember.data.aadharNumber,
          email: selectedMember.data.emailId,
          saoLoanApplicationId:this.loanId,
          status:applicationConstants.ACTIVE,
          admissionNo:selectedMember.data.admissionNumber,
          // Add more fields as needed
        });
        this.updateData();
      }
     // console.log('Selected members:', selectedMember);
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
  
    this.guarantorform.get('admissionNo')?.setValue(this.selectedMembers);
  }
  //@akhila
  // get all members from membership module data 
  
  getAllTypeOfMembershipDetails (pacsId: any, branchId: any) {
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

  getSaoLoanGuarantorDetailsByApplicationId(loanId: any){
    this.saoLoanGuarantorDetailsService.getSaoLoanGuarantorDetailsList(loanId).subscribe((response: any) => {
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
