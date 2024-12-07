import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConfigConstants } from '../../common-config-constants';
import { State } from '../shared/state.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { StatesService } from '../shared/states.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.css']
})
export class AddStateComponent implements OnInit{
  statusList: any[] = [];
  stateForm: FormGroup;
  stateModel: State = new State();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  countrylist:any[]=[];
  constructor(private router: Router, private formBuilder: FormBuilder,private stateService: StatesService, 
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent
   )
  { 
    this.stateForm = this.formBuilder.group({
      countryCode:new FormControl('',[Validators.required]),
      name: new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      code: new FormControl('',),
      shortCode:new FormControl('',),
      goiCode:new FormControl('',),
      status: new FormControl('',[Validators.required]),
    })
  }
  // ngOnInit() {
  //    this.statusList = this.commonComponent.status();
  //   this.activateRoute.queryParams.subscribe(params => {
  //     if (params['id'] != undefined) {
  //       // this.commonComponent.startSpinner();
  //       let id = this.encryptService.decrypt(params['id']);
  //       this.isEdit = true;
  //       this.stateService.getStateById(id).subscribe(res => {
  //         this.responseModel = res;
  //         // this.commonComponent.stopSpinner();
  //         if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
  //           this.stateModel = this.responseModel.data[0];
  //         }
  //       });
  //     } else {
  //       this.isEdit = false;
  //       this.stateModel.status = this.statusList[0].value;
  //     }
  //   });
  //   this.getAllCountry();
  // }
  ngOnInit() {
    this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.stateService.getStateById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.stateModel = this.responseModel.data[0];
          } else {
            this.commonComponent.stopSpinner();
            // this.buttonDisabled = applicationConstants.FALSE;
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        });
      } else {
        this.isEdit = false;
        this.stateModel.status = this.statusList[0].value;
      }
    })
    this.getAllCountry();
  }
  navigateback(){
    this.router.navigate([CommonConfigConstants.STATE]);   
  }


addOrUpdate() {
  //this.commonComponent.startSpinner();
  if (!this.stateModel.code) {
    this.stateModel.code = null; 
  }
  if (this.isEdit) {

    this.stateService.updateState(this.stateModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        //this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
          this.navigateback();
        }, 2000);
      } else {
       // this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 2000);
      }
    },
      error => {
        //this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 2000);
      });
  } else {
    this.stateService.addState(this.stateModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        // this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
          this.navigateback();
        }, 2000);
      } else {
        //this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 2000);
      }
    },
      error => {
        // this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 2000);
      });
  }

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
      // this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
      // setTimeout(() => {
      //   this.msgs = [];
      // }, 1000);
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