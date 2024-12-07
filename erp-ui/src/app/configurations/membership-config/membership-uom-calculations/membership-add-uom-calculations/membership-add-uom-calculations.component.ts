import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembershipConfigConstants } from '../../membership-config-constants';
import { UomCalculationsService } from '../shared/uom-calculations.service';
import { LandUomCalculations } from '../shared/land-uom-calculations.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { UomService } from '../../membership-uom/shared/uom.service';

@Component({
  selector: 'app-membership-add-uom-calculations',
  templateUrl: './membership-add-uom-calculations.component.html',
  styleUrls: ['./membership-add-uom-calculations.component.css']
})
export class MembershipAddUomCalculationsComponent {
  cities: any[] | undefined;
  uomCalculationsform: FormGroup;
  statusList: any[] = [];
  msgs: any[] = [];
  uomCalculationsModel: LandUomCalculations = new LandUomCalculations();
  responseModel!: Responsemodel;
  buttonDisabled: any;
  isEdit: any;
  uomList: any [] = [];

  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private uomService: UomService,
    private uomCalculationsService: UomCalculationsService,
    private activateRoute: ActivatedRoute,
    private commonComponent:CommonComponent,
    private encryptService: EncryptDecryptService,){ 
    this.uomCalculationsform = this.formBuilder.group({
      'sourceUomName': new FormControl('',[Validators.required]),
      'sourceNumberOfUnits': new FormControl('',[Validators.required]), 
      'destinationUomName': new FormControl('',[Validators.required]),
      'destinationNumberOfUnits': new FormControl('',[Validators.required]),
      'equation': new FormControl('',),
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
        this.uomCalculationsService.getUomCalculationsById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.uomCalculationsModel = this.responseModel.data[0];
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
        this.uomCalculationsModel.status = this.statusList[0].value;
      }
    })
    this.getAllUom();
  }

  addOrUpdate() {
    this.commonComponent.startSpinner();
    if (this.isEdit) {
      this.uomCalculationsService.updateUomCalculations(this.uomCalculationsModel).subscribe((response: any) => {
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
      this.uomCalculationsService.addUomCalculations(this.uomCalculationsModel).subscribe((response: any) => {
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

  getAllUom() {
    this.uomService.getAllUom().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        let uomListData = this.responseModel.data;
        this.uomList = uomListData.filter((obj: { status: any; }) => obj.status == applicationConstants.ACTIVE).map((list: { name: any; id: any; }) => {
          return { label: list.name, value: list.id }
        });
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.buttonDisabled = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    },error => {
        this.msgs = [];
        this.buttonDisabled = applicationConstants.FALSE;
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  }

  sourceAndDestinationCalculation(uomCalculationsModel:any) {
    let sourcename = null;
    let destinationName = null;
    if (uomCalculationsModel.sourceNumberOfUnits != "" && uomCalculationsModel.destinationNumberOfUnits != "" && null != uomCalculationsModel.sourceNumberOfUnits && null != uomCalculationsModel.destinationNumberOfUnits) {
      this.uomList.filter(uom => uom.value == uomCalculationsModel.sourceUomId).map(count => {
        sourcename = count.label;
      });
      this.uomList.filter(uom => uom.value == uomCalculationsModel.destinationUomId).map(count => {
        destinationName = count.label;
      });
      if(destinationName != null && destinationName != undefined){
        let equation = uomCalculationsModel.sourceNumberOfUnits + " " + sourcename + " = " + uomCalculationsModel.destinationNumberOfUnits + " " + destinationName;
      this.uomCalculationsModel.equation = equation
      }
      
    } else {
      this.uomCalculationsModel.equation = null
    }

  }
  navigateToBack(){
    this.router.navigate([MembershipConfigConstants.UOM_CALCULATIONS]);
  }
}
