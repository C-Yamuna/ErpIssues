import { Component } from '@angular/core';
import { CommonConfigConstants } from '../../common-config-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Dccb } from '../shared/dccb.model';
import { DccbService } from '../shared/dccb.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-add-dccb',
  templateUrl: './add-dccb.component.html',
  styleUrls: ['./add-dccb.component.css']
})
export class AddDccbComponent {
  dccbform: FormGroup;
  statusList: any[] = [];
  msgs: any[] = [];
  DccbModel: Dccb = new Dccb();
  responseModel!: Responsemodel;
  buttonDisabled: any;

  isEdit: any;
  isTwoTier:  boolean = false;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dccbService: DccbService,
    private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent,
    private encryptService: EncryptDecryptService,) {
    this.dccbform = this.formBuilder.group({
      'name': new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      'isTwoTier': new FormControl('',),
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
        this.dccbService.getDccbById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.DccbModel = this.responseModel.data[0];
          } else {
            this.commonComponent.stopSpinner();
            // this.buttonDisabled = applicationConstants.FALSE;
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        });
      } else {
        this.isEdit = false;
        this.DccbModel.status = this.statusList[0].value;
      }
    })
  }

  addOrUpdate() {
    this.commonComponent.startSpinner();
    if (this.DccbModel.isTwoTier == null && this.DccbModel.isTwoTier == undefined)
      this.DccbModel.isTwoTier = false;
    if (this.isEdit) {
      this.dccbService.updateDccb(this.DccbModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          // this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        // this.buttonDisabled = applicationConstants.FALSE;
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
    } else {
      this.dccbService.addDccb(this.DccbModel).subscribe((response: any) => {
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
          // this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        this.commonComponent.stopSpinner();
        // this.buttonDisabled = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        // this.buttonDisabled = applicationConstants.FALSE;
      });
    }
  }

  navigateToBack() {
    this.router.navigate([CommonConfigConstants.DCCB]);
  }
  
onSelectCheckBox(event: any) {
  this.isTwoTier = event.checked;
  if (this.isTwoTier) {
    this.DccbModel.isTwoTier = true;
  
  
    if (this.isTwoTier) {
      this.DccbModel.isTwoTier = true;
    
      this.dccbform.get('isTwoTier')?.setValidators(null);
      this.dccbform.get('isTwoTier')?.updateValueAndValidity();
    } else {
      this.DccbModel.isTwoTier = false;
    
      this.dccbform.get('isTwoTier')?.setValidators([Validators.required]);
      this.dccbform.get('isTwoTier')?.updateValueAndValidity();
    }
  
  }
}
}