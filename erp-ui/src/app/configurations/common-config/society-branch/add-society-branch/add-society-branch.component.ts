import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SocietyBranch } from '../shared/society-branch.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { SocietyBranchService } from '../shared/society-branch.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonConfigConstants } from '../../common-config-constants';
import { DatePipe } from '@angular/common';
import { VillagesService } from '../../villages/shared/villages.service';
import { PacsDetailsService } from '../../pacs-details/shared/pacs-details.service';

@Component({
  selector: 'app-add-society-branch',
  templateUrl: './add-society-branch.component.html',
  styleUrls: ['./add-society-branch.component.css']
})
export class AddSocietyBranchComponent {
  societybranchform:FormGroup;
  statusList: any[] = [];
  societyBranchModel: SocietyBranch = new SocietyBranch();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  stateListData: any[] = [];
  maxDate:any;
  orgnizationSetting:any;
  villagelist: any[]=[];
  pacslist:any[]=[];
  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private societyBranchService: SocietyBranchService,
    private datePipe:DatePipe, private commonFunctionsService: CommonFunctionsService,
    private villageservice: VillagesService, private pacsdetailsservice : PacsDetailsService
  ){
    this.societybranchform = this.formBuilder.group({
    
      name: new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      pacsName: new FormControl('',),
      villageName: new FormControl('',[Validators.required]),
     
      status: new FormControl('',[Validators.required]),
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
        this.societyBranchService.getSocietyBranchById(id).subscribe(res => {
          this.responseModel = res;
          this.societyBranchModel = this.responseModel.data[0];
         
        
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.societyBranchModel = this.responseModel.data[0];
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
        this.societyBranchModel.status = this.statusList[0].value;
      }
    })
  this.getAllVillages();
  this.getAllpacsdetails();
}
navigateToBack(){
  this.router.navigate([CommonConfigConstants.SOCIETY_BRANCH]); 
}
addOrUpdate() {
  //this.commonComponent.startSpinner();
 
  // this.villagelist.filter((village: any) => village != null && village.value == this.societyBranchModel.villageId).map((act: { label: any; }) => {
  //   this.societyBranchModel.pacsName = act.label;
  // });
  // this.pacslist.filter((pacs: any) => pacs != null && pacs.value == this.societyBranchModel.pacsId).map((act: { label: any; }) => {
  //   this.societyBranchModel.pacsName = act.label;
  // });
  if (this.isEdit) {
    this.societyBranchService.updateSocietyBranch(this.societyBranchModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
       
          
        //this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
          this.navigateToBack();
        }, 1000);
      } else {
       // this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 1000);
      }
    },
      error => {
        //this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 1000);
      });
  } else {
    this.societyBranchService.addSocietyBranch(this.societyBranchModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
      
        
        // this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
          this.navigateToBack();
        }, 1000);
      } else {
        //this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 1000);
      }
    },
      error => {
        // this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 1000);
      });
  }
}
getAllVillages() {
  // this.commonComponent.startSpinner();
  this.villageservice.getAllVillages().subscribe((data: any) => {
    this.responseModel = data;
    if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
      this.villagelist = this.responseModel.data;
      this.villagelist = this.villagelist.filter((activity: any) => activity.status == applicationConstants.ACTIVE).map((act: { name: any; id: any; }) => {
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
getAllpacsdetails() {
  // this.commonComponent.startSpinner();
  this.pacsdetailsservice.getAllPacsDetails().subscribe((data: any) => {
    this.responseModel = data;
    if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
      this.pacslist = this.responseModel.data;
      this.pacslist = this.pacslist.filter((activity: any) => activity.status == applicationConstants.ACTIVE).map((act: { name: any; id: any; }) => {
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
}
