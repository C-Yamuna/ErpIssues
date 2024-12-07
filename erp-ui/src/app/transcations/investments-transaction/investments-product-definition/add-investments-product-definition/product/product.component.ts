import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InvestmentsProductDefinition } from '../../shared/investments-product-definition.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TranslateService } from '@ngx-translate/core';
import { InvestmentsProductDefinitionService } from '../../shared/investments-product-definition.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productform: FormGroup;
  investmentsProductDefinitionModel: InvestmentsProductDefinition = new InvestmentsProductDefinition();
  orgnizationSetting: any;
  isEdit: any;
  maxDate = new Date();
  minDate = new Date();
  responseModel!: Responsemodel;
  savedID: any;
  msgs: any[] = [];
  isAutoRenualList: any[] = [];
  amountAndTenureFlag: boolean = applicationConstants.TRUE;
  constructor(public messageService: MessageService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent,
    private commonFunctionService: CommonFunctionsService,
    private translate: TranslateService,
    private ref: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private investmentsProductDefinitionService: InvestmentsProductDefinitionService,
    private datePipe: DatePipe) {
    this.productform = this.formBuilder.group({
      'name': new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS), Validators.required]),
      'minDepositAmount': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_DECIMALS), Validators.required]),
      'maxDepositAmount': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_DECIMALS), Validators.required]),
      'minTenure': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NEW_NUMBERS), Validators.required]),
      'maxTenure': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NEW_NUMBERS), Validators.required]),
      'isAutoRenual': new FormControl('', Validators.required),
      'effectiveStartDate': new FormControl('', Validators.required),
    })
  }
  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.isAutoRenualList = this.commonComponent.requiredlist();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let queryParams = params['id'].split('#');
        let id = this.encryptDecryptService.decrypt(params['id']);

        if (id != "" && id != null && id != undefined) {
          this.isEdit = applicationConstants.TRUE;
          this.investmentsProductDefinitionService.getProductById(id).subscribe(res => {
            this.responseModel = res;
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
              this.investmentsProductDefinitionModel = this.responseModel.data[0];
              if (this.investmentsProductDefinitionModel != null && this.investmentsProductDefinitionModel != undefined) {
                if (this.investmentsProductDefinitionModel.effectiveStartDate != null && this.investmentsProductDefinitionModel.effectiveStartDate != undefined) {
                  this.investmentsProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.investmentsProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);

                }
              }
              this.commonComponent.stopSpinner();
            } else {
              this.commonComponent.stopSpinner();
              this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
              setTimeout(() => {
                this.msgs = [];
              }, 2000);
            }

          }, error => {
            this.msgs = [];
            this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
            this.commonComponent.stopSpinner();
          });
        }
      }
    })
    this.productform.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.productform.valid) {
        this.save();
      }
    });
  }

  updateData() {
    this.investmentsProductDefinitionService.changeData({
      formValid: this.productform.valid && this.amountAndTenureFlag,
      data: this.investmentsProductDefinitionModel,
      stepperIndex: 0,

    });
  }

  save() {
    this.updateData();
  }

  checkForAmount(){
    if(null != this.investmentsProductDefinitionModel && undefined!=this.investmentsProductDefinitionModel &&
      null != this.investmentsProductDefinitionModel.minDepositAmount && undefined!=this.investmentsProductDefinitionModel.minDepositAmount &&
      null != this.investmentsProductDefinitionModel.maxDepositAmount && undefined!=this.investmentsProductDefinitionModel.maxDepositAmount &&
      this.investmentsProductDefinitionModel.minDepositAmount >= this.investmentsProductDefinitionModel.maxDepositAmount
    ){
      this.amountAndTenureFlag = applicationConstants.FALSE;
      this.msgs = [];
      this.msgs =[{ severity: 'error', detail: applicationConstants.MIN_DEPOSIT_AMOUNT_ERROR }];
    }else if(null != this.investmentsProductDefinitionModel && undefined!=this.investmentsProductDefinitionModel &&
      null != this.investmentsProductDefinitionModel.minTenure && undefined != this.investmentsProductDefinitionModel.minTenure &&
      null != this.investmentsProductDefinitionModel.maxTenure && undefined != this.investmentsProductDefinitionModel.maxTenure &&
      this.investmentsProductDefinitionModel.minTenure >= this.investmentsProductDefinitionModel.maxTenure
    ){
      this.amountAndTenureFlag = applicationConstants.FALSE;
      this.msgs = [];
      this.msgs =[{ severity: 'error', detail: applicationConstants.MIN_TENURE_AMOUNT_ERROR }];
    }else{
      this.msgs = [];
      this.amountAndTenureFlag = applicationConstants.TRUE;
    }
    this.updateData();
  }
}
