import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FdNonCummProductDefinitionModel, FdNonCumulativeApplication } from './shared/fd-non-cumulative-application.model';
import { MemberGroupDetailsModel, MembershipInstitutionDetailsModel, NewMembershipAdd } from '../new-membership-add/shared/new-membership-add.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { FdNonCumulativeApplicationService } from './shared/fd-non-cumulative-application.service';

@Component({
  selector: 'app-fd-non-cumulative-application',
  templateUrl: './fd-non-cumulative-application.component.html',
  styleUrls: ['./fd-non-cumulative-application.component.css']
})
export class FdNonCumulativeApplicationComponent {

  checked: boolean = false;
  applicationForm: FormGroup;
  productList: any[] = [];
  accountTypeList: any[] = [];
  showForm: boolean = false;
  admissionNumberList: any[] = [];
  fdNonCumulativeApplicationModel: FdNonCumulativeApplication = new FdNonCumulativeApplication();
  productDefinitionModel: FdNonCummProductDefinitionModel = new FdNonCummProductDefinitionModel();
  membershipBasicRequiredDetails: NewMembershipAdd = new NewMembershipAdd();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  responseModel!: Responsemodel;
  isEdit: boolean = false;
  msgs: any[] = [];
  pacsId: any;
  branchId: any;
  admissionNumber: any;
  productInfoFalg: boolean = false;
  orgnizationSetting: any;
  sbAccId: any;
  memberTypeName: any;
  currentDateEpoch: any;
  accountTypeDisable: boolean = false;
  id: any;
  isDisabled: boolean = false;
  accountList: any;
  applicationType : boolean = false;
  roi:any;
  isProductDisable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private fdNonCumulativeApplicationService: FdNonCumulativeApplicationService,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private encryptDecryptService: EncryptDecryptService,
    private commonFunctionsService: CommonFunctionsService,
    private datePipe: DatePipe) {

      this.applicationForm = this.formBuilder.group({
        fdNonCummulativeproductId: [Validators.compose([Validators.required])],
      accountNumber: [{ value: '', disabled: true }],
      accountType: [''],
      depositAmount: [''],
      roi: [{ value: '', disabled: true }],
      depositDate: [{ value: '' }],
      tenureInDays: [''],
      tenureInMonths: [''],
      tenureInYears: [''],
  
      })
  }

  ngOnInit(): void {
    this.isDisabled = true;
    this.showForm = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.activateRoute.queryParams.subscribe(params => {
      if ( params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptDecryptService.decrypt(params['id']);
        // let memberType = this.encryptDecryptService.decrypt(params['memTypeId']);
        this.id = Number(id);
        this.isEdit = true;
        this.getFdNonCummApplicationById(this.id);
        this.commonComponent.stopSpinner();
      } else {
        this.isEdit = false;
        this.commonComponent.stopSpinner();
      }
    })
    this.applicationForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.applicationForm.valid) {
        this.save();
      }
    });
    this.getAllAccountsTypesList();
    this.getAllApplicationTypesList();
  }
  updateData() {
    this.fdNonCumulativeApplicationService.changeData({
      formValid: !this.applicationForm.valid ? true : false,
      data: this.fdNonCumulativeApplicationModel,
      isDisable: (!this.applicationForm.valid),
      // isDisable:false,
      stepperIndex: 3,
    });
  }
  //update model data to stepper component

  save() {
    this.updateData();
  }

  onChange() {
    this.checked = !this.checked;
    if (this.checked) {
      this.showForm = true;
    }
    else {
      this.showForm = false;
    }

  }



   //get All account types list


   getAllApplicationTypesList() {
    this.fdNonCumulativeApplicationService.getAllProductDefinitionList().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.productList = this.responseModel.data;
            this.productList = this.productList.filter((obj: any) => obj != null).map((product: { name: any; id: any; }) => {
              return { label: product.name, value: product.id };
            });
          }
        }
      }
    });
  }


  //get All account Types  types list

  getAllAccountsTypesList() {
    this.fdNonCumulativeApplicationService.getAllAccountTypesList().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status != null && this.responseModel != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data .length > 0 ) {
            this.accountList = this.responseModel.data;
            this.accountList = this.accountList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
            const filteredItem = this.accountList.find((item: { value: any; }) => item.value === this.fdNonCumulativeApplicationModel.accountType);
            if(filteredItem != null && filteredItem != undefined && filteredItem.label != null && filteredItem.label != undefined){
              this.fdNonCumulativeApplicationModel.accountTypeName = filteredItem.label;
            }
          }
        }
        
      }
    });
  }

  //get account details by admissionNumber list
  getFdNonCummApplicationById(id : any) {
    this.commonFunctionsService
    this.fdNonCumulativeApplicationService.getFdNonCummApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            
            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.fdNonCumulativeApplicationModel = this.responseModel.data[0];
                if(this.fdNonCumulativeApplicationModel.fdNonCummulativeproductId != null && this.fdNonCumulativeApplicationModel.fdNonCummulativeproductId != undefined)
                  this.isProductDisable = applicationConstants.TRUE;

                this. fdNonCumulativeApplicationModel.depositDate = this.datePipe.transform(this. fdNonCumulativeApplicationModel.depositDate, this.orgnizationSetting.datePipe);
              
                if(this.fdNonCumulativeApplicationModel.fdNonCummulativeProductName != null && this.fdNonCumulativeApplicationModel.fdNonCummulativeProductName != undefined){
                  this.productInfoFalg = true;
                }
                if(this.fdNonCumulativeApplicationModel.fdNonCummulativeproductId != null && this.fdNonCumulativeApplicationModel.fdNonCummulativeproductId != undefined){
                  this.getProductDefinitionByProductId(this.fdNonCumulativeApplicationModel.fdNonCummulativeproductId);
                  
                }
                if(this.fdNonCumulativeApplicationModel.accountTypeName != null && this.fdNonCumulativeApplicationModel.accountTypeName != undefined){
                 this.applicationType = true;
                }
                this.updateData();
              }
            }
          }
        }
      }
    });
  }
  // On product change get product details by selected product id list
  productOnChange(event : any){
    this.productInfoFalg = true;

    this.fdNonCumulativeApplicationService.getProductById(this.fdNonCumulativeApplicationModel.fdNonCummulativeproductId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.fdNonCumulativeApplicationModel.roi = this.responseModel.data[0].roi;

        if(event.value != null && event.value != undefined){
                this.getProductDefinitionByProductId(this.fdNonCumulativeApplicationModel.fdNonCummulativeproductId);
               }
      }
    });
  }


 //get product details 

 getProductDefinitionByProductId(id : any){
  this.productDefinitionModel == null;
 this.fdNonCumulativeApplicationService.getProduct(id).subscribe((data: any) => {
   this.responseModel = data;
   if (this.responseModel != null && this.responseModel != undefined) {
       if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {             
         if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
           if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
             this.productDefinitionModel = this.responseModel.data[0];
            
           }
           if(this.productDefinitionModel.isSpecialScheme != null && this.productDefinitionModel.isSpecialScheme != undefined && this.productDefinitionModel.isSpecialScheme){
             this.productDefinitionModel.isSpecialScheme = applicationConstants.YES;
           }
           else{
             this.productDefinitionModel.isSpecialScheme = applicationConstants.NO;
           }
           if(this.productDefinitionModel.isAutoRenewal != null && this.productDefinitionModel.isAutoRenewal != undefined && this.productDefinitionModel.isAutoRenewal)
           {
             this.productDefinitionModel.isAutoRenewal = applicationConstants.YES;
           }
           else{
             this.productDefinitionModel.isAutoRenewal = applicationConstants.NO;
           }
           if(null!=this.productDefinitionModel.effectiveStartDate && undefined!=this.productDefinitionModel.effectiveStartDate)
             this.productDefinitionModel.effectiveStartDate = this.datePipe.transform(this.productDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
         }
       }
     
   }
 });
}
//account name mapping

  onChangeAccountTypes(event: any){
    const filteredItem = this.accountList.find((item: { value: any; }) => item.value === event.value);
    this.fdNonCumulativeApplicationModel.accountTypeName = filteredItem.label;
    this.updateData();
   }

}
