import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonConfigConstants } from '../../common-config-constants';
import { DccbBranch } from '../shared/dccb-branch.model';
import { DccbBranchService } from '../shared/dccb-branch.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { DccbService } from '../../dccb/shared/dccb.service';

@Component({
  selector: 'app-add-dccb-branch',
  templateUrl: './add-dccb-branch.component.html',
  styleUrls: ['./add-dccb-branch.component.css']
})
export class AddDccbBranchComponent {
  dccbBranchform: FormGroup;
  statusList: any[] = [];
  msgs: any[] = [];
  DccbBranchModel: DccbBranch = new DccbBranch();
  responseModel!: Responsemodel;
  buttonDisabled: any;
  dccblist: any[] = [];
  isEdit: any;
 
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dccbBranchService: DccbBranchService,
    private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent,
    private dccbService: DccbService,
    private encryptService: EncryptDecryptService,) {
    this.dccbBranchform = this.formBuilder.group({
      'dccb':new FormControl('',[Validators.required]),
      'dccbname': new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      'description': new FormControl(''), 
      'statusName': new FormControl('',[Validators.required]),
    })
  }
  ngOnInit() {
    this.statusList = this.commonComponent.statusList();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.dccbBranchService.getDccbBranchById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.DccbBranchModel = this.responseModel.data[0];
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
        this.DccbBranchModel.status = this.statusList[0].value;
      }
    })
    this.getAllDccb();
  }

  addOrUpdate() {
    this.commonComponent.startSpinner();
    // this.dccblist.filter((dccb: any) => dccb != null && dccb.value == this.DccbBranchModel.dccbId).map((act: { label: any; }) => {
    //   this.DccbBranchModel.name = act.label;
    // });
    this.statusList.filter((status: any) => status != null && status.value == this.DccbBranchModel.status).map((act: { label: any; }) => {
      this.DccbBranchModel.statusName = act.label;
    });
    if (this.isEdit) {
      this.dccbBranchService.updateDccbBranch(this.DccbBranchModel).subscribe((response: any) => {
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
      this.dccbBranchService.addDccbBranch(this.DccbBranchModel).subscribe((response: any) => {
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

  navigateToBack() {
    this.router.navigate([CommonConfigConstants.DCCB_BRANCH]);
  }
  getAllDccb(){
    this.dccbService.getAllDccb().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.dccblist = this.responseModel.data;
        this.dccblist = this.dccblist.filter((village: any) => village.status == applicationConstants.ACTIVE).map((villages: { name: any; id: any; }) => {
          return { label: villages.name, value: villages.id };
        });
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    });
  }
}
