import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { applicationConstants } from './applicationConstants';
import { CommonFunctionsService } from './commonfunction.service';



@Component({
  selector: 'commoncomponent',
  template: '<div></div>'
})
export class CommonComponent implements OnInit {

  constructor(private route: Router,
    private spinner: NgxSpinnerService,
    private commonFunctionsService: CommonFunctionsService) { }

  ngOnInit() {

  }

  //status
  public statusList() {
    let statusList = [
      { label: "Active", value: true },
      { label: "In-Active", value: false }
    ]
    return statusList;
  }
  public status() {
    let statusList = [
      { label: "Active", value: 1 },
      { label: "In-Active", value: 0 }
    ]
    return statusList;
  }

  public agentType() {
    let agentType = [
      { label: 'Business Facilitator', value: 1 },
      { label: 'Business Correspondent', value: 2 }
    ]
    return agentType;
  }

  public taskType() {
    let taskType = [
      { label: "Enrollment", value: 1 },
      { label: "Collection", value: 2 }
    ]
    return taskType;
  }

  public commissionType() {
    let commissionType = [
      { label: 'Percentage', value: 1 },
      { label: 'Amount', value: 2 }
    ]
    return commissionType;
  }

  public commissionPaymentFrequency() {
    let commissionPaymentFrequency = [
      { label: "Daily", value: 1 },
      { label: "Bi Monthly", value: 2 },
      { label: "Monthly", value: 3 },
      { label: "Quarterly", value: 4 },
      { label: "Half Yearly", value: 5 },
      { label: "Yearly", value: 6 }
    ]
    return commissionPaymentFrequency;
  }

  public collectionType() {
    let collectionType = [
      { label: "Daily", value: 2 },
      { label: "Weekly", value: 1 },
      { label: "Monthly", value: 0 }
    ]
    return collectionType;
  }

  public genderList() {
    let genderList = [
      { label: 'Male', value: 1 },
      { label: 'Female', value: 2 },
      { label: 'other', value: 3 }
    ]
    return genderList;
  }

  
  public productTypeList() {
    let productTypeList = [
      { label: 'B-class', value: 1 },
      { label: 'C-class', value: 2 },

    ]
    return productTypeList;
  }



  public maritalStatusList() {
    let maritalStatusList = [
      { label: 'Married', value: 1 },
      { label: 'Un-Married', value: 2 },

    ]
    return maritalStatusList;
  }

  public nomineeList() {
    let nomineeList = [
      { label: 'New Nominee', value: 1 },
      { label: 'Same As Membership Nominee', value: 2 },
      { label: 'No Nominee', value: 3 }
    ]
    return nomineeList;
  }  

  public depositTypeList() {
    let depositTypeList = [
      { label: 'FD Non Cummulative', value: 1 },
      { label: 'FD Cummulative', value: 2 },
      { label: 'RD', value: 3},
    ]
    return depositTypeList;
  }

  //static value for present in agent security config
  public securityType() {
    let securityType = [
      { label: 'fd', value: 1 },
      { label: 'sb', value: 2 },

    ]
    return securityType;
  }

  public autoRenewalType() {
    let autoRenewalType = [
      { label: 'Principal', value: 1 },
      { label: 'Total Maturity Amount', value: 2 },
    ]
    return autoRenewalType;
  }


  public interestPaymentFrequency() {
    let interestPaymentFrequency = [
      { label: 'Daily', value: 1 },
      { label: 'Monthly', value: 2 },
      { label: 'Quarterly', value: 3 },
      { label: 'Half Yearly', value: 4 },
      { label: 'Yearly', value: 5 },
      { label: 'On Maturity', value: 6 }
    ]
    return interestPaymentFrequency;
  }
  public lockerType() {
    let lockertypelist = [
      { label: 'Small', value: 1 },
      { label: 'Medium', value: 2 },
      { label: 'Large', value: 3 }
    ]
    return lockertypelist;
  }

  public operationTypes() {
    let operationTypes = [
      { label:'Single', value: 1 },
    { label:'Joint', value: 2 },
    ]
    return operationTypes;
  }

  public financialBankType() {
    let financialBankTypelist = [
      { label: "DCCB", value: 1 },
      { label: "DCCB Branch", value: 2 },
      { label: "Commercial Bank", value: 3 }
    ]
    return financialBankTypelist;
  }
  public rePaymentFrequency() {
    let rePaymentFrequency = [
      { label: 'Daily', value: 1 },
      { label: 'Monthly', value: 2 },
      { label: 'Quarterly', value: 3 },
      { label: 'Half Yearly', value: 4 },
      { label: 'Yearly', value: 5 },
      { label: 'Closing Time', value: 6 }
    ]
    return rePaymentFrequency;
  }


  public requiredlist() {
    let requiredList = [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ]
    return requiredList;
  }

  public collectiontypeList() {
    let collectionTypeList = [
      { label: "Amount", value: 1 },
      { label: "Percentage", value: 2 }
    ]
    return collectionTypeList;
  }

  public chargesCollectionFrequency() {
    let collectionFrquency = [
      { label: 'One Time', value: 1 },
      { label: 'On Demand', value: 2 },
      { label: 'Monthly', value: 3 },
      { label: 'Quarterly', value: 4 },
      { label: 'Halfyearly', value: 5 },
      { label: 'Yearly', value: 6 }
    ]
    return collectionFrquency;
  }
  
  public mandatoryList() {
    let mandatoryList = [
      { label: "Yes", value: 1 },
      { label: "No", value: 0 }
    ]
    return mandatoryList;
  }

  public borrowingTypes() {
    let borrowingTypeList = [
      { label: "PACS Usage", value: 1 },
      { label: "Refinancing to farmers", value: 2}
    ]
    return borrowingTypeList;
  }

  public interestCalculationType() {
    let interestCalculationTypeList = [
      { label: "Simple", value: 1 },
      { label: "Compound", value: 2},
      { label: "Equated Principle", value: 3 },
      { label: "Equated Installment", value: 4}
    ]
    return interestCalculationTypeList;
  }

  public tenureType() {
    let tenureTypeList = [
      { label: "Days", value: 1 },
      { label: "Years", value: 2},
      { label: "Months", value: 3 },
      { label: "DaysMonths", value: 4},
      { label: "DaysYears", value: 5},
      { label: "MonthsYears", value: 6 },
      { label: "DaysMonthsYears", value: 7}
    ]
    return tenureTypeList;
  }
  public collectionApportionType() {
    let collectionApportionTypeList = [
      { label: "Charges", value: 1 },
      { label: "Interest", value: 2},
      { label: "Penal Interest", value: 3 },
      { label: "Principle", value: 4},
    
    ]
    return collectionApportionTypeList;
  }

  public chargesType() {
    let chargesTypeList = [
      { label: "Processing Fee", value: 1 },
      { label: "Documents Fee", value: 2},
      { label: "SMS", value: 3 },
    
    ]
    return chargesTypeList;
  }


  //spinner
  startSpinner() {
    this.spinner.show();
  }
  stopSpinner() {
    this.spinner.hide();
  }
  public orgnizationSettings() {
    let val;
    this.dateFormatesList().map(dateformate => {
      if (null != this.organizationDateFormate() && this.organizationDateFormate() != undefined) {
        if (dateformate.datePipe == this.organizationDateFormate()) {
          val = dateformate;
        }
      }
      else {
        if (dateformate.datePipe == "d/MMM/yyyy") {
          val = dateformate;
        }
      }
    })
    return val;

  }

  public dateFormatesList() {
    let dateFormates = [

      { calendar: 'dd/M/yy', datePipe: 'd/MMM/yyyy', dateFormate: 'DD/MMM/YYYY' + ' (' + 'ex:  ' + '14/Mar/2001' + ')' },
      { calendar: 'dd-M-yy', datePipe: 'd-MMM-yyyy', dateFormate: 'DD-MMM-YYYY' + ' (' + 'ex:  ' + '14-Mar-2001' + ')' },
      { calendar: 'mm/dd/yy', datePipe: 'M/d/yyyy', dateFormate: 'MM/DD/YYY' + ' (' + 'ex:  ' + '03/14/2001' + ')' },
      { calendar: 'M/dd/yy', datePipe: 'MMM/d/yyyy', dateFormate: 'MMM/DD/YYYY' + ' (' + 'ex:  ' + 'Mar/14/2001' + ')' },
      { calendar: 'yy/mm/dd', datePipe: 'yyyy/M/d', dateFormate: 'YYYY/MM/DD' + ' (' + 'ex:  ' + '2001/03/14' + ')' },
      { calendar: 'yy/M/dd', datePipe: 'yyyy/MMM/d', dateFormate: 'YYYY/MMM/DD' + ' (' + 'ex:  ' + '2001/Mar/14' + ')' },

    ]
    return dateFormates;
  }
  public organizationDateFormate() {
    return this.commonFunctionsService.getStorageValue(applicationConstants.ORG_DATE_FORMATE)
  }

  public getTimeStamp() {
    let CurrentDate = new Date();
    let hour = CurrentDate.getHours().toString().padStart(2, '0');
    let mins = CurrentDate.getMinutes().toString().padStart(2, '0');
    let secs = CurrentDate.getSeconds().toString().padStart(2, '0');
    return hour + mins + secs;
  }
  nomineeDateOfBirthCheck(incomingDate:any) {
    let flag = true;
    let dateArr = incomingDate.split('/');
    let year = 0;
    let month = 0;
    let day = 0;
    if (dateArr.length >= 2) {
        year = parseInt(dateArr[2], 10);
        month = parseInt(dateArr[1], 10);
        day = parseInt(dateArr[0], 10);
    }

    if (year < 1850) {
        return flag = false;
    } else {
        return flag = true;
    }
}
newDateValidation(incomingDate:any) {
  let flag = true;
  let dateArr = incomingDate.split('/');
  let year = 0;
  let month = 0;
  let day = 0;
  if (dateArr.length >= 2) {
    year = dateArr[2];
    month = dateArr[1];
    day = dateArr[0];
  }

  if (month > 12 || month == 0 || day == 0 || year == 0 || day > 31) {
    return flag = false;
  }
  else {
    return flag = true;
  }
}

}