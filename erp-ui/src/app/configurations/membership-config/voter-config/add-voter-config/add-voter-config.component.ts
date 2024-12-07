import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VoterConfig } from '../shared/voter-config.model';
import { VoterConfigService } from '../shared/voter-config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { MembershipConfigConstants } from '../../membership-config-constants';
import { MemberTypeService } from 'src/app/configurations/common-config/member-type/shared/member-type.service';

@Component({
  selector: 'app-add-voter-config',
  templateUrl: './add-voter-config.component.html',
  styleUrls: ['./add-voter-config.component.css']
})
export class AddVoterConfigComponent {
  grouptypesform: FormGroup;
  statusList: any[] = [];
  msgs: any[] = [];
  voterConfigModel: VoterConfig = new VoterConfig();
  responseModel!: Responsemodel;
  buttonDisabled: any;
  isEdit: any;
  memberTypeList: any[] = [];


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private voterConfigService: VoterConfigService,
    private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent,
    private memberTypeService: MemberTypeService,
    private encryptService: EncryptDecryptService,) {
    this.grouptypesform = this.formBuilder.group({
      'memberTypeName': new FormControl('', [Validators.required]),
      'amount': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_DECIMALS),Validators.required]),
      'minPeriodInMonths': new FormControl('',[Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY)]),
      'maxPeriodInMonths': new FormControl('',[Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY)]),
      'remarks': new FormControl(''),
      'statusName': new FormControl('', [Validators.required])
    })
  }
  ngOnInit() {
    this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = Number(this.encryptService.decrypt(params['id']));
        this.isEdit = true;
        this.voterConfigService.getVoterConfigById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.voterConfigModel = this.responseModel.data[0];
          } else {
            this.commonComponent.stopSpinner();
            this.buttonDisabled = applicationConstants.FALSE;
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        });
      } else {
        this.isEdit = false;
        this.voterConfigModel.status = this.statusList[0].value;
      }
    })
    this.getAllMemberType();
  }

  addOrUpdate() {
    this.commonComponent.startSpinner();
    this.memberTypeList.filter((memberType: any) => memberType != null && memberType.value == this.voterConfigModel.memberTypeId).map((member: { label: any; }) => {
      this.voterConfigModel.memberTypeName = member.label;
    });
    if (this.isEdit) {
      this.voterConfigService.updateVoterConfig(this.voterConfigModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        this.buttonDisabled = applicationConstants.FALSE;
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
    } else {
      this.voterConfigService.addVoterConfig(this.voterConfigModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          this.commonComponent.stopSpinner();
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        this.commonComponent.stopSpinner();
        this.buttonDisabled = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        this.buttonDisabled = applicationConstants.FALSE;
      });
    }
  }


  getAllMemberType() {
    // this.commonComponent.startSpinner();
    this.memberTypeService.getAllMemberTypes().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.memberTypeList = this.responseModel.data;
        this.memberTypeList = this.memberTypeList.filter((memberType: any) => memberType != null).map((member: { name: any; id: any; }) => {
          return { label: member.name, value: member.id };
        });
      } else {
        // this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      //this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }


  checkForPeriod(){
    if(null != this.voterConfigModel && undefined!=this.voterConfigModel &&
      null != this.voterConfigModel.minPeriodInMonths && undefined!=this.voterConfigModel.minPeriodInMonths &&
      null != this.voterConfigModel.maxPeriodInMonths && undefined!=this.voterConfigModel.maxPeriodInMonths &&
      this.voterConfigModel.minPeriodInMonths >= this.voterConfigModel.maxPeriodInMonths){
      this.msgs = [];
      this.msgs =[{ severity: 'error', detail: applicationConstants.MIN_PERIOD_IN_MONTHS_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 1000);
    }
  }

  navigateToBack() {
    this.router.navigate([MembershipConfigConstants.VOTER_CONFIG]);
  }
}
