import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-loans',
  templateUrl: './edit-loans.component.html',
  styleUrls: ['./edit-loans.component.css']
})
export class EditLoansComponent implements OnInit{

  collectionDetails:any;
  collectionDetailsForm:FormGroup;

  constructor(private router:Router, private formBuilder:FormBuilder){
    this.collectionDetailsForm = this.formBuilder.group({

    });
  }
  ngOnInit(): void {
    this.collectionDetails = [
      { field: 'Units No', header: 'UNITS NO'},
      { field: 'Collection Date', header: 'COLLECTION DATE'},
      { field: 'Collection Amount', header: 'COLLECTION AMOUNT'},
      { field: 'Collection Charges', header: 'COLLECTION CHARGES'},
      { field: 'Collection Interest', header: 'COLLECTION INTEREST'},
      { field: 'Collection Principal', header: 'COLLECTION PRINCIPAL'},
      { field: 'Status', header: 'STATUS'},      
    ]
  }
}
