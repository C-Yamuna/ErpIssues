import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PacsDetails } from '../shared/pacs-details.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { PacsDetailsService } from '../shared/pacs-details.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonConfigConstants } from '../../common-config-constants';
import { DatePipe } from '@angular/common';
import { StatesService } from '../../state/shared/states.service';
import { DistrictService } from '../../district/shared/district.service';
import { SubDistrictService } from '../../sub-district/shared/sub-district.service';
import { VillagesService } from '../../villages/shared/villages.service';

@Component({
  selector: 'app-add-pacs-details',
  templateUrl: './add-pacs-details.component.html',
  styleUrls: ['./add-pacs-details.component.css']
})
export class AddPacsDetailsComponent {
  pacsdetailsform: FormGroup;
  statusList: any[] = [];
  pacsdetailsModel: PacsDetails = new PacsDetails();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  stateListData: any[] = [];
  maxDate= new Date();
  minDate= new Date();
  orgnizationSetting: any;
  statelist: any[] = [];
  districtlist: any[] = [];
  subdistrictlist: any[] = [];
  villagelist: any[] = [];
  constructor(private router: Router, private formBuilder: FormBuilder,
    private commonfunctionservice: CommonFunctionsService, private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService, private commonComponent: CommonComponent, private pacsDetailsService: PacsDetailsService,
    private datePipe: DatePipe, private commonFunctionsService: CommonFunctionsService, private stateservice: StatesService,
    private districtservice: DistrictService, private subdistrictservice: SubDistrictService, private villageservice: VillagesService
  ) {
    this.pacsdetailsform = this.formBuilder.group({
      name:  new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      pacsCode: new FormControl('', ),
      regName:  new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      regDate: new FormControl('', [Validators.required]),
      stateName: new FormControl('', [Validators.required]),
      districtName: new FormControl('', [Validators.required]),
      subDistrictName: new FormControl('', [Validators.required]),
      villageName: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),

    })
  }
  ngOnInit(): void {
    this.statusList = this.commonComponent.status();
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.pacsDetailsService.getPacsDetailsById(id).subscribe(res => {
          this.responseModel = res;
          this.pacsdetailsModel = this.responseModel.data[0];
          if (this.pacsdetailsModel.regDate != null && this.pacsdetailsModel.regDate != undefined) {
            this.pacsdetailsModel.regDate = this.datePipe.transform(this.pacsdetailsModel.regDate, this.orgnizationSetting.datePipe);

          }
          if (this.pacsdetailsModel != null && this.pacsdetailsModel != undefined) {
            if (this.pacsdetailsModel.stateId != null && this.pacsdetailsModel.stateId != undefined) {
              this.getAlldistrictsByStateId(this.pacsdetailsModel.stateId);
            }
            if (this.pacsdetailsModel.districtId != null && this.pacsdetailsModel.districtId != undefined) {
              this.getAllSubDistrictsByDistrictId(this.pacsdetailsModel.districtId);
            }
            if (this.pacsdetailsModel.subDistrictId != null && this.pacsdetailsModel.subDistrictId != undefined) {
              this.getAllVillagesBySubDistrictId(this.pacsdetailsModel.subDistrictId);
            }
          }

          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.pacsdetailsModel = this.responseModel.data[0];
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
        this.pacsdetailsModel.status = this.statusList[0].value;
      }
    })
    this.getAllStates();

  }
  navigateToBack() {
    this.router.navigate([CommonConfigConstants.SOCIETY]);
  }
  addOrUpdate() {
    //this.commonComponent.startSpinner();
    if (this.pacsdetailsModel.regDate != undefined && this.pacsdetailsModel.regDate != null)
      this.pacsdetailsModel.regDate = this.commonFunctionsService.getUTCEpoch(new Date(this.pacsdetailsModel.regDate));

    this.statelist.filter((state: any) => state != null && state.value == this.pacsdetailsModel.stateId).map((act: { label: any; }) => {
      this.pacsdetailsModel.stateName = act.label;
    });
    this.districtlist.filter((district: any) => district != null && district.value == this.pacsdetailsModel.districtId).map((act: { label: any; }) => {
      this.pacsdetailsModel.districtName = act.label;
    });
    this.subdistrictlist.filter((subdistrict: any) => subdistrict != null && subdistrict.value == this.pacsdetailsModel.subDistrictId).map((act: { label: any; }) => {
      this.pacsdetailsModel.subDistrictName = act.label;
    });
    this.villagelist.filter((villages: any) => villages != null && villages.value == this.pacsdetailsModel.villageId).map((act: { label: any; }) => {
      this.pacsdetailsModel.villageName = act.label;
    });
    this.statusList.filter((status: any) => status != null && status.value == this.pacsdetailsModel.status).map((act: { label: any; }) => {
      this.pacsdetailsModel.statusName = act.label;
    });
    if (this.isEdit) {
      this.pacsDetailsService.updatePacsDetails(this.pacsdetailsModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (null != this.pacsdetailsModel.regDate)
            this.pacsdetailsModel.regDate = this.datePipe.transform(this.pacsdetailsModel.regDate, this.orgnizationSetting.datePipe);

          //this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 1000);
        } else {
          // this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1000);
        }
      },
        error => {
          //this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1000);
        });
    } else {
      this.pacsDetailsService.addPacsDetails(this.pacsdetailsModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (null != this.pacsdetailsModel.regDate)
            this.pacsdetailsModel.regDate = this.datePipe.transform(this.pacsdetailsModel.regDate, this.orgnizationSetting.datePipe);

          // this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 1000);
        } else {
          //this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1000);
        }
      },
        error => {
          // this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1000);
        });
    }
  }
  getAllStates() {
    // this.commonComponent.startSpinner();
    this.stateservice.getAllStates().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.statelist = this.responseModel.data;
        this.statelist = this.statelist.filter((activity: any) => activity.status == applicationConstants.ACTIVE).map((act: { name: any; id: any; }) => {
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
  getAlldistrictsByStateId(stateId: any) {
    // this.commonComponent.startSpinner();
    this.districtservice.getDistrictByStateId(this.pacsdetailsModel.stateId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.districtlist = this.responseModel.data;
        this.districtlist = this.districtlist.filter((districtData: any) => districtData.status == applicationConstants.ACTIVE).map((district: { name: any; id: any; }) => {
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
  getAllSubDistrictsByDistrictId(districtId: any) {
    // this.commonComponent.startSpinner();
    this.subdistrictservice.getSubDistrictByDistrictId(this.pacsdetailsModel.districtId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.subdistrictlist = this.responseModel.data;
        this.subdistrictlist = this.subdistrictlist.filter((activity: any) => activity.status == applicationConstants.ACTIVE).map((act: { name: any; id: any; }) => {
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

  getAllVillagesBySubDistrictId(subDistrictId: any) {
    // this.commonComponent.startSpinner();
    this.villageservice.getVillagesBySubDistrictId(this.pacsdetailsModel.subDistrictId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.villagelist = this.responseModel.data;
        this.villagelist = this.villagelist.filter((villageData: any) => villageData.status == applicationConstants.ACTIVE).map((village: { name: any; id: any; }) => {
          return { label: village.name, value: village.id };
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
}
