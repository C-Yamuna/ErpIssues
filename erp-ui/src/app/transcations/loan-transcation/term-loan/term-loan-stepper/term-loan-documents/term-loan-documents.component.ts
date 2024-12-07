import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-term-loan-documents',
  templateUrl: './term-loan-documents.component.html',
  styleUrls: ['./term-loan-documents.component.css']
})
export class TermLoanDocumentsComponent {
  date: Date | undefined;
  documentdetails: any[] = [];
  displayDialog: boolean = false;

  constructor(private router: Router )
  { 
   
  }
  ngOnInit() {
    
 
    this.documentdetails = [
      { field: 'Document Type', header: 'DOCUMENT TYPE' },
      { field: 'Document No', header: 'DOCUMENT NO ' },
      { field: 'File Path', header: 'FILE PATH' },
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
