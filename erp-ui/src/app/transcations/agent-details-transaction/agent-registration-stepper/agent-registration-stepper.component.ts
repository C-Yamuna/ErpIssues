import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AgentDetailsTransactionConstant } from '../agent-details-transaction-constants';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { AgentDetails } from './basic-details/shared/basic-details.model';
import { AgentDetailsTransactionService } from '../shared/agent-details-transaction.service';
import { Kyc } from './kyc/shared/kyc.model';
import { Nominee } from './nominee/shared/nominee.model';
import { Security, Surity } from './security-surety/shared/security-surety.model';
import { CommunicationService } from './communication/shared/communication.service';
import { KycService } from './kyc/shared/kyc.service';
import { NomineeService } from './nominee/shared/nominee.service';
import { MembershipBasicDetails } from './membership-basic-details/shared/membership-basic-details';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Communication } from './communication/shared/communication.model';
import { MembershipBasicDetailsService } from './membership-basic-details/shared/membership-basic-details.service';
import { DatePipe } from '@angular/common';
import { SecuritySuretyService } from './security-surety/shared/security-surety.service';

@Component({
  selector: 'app-agent-registration-stepper',
  templateUrl: './agent-registration-stepper.component.html',
  styleUrls: ['./agent-registration-stepper.component.css']
})
export class AgentRegistrationStepperComponent implements OnInit {

  items: MenuItem[] = [];
  activeIndex: number = 0;
  savedId: any;
  buttonDisabled: boolean = false;
  isEdit: boolean = false;
  membershipBasicDetailsModel: MembershipBasicDetails = new MembershipBasicDetails();
  agentCommunicationModel: Communication = new Communication();
  kycModel: Kyc = new Kyc();
  agentDetailsModel: AgentDetails = new AgentDetails();
  // communicationModel:Communication = new Communication();
  nomineeModel: Nominee = new Nominee();
  securityModel: Security = new Security();
  surityModel:Surity = new Surity();
  flagForLabelName: boolean = false;
  completed = 0;
  responseModel!: Responsemodel;
  msgs: any[] = [];
  admissionNumber: any;
  activeItem !: MenuItem;
  agentId: any;

