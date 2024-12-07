import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentDetailsTransactionService } from '../../shared/agent-details-transaction.service';
import { Kyc } from './shared/kyc.model';
import { KycService } from './shared/kyc.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { AgentDetails } from '../basic-details/shared/basic-details.model';
import { MembershipBasicDetailsService } from '../membership-basic-details/shared/membership-basic-details.service';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit{
  kycForm:FormGroup;
  kycModel : Kyc = new Kyc();
  kyc:any;
  checked:any;
  responseModel!: Responsemodel;
  agentDetailsModel:AgentDetails = new AgentDetails();
  agentId:any;
  msgs: any[] = [];
  buttonDisabled: boolean = false;
  isEdit:  boolean = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent,
    private membershipBasicDetailsService:MembershipBasicDetailsService,
    private kycService:KycService,
    private activateRoute:ActivatedRoute,){
    this.kycForm = this.formBuilder.group({

     });
  }
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        this.agentId= Number(this.encryptDecryptService.decrypt(params['id']));
        this.isEdit = true;
        // this.kycService.getKycDetailsByAgentId(this.agentId).subscribe(res => {
        //   this.responseModel = res;
        //   this.commonComponent.stopSpinner();
        //   if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        //     if( this.responseModel.data[0] != null &&  this.responseModel.data[0]!=undefined){
        //     this.kycModel = this.responseModel.data[0];
        //     }
        //     this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        //     setTimeout(() => {
        //       this.msgs = []; 
        //     }, 2000);
        //   } else {
        //     this.commonComponent.stopSpinner();
        //     this.buttonDisabled = applicationConstants.FALSE;
        //     this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        //     setTimeout(() => {
        //       this.msgs = [];
        //     }, 2000);
        //   }
        // });
      } else {
        this.isEdit = false;
      }
    }) 
    this.kycForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.kycForm.valid) {
        this.save();
      }
    });
    // this.getAgentDetailsById();
  }

  updateData() {
    this.membershipBasicDetailsService.changeData({
      formValid: this.kycForm.valid,
      data: this.kycModel,
      stepperIndex: 1,
    });
  }

  save() {
    this.updateData();
  }

}
