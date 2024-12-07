import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-mapping',
  templateUrl: './product-mapping.component.html',
  styleUrls: ['./product-mapping.component.css']
})
export class ProductMappingComponent implements OnInit{

  productMappingForm:FormGroup;
  showForm: boolean = false;
  isBasicDetails: boolean = false;
  position: string = 'center';

  constructor(private router:Router, private formBuilder:FormBuilder){
    this.productMappingForm = this.formBuilder.group({

    });
  }
  ngOnInit(){
    
  }

  onChange(){
    this.showForm = !this.showForm;
  }

  showBasicDetailsDialog(position: string) {
    this.position = position;
    this.isBasicDetails = true;
}
onClickMemberIndividualMoreDetails(){
  this.showForm = true
}
}
