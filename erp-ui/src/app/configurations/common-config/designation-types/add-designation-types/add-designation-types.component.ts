import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConfigConstants } from '../../common-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { DesignationTypes } from '../shared/designation-types.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DesignationTypesService } from '../shared/designation-types.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';

@Component({
  selector: 'app-add-designation-types',
  templateUrl: './add-designation-types.component.html',
  styleUrls: ['./add-designation-types.component.css']
})
export class AddDesignationTypesComponent {
  designationForm: FormGroup;
  statusList: any[] = [];
  msgs: any[] = [];
  designationTypesModel: DesignationTypes = new DesignationTypes();
  responseModel!: Responsemodel;
  buttonDisabled: any;
  isCeo: boolean = false;
  isEdit: any;
  isTwoTier:  boolean = false;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private designationTypesService: DesignationTypesService,
    private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent,
    private encryptService: EncryptDecryptService,) {
    this.designationForm = this.formBuilder.group({
      'name':  new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      'isCeo': new FormControl('',),
      'order': new FormControl(''), 
      'statusName': new FormControl('',[Validators.required]),
    })
  }
  ngOnInit() {
    this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.designationTypesService.getDesignationTypesById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.designationTypesModel = this.responseModel.data[0];
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
        this.designationTypesModel.status = this.statusList[0].value;
      }
    })
  }

  addOrUpdate() {
    this.commonComponent.startSpinner();
    if (this.designationTypesModel.isCeo == null && this.designationTypesModel.isCeo == undefined)
      this.designationTypesModel.isCeo = false;
    if (this.isEdit) {
      this.designationTypesService.updateDesignationTypes(this.designationTypesModel).subscribe((response: any) => {
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
      this.designationTypesService.addDesignationTypes(this.designationTypesModel).subscribe((response: any) => {
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
    this.router.navigate([CommonConfigConstants.DESIGNATION_TYPES]);
  }
 
onSelectCheckBox(event: any) {
  this.isCeo = event.checked;
  if (this.isCeo) {
    this.designationTypesModel.isCeo = true;
  
  
    if (this.isCeo) {
      this.designationTypesModel.isCeo = true;
    
      this.designationForm.get('isCeo')?.setValidators(null);
      this.designationForm.get('isCeo')?.updateValueAndValidity();
    } else {
      this.designationTypesModel.isCeo = false;
    
      this.designationForm.get('isCeo')?.setValidators([Validators.required]);
      this.designationForm.get('isCeo')?.updateValueAndValidity();
    }
  
  }
}
}
