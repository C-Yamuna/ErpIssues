export class SaoLoanApplication {
    id: any;

    pacsId: any;

    pacsCode: any;

    branchId: any;

    saoProductId: any;

    operationTypeId: any;

    operationTypeName: any;

    sanctionAmount: any;

    accountNumber: any;

    admissionNo: any;

    admissionNoAsperLedger: any;

    applicationDate: any;

    applicationDateVal: any;

    sanctionDate: any;

    fatherSpouseName: any;

    ledgerFolioNumber: any;

    cropType: any;

    cropTypeName: any;

    surveyNo: any;

    totalLandUnits: any;

    toatlLandSubUints: any;

    accountStatus: any;

    foreclosureDate: any;

    loanPeriod: any;

    loanDueDate: any;

    loanDueDateVal: any;

    loanApprovedDate: any;

    plannedDisbursements: any;

    remarks: any;

    minLoanPeriod: any;

    maxLoanPeriod: any;

    applicationPath: any;

    completedDisbursements: any;

    insuranceApplicable: any;

    cropInsuranceNumber: any;

    paisNumber: any;

    acNoAsperLedger: any;

    isKycCompleted: any;

    requestedAmount: any;

    effectiveRoi: any;

    memberName: any;

    dccbAccountNumber: any;

    seasonType: any;

    seasonTypeName: any;

    purposeId: any;

    purposeName: any;

    villageId: any;

    villageName: any;

    soilType: any;

    soilTypeName: any;

    totalDisbursedAmount: any;

    landType: any;

    landTypeName: any;

    totalOutstandingAmount: any;
  
    filesDTO: any;
  
    statusName: any;
  
    gender: any;
  
    loanMortgageDetailsDTOList:any[] = [];

    saoLoanKycDetailsDTOList: any[] = [];
  
    collateralType: any;
  
    accountStatusName: any;
  
    foreclosureFilePath: any;
  
    saoProductName: any;
  
    memberTypeId: any;

    memberTypeName: any;
  
   saoLoanCommunicationDTO: any;
  
    saoChargesCollectionDetailsDTOList:any[] = [];

    saoOtherLoanDetailsDTOList: any[] = [];
  
   saoLoanNomineeDetailsDTO: any;
  
   saoLoanGuarantorDetailsDTOList:any[] = [];
  
   //saoLoanInsuranceDetailsDTOList: any;
   saoLoanInsuranceDetailsDTO: any;
  
   saoLoanAppraiserDetailsDTOList: any;
  
    saoFieldVerificationDetailsDTOList:any[] = [];
  
    saoLoanDisbursementScheduleDTOList:any[] = [];
  
    saoLoanGenealogyTreeDTOList:any[] = [];
  
    saoLoanDocumentsDetailsDTOList:any[] = [];
  
   saoLoanLandMortageDetailsDTOList:any[] = [];
  
  // memberShipBasicDetailsDTO: any;

   individualMemberDetailsDTO: any;
  
   memberGroupDetailsDTO: any;
  
   memberInstitutionDTO: any;

   repaymentFrequency: any;

   penalInterest: any;

   iod: any;

   cgstAmount:any;

   sgstAmount: any;

   igstAmount: any;

   totalCharges: any;
  
   saoLoanJointMemsDetailsDTOList:any[] = [];
}
export class SaoOtherLoanDetailsModel {
   
    id: any;

    pacsId: any;

    branchId: any;

    saoProductId: any;

    saoLoanApplicationId: any;

    bankName: any;

    acNo: any;

    dueDate: any;

    loanAmount: any;

    dueAmount: any;
  
    productName: any;

}
export class SaoLoanInsuranceDetailsModel {
    id: any;

    pacsId: any;

    branchId: any;

    saoProductId: any;

    saoLoanApplicationId: any;

    cropId: any;

    policyName: any;

    sumInsured: any;

    policyNumber: any;

    premium: any;

    insuranceType: any;

    vendorId: any;
  
    remarks: any;
  
    productName: any;
  
    cropName: any;
}
export class SaoLoanGuarantorDetailsModel {
    id: any;

    pacsId: any;

    branchId: any;

    saoLoanApplicationId: any;

    admissionNo: any;

    name: any;

    fatherSpouseName: any;

    mobileNumber: any;

    email: any;

    aadharNo: any;

    panNo: any;

    occupation: any;

    income: any;

    officeAddress: any;

    commAddress: any;

    panPath: any;

    aadharPath: any;

    employeeIdentityPath: any;

    status: any;
}
export class SaoLoanGenealogyTreeModel {
    id: any;

    saoLoanApplicationId: any;

    name: any;

    relationWithApplicant: any;

    applicantAdmissionNo: any;

    remarks: any;
}
export class MemberShipBasicDetailsModel {
    id: any;

    memberTypeId: any;
  
    memberTypeName: any;

    surname: any;

    name: any;

    dob: any;

    age: any;

    genderId: any;
  
    genderName: any;

    martialId: any;
  
    maritalStatusName: any;

    relationId: any;
  
    relationName: any;

    relativeName: any;

    qualificationId: any;
  
    qualificationName: any;

    occupationId: any;
  
    occupationName: any;

    aadharNumber: any;

    panNumber: any;

    mobileNumber: any;

    emailId: any;

    casteId: any;
  
    casteName: any;

    communityId: any;
  
    communityName: any;

    mcrNumber: any;

    admissionDate: any;

    admissionNumber: any;
  
    tempAdmissionNumber: any;

    admissionFee: any;

    memStatus: any;
  
    memStatusName: any;

    memStartDate: any;

    isMemClosed: any;

    closureComments: any;

    pacsId: any;

    pacsCode: any;

    memClosingDate: any;

    shareCapital: any;

    branchId: any;

    surnameLocalLang: any;

    nameLocalLang: any;

    isMinor: any;

    totalLandInUnits: any;

    totalLandInSubUnits: any;

    dependentsCount: any;

    assetCount: any;

    isNominee: any;
}
export class SaoLoanLandMortageDetailsModel {
    id: any;

    saoLoanApplicationId : any;

    admissionNo: any;

    landUnits: any;

    landSubUnits: any;

    value: any;

    remarks: any;

    passbookNumber: any;

    surveyNo: any;

    documentPath: any;

    declaredLandUnits: any;

    declaredLandSubUnits: any;

    landType: any;
}
