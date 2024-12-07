import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type stepperDataModel = {
  stepperIndex?: number;
  data?: any;
  formValid?: boolean,
  method?:any;
  savedId?:any;
  url?: string;
  isObjChanged?:boolean;
  isDisable?:boolean;
  showFile?:boolean;
} | null;



@Injectable({
  providedIn: 'root'
})
export class MemberBasicDetailsStepperService {
  private membershipStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.membershipStepper.asObservable();

  constructor() { }

  changeData(data: stepperDataModel) {
    this.membershipStepper.next(data)
  }
}
