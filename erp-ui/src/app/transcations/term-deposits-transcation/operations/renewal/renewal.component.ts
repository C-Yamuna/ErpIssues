import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { termdeposittransactionconstant } from '../../term-deposit-transaction-constant';

@Component({
  selector: 'app-renewal',
  templateUrl: './renewal.component.html',
  styleUrls: ['./renewal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RenewalComponent {

  activeIndex: number = 0;
  data: any;
  operationslist:any;
  options: any;
//   paymentOptions: any[] = ['Cash', 'To SB Account'];
//   selectedPaymentOption: any = 'Cash'; // Default selection
  sbAccountNumber: string = '';
  showSbAccountNumber: boolean = false;
  showPrincipleform:boolean=false;
  showInterestForm:boolean=false;
  showIntrestOrPrincipleForm:boolean=false;
  showManualRenewalForm:boolean=false;
  isBasicDetails: boolean = false;
  isHistory: boolean = false;
  showForm: boolean = false;

  position: string = 'center';

  actions = [
    { label: "Death", value: "death" },
    { label: "Transfer", value: "transfer" }
  ];

  paymentOptions = [
    { label: 'Cash', value: 'cash' },
    { label: 'To SB Account', value: 'sbAccount' },
  ];

  renewalTypeOptions: SelectItem[];
  selectedRenewalType: string | undefined;

  constructor(private router: Router,) {
    this.renewalTypeOptions = [
      { label: 'Principle', value: 'Principle' },
      { label: 'Interest', value: 'Interest' },
      { label: 'Principle + Interest', value: 'Principle + Interest' },
      { label: 'Manual Renewal Amount', value: 'Manual Renewal Amount' }
    ];
  }


  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.4
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                tension: 0.4
            }
        ]
    };

    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}

onPaymentTypeChange(element: any): void {
    // const selectedValue = event.target.value;
    if(element.value.value === 'sbAccount') {
        this.showSbAccountNumber = true;
    } else {
        this.showSbAccountNumber = false;
    }
  }

  renewalType(element: any): void {

    this.showPrincipleform = false;
    this.showInterestForm = false;
    this.showIntrestOrPrincipleForm = false;
    this.showManualRenewalForm = false;
    // const selectedValue = event.target.value;
    if(element.value === 'Principle') {
        this.showPrincipleform = true;
    } else if (element.value === 'Interest')  {
        this.showInterestForm = true;
    }
    else if (element.value=== 'Principle + Interest')  {
        this.showIntrestOrPrincipleForm = true;
    }
    else if (element.value === 'Manual Renewal Amount')  {
        this.showManualRenewalForm = true;
    }
  }

// onPaymentTypeChange(event: any): void {
//     const selectedValue = event.target.value;
//     this.showSbAccountNumber = selectedValue === 'sbAccount';
//   }

back(){
    this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_TRANSACTION]);
}
showBasicDetailsDialog(position: string) {
    this.position = position;
    this.isBasicDetails = true;
    if(this.isHistory)
        this.isHistory = false
}
showHistoryDialog(position: string) {
    this.position = position;
    this.isHistory = true;
    if(this.isBasicDetails)
        this.isBasicDetails = false;
}
onClickMemberIndividualMoreDetails(){
    this.showForm = true
  }
}