  depositMembersList: any[] = [];
  membershipForm: FormGroup;
  orgnizationSetting: any;
  isApplicationEdit: boolean = false;
  previousStep:boolean = false;
  menuDisabled: any;
  agentList: any[] = [];
  surityDetailsList: any[] = [];
  showForm: boolean = false;



  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private agentDetailsService: AgentDetailsTransactionService,
    private communicationService: CommunicationService,
    private kycService: KycService,
    private nomineeService: NomineeService,
    private membershipBasicDetailsService: MembershipBasicDetailsService,
    private commonFunctionService: CommonFunctionsService,
    private securitySuretyService: SecuritySuretyService,
    private datePipe: DatePipe,
    private translate: TranslateService,
    private commonComponent: CommonComponent,
    private encryptDecryptService: EncryptDecryptService) {
    this.membershipForm = this.formBuilder.group({
      'admissionNumber': new FormControl('', [Validators.required]),
      'name': new FormControl(''),
      'memberTypeName': new FormControl(''),
      'admissionDate': new FormControl(''),
      'dob': new FormControl(''),
      'age': new FormControl(''),
      'mobileNumber': new FormControl(''),
      'emailId': new FormControl(''),
      'aadharNumber': new FormControl(''),
      'panNumber': new FormControl(''),
      'isKyc': new FormControl('')
    });

  }

  onActiveIndexChange(event: any) {
    this.activeIndex = event.index;
  }

  ngOnInit(): void {
    this.savedId = null;
    this.agentId = null;
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.agentList = this.commonComponent.agentType();
    this.completed = this.activeIndex;
    this.activateRoute.queryParams.subscribe(params => {
      if (params['admissionNumber'] != undefined || params['id'] != undefined) {
        if (params['admissionNumber'] != undefined) {
          this.admissionNumber = this.encryptDecryptService.decrypt(params['admissionNumber']);
          this.isEdit = false;
        }
        if (params['id'] != undefined) {
          this.agentId = this.encryptDecryptService.decrypt(params['id']);
          this.getAgentDetailsById(this.agentId);
          this.isEdit = true;
        }
      }
    });
    this.items = [
      {
        label: 'Membership Basic Details', icon: 'fa fa-id-badge', routerLink: AgentDetailsTransactionConstant.MEMBERSHIP_BASIC_DETAILS,
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Communication', icon: 'fa fa-map-marker', routerLink: AgentDetailsTransactionConstant.AGENT_COMMUNICATION,
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      // {
      //   label: 'Kyc', routerLink: AgentDetailsTransactionConstant.MEMBERSHIP_KYC,
      //   command: (event: any) => {
      //     this.activeIndex = 1;
      //   }
      // },
      {
        label: 'Agent Details', icon: 'fa fa-universal-access', routerLink: AgentDetailsTransactionConstant.AGENT_BASIC_DETAILS,
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
      {
        label: 'Nominee', icon: 'fa fa-user-o', routerLink: AgentDetailsTransactionConstant.AGENT_NOMINEE,
        command: (event: any) => {
          this.activeIndex = 3;
        }
      },
      {
        label: 'Security & Surety', icon: 'fa fa-lock', routerLink: AgentDetailsTransactionConstant.AGENT_SECURITY_SURETY,
        command: (event: any) => {
          this.activeIndex = 4;
        }
      }
    ];
    // this.navigateTo(this.activeIndex, this.admissionNumber);
    this.currentStepper();
    this.getDepositAccountMembers();
  }

  currentStepper() {
    this.agentDetailsService.currentStep.subscribe((data: any) => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.use(this.commonFunctionService.getStorageValue('language'));
      }
      if (data != undefined) {
        this.activeIndex = data.stepperIndex;
        this.changeStepperSelector();
        this.buttonDisabled = data.isDisable
        if (data.data != null) {
          if (this.activeIndex == 0) {
            this.agentDetailsModel = data.data;
          } else if (this.activeIndex == 1) {
            this.agentCommunicationModel = data.data;
          } else if (this.activeIndex == 2) {
            this.agentDetailsModel = data.data;
          } else if (this.activeIndex == 3) {
            this.nomineeModel = data.data;
          } else if (this.activeIndex == 4) {
            this.securityModel = data.data;
            if( data.data.surityDetailsList!= null && data.data.surityDetailsList != undefined && data.data.surityDetailsList.length > 0 ){
              this.surityDetailsList = data.data.surityDetailsList;
            }
            this.surityModel = data.data;
          }
        }
      }

    });

  }
  //method for list of deposit members @bhargavi
  getDepositAccountMembers() {
    // this.commonComponent.startSpinner();
    this.membershipBasicDetailsService.getAllDepositAccountMembers().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.depositMembersList = this.responseModel.data;
        this.depositMembersList = this.depositMembersList.filter((MembersData: any) => MembersData != null).map((Members: { admissionNumber: any; id: any; }) => {
          return { label: Members.admissionNumber, value: Members.admissionNumber };
        });
        //this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 1000);
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

  //onchange method @bhargavi
  OnChangeAdmissionNumber(admissionNumber: any) {
    this.resetMemberDetailsModel();
    this.getMemberDetailsByAdmissionNumber(admissionNumber);
    this.router.navigate([AgentDetailsTransactionConstant.MEMBERSHIP_BASIC_DETAILS], { queryParams: { admissionNumber: this.encryptDecryptService.encrypt(admissionNumber) } });
  }

  // Method to reset membershipBasicDetailsModel @bhargavi
  resetMemberDetailsModel() {
    this.membershipBasicDetailsModel = new MembershipBasicDetails();
    this.membershipBasicDetailsModel.admissionNumber = this.admissionNumber;
  }

//method for deposit members details by admission number @bhargavi
getMemberDetailsByAdmissionNumber(admissionNumber: any) {
    this.membershipBasicDetailsService.getMemberDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipBasicDetailsModel = this.responseModel.data[0];
          this.membershipBasicDetailsModel.id = null;

          if (this.membershipBasicDetailsModel.dob != null && this.membershipBasicDetailsModel.dob != undefined) {
            this.membershipBasicDetailsModel.dob = this.datePipe.transform(this.membershipBasicDetailsModel.dob, this.orgnizationSetting.datePipe);
          }
          if (this.membershipBasicDetailsModel.admissionDate != null && this.membershipBasicDetailsModel.admissionDate != undefined) {
            this.membershipBasicDetailsModel.admissionDate = this.datePipe.transform(this.membershipBasicDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
          }
          if (this.membershipBasicDetailsModel.memberShipCommunicationDetailsDTOList != null && this.membershipBasicDetailsModel.memberShipCommunicationDetailsDTOList != undefined) {
            this.agentCommunicationModel = this.membershipBasicDetailsModel.memberShipCommunicationDetailsDTOList[0];
          }
          this.admissionNumber = this.membershipBasicDetailsModel.admissionNumber;
          this.agentDetailsModel.memberShipBasicDetailsDTO = this.membershipBasicDetailsModel;
        } else {
          this.resetMemberDetailsModel();
        }
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  getAgentDetailsById(id: any) {
    this.agentDetailsService.getAgentDetailsById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.agentDetailsModel = this.responseModel.data[0];
              // this.admissionNumberDropDownDisable = true;
              this.admissionNumber = this.agentDetailsModel.admissionNumber;
              if (this.agentDetailsModel.memberShipBasicDetailsDTO != null && this.agentDetailsModel.memberShipBasicDetailsDTO != undefined) {
                this.membershipBasicDetailsModel = this.agentDetailsModel.memberShipBasicDetailsDTO;
                if (this.membershipBasicDetailsModel.dob != null && this.membershipBasicDetailsModel.dob != undefined) {
                  this.membershipBasicDetailsModel.dob = this.datePipe.transform(this.membershipBasicDetailsModel.dob, this.orgnizationSetting.datePipe);
                }
                if (this.membershipBasicDetailsModel.admissionDate != null && this.membershipBasicDetailsModel.admissionDate != undefined) {
                  this.membershipBasicDetailsModel.admissionDate = this.datePipe.transform(this.membershipBasicDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
                }
              }
            }
          }
        }
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

// save and update method for agent details
  saveAndUpdateAgentBasicDetails(agentDetailsModel: any, activeIndex: any) {
    this.previousStep = false;
    this.commonComponent.startSpinner();
    agentDetailsModel.status = 1;

    this.agentList.filter((documenttype: any) => documenttype != null && documenttype.value == this.agentDetailsModel.agentType).map((act: { label: any; }) => {
      this.agentDetailsModel.agentTypeName = act.label;
    });

    // for membersghip details dates converstion from agent details to communication stepper
    if (this.membershipBasicDetailsModel.dob != null && this.membershipBasicDetailsModel.dob != undefined) {
      this.membershipBasicDetailsModel.dob = this.commonFunctionService.getUTCEpochWithTime(this.membershipBasicDetailsModel.dob);
    }
    if (this.membershipBasicDetailsModel.admissionDate != null && this.membershipBasicDetailsModel.admissionDate != undefined) {
      this.membershipBasicDetailsModel.admissionDate = this.commonFunctionService.getUTCEpochWithTime(this.membershipBasicDetailsModel.admissionDate);
    }

    if (agentDetailsModel.id != null && agentDetailsModel.id != undefined) {
      this.agentDetailsService.updateAgentDetails(agentDetailsModel).subscribe((response: any) => {
        this.responseModel = response;
        this.commonComponent.stopSpinner();
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0].id != null && this.responseModel.data[0].id != undefined) {
            this.agentId = this.responseModel.data[0].id;
            if (this.agentId != null && this.agentId != undefined)
              agentDetailsModel.id = this.agentId;
            this.activeIndex = activeIndex + 1;
            if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined) {
              this.admissionNumber = this.responseModel.data[0].admissionNumber;
            }
            if (this.agentDetailsModel.memberShipBasicDetailsDTO != null && this.agentDetailsModel.memberShipBasicDetailsDTO != undefined) {
              this.membershipBasicDetailsModel = this.agentDetailsModel.memberShipBasicDetailsDTO;
              if (this.membershipBasicDetailsModel.dob != null && this.membershipBasicDetailsModel.dob != undefined) {
                this.membershipBasicDetailsModel.dob = this.datePipe.transform(this.membershipBasicDetailsModel.dob, this.orgnizationSetting.datePipe);
              }
              if (this.membershipBasicDetailsModel.admissionDate != null && this.membershipBasicDetailsModel.admissionDate != undefined) {
                this.membershipBasicDetailsModel.admissionDate = this.datePipe.transform(this.membershipBasicDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
              }
            }
          }
          // this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.navigateTo(this.activeIndex, this.savedId);
          this.completed = 1;
        } else {
          this.commonComponent.stopSpinner();
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      },
        error => {
          // this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        });
    } else {
      this.agentDetailsModel.statusName = "created";
      this.agentDetailsService.addAgentDetails(agentDetailsModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0].id != null && this.responseModel.data[0].id != undefined) {
            this.agentId = this.responseModel.data[0].id;
            if (this.agentId != null && this.agentId != undefined)
              agentDetailsModel.id = this.agentId;
            this.activeIndex = activeIndex + 1;
            if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined) {
              this.admissionNumber = this.responseModel.data[0].admissionNumber;
            }
            if (this.agentDetailsModel.memberShipBasicDetailsDTO != null && this.agentDetailsModel.memberShipBasicDetailsDTO != undefined) {
              this.membershipBasicDetailsModel = this.agentDetailsModel.memberShipBasicDetailsDTO;
              if (this.membershipBasicDetailsModel.dob != null && this.membershipBasicDetailsModel.dob != undefined) {
                this.membershipBasicDetailsModel.dob = this.datePipe.transform(this.membershipBasicDetailsModel.dob, this.orgnizationSetting.datePipe);
              }
              if (this.membershipBasicDetailsModel.admissionDate != null && this.membershipBasicDetailsModel.admissionDate != undefined) {
                this.membershipBasicDetailsModel.admissionDate = this.datePipe.transform(this.membershipBasicDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
              }
            }
          }
          // this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.navigateTo(this.activeIndex, this.savedId);
          this.completed = 1;
        } else {
          this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      },
        error => {
          this.commonComponent.stopSpinner();
          // this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        });
    }
  }

