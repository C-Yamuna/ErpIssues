import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConfigConstants } from '../../common-config-constants';
import { Qualification } from '../shared/qualification.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { QualificationService } from '../shared/qualification.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-add-qualification',
  templateUrl: './add-qualification.component.html',
  styleUrls: ['./add-qualification.component.css']
})
export class AddQualificationComponent implements OnInit{
  qualificationForm: FormGroup;
  statusList: any[] = [];
  isEdit: any;
  responseModel !: Responsemodel;
  qualificationModel: Qualification = new Qualification();
  msgs: any[] = [];
  buttonDisabled: any;
  isParent: boolean = false;
  showHideDropdown: boolean = true;
  qualificationDataList: any[] = [];

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private qualificationService: QualificationService,
    private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent,
    private encryptService: EncryptDecryptService) {

    this.qualificationForm = this.formBuilder.group({
      'name':new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      'description': new FormControl(''),
      'isParent': new FormControl('', ),
      'parentIdName': new FormControl('',[Validators.required]),
      'statusName': new FormControl('', [Validators.required]),
    })
  }
  ngOnInit() {
    this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.qualificationService.getQualificationById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.qualificationModel = this.responseModel.data[0];
            this.qualificationForm.get('isParent')?.disable();
            if(this.qualificationModel.isParent != null && this.qualificationModel.isParent == applicationConstants.TRUE){
              this.isParent = true;
              this.showHideDropdown = false;
              this.qualificationForm.get('parentIdName')?.clearValidators();
            } else {
              this.isParent = false;
              this.showHideDropdown = true;
              this.qualificationForm.get('parentIdName')?.setValidators([Validators.required]); 
            }
            this.qualificationForm.get('parentIdName')?.updateValueAndValidity();
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
        this.qualificationModel.status = this.statusList[0].value;
      }
    })
    this.getAllqualificationTypes();
  }

  addOrUpdate() {
    this.commonComponent.startSpinner();
    if( this.qualificationModel.isParent == null &&  this.qualificationModel.isParent == undefined)
    this.qualificationModel.isParent = false;
  
    if (this.isEdit) {
      this.qualificationService.updateQualification(this.qualificationModel).subscribe((response: any) => {
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
      this.qualificationService.addQualification(this.qualificationModel).subscribe((response: any) => {
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


  onSelectCheckBox(event: any) {
    this.isParent = event.checked;
    if (this.isParent) {
      this.qualificationModel.isParent = true;
      this.showHideDropdown = false;
      this.qualificationForm.get('parentIdName')?.clearValidators();
      this.qualificationForm.get('parentIdName')?.updateValueAndValidity();
      this.qualificationModel.parentId = null; 
    } else {
      this.qualificationModel.isParent = false;
      this.showHideDropdown = true;
      this.qualificationForm.get('parentIdName')?.setValidators([Validators.required]);
      this.qualificationForm.get('parentIdName')?.updateValueAndValidity();
    }
  }
  getAllqualificationTypes() {
    this.commonComponent.startSpinner();
    this.qualificationService.getAllQualification().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.qualificationDataList = this.responseModel.data;
        this.qualificationDataList = this.qualificationDataList.filter((assetData: any) => assetData.isParent).map((qualification: { name: any; id: any; }) => {
          return { label: qualification.name, value: qualification.id };
        });
        this.commonComponent.stopSpinner();
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }
  navigateToBack() {
    this.router.navigate([CommonConfigConstants.QUALIFICATION]);
  }
}
