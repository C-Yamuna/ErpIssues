import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-penality-config',
  templateUrl: './penality-config.component.html',
  styleUrls: ['./penality-config.component.css']
})
export class PenalityConfigComponent {
  date: Date | undefined;
  penalityconfig: any[] = [];
  displayDialog: boolean = false;

  constructor(private router: Router )
  { 
   
  }
  ngOnInit() {
    
 
    this.penalityconfig = [
      { field: 'Min Amount', header: 'MIN AMOUNT ' },
      { field: 'Max Amount', header: 'MAX AMOUNT' },
      { field: 'Penality Amount', header: 'PENALITY AMOUNT' },
      { field: 'Effective Start Date', header: 'EFFECTIVE START DATE' },
      { field: 'Effective End Date', header: ' EFFECTIVE END DATE' },
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
