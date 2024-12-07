import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Loantransactionconstant } from '../../loan-transaction-constant';
import { SaoLoanApplicationService } from '../../shared/sao-loans/sao-loan-application.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SaoLoanApplication } from '../../sao/shared/sao-loan-application.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
interface Transaction {
  charges: number;
  interest: number;
  principal: number;
}

interface Data {
  totalOutstanding: number;
  debit: Transaction;
  credit: Transaction;
  outstanding: Transaction;
}

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})

export class CollectionComponent {
  collectionDetails:any;
  
  foreclosureChargesEnabled: boolean = false;
  paymentOptions:any;
  additionalChargesCheck:boolean = false;
  responseModel!: Responsemodel;
  msgs: any[] = [];
  yourData: Data[] = [
    {
        totalOutstanding: 1000,
        debit: {
            charges: 200,
            interest: 300,
            principal: 500
        },
        credit: {
            charges: 150,
            interest: 250,
            principal: 400
        },
        outstanding: {
            charges: 50,
            interest: 50,
            principal: 100
        }
    },
    // Add more data objects as needed
  ];
  
  constructor(private router: Router,){
  this.paymentOptions = [
    { field: '', header: ''},
    { field: '', header: '' },
    { field: '', header: '' },
  ];

  this.collectionDetails = [
    { field: 'Units', header: 'Units'},
    { field: 'Collections Date', header: 'Collections Date' },
    
    { field: 'Collections Amount', header: 'Collections Amount' },

    { field: 'Collections Charges', header: 'Collections Charges' },

    { field: 'Collection Interest', header: 'Collections Interest' },
    { field: 'Collection Principal', header: 'Collections Principal' },


    { field: 'Charges', header: 'CHARGES' },
    { field: 'Action', header: 'ACTION' },
  ];
}
back(){
  this.router.navigate([Loantransactionconstant.LOANS_TRANSACTION]);
}

downloadApplication() {
  // Logic to handle download application button click
}


}
