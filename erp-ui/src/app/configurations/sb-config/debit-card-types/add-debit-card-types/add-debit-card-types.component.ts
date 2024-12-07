import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SavingsBankConfigConstants } from '../../sb-config-constants';
import { DebitCardsTypes } from '../shared/debit-cards-types';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { DebitCardTypesService } from '../shared/debit-card-types.service';

@Component({
  selector: 'app-add-debit-card-types',
  templateUrl: './add-debit-card-types.component.html',
  styleUrls: ['./add-debit-card-types.component.css']
})
export class AddDebitCardTypesComponent implements OnInit{
  debitCardTypeForm:FormGroup;
  debitCardType:any;
  statusList: any[] = [];
  msgs: any[] = [];
  debitCardsTypes: DebitCardsTypes = new DebitCardsTypes();
  responseModel!: Responsemodel;
  
  isEdit: boolean = false;
  constructor(private router:Router, private formBuilder:FormBuilder, private debitCardTypesService :DebitCardTypesService ,private commonComponent : CommonComponent  ,private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService){
    this.debitCardTypeForm = this.formBuilder.group({
      name: new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      description: new FormControl(''),
      statusName: new FormControl('',[Validators.required]),
    });

  }
  ngOnInit(): void {
    this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        let id = this.encryptDecryptService.decrypt(params['id']);
        this.debitCardTypesService.getDebitCardTypesById(id).subscribe(res => {
          this.isEdit = true;
          this.responseModel = res;
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.debitCardsTypes = this.responseModel.data[0];
          }
          else{
            this.msgs = [];
            this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
              this.navigateToBack();
            }, 2000);
          }
        });
      } else {
        this.isEdit = false;
        this.debitCardsTypes.status = this.statusList[0].value;
      }
    }),
      (error: any) => {
      this.msgs = [];
      this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    }
  }
  navigateToBack(){
    this.router.navigate([SavingsBankConfigConstants.DEBIT_CARD_TYPES]);
  }

  submit(){
    this.debitCardTypesService.addDebitCardTypes(this.debitCardsTypes).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.navigateToBack();
        }, 2000);
      } else {
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    });
  }

  update(){
    this.debitCardTypesService.updateDebitCardTypes(this.debitCardsTypes).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.navigateToBack();
        }, 2000);
      } else {
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    });
  }
}
