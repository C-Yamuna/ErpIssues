import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembershipConfigConstants } from '../../membership-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { WorkFlowService } from '../shared/work-flow.service';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';
import { WorkFlowSteps, Workflowmodel } from '../shared/work-flow.model';
import { Responsemodel } from 'src/app/shared/responsemodel';

@Component({
  selector: 'app-membership-add-work-flow',
  templateUrl: './membership-add-work-flow.component.html',
  styleUrls: ['./membership-add-work-flow.component.css']
})
export class MembershipAddWorkFlowComponent {
  workFlowStepsForm:any
  statusList : any[]= [] ;
  skillCategoriesList: any;
  isEdit: boolean = applicationConstants.TRUE;
  lavelList: any[] = [];
  rowId: number = 0;
  workFlowList: any[] = [];
  tempCancelList:any[]=[];
  dialogForProject: boolean = applicationConstants.FALSE;
  buttonSaveDisabled: boolean = applicationConstants.FALSE;
  isTemplateButton: boolean = applicationConstants.FALSE;
  commonStatusList: any[] = [];
  responseModel!: Responsemodel;
  orgnizationSetting : any
  projectTaskForm : any
  msgs: any[] = [];
  id: any;
  temp: any;
  tempVar: any;
  dataList: any[] = [];
  workFlowmodel: WorkFlowSteps = new WorkFlowSteps();
  workFlowCategoryModel: Workflowmodel = new Workflowmodel();
  requiredSkillPopup: boolean = applicationConstants.FALSE;
  commonStatusName: any;
  addButtonDisabled: any;
  commonCategoryList: any[] = [];
  cmnStatusList: any[] = [];
  workFlowSteps: any[] = [];
  workflowId: any;
  workFlowStepsList: any[]=[];
  workFlowStepsData: any[]=[];
  maxDate = new Date();
  minDate = new Date();
  buttonDisabled: boolean = applicationConstants.FALSE;
  btnEditDeleteDisable: boolean =applicationConstants.FALSE;
  commonStatusNameList: any[] = [];
  listOffData: any[] = [];
  levelList: any [] =[];
  orgData: any[] = [];
  workFlowColumns: any[] = [];
  isExceptional: boolean =  false;
  
