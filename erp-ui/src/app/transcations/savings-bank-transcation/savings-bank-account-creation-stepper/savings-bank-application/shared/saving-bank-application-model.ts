export class SavingBankApplicationModel {
  id: any;

  pacsCode: any;

  pacsId: any;

  branchId: any;

  productId: any;

  accountTypeId: any;

  accountNumber: any;

  admissionNumber: any;

  surName: any;

  name: any;

  gender: any;

  age: any;

  dateOfBirth: any;

  dateOfBirthVal: any;

  email: any;

  mobileNumber: any;

  maritalStatus: any;

  accountOpenDate: any;

  accountOpeningDateVal: any

  applicationSignedForm: any;

  relationshipType: any;

  relativeName: any;

  isChequeBookIssued: any;

  isDebitCardIssued: any;

  isEmployee: any;

  ledgerFolioNumber: any;

  societyAccountNumber: any;

  isSameAsPermanentAddress: any;

  accountStatus: any;

  totalBlockAmount: any;

  lastTransactionDate: any;

  lastInterestPostedDate: any;

  dormantedDate: any;

  inActiveDate: any;

  closureDate: any;

  closureCharges: any;

  closureSignedCopy: any;

  remarks: any;

  balance: any;

  productsCountDate: any;

  totalProducts: any;

  status: any;

  statusName: any;

  productName: any;

  accountTypeName: any;

  memberTypeId: any;

  accountStatusName: any;

  kycList: any;

  sbNomineeDTO: any;

  sbJointAccHolderDetailsDTO: any;

  sbGuardianDetailsDTO: any;

  sbCommunicationDTO: any;

  sbCommunicationDTOList: any;

  memberShipBasicDetailsDTO: any;

  groupDetailsDTO: any;

  institutionDTO: any;

  kyc: any;

  sbJointAccHolderDetailsDTOList: any[] = [];

  admissiondateVal: any;

  memberTypeName: any;

  aadharNumber: any;

  panNumber: any;

  serviceTypesList: any[] = [];

  checked: any;

  minBalance : any;

}
export class ProductDefinitionModel {
  id: any;
  productId: any;
  pacsCode: any;
  pacsId: any;
  productName: any;
  accInactiveDays: any;
  accDormantDays: any;
  isInterestPostingAllowed: any;
  isCheckBookIssuingAllowed: any;
  isDebitCardIssuingAllowed: any;
  isChequeBookOperationsAllowed: any;
  minimumBalancePenalty: any;
  minBalMaintainWithCheque: any;
  minBalMaintainWithoutCheque: any;
  effectiveStartDate: any;
  effectiveEndDate: any;
  status: any;
  remarks: any;
  statusName: any;

}


