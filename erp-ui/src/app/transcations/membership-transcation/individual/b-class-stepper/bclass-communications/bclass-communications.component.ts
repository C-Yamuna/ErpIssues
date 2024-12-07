import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bclass-communications',
  templateUrl: './bclass-communications.component.html',
  styleUrls: ['./bclass-communications.component.css']
})
export class BclassCommunicationsComponent {
  cities: any[] | undefined;
  communicationform: FormGroup;
  checked: boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder,)
  { 
    this.communicationform = this.formBuilder.group({
     
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
