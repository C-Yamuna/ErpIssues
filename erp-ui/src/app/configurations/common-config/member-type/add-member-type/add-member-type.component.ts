import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonConfigConstants } from '../../common-config-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { MemberType } from '../shared/member-type.model';
import { MemberTypeService } from '../shared/member-type.service';

@Component({
  selector: 'app-add-member-type',
  templateUrl: './add-member-type.component.html',
  styleUrls: ['./add-member-type.component.css']
})
export class AddMemberTypeComponent {
  membertypeform: FormGroup;
  statusList: any[] = [];
  msgs: any[] = [];
  memberTypesModel: MemberType = new MemberType();
  responseModel!: Responsemodel;
  buttonDisabled: any;
  isEdit: any;

  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private memberTypesService:MemberTypeService,
    private activateRoute: ActivatedRoute,
    private commonComponent:CommonComponent,
    private encryptService: EncryptDecryptService,){ 
    this.membertypeform = this.formBuilder.group({
      'name': new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
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
        this.memberTypesService.getMemberTypesById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.memberTypesModel = this.responseModel.data[0];
          } else {
            this.commonComponent.stopSpinner();
            this.buttonDisabled = applicationConstants.FALSE;
            this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        });
      } else {
        this.isEdit = false;
        this.memberTypesModel.status = this.statusList[0].value;
      }
    })
  }

  addOrUpdate() {
    this.commonComponent.startSpinner();
    if (this.isEdit) {
      this.memberTypesService.updateMemberTypes(this.memberTypesModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      },error => {
          this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        });
    } else {
      this.memberTypesService.addMemberTypes(this.memberTypesModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          this.commonComponent.stopSpinner();
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      },error => {
          this.commonComponent.stopSpinner();
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
          this.buttonDisabled = applicationConstants.FALSE;
        });
    }
  }

  navigateToBack(){
    this.router.navigate([CommonConfigConstants.MEMBER_TYPES]);
  }
}
