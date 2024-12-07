import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-ci-nominee',
  templateUrl: './ci-nominee.component.html',
  styleUrls: ['./ci-nominee.component.css']
})
export class CiNomineeComponent {
  guarantorform: FormGroup;
  selectetypeofnominee: any;
  typeofnomineeoptions: SelectItem[];
  shownewnomineeform: boolean = false;
  showmembernominee: boolean = false;
  shownonomineeform:boolean = false;
  relationshiptype: any[] | undefined;
  constructor(private router: Router, private formBuilder: FormBuilder,)
  { 
    this.guarantorform = this.formBuilder.group({
     
    })
    this.typeofnomineeoptions = [
      { label: 'Select', value: 'Select' },
      { label: 'New Nominee', value: 'New Nominee' },
      { label: 'Same As Membership Nominee', value: 'Same As Membership Nominee' },
      { label: 'No Nominee', value: 'No Nominee' }
    ];
  }
  ngOnInit() {
    this.relationshiptype = [
        { status: 'Select', code: 'Select' },
        { status: 'Father', code: 'Father' },
        { status: 'Mother', code: 'Mother' },
        { status: 'Daughter', code: 'Daughter' },
    ];
   
}

  togglenomineeForm(element: any) {
    if (element.value.value === 'New Nominee') {
      this.shownewnomineeform = true;
      this.showmembernominee = false;
      this.shownonomineeform =false;
    } else if (element.value.value === 'Same As Membership Nominee') {
      this.shownewnomineeform = false;
      this.showmembernominee = true;
      this.shownonomineeform = false;
    } else if (element.value.value === 'No Nominee') {
      this.shownewnomineeform = false;
      this.showmembernominee = false;
      this.shownonomineeform = true;
  
    } else {
      this.shownewnomineeform = false;
      this.showmembernominee = false;
      this.shownonomineeform = false;
    }
  }
}
