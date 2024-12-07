import { Component } from '@angular/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Vaultcreation } from '../shared/vaultcreation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { VaultCreationService } from '../shared/vault-creation.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CashCountertransactionconstant } from '../../cash-counter-transaction-constant';

@Component({
  selector: 'app-view-vault-creation',
  templateUrl: './view-vault-creation.component.html',
  styleUrls: ['./view-vault-creation.component.css']
})
export class ViewVaultCreationComponent {
  orgnizationSetting:any;
  vaultcreationModel: Vaultcreation = new Vaultcreation();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  statusList: any[] = [];
  gridListData: any[] = [];
  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private vaultcreationService: VaultCreationService,
    private datePipe: DatePipe,private translate: TranslateService
  ){
    
}


  ngOnInit(): void {
    this.commonfunctionservice.setStorageValue('language', 'en');
    this.commonfunctionservice.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use('en');
      }
    });
      this.orgnizationSetting = this.commonComponent.orgnizationSettings();
      this.activateRoute.queryParams.subscribe(params => {
        if (params['id'] != undefined) {
          this.commonComponent.startSpinner();
          let id = this.encryptService.decrypt(params['id']);
          this.isEdit = true;
          this.vaultcreationService.getVaultCreationById(id).subscribe(res => {
            this.responseModel = res;
            this.vaultcreationModel = this.responseModel.data[0];
            this.vaultcreationModel.effectiveStartDate = this.datePipe.transform(this.vaultcreationModel.effectiveStartDate, 'dd/MM/yyyy');
            this.vaultcreationModel.effectiveEndDate = this.datePipe.transform(this.vaultcreationModel.effectiveEndDate, 'dd/MM/yyyy');
           
            this.commonComponent.stopSpinner();
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
              this.vaultcreationModel = this.responseModel.data[0];
            }
            else {
              this.msgs = [];
              this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
              setTimeout(() => {
                this.msgs = [];
                this.navigateToBack();
              }, 2000);
            }
          });
        } else {
          //this.commonComponent.stopSpinner();
          this.isEdit = false;
          this.vaultcreationModel.status = this.statusList[0].value;
  
        }
      })
      
        this.getAll();
    }
  
  navigateToBack(){
    this.router.navigate([CashCountertransactionconstant.VAULT_CREATION_TRANSACTION]); 
  }
  getAll() {
    this.vaultcreationService.getAllVaultCreation().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    });
  }
}
