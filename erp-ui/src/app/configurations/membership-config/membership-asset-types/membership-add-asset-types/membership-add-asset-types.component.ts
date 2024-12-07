import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { AssetTypes } from '../shared/asset-types.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetTypesService } from '../shared/asset-types.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { MembershipConfigConstants } from '../../membership-config-constants';

@Component({
  selector: 'app-membership-add-asset-types',
  templateUrl: './membership-add-asset-types.component.html',
  styleUrls: ['./membership-add-asset-types.component.css']
})
export class MembershipAddAssetTypesComponent implements OnInit{
  assetTypesForm: FormGroup;
  statusList: any[] = [];
  isEdit: any;
  responseModel !: Responsemodel;
  assetTypesModel: AssetTypes = new AssetTypes();
  msgs: any[] = [];
  buttonDisabled: any;
  isParent: boolean = false;
  showHideDropdown: boolean = true;
  assetDataList: any[] = [];

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private assetTypesService: AssetTypesService,
    private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent,
    private encryptService: EncryptDecryptService) {

    this.assetTypesForm = this.formBuilder.group({
      'name':  new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      'description': new FormControl(''),
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
        this.assetTypesService.getAssetTypesById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.assetTypesModel = this.responseModel.data[0];
            this.assetTypesForm.get('isParent')?.disable();
            if(this.assetTypesModel.isParent != null && this.assetTypesModel.isParent == applicationConstants.TRUE){
              this.isParent = true;
              this.showHideDropdown = false;
              this.assetTypesForm.get('parentIdName')?.clearValidators();
            } else {
              this.isParent = false;
              this.showHideDropdown = true;
              this.assetTypesForm.get('parentIdName')?.setValidators([Validators.required]); 
            }
            this.assetTypesForm.get('parentIdName')?.updateValueAndValidity();
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
        this.assetTypesModel.status = this.statusList[0].value;
      }
    })
    this.getAllAssetTypes();
  }

  addOrUpdate() {
    this.commonComponent.startSpinner();
    this.assetTypesModel.name =  this.assetTypesModel.name.trim();
    if (this.assetTypesModel.isParent == null && this.assetTypesModel.isParent == undefined)
      this.assetTypesModel.isParent = false;
    if (this.isEdit) {
      this.assetTypesService.updateAssetTypes(this.assetTypesModel).subscribe((response: any) => {
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
      this.assetTypesService.addAssetTypes(this.assetTypesModel).subscribe((response: any) => {
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
      this.assetTypesModel.isParent = true;
      this.showHideDropdown = false;
      this.assetTypesForm.get('parentIdName')?.clearValidators();
      this.assetTypesForm.get('parentIdName')?.updateValueAndValidity();
      this.assetTypesModel.parentId = null; 
    } else {
      this.assetTypesModel.isParent = false;
      this.showHideDropdown = true;
      this.assetTypesForm.get('parentIdName')?.setValidators([Validators.required]);
      this.assetTypesForm.get('parentIdName')?.updateValueAndValidity();
    }
  }

  getAllAssetTypes() {
    this.commonComponent.startSpinner();
    this.assetTypesService.getAllAssetTypes().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.assetDataList = this.responseModel.data;
        this.assetDataList = this.assetDataList.filter((assetData: any) => assetData.isParent && assetData.status == applicationConstants.ACTIVE).map((asset: { name: any; id: any; }) => {
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
    this.router.navigate([MembershipConfigConstants.ASSET_TYPES]);
  }

}
