import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ci-loan-genealogy-tree',
  templateUrl: './ci-loan-genealogy-tree.component.html',
  styleUrls: ['./ci-loan-genealogy-tree.component.css']
})
export class CiLoanGenealogyTreeComponent {
  date: Date | undefined;
  genealogytreedetails: any[] = [];
  displayDialog: boolean = false;

  constructor(private router: Router )
  { 
   
  }
  ngOnInit() {
    
 
    this.genealogytreedetails = [
      { field: 'Name', header: 'NAME' },
      { field: 'Relation With Applicant', header: 'RELATION WITH APPLICANT ' },
      { field: 'Remarks', header: 'REMARKS' },
      { field: 'Action', header: 'ACTION' },
    ];
    
}

  
  onRowEditInit(){
    
  }
  onRowEditSave(){
    
  }
  onRowEditCancel(){

   this.displayDialog = true;
  }
  cancel(){
   
  }
  submit(){
   
  }
}