import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConfigConstants } from '../../common-config-constants';
import { District } from '../shared/district.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DistrictService } from '../shared/district.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { StatesService } from '../../state/shared/states.service';


@Component({
  selector: 'app-add-district',
  templateUrl: './add-district.component.html',
  styleUrls: ['./add-district.component.css']
})
export class AddDistrictComponent implements OnInit{
  addDistricForm:FormGroup;
  statusList: any[] = [];
  districtModel: District = new District();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  stateListData: any[] = [];
  countrylist: any[]=[];
  // selectedCity: City | undefined;

  constructor(private router:Router, private formBuilder:FormBuilder,
  private districtService: DistrictService, 
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private stateservice:StatesService
  ){
    this.addDistricForm = this.formBuilder.group({
      countryCode: new FormControl('',[Validators.required]),
      stateCode: new FormControl('',[Validators.required]),
      name: new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      code:new FormControl('',),
      shortCode: new FormControl('',),
      govtCode: new FormControl('',),
      status: new FormControl('',[Validators.required]),

})
}
ngOnInit(): void {
  this.statusList = this.commonComponent.status();
  this.activateRoute.queryParams.subscribe(params => {
    if (params['id'] != undefined) {
      this.commonComponent.startSpinner();
      let id = this.encryptService.decrypt(params['id']);
      this.isEdit = true;
      this.districtService.getDistrictById(id).subscribe(res => {
        this.responseModel = res;
        this.districtModel = this.responseModel.data[0];
      
        if (this.districtModel != null && this.districtModel != undefined) {
          if (this.districtModel.countryId != null && this.districtModel.countryId != undefined) {
            this.getAllstatesByCountryId(this.districtModel.countryId);
          }
         
        }

        this.commonComponent.stopSpinner();
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.districtModel = this.responseModel.data[0];
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
      this.districtModel.status = this.statusList[0].value;
    }
  })
  this.getAllCountry();
}

getAllstatesByCountryId(countryId: any) {
  // this.commonComponent.startSpinner();
  this.stateservice.getStateByCountryId(this.districtModel.countryId).subscribe((data: any) => {
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
getAllCountry() {
  this.commonComponent.startSpinner();
  this.stateservice.getAllcountry().subscribe((data: any) => {
    this.responseModel = data;
    if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
      this.countrylist = this.responseModel.data;
      this.countrylist = this.countrylist.filter((activity: any) => activity != null).map((act: { name: any; id: any; }) => {
        return { label: act.name, value: act.id };
      });
      this.commonComponent.stopSpinner();
      // this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
      // setTimeout(() => {
      //   this.msgs = [];
      // }, 1000);
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
  this.router.navigate([CommonConfigConstants.DISTRICT]);
}
addOrUpdate() {
  this.commonComponent.startSpinner();
  if (this.isEdit) {
    this.districtService.updateDistrict(this.districtModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        //this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.navigateToBack();
        }, 2000);
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    },
      error => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  } else {
    this.districtService.addDistrict(this.districtModel).subscribe((response: any) => {
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
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    },
      error => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  }
}
}
