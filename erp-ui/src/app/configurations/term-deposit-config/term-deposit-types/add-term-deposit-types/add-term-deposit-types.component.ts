import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TermDepositTypes } from '../shared/term-deposit-types.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { TermDepositTypesService } from '../shared/term-deposit-types.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { TERMDEPOSITCONFIGCONSTANTS } from '../../term-deposit-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-add-term-deposit-types',
  templateUrl: './add-term-deposit-types.component.html',
  styleUrls: ['./add-term-deposit-types.component.css']
})
export class AddTermDepositTypesComponent {
  termdeposittypeform: FormGroup;
  statusList: any[] = [];
  msgs: any[] = [];
  termDepositTypesModel: TermDepositTypes  = new TermDepositTypes ();
  responseModel!: Responsemodel;
  buttonDisabled: any;
  isEdit: any;
  orgnizationSetting:any;
pacsId:any;
  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private termDepositTypesService: TermDepositTypesService,
    private activateRoute: ActivatedRoute,
    private commonComponent:CommonComponent,
    private encryptService: EncryptDecryptService,){ 
    this.termdeposittypeform = this.formBuilder.group({
      'name': new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      'description': new FormControl(''), 
      'statusName': new FormControl('',[Validators.required]),
    })
  }

  
ngOnInit(): void {
  this.pacsId= 1;
  this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.termDepositTypesService.getTermDepositTypes(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.termDepositTypesModel = this.responseModel.data[0];
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
        this.termDepositTypesModel.status = this.statusList[0].value;
      }
    })
  }
navigateToBack(){
  this.router.navigate([TERMDEPOSITCONFIGCONSTANTS.FORM_TYPES]); 
}
addOrUpdate() {
  this.termDepositTypesModel.pacsId = this.pacsId;
  this.commonComponent.startSpinner();
  if (this.isEdit) {
    this.termDepositTypesService.updateTermDepositTypes(this.termDepositTypesModel).subscribe((response: any) => {
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
    this.termDepositTypesService.addTermDepositTypes(this.termDepositTypesModel).subscribe((response: any) => {
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
}