//save and update method for agent communication details
  saveAndUpdateCommunicationDetails(agentCommunicationModel: any, activeIndex: any) {
    // this.commonComponent.startSpinner();
    this.agentCommunicationModel.admissionNumber = this.admissionNumber;
    if (agentCommunicationModel.id != null && agentCommunicationModel.id != undefined) {
      this.communicationService.updateCommunication(this.agentCommunicationModel).subscribe((response: any) => {
        this.responseModel = response;
        this.commonComponent.stopSpinner();
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.activeIndex = activeIndex + 1;
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.navigateTo(this.activeIndex, this.savedId);
          this.completed = 1;
        } else {
          this.commonComponent.stopSpinner();
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      },
        error => {
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        });
    } else {
      this.communicationService.addCommunication(this.agentCommunicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.activeIndex = this.activeIndex + 1;
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.navigateTo(this.activeIndex, this.savedId);
          this.completed = 1;
        } else {
          this.commonComponent.stopSpinner();
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      },
        error => {
          this.commonComponent.stopSpinner();
          // this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        });
    }
  }


//save and update method for agent nominee details
  saveAndUpdateNomineeDetails(nomineeModel: any, activeIndex: any) {
    // this.commonComponent.startSpinner();
    if (this.nomineeModel.nomineeDob != null && this.nomineeModel.nomineeDob != undefined) {
      this.nomineeModel.nomineeDob = this.commonFunctionService.getUTCEpochWithTime(this.nomineeModel.nomineeDob);
    }
    this.nomineeModel.agentId = this.agentDetailsModel.id;
    if (nomineeModel.id != null && nomineeModel.id != undefined) {
      this.nomineeService.updateNomineeDetails(nomineeModel).subscribe((response: any) => {
        this.responseModel = response;
        this.commonComponent.stopSpinner();
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.activeIndex = activeIndex + 1;
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.navigateTo(this.activeIndex, this.savedId);
          this.completed = 1;
        } else {
          this.commonComponent.stopSpinner();
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      },
        error => {
          // this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        });
    } else {
      this.nomineeService.addNomineeDetails(this.nomineeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.activeIndex = this.activeIndex + 1;
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.navigateTo(this.activeIndex, this.savedId);
          this.completed = 1;
        } else {
          this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      },
        error => {
          this.commonComponent.stopSpinner();
          // this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        });
    }

  }

  saveSurityDetails() {
    this.securitySuretyService.saveAgentSurityDetailsList(this.surityDetailsList).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null) {
          this.agentId = this.responseModel.data[0].agentId;
        }
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 1200);
        this.activeIndex = this.activeIndex + 1;
        this.navigateTo(this.activeIndex, this.agentId);
        this.completed = 1;
      } else {
        this.buttonDisabled = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
    }, error => {
      this.msgs = [];
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
}
// navigation from stepper to component
  navigateTo(activeIndex: number, savedId: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([AgentDetailsTransactionConstant.MEMBERSHIP_BASIC_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(this.agentId)} });
        break;
      case 1:
          this.router.navigate([AgentDetailsTransactionConstant.AGENT_COMMUNICATION], { queryParams: { id: this.encryptDecryptService.encrypt(this.agentId)} });
        break;
      case 2:
        this.router.navigate([AgentDetailsTransactionConstant.AGENT_BASIC_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(this.agentId) } });
        break;
      case 3:
        this.router.navigate([AgentDetailsTransactionConstant.AGENT_NOMINEE], { queryParams: { id: this.encryptDecryptService.encrypt(this.agentId) }});
        break;
      case 4:
        this.router.navigate([AgentDetailsTransactionConstant.AGENT_SECURITY_SURETY], { queryParams: { id: this.encryptDecryptService.encrypt(this.agentId) } });
        break;
    }
  }
  changeStepperSelector() {
    this.items.map((val, index) => {
      if (this.activeIndex == index) {
        val['disabled'] = false;
      } else {
        val['disabled'] = true;
      }
      return val;
    });
  }


