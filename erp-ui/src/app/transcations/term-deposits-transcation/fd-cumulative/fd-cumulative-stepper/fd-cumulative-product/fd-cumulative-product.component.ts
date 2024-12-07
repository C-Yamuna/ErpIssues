import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fd-cumulative-product',
  templateUrl: './fd-cumulative-product.component.html',
  styleUrls: ['./fd-cumulative-product.component.css']
})
export class FdCumulativeProductComponent implements OnInit{

  fdCumulativeProductForm:FormGroup;
  fdCumulativeProduct:any;
  fdCumulativeProductList:any;
  showForm: boolean = false;
  operationTypeList: any;
  checked: any;
  showField: boolean = false;
  
  constructor(private router:Router, private formBuilder:FormBuilder){
    this.fdCumulativeProductForm = this.formBuilder.group({

    });
  }
  ngOnInit(): void {
    this.fdCumulativeProductList=[
      { label:'Product-1-FD Cumulative', value: 1 },
      { label:'Product-2-FD Cumulative', value: 2 },
    ];
    this.operationTypeList=[
      { label:'Single', value: 1 },
      { label:'Joint', value: 2 },
    ]
  }
  onChange(){
    this.showForm = !this.showForm;
  }
  
  onClick(){
    this.showField = !this.showField;
  }
}
