import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Caste } from '../shared/caste.model';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonConfigConstants } from '../../common-config-constants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CasteService } from '../shared/caste.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';

@Component({
  selector: 'app-add-caste',
  templateUrl: './add-caste.component.html',
  styleUrls: ['./add-caste.component.css']
})
export class AddCasteComponent implements OnInit {
  casteForm: FormGroup;
  statusList: any[] = [];
  isEdit: any;
  responseModel !: Responsemodel;
  casteModel: Caste = new Caste();
  msgs: any[] = [];
  buttonDisabled: any;
  isParent: boolean = false;
  showHideDropdown: boolean = true;
  casteDataList: any[] = [];

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private casteService:CasteService,
    private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent,
    private encryptService: EncryptDecryptService) {

    this.casteForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      'discription': new FormControl(''),
      'isParent': new FormControl(''),
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
        this.casteService.getCasteById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.casteModel = this.responseModel.data[0];
            this.casteForm.get('isParent')?.disable();
            if(this.casteModel.isParent != null && this.casteModel.isParent == applicationConstants.TRUE){
              this.isParent = true;
              this.showHideDropdown = false;
              this.casteForm.get('parentIdName')?.clearValidators();
            } else {
              this.isParent = false;
              this.showHideDropdown = true;
              this.casteForm.get('parentIdName')?.setValidators([Validators.required]); 
            }
            this.casteForm.get('parentIdName')?.updateValueAndValidity();
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
        this.casteModel.status = this.statusList[0].value;
      }
    })
    this.getAllCaste();
  }

  addOrUpdate() {
    this.commonComponent.startSpinner();
    this.casteModel.name =  this.casteModel.name.trim();
    if (this.casteModel.isParent == null && this.casteModel.isParent == undefined)
      this.casteModel.isParent = false;
    if (this.isEdit) {
      this.casteService.Updatecaste(this.casteModel).subscribe((response: any) => {
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
      this.casteService.addCaste(this.casteModel).subscribe((response: any) => {
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
      this.casteModel.isParent = true;
      this.showHideDropdown = false;
      this.casteForm.get('parentIdName')?.clearValidators();
      this.casteForm.get('parentIdName')?.updateValueAndValidity();
      this.casteModel.parentId = null; 
    } else {
      this.casteModel.isParent = false;
      this.showHideDropdown = true;
      this.casteForm.get('parentIdName')?.setValidators([Validators.required]);
      this.casteForm.get('parentIdName')?.updateValueAndValidity();
    }
  }
  getAllCaste() {
    this.commonComponent.startSpinner();
    this.casteService.getAllCaste().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.casteDataList = this.responseModel.data;
        this.casteDataList = this.casteDataList.filter((assetData: any) => assetData.isParent).map((asset: { name: any; id: any; }) => {
          return { label: asset.name, value: asset.id };
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
    this.router.navigate([CommonConfigConstants.CASTE]);
  }


}
