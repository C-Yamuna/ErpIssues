import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-loans',
  templateUrl: './view-loans.component.html',
  styleUrls: ['./view-loans.component.css']
})
export class ViewLoansComponent implements OnInit{
  loansViewForm:FormGroup;
  loansViewList:any;
  loanGuarantorDetails: any;
  loansDocuments:any;
  loanGeneologyTree:any;

  constructor(private router:Router, private formBuilder:FormBuilder){
    this.loansViewForm = this.formBuilder.group({

    });
  }
  ngOnInit(): void {
    this.loansViewList= [
      { field: 'Bank Name', header: 'BANK NAME'},
      { field: 'Account Number', header: 'ACCOUNT NUMBER' },
      { field: 'Loan Amount', header: 'LOAN AMOUNT' },
      { field: 'Outstanding Amount()', header: 'OUTSTANDING AMOUNT' },
      { field: 'Loan Date', header: 'LOAN DATE' },
      { field: 'Loan Due Date', header: 'LOAN DUE DATE' },
      { field: 'File', header: 'FILE' },
      { field: 'Status', header: 'STATUS' },
    ];
    this.loanGuarantorDetails =[
      { field: 'Admission Number', header: 'ADMISSION NUMBER'},
      { field: 'Name', header: 'Name'},
      { field: 'Father/Spouse Name', header: 'FATHER/SPOUSE NAME'},
      { field: 'Aadhar No', header: 'AADHAR NUMBER'},
      { field: 'Pan No', header: 'PAN NUMBER'},
      { field: 'Mobile No', header: 'MOBILE NUMBER'},
      { field: 'email', header: 'EMAIL'},
      { field: 'Occupation', header: 'OCCUPATION'},
      { field: 'Income', header: 'INCOME'},
      { field: 'Address', header: 'ADDRESS'},
      { field: 'Upload', header: 'UPLOAD'},
    ];
    this.loansDocuments= [
      { field: 'Document Type', header: 'DOCUMENT TYPE'},
      { field: 'Document No', header: 'DOCUMENT NO'},
      { field: 'File Path', header: 'FILE PATH'},
      { field: 'Remarks', header: 'REMARKS'},
    ];
    this.loanGeneologyTree= [
      { field: 'Name', header: 'NAME'},
      { field: 'Realtion With Applicant', header: 'RELATION WITH APPLICANT'},
      { field: 'Remarks', header: 'REMARKS'},
    ]
  }
}
