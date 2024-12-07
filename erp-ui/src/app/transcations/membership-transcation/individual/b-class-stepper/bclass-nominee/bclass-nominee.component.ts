import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bclass-nominee',
  templateUrl: './bclass-nominee.component.html',
  styleUrls: ['./bclass-nominee.component.css']
})
export class BclassNomineeComponent {
  cities: any[] = [];
  nomineeForm:FormGroup;

  constructor(private router:Router, private formBuilder:FormBuilder){
    this.nomineeForm = this.formBuilder.group({


})
}
ngOnInit() {
  this.cities = [
    { status: 'Select', code: 'AU' },
      { status: 'Australia', code: 'AU' },
      { status: 'Brazil', code: 'BR' },
      { status: 'China', code: 'CN' },
      { status: 'Egypt', code: 'EG' },
   
  ];
}
}