//navigation for previous stepper component
  prevStep(activeIndex: number) {
    this.activeIndex = activeIndex - 1;
    this.completed = this.completed - 1;
    if (activeIndex == 0) {
      this.navigateTo(this.activeIndex, this.agentId);
    }
    else if (activeIndex == 1) {
      this.navigateTo(this.activeIndex, this.admissionNumber);
    }
    else if (activeIndex == 2) {
      this.navigateTo(this.activeIndex, this.agentId);
      this.previousStep = true;
    }
    else if (activeIndex == 3) {
      this.navigateTo(this.activeIndex, this.agentId);
    }
    else if (activeIndex == 4) {
      this.navigateTo(this.activeIndex, this.agentId);
    }
  }
//navigation for next stepper component
  nextStep(activeIndex: number) {
    if (activeIndex == 0) {
      this.agentDetailsModel.memberShipBasicDetailsDTO = this.membershipBasicDetailsModel;
      this.setMemberDetailsToAgentDetails();
      this.saveAndUpdateAgentBasicDetails(this.agentDetailsModel, activeIndex);
    } else if (activeIndex == 1) {
      this.saveAndUpdateCommunicationDetails(this.agentCommunicationModel, activeIndex);
    } else if (activeIndex == 2) {
      this.saveAndUpdateAgentBasicDetails(this.agentDetailsModel, activeIndex);
    } else if (activeIndex == 3) {
      this.setMemberDetailsToAgentDetails()
      this.saveAndUpdateNomineeDetails(this.nomineeModel, activeIndex);
    } else if (activeIndex == 4) {
      // this.activeIndex = activeIndex + 1;
      // this.navigateTo(this.activeIndex, this.agentId);
      this.saveSurityDetails();
    }
  }

  setMemberDetailsToAgentDetails(){
    this.agentDetailsModel.name =  this.membershipBasicDetailsModel.name;
    this.agentDetailsModel.aadharNumber =  this.membershipBasicDetailsModel.aadharNumber;
    this.agentDetailsModel.panNumber =  this.membershipBasicDetailsModel.panNumber;
    this.agentDetailsModel.mobileNumber =  this.membershipBasicDetailsModel.mobileNumber;
    this.agentDetailsModel.admissionNumber =  this.membershipBasicDetailsModel.admissionNumber;
    this.agentDetailsModel.emailId =  this.membershipBasicDetailsModel.emailId;
  }

  back(activeIndex: any) {
    this.router.navigate([AgentDetailsTransactionConstant.AGENT_DETAILS]);

  }

  cancel(activeIndex: any) {
    this.router.navigate([AgentDetailsTransactionConstant.AGENT_DETAILS]);
  }

  submit(activeIndex: any) {
    this.buttonDisabled = true;
    this.router.navigate([AgentDetailsTransactionConstant.VIEW_AGENT_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(this.agentId),editbutton: this.encryptDecryptService.encrypt(1),isGridPage: this.encryptDecryptService.encrypt(applicationConstants.ACTIVE) } });
  }
save() {
  this.buttonDisabled = true;
  this.router.navigate([AgentDetailsTransactionConstant.AGENT_DETAILS]);
}
onClickMemberIndividualMoreDetails(){
  this.showForm = true
}
}
