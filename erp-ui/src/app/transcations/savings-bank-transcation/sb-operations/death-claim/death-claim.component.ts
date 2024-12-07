import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { savingsbanktransactionconstant } from '../../savingsbank-transaction-constant';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';

@Component({
  selector: 'app-death-claim',
  templateUrl: './death-claim.component.html',
  styleUrls: ['./death-claim.component.css']
})
export class DeathClaimComponent {
  showForm: boolean = false;
  moreDetails: boolean = false;
  deathform: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private commonFunctionsService :CommonFunctionsService , private translate: TranslateService)
  { 
    this.deathform = this.formBuilder.group({
     
    })
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }
  backbutton(){
    this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION]);
  }
  isBasicDetails: boolean = false;
  position: string = 'center';
  showBasicDetailsDialog(position: string) {
    this.position = position;
    this.isBasicDetails = true;
}
  ngOnInit() {
    this.translate.use(this.commonFunctionsService.getStorageValue('language'));
  }
  onClickMemberIndividualMoreDetails(){
    this.moreDetails = true
  }
}