  @ViewChild('dt', { static: applicationConstants.FALSE })
  private dt!: Table;

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private router: Router,
    private commonFunctionsService: CommonFunctionsService, private activatedRoute: ActivatedRoute, 
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent, private workFlowStepService: WorkFlowService) {
      this.projectTaskForm = this.formBuilder.group({
        'cmnStatusId': new FormControl('', [Validators.required]),
        'level': new FormControl('', [Validators.required]),
        'prevStepId': new FormControl('', ),
        'isActive': new FormControl('', [Validators.required])
      });
      this.workFlowStepsForm = this.formBuilder.group({
        "name": new FormControl('', [Validators.required, Validators.pattern(applicationConstants.NEW_NAME_PATTERN)]),
        "code": new FormControl(''),
        "noOfSteps": new FormControl({ value: '', disabled: true }),
        "effStartDate": new FormControl('', [Validators.required]),
        "effEndDate": new FormControl('', [Validators.required]),
        "cmncategory": new FormControl('', [Validators.required]),
        "isExceptional": new FormControl(''),
      });
     }

    ngOnInit() {
      this.workFlowColumns = [
        { field: 'commonStatusName', header: 'MEMBERSHIPCONFIG.NAME' },
        { field: 'activityName', header: 'MEMBERSHIPCONFIG.DESCRIPTION' },
        { field: 'prevStepName', header: 'MEMBERSHIPCONFIG.STATUS' },
        { field: 'statusName', header: 'MEMBERSHIPCONFIG.STATUS' }
      ];
      this.statusList = this.commonComponent.status();
      this.orgnizationSetting = this.commonComponent.orgnizationSettings()
      this.getAllCommonStatusList();
      this.getRoles();
      this.activatedRoute.queryParams.subscribe(params => {
        if (params["id"] != undefined) {
          this.isEdit = applicationConstants.TRUE;
          this.addButtonDisabled = applicationConstants.FALSE;
          this.id = this.encryptDecryptService.decrypt(params["id"]);
          this.getById(this.id);
        } else {
          this.addButtonDisabled = applicationConstants.TRUE;
          this.commonComponent.stopSpinner();
          this.isEdit = applicationConstants.FALSE;
        }
      });
      this.orgnizationSetting = this.commonComponent.orgnizationSettings()
      this.commonCategories();

    
    }
  
  
    //cancle inline work flow row
    cancelProjectRow(row: any) {
      this.dialogForProject = applicationConstants.FALSE;
      this.addButtonDisabled = applicationConstants.FALSE;
      if (row.id == null || row.id == undefined) {
        const index: number = this.workFlowList.indexOf(row);
        if (index !== -1) {
          this.workFlowList.splice(index, 1);
        }
      } else {
        let cancelTemp = this.tempCancelList.filter(tempGoal => tempGoal.id === row.id)[0];
        if (cancelTemp.id == row.id) {
          row.cmnStatusId = cancelTemp.cmnStatusId;
          row.level = cancelTemp.level;
          row.previousStep = cancelTemp.previousStep;
          row.prevStepName = cancelTemp.prevStepName;
          row.isActive = cancelTemp.isActive;
        }
  
      }
      this.buttonSaveDisabled = applicationConstants.FALSE;
      this.btnEditDeleteDisable = applicationConstants.FALSE;
      this.isTemplateButton = applicationConstants.FALSE;
    }
  
    //add inline row
    addProjectRow() {
      return { cmnStatusId: '', level: '', prevStepId: '', isActive: applicationConstants.TRUE }
    }
  
    //get all common status list
    getAllCommonStatusList() {
      this.msgs = [];
      this.commonComponent.startSpinner();
      this.workFlowStepService.getAllCommonStatus().subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null&& this.responseModel.data!= undefined) {
        this.commonStatusList = this.responseModel.data;
        this.commonStatusList = this.responseModel.data.filter((data: any) => data.isActive == 1).map((commonStatusList: any) => {
          return { label: commonStatusList.name, value: commonStatusList.id }
        });
        // this.commonStatusList = this.commonComponent.convertToAlphabeticOrder(this.commonStatusList, 'label');
        this.commonComponent.stopSpinner();
      }
      else {
        this.msgs = [];
        this.buttonDisabled = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
      }, error => {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        this.commonComponent.stopSpinner();
      });
    }
    //get by work flow id with previour steps and work flow status
    getById(getId: any) {
      this.msgs = [];
      this.temp = 0;
      this.workFlowStepService.getById(getId).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel != null&& this.responseModel.data!= undefined && this.responseModel.data.length>0 
            && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.workFlowCategoryModel = this.responseModel.data[0];
          if (this.workFlowCategoryModel.effStartDate != null && this.workFlowCategoryModel.effStartDate != undefined && this.workFlowCategoryModel.effEndDate != null && this.workFlowCategoryModel.effEndDate != undefined) {
            this.workFlowCategoryModel.effStartDateVal = this.datePipe.transform(this.workFlowCategoryModel.effStartDate, this.orgnizationSetting.datePipe);
            this.workFlowCategoryModel.effEndDateVal = this.datePipe.transform(this.workFlowCategoryModel.effEndDate, this.orgnizationSetting.datePipe);
          }
          // this.levelList = this.responseModel.data.filter((data: any) => data).map((level: any) => {
          //   return { label: level.activityName, value: level.level }
          // });
          if (this.workFlowCategoryModel.isExceptional == 1) {
            this.workFlowCategoryModel.isExceptional = applicationConstants.TRUE;
          }
          else {
            this.workFlowCategoryModel.isExceptional = applicationConstants.FALSE;
          }
          this.getFlowStepsByWorkFlowId(this.workFlowCategoryModel.categoryId, this.workFlowCategoryModel.id, applicationConstants.ACTIVE)
          this.getPreviousStepsByWorkFlowId(this.workFlowCategoryModel.categoryId, this.workFlowCategoryModel.id, applicationConstants.ACTIVE)
          this.getCommonStatus(this.workFlowCategoryModel.categoryId);
          this.getAllOrgChartNodes(this.workFlowCategoryModel.id, this.workFlowCategoryModel.categoryId);
        }
        } else {
          this.msgs = [];
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      },
        error => {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        });
    }
    //back to work flow steps
    backToWorkFlowStep() {
      this.router.navigate([MembershipConfigConstants.WORK_FLOW])
    }
  
    // button disabled
    isAddButtonDiabled() {
      this.addButtonDisabled = applicationConstants.TRUE;
      this.btnEditDeleteDisable = applicationConstants.TRUE;
      this.dt._first = 0;
      this.dt.value.unshift({ cmnStatusId: '' });
      this.dt.initRowEdit(this.dt.value[0]);
      if (this.workFlowList.length > 0 && this.workFlowList != null && this.workFlowList != undefined) {
        this.projectTaskForm.get('prevStepId').enable();
      }
      else {
        this.projectTaskForm.get('prevStepId').disable();
      }
      this.getPreviousStepsByWorkFlowId(this.workFlowCategoryModel.categoryId, this.workFlowCategoryModel.id, applicationConstants.ACTIVE);
    }
    //get all common categories
    commonCategories() {
      this.msgs = [];
      this.commonComponent.startSpinner();
      this.workFlowStepService.getAllCommonCategories().subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null&& this.responseModel.data!= undefined) {
        this.commonCategoryList = this.responseModel.data;
        this.commonCategoryList = this.responseModel.data.filter((data: any) => data.status == applicationConstants.ACTIVE).map((commonCategory: any) => {
          return { label: commonCategory.name, value: commonCategory.id }
        });
        // this.commonCategoryList = this.commonComponent.convertToAlphabeticOrder(this.commonCategoryList, 'label');
        this.commonComponent.stopSpinner();
      }
      else {
        this.msgs = [];
        this.buttonDisabled = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
      },
        error => {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
          this.commonComponent.stopSpinner();
        });
    }
  
    //get common status by category Id
    getCommonStatusByCategory(event: any) {
      this.msgs = [];
      this.commonComponent.startSpinner();
      var categoryId;
      if (event.categoryId != undefined) {
        categoryId = event.categoryId
      } else {
        categoryId = event.value
      }
      this.workFlowStepService.getCommonStatusbyCategory(categoryId).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null&& this.responseModel.data!= undefined) {
        this.cmnStatusList = this.responseModel.data.filter((data: any) => data.status == applicationConstants.ACTIVE).map((commonStatusList: any) => {
          return { label: commonStatusList.name, value: commonStatusList.id }
        });
        // this.cmnStatusList = this.commonComponent.convertToAlphabeticOrder(this.cmnStatusList, 'label');
        this.commonComponent.stopSpinner();
      }
      else {
        this.msgs = [];
        this.buttonDisabled = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
      }, error => {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        this.commonComponent.stopSpinner();
      });
    }
    //edit workFlow steps
    editWorkFlowSteps(row: any) {
      let emp = this.workFlowList.filter(obj => obj.cmnStatusId == row.previousStep)[0];
      if (emp != undefined) {
        row.prevStepName = emp.prevStepName;
      }
      this.getCommonStatusByCategory(row);
      // this.checkDuplicatePreviousSteps(row.cmnStatusId)
      this.btnEditDeleteDisable = applicationConstants.TRUE;
      this.addButtonDisabled = applicationConstants.TRUE;
      if (row.previousStep == 0) {
        row.prevStepName = "N/A"
        this.projectTaskForm.get('prevStepId').disable();
      } else {
        this.projectTaskForm.get('prevStepId').enable();
      }
      this.projectTaskForm.patchValue(row);
    }
    //get workFlow id
    getFlowStepsByWorkFlowId(categoryId: any, id: any, isActive: any) {
      this.msgs = [];
      this.workFlowStepService.getByWorkFlowId(categoryId, id, isActive).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {
          this.workFlowList =this.responseModel.data;
          this.tempCancelList = this.workFlowList.map(x => Object.assign({}, x));

          if (this.workFlowList.length > 0) {
            this.buttonDisabled = applicationConstants.TRUE;
            this.workFlowStepsForm.get('name').disable();
            this.workFlowStepsForm.get('code').disable();
            this.workFlowStepsForm.get('noOfSteps').disable();
            this.workFlowStepsForm.get('effStartDate').disable();
            this.workFlowStepsForm.get('effEndDate').disable();
            this.workFlowStepsForm.get('cmncategory').disable();
            this.workFlowStepsForm.get('isExceptional').disable();
            this.addButtonDisabled = applicationConstants.FALSE;
          }
        }
        } else {
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      },
        error => {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        });
    }
  
    //get previous workFlow steps
    getPreviousStepsByWorkFlowId(categoryId: any, id: any, isActive: any) {
      this.msgs = [];
      this.workFlowStepService.getByWorkFlowId(categoryId, id, isActive).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {
          this.workFlowStepsList = this.responseModel.data;
          }
          if (this.workFlowStepsList.length > 0 && this.workFlowStepsList != null) {
            this.workFlowStepsList = this.workFlowStepsList.map(previousStep => {
              return { label: previousStep.name, value: previousStep.id }
            });
          }
          else {
            if (this.workFlowStepsList.length === 0 || !this.workFlowStepsList.some(step => step.value === 0)) {
              this.workFlowStepsList.unshift({ label: 'N/A', value: 0 });
            }
          }
  
          this.workFlowStepsData = this.responseModel.data.map((x: any) => Object.assign({}, x));
        } else {
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      },
        error => {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        });
    }
  
    //check duplicate work flow status if already exited in list it need not to be selected
    checkDuplicatePreviousSteps(obj: any) {
        this.workFlowStepsList = this.workFlowStepsData.map(x => Object.assign({}, x));
        let index = this.workFlowStepsList.findIndex(previousStep => previousStep.cmnStatusId == obj)
        if (index != -1) {
          this.workFlowStepsList.splice(index, 1)
          this.projectTaskForm.get("cmnStatusId").reset();
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail:  applicationConstants.COMMON_STATUS_ALREADY_EXISTED }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
        else{
          if ( this.workFlowStepsList.some(step => step.value != 0)) {
            this.workFlowStepsList = this.workFlowStepsList.map(previousStep => {
              return { label: previousStep.name, value: previousStep.id }
            });
          }
        }
    }
    getCommonStatus(commonCategoryId: any) {
      this.msgs = [];
      this.workFlowStepService.getCommonStatusbyCategory(commonCategoryId).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {
          this.commonStatusNameList =this.responseModel.data;
        this.commonStatusNameList = this.commonStatusNameList.filter((commonstatus: any) =>commonstatus != null  && commonstatus.status == applicationConstants.ACTIVE).map((commonsrtatustype: { name: any; id: any; }) => {
          return { label: commonsrtatustype.name, value: commonsrtatustype.id }
        });
      
        this.commonComponent.stopSpinner();
      }
      }
      else{
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        this.commonComponent.stopSpinner();
      });
    }
    deleteWorkFlowSteps(rowData: any) {
      this.rowId = rowData.id
      this.requiredSkillPopup = applicationConstants.TRUE;
    }
  
    //add or update work flow 
    addOrUpdate() {
      this.msgs = [];
      this.commonComponent.startSpinner();
      if (this.workFlowCategoryModel.name != undefined && this.workFlowCategoryModel.name != null) {
        this.workFlowCategoryModel.name = this.workFlowCategoryModel.name.trim();
      }
      if (this.workFlowCategoryModel.effStartDateVal != undefined && this.workFlowCategoryModel.effStartDateVal != null)
        this.workFlowCategoryModel.effStartDate = this.commonFunctionsService.getUTCEpoch(new Date(this.workFlowCategoryModel.effStartDateVal));
      if (this.workFlowCategoryModel.effEndDateVal != undefined && this.workFlowCategoryModel.effEndDateVal != null)
        this.workFlowCategoryModel.effEndDate = this.commonFunctionsService.getUTCEpoch(new Date(this.workFlowCategoryModel.effEndDateVal));
      this.isExceptional=this.workFlowCategoryModel.isExceptional;
      if (this.isExceptional) {
        this.workFlowCategoryModel.isExceptional = 1;
      } else {
        this.workFlowCategoryModel.isExceptional = 0;
      }
      if (this.workFlowCategoryModel.id != null) {
        this.workFlowStepService.updateWorkFlow(this.workFlowCategoryModel).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel != null&& this.responseModel.data!= undefined) {
            this.workFlowCategoryModel = response.data[0];
          
            this.buttonDisabled = applicationConstants.FALSE;
  
            if (null != this.workFlowCategoryModel.effStartDate)
              this.workFlowCategoryModel.effStartDateVal = this.datePipe.transform(this.workFlowCategoryModel.effStartDate, this.orgnizationSetting.datePipe);
            if (null != this.workFlowCategoryModel.effEndDate)
              this.workFlowCategoryModel.effEndDateVal = this.datePipe.transform(this.workFlowCategoryModel.effEndDate, this.orgnizationSetting.datePipe);
            this.getById(this.workFlowCategoryModel.id)
            this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.getCommonStatus(this.workFlowCategoryModel.categoryId);
            }, 2000);
            this.addButtonDisabled = applicationConstants.FALSE;
            this.commonComponent.stopSpinner();
  
          }
          } else {
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
            this.commonComponent.stopSpinner();
          }
        },
          error => {
            this.msgs = [];
            this.commonComponent.stopSpinner();
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          });
      } else {
  
        this.workFlowStepService.addWorkFlow(this.workFlowCategoryModel).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel != null&& this.responseModel.data!= undefined) {
            this.buttonDisabled = applicationConstants.FALSE;
            this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
            this.workFlowCategoryModel = response.data[0];
            this.addButtonDisabled = applicationConstants.FALSE;
            if (this.workFlowCategoryModel.effStartDate != null && this.workFlowCategoryModel.effStartDate != undefined && this.workFlowCategoryModel.effEndDate != null && this.workFlowCategoryModel.effEndDate != undefined) {
              this.workFlowCategoryModel.effStartDateVal = this.datePipe.transform(this.workFlowCategoryModel.effStartDate, this.orgnizationSetting.datePipe);
              this.workFlowCategoryModel.effEndDateVal = this.datePipe.transform(this.workFlowCategoryModel.effEndDate, this.orgnizationSetting.datePipe);
            }
            setTimeout(() => {
              this.getCommonStatus(this.workFlowCategoryModel.categoryId);
            }, 2000);
  
            this.commonComponent.stopSpinner();
          }
          } else {
            this.msgs = [];
            this.commonComponent.stopSpinner();
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        },
          error => {
            this.msgs = [];
            this.commonComponent.stopSpinner();
  
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          });
      }
    }
  
    getRelationshipName(levelId: any) {
      let data = this.levelList.filter(leve => leve.value == levelId)[0];
      this.workFlowmodel.relationshipType = data.label;
      this.workFlowmodel.relationshipTypeId = data.value;
    }
  
    //save or update work flow steps
    saveWorkFlowProject(row: any) {
      this.commonComponent.startSpinner();
      this.msgs = [];
      this.workFlowmodel.categoryId = this.workFlowCategoryModel.categoryId;
      this.workFlowmodel.cmnStatusId = row.cmnStatusId;
      this.workFlowmodel.level = row.level;
      this.workFlowmodel.workFlowId = this.workFlowCategoryModel.id;
      this.workFlowmodel.isExceptional = this.workFlowCategoryModel.isExceptional;
      if (row.previousStep == undefined || row.previousStep == " " || row.previousStep == null) {
        this.workFlowmodel.previousStep = 0;
      } else {
        this.workFlowmodel.previousStep = row.previousStep;
      }
      if (this.workFlowmodel.isExceptional == applicationConstants.TRUE) {
        this.workFlowmodel.isExceptional = 1;
      }
      else {
        this.workFlowmodel.isExceptional = 0;
      }
      if (row.isActive == applicationConstants.TRUE) {
        row.statusName = "Active"
        this.workFlowmodel.isActive = applicationConstants.ACTIVE
      } else {
        row.statusName = "In-Active"
        this.workFlowmodel.isActive = applicationConstants.IN_ACTIVE
      }
      if (row.cmnStatusId != null) {
        let commonStatusModel = this.commonStatusNameList.find(x => x.value == row.cmnStatusId);
        if (commonStatusModel != undefined) {
          row.commonStatusName = commonStatusModel.label;
          row.name = row.commonStatusName;
          this.workFlowmodel.name = row.name;
        }
      }
        this.levelList.filter((state: any) => state != null && state.value == this.workFlowmodel.level).map((act: { label: any; }) => {
      this.workFlowmodel.levelName = act.label;
    });
      this.workFlowmodel.id = row.id;
      if (this.workFlowmodel.id != null) {
        this.workFlowStepService.updateWorkFlowStepsByWorkFlow(this.workFlowmodel).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel != null&& this.responseModel.data!= undefined) {
            this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
            this.workFlowList = response.data;
            this.btnEditDeleteDisable = applicationConstants.FALSE;
            this.addButtonDisabled = applicationConstants.FALSE;
            setTimeout(() => {
              this.getById(this.workFlowCategoryModel.id);
            }, 2000);
            this.commonComponent.stopSpinner();
          }
          } else {
            this.msgs = [];
            this.buttonDisabled = applicationConstants.FALSE;
            this.btnEditDeleteDisable = applicationConstants.FALSE;
            this.addButtonDisabled = applicationConstants.FALSE;
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.getById(this.workFlowCategoryModel.id);
            }, 2000);
            this.commonComponent.stopSpinner();
          }
        },
          error => {
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
  
            setTimeout(() => {
              this.msgs = [];
            }, 2000); this.commonComponent.stopSpinner();
          });
      } else {
        this.workFlowStepService.saveWorkFlowSteps(this.workFlowmodel).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel != null&& this.responseModel.data!= undefined) {
            this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
            this.workFlowList = response.data;
            this.btnEditDeleteDisable = applicationConstants.FALSE;
            this.addButtonDisabled = applicationConstants.FALSE;
            setTimeout(() => {
              this.getById(this.workFlowCategoryModel.id);
            }, 2000);
            this.commonComponent.stopSpinner();
          }
          } else {
            this.buttonDisabled = applicationConstants.FALSE;
            this.btnEditDeleteDisable = applicationConstants.FALSE;
            this.addButtonDisabled = applicationConstants.FALSE;
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.getById(this.workFlowCategoryModel.id);
            }, 2000);
            this.commonComponent.stopSpinner();
          }
        },
          error => {
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
            this.commonComponent.stopSpinner();
          });
      }
      
    }
  
    //work Flow steps deletion
    yesDeleteWorkFlowStep() {
      this.msgs = [];
      this.commonComponent.startSpinner();
      this.workFlowStepService.deleteWorkFlowStep(this.rowId).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          this.orgData = [];
          this.getAllOrgChartNodes(this.workFlowCategoryModel.id, this.workFlowCategoryModel.categoryId);
          if (this.workFlowStepsList.length > 0) {
            this.buttonDisabled = applicationConstants.FALSE;
            this.workFlowStepsForm.get('name').enable();
            this.workFlowStepsForm.get('code').enable();
            this.workFlowStepsForm.get('noOfSteps').enable();
            this.workFlowStepsForm.get('effStartDate').enable();
            this.workFlowStepsForm.get('effEndDate').enable();
            this.workFlowStepsForm.get('cmncategory').enable();
            this.workFlowStepsForm.get('isExceptional').enable();
            this.addButtonDisabled = applicationConstants.FALSE;
          }
          else {
            this.workFlowStepsList.unshift({ label: 'ALL', value: 0 });
          }
  
          setTimeout(() => {
            this.getById(this.workFlowCategoryModel.id);
          }, 2000);
          this.commonComponent.stopSpinner();
        }
        } else {
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
          this.commonComponent.stopSpinner();
        }
      },
        error => {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
          this.commonComponent.stopSpinner();
  
        });
      this.requiredSkillPopup = applicationConstants.FALSE;
  
    }
    noDeleteWorkFlowStep() {
      this.requiredSkillPopup = applicationConstants.FALSE;;
    }
    //for chart generation of work Flow steps
    retrieveData(dataObj: any) {
      for (let obj of dataObj) {
        obj.label = obj.name;
        obj.type = 'person',
          obj.styleClass = 'ui-person',
          obj.expanded = applicationConstants.TRUE,
          obj.children = obj.children
        this.listOffData.push(obj)
        if (obj.children.length > 0) {
          this.retrieveData(obj.children);
        }
      }
    }
    //here we are gettting all org chart nodes
    getAllOrgChartNodes(id: any, categoryId: any) {
      this.listOffData = [];
      this.workFlowStepService.getAllOrgChart(id, categoryId).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined){
          this.orgData = this.responseModel.data
          this.retrieveData(this.orgData);
        }
      }
     
      })
    }
  
  
    // this is for actors
    getRoles() {
      this.workFlowStepService.getAllRoles().subscribe((res: any) => {
        this.responseModel = res;
        this.commonComponent.stopSpinner();
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined || this.responseModel.data.length > 0)
            this.levelList = this.responseModel.data.map((roles: any) => {
              return { label: roles.name, value: roles.id }
            });
        }
       
      });
    }
}
