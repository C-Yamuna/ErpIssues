import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConfigConstants } from '../../common-config-constants';
import { Subdistrict } from '../shared/subdistrict.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SubDistrictService } from '../shared/sub-district.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { StatesService } from '../../state/shared/states.service';
import { DistrictService } from '../../district/shared/district.service';

@Component({
  selector: 'app-add-sub-district',
  templateUrl: './add-sub-district.component.html',
  styleUrls: ['./add-sub-district.component.css']
})
export class AddSubDistrictComponent implements OnInit {
  subDistrict: any[] = [];
  subDistrictForm: FormGroup;
  statusList: any[] = [];
  stateListData: any[] = [];
  districtListData: any[] = [];
  countrylist: any[] = [];
  subdistrictModel: Subdistrict = new Subdistrict();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private subdistrictService: SubDistrictService,
    private commonfunctionservice: CommonFunctionsService, private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService, private commonComponent: CommonComponent,
    private stateService: StatesService, private districtService: DistrictService,
  ) {
    this.subDistrictForm = this.formBuilder.group({
      countryCode: new FormControl('', [Validators.required]),
      stateName: new FormControl('', [Validators.required]),
      districtName: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS), Validators.required]),
      code:new FormControl('', ),
      shortCode:new FormControl('', ),
      govtCode:new FormControl('', ),
      statusName: ['', Validators.required]

    })
  }
  ngOnInit(): void {
    this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.subdistrictService.getSubDistrictById(id).subscribe(res => {
          this.responseModel = res;
          this.subdistrictModel = this.responseModel.data[0];
        
          if (this.subdistrictModel != null && this.subdistrictModel != undefined) {
            if (this.subdistrictModel.countryId != null && this.subdistrictModel.countryId != undefined) {
              this.getAllstatesByCountryId(this.subdistrictModel.countryId);
            }

            if (this.subdistrictModel.stateId != null && this.subdistrictModel.stateId != undefined) {
              this.getAllDistrictsByStateId(this.subdistrictModel.stateId);
            }
           
          }
  
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.subdistrictModel = this.responseModel.data[0];
          } else {
            this.commonComponent.stopSpinner();
  
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        });
      } else {
        this.isEdit = false;
        this.subdistrictModel.status = this.statusList[0].value;
      }
    })
    this.getAllCountry();
  }
  getAllCountry() {
    // this.commonComponent.startSpinner();
    this.stateService.getAllcountry().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.countrylist = this.responseModel.data;
        this.countrylist = this.countrylist.filter((activity: any) => activity != null).map((act: { name: any; id: any; }) => {
          return { label: act.name, value: act.id };
        });
        //this.commonComponent.stopSpinner();
       
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
  getAllstatesByCountryId(countryId: any) {
    // this.commonComponent.startSpinner();
    this.stateService.getStateByCountryId(this.subdistrictModel.countryId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.stateListData = this.responseModel.data;
        this.stateListData = this.stateListData.filter((activity: any) => activity.status == applicationConstants.ACTIVE).map((district: { name: any; id: any; }) => {
          return { label: district.name, value: district.id };
        });
        //this.commonComponent.stopSpinner();
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
  getAllDistrictsByStateId(stateId: any) {
    // this.commonComponent.startSpinner();
    this.districtService.getDistrictByStateId(this.subdistrictModel.stateId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.districtListData = this.responseModel.data;
        this.districtListData = this.districtListData.filter((activity: any) => activity.status == applicationConstants.ACTIVE).map((district: { name: any; id: any; }) => {
          return { label: district.name, value: district.id };
        });
        //this.commonComponent.stopSpinner();
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

  navigateToBack() {
    this.router.navigate([CommonConfigConstants.SUB_DISTRICT]);
  }
  addOrUpdate() {
    //this.commonComponent.startSpinner();
    if (this.isEdit) {
      this.subdistrictService.updateSubDistrict(this.subdistrictModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          //this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          // this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      },
        error => {
          //this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        });
    } else {
      this.subdistrictService.addSubDistrict(this.subdistrictModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          // this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          //this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      },
        error => {
          // this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        });
    }
  }

}
