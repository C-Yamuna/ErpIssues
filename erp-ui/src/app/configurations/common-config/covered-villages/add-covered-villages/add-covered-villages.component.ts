import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CoveredVillages } from '../shared/covered-villages.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CoveredVillagesService } from '../shared/covered-villages.service';
import { VillagesService } from '../../villages/shared/villages.service';
import { CommonConfigConstants } from '../../common-config-constants';
import { PacsDetailsService } from '../../pacs-details/shared/pacs-details.service';
import { StatesService } from '../../state/shared/states.service';
import { DistrictService } from '../../district/shared/district.service';
import { SubDistrictService } from '../../sub-district/shared/sub-district.service';
import { Village } from '../../villages/shared/village.model';

@Component({
  selector: 'app-add-covered-villages',
  templateUrl: './add-covered-villages.component.html',
  styleUrls: ['./add-covered-villages.component.css']
})
export class AddCoveredVillagesComponent {
  columns: any[] =[];
  coveredvillagesform: FormGroup;
  statusList: any[] = [];
  msgs: any[] = [];
  coverVillagesModel:CoveredVillages= new CoveredVillages();

 
  responseModel!: Responsemodel;
  buttonDisabled: any;
  isEdit: any;
  villagesListData: any[]=[];
  pacslistdata: any[]=[];
  statelist: any[]=[];
  districtlist:any[]=[];
  subdistrictlist:any[]=[];
  coveredvillages:any;
  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private commonComponent:CommonComponent,
    private encryptService: EncryptDecryptService,
    private coveredVillagesService:CoveredVillagesService,
    private pacsDetailsService: PacsDetailsService,
    private stateservice: StatesService,
    private districtservice: DistrictService, private subdistrictservice: SubDistrictService, 
    private villageService:VillagesService){ 
    this.coveredvillagesform = this.formBuilder.group({
      'villageName': new FormControl('',[Validators.required]),
      'pacsId': new FormControl('',[Validators.required]),
      'pinCode': new FormControl('', [Validators.pattern(applicationConstants.PINCODE_PATTERN),Validators.required]),
      'statusName': new FormControl('',[Validators.required]),
      'stateName': new FormControl('', [Validators.required]),
      'districtName': new FormControl('', [Validators.required]),
      'subDistrictName': new FormControl('', [Validators.required]),
     
    })
  }


  ngOnInit(): void {
    this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.coveredVillagesService.getCoveredVillagesById(id).subscribe(res => {
          this.responseModel = res;
          this.coverVillagesModel = this.responseModel.data[0];
        
          if (this.coverVillagesModel != null && this.coverVillagesModel != undefined) {
            if (this.coverVillagesModel.stateId != null && this.coverVillagesModel.stateId != undefined) {
              this.getAlldistrictsByStateId(this.coverVillagesModel.stateId);
            }
            if (this.coverVillagesModel.districtId != null && this.coverVillagesModel.districtId != undefined) {
              this.getAllSubDistrictsByDistrictId(this.coverVillagesModel.districtId);
            }
            if (this.coverVillagesModel.subDistrictId != null && this.coverVillagesModel.subDistrictId != undefined) {
              this.getAllVillagesBySubDistrictId(this.coverVillagesModel.subDistrictId);
            }
          }

          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.coverVillagesModel = this.responseModel.data[0];
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
        this.coverVillagesModel.status = this.statusList[0].value;
      }
    })
    this.getAllpacs();
    this.getAllStates();

  }
  villageList(event: any){
    // this.coveredvillages = 0;
    // this.villagesListData = [];
    // if(null!=event.value && undefined!=event.value && event.value!=""){
    //   for(let Villages of event.value){
    //   let check = this.villagesListData.push(Villages);
    //   this.coveredvillages = this.villagesListData.length ;
    //   }
    // }
  }
 
 
  addOrUpdate() {
    //this.commonComponent.startSpinner();
    // this.coverVillagesModel.villagesIdList = this.coverVillagesModel.villagesIdList.join(',');
    this.statelist.filter((state: any) => state != null && state.value == this.coverVillagesModel.stateId).map((act: { label: any; }) => {
      this.coverVillagesModel.stateName = act.label;
    });
    this.districtlist.filter((district: any) => district != null && district.value == this.coverVillagesModel.districtId).map((act: { label: any; }) => {
      this.coverVillagesModel.districtName = act.label;
    });
    this.subdistrictlist.filter((subdistrict: any) => subdistrict != null && subdistrict.value == this.coverVillagesModel.subDistrictId).map((act: { label: any; }) => {
      this.coverVillagesModel.subDistrictName = act.label;
    });
      this.villagesListData.filter((village: any) => village != null && village.value == this.coverVillagesModel.villageId).map((act: { label: any; }) => {
        this.coverVillagesModel.villageName = act.label;
    });
    this.statusList.filter((status: any) => status != null && status.value == this.coverVillagesModel.status).map((act: { label: any; }) => {
      this.coverVillagesModel.statusName = act.label;
    });
    if (this.isEdit) {
      this.coveredVillagesService.updateCoveredVillages(this.coverVillagesModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        

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
      this.coveredVillagesService.addCoveredVillages(this.coverVillagesModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        

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
  getAlldistrictsByStateId(stateId: any) {
    // this.commonComponent.startSpinner();
    this.districtservice.getDistrictByStateId(this.coverVillagesModel.stateId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.districtlist = this.responseModel.data;
        this.districtlist = this.districtlist.filter((activity: any) => activity.status == applicationConstants.ACTIVE).map((district: { name: any; id: any; }) => {
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
    this.subdistrictservice.getSubDistrictByDistrictId(this.coverVillagesModel.districtId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.subdistrictlist = this.responseModel.data;
        this.subdistrictlist = this.subdistrictlist.filter((activity: any) => activity.status == applicationConstants.ACTIVE).map((subdistric: { name: any; id: any; }) => {
          return { label: subdistric.name, value: subdistric.id };
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
    this.villageService.getVillagesBySubDistrictId(this.coverVillagesModel.subDistrictId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.villagesListData = this.responseModel.data;
        this.villagesListData = this.villagesListData.filter((activity: any) => activity.status == applicationConstants.ACTIVE).map((villages: { name: any; id: any; }) => {
          return { label: villages.name, value: villages.id };
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
  getAllStates(){
    this.stateservice.getAllStates().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.statelist = this.responseModel.data;
        this.statelist = this.statelist.filter((state: any) => state.status == applicationConstants.ACTIVE).map((villages: { name: any; id: any; }) => {
          return { label: villages.name, value: villages.id };
        });
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    });
  }
  getAllpacs(){
    this.pacsDetailsService.getAllPacsDetails().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.pacslistdata = this.responseModel.data;
        this.pacslistdata = this.pacslistdata.filter((village: any) => village.status == applicationConstants.ACTIVE).map((villages: { name: any; id: any; }) => {
          return { label: villages.name, value: villages.id };
        });
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    });
  }
 
  navigateToBack(){
    this.router.navigate([CommonConfigConstants.COVERED_VILLAGES]);
  }
}
