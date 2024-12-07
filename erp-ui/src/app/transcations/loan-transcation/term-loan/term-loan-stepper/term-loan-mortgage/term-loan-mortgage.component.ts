import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-term-loan-mortgage',
  templateUrl: './term-loan-mortgage.component.html',
  styleUrls: ['./term-loan-mortgage.component.css']
})
export class TermLoanMortgageComponent {
  Collateralform: FormGroup;
  selectcollateraltype: any;
  collateraltypeoptions: SelectItem[];
  showgoldform: boolean = false;
  showlandform: boolean = false;
  showbondform:boolean = false;
  showstorageform:boolean = false;
  showothersform:boolean = false;
  carrats: any[] | undefined;
  constructor(private router: Router, private formBuilder: FormBuilder,)
  { 
    this.Collateralform = this.formBuilder.group({
     
    })
    this.collateraltypeoptions = [
      { label: 'Select', value: 'Select' },
      { label: 'Gold', value: 'Gold' },
      { label: 'Land', value: 'Land' },
      { label: 'Bond', value: 'Bond' },
      { label: 'Storage', value: 'Storage' },
      { label: 'Others', value: 'Others' }
    ];
  }
  ngOnInit() {
    this.carrats = [
        { status: 'Select', code: 'Select' },
        { status: '22', code: '22' },
        { status: '24', code: '24' },

        
    ];
   
}

togglecollateralform(element: any) {
    if (element.value.value === 'Gold') {
      this.showgoldform = true;
     this. showlandform = false;
      this.showbondform = false;
     this. showstorageform = false;
     this. showothersform = false;
    } else if (element.value.value === 'Land') {
      this.showgoldform = false;
      this. showlandform = true;
       this.showbondform = false;
      this. showstorageform = false;
      this. showothersform = false;
    } else if (element.value.value === 'Bond') {
      this.showgoldform = false;
      this. showlandform = false;
       this.showbondform = true;
      this. showstorageform = false;
      this. showothersform = false;
    } else if (element.value.value === 'Storage') {
      this.showgoldform = false;
      this. showlandform = false;
       this.showbondform = false;
      this. showstorageform = true;
      this. showothersform = false;
    } else if (element.value.value === 'Others') {
      this.showgoldform = false;
      this. showlandform = false;
       this.showbondform = false;
      this. showstorageform = false;
      this. showothersform = true;
    } else {
      this.showgoldform = false;
      this. showlandform = false;
       this.showbondform = false;
      this. showstorageform = false;
      this. showothersform = false;
    }
  }
}
