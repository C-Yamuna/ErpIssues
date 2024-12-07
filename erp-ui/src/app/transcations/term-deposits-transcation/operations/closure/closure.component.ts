import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { termdeposittransactionconstant } from '../../term-deposit-transaction-constant';

@Component({
  selector: 'app-closure',
  templateUrl: './closure.component.html',
  styleUrls: ['./closure.component.css']
})
export class ClosureComponent {
  activeIndex: number = 0;
  data: any;
  operationslist:any;
  options: any;
  showForm: boolean = false;
  constructor(private router: Router,)
     { }
//   paymentOptions: any[] = ['Cash', 'To SB Account'];
//   selectedPaymentOption: any = 'Cash'; // Default selection
  sbAccountNumber: string = '';
  showSbAccountNumber: boolean = false;
  actions = [
    { label: "Death", value: "death" },
    { label: "Transfer", value: "transfer" }
  ];

  paymentOptions = [
    { label: 'Cash', value: 'cash' },
    { label: 'To SB Account', value: 'sbAccount' },
  ];
  isBasicDetails: boolean = false;
  isHistory: boolean = false;
  position: string = 'center';



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
