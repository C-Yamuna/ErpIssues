export class ViewSavingBankModel {

   id:any;

    pacsCode:any;

    pacsId:any;

    branchId:any;

    productId:any;

    accountTypeId:any;
    
    accountNumber:any;

    admissionNumber:any;

    surName:any;

   name:any;
    
    gender:any;
    
    age:any;
    
    dateOfBirth:any;
    
    email:any;
    
    mobileNumber:any;
    
    maritalStatus:any;
    
    accountOpenDate:any;

    applicationSignedForm:any;
    
    relationshipType:any;
    
    relativeName:any;
    
    isChequeBookIssued:any;
    
    isDebitCardIssued:any;

    isEmployee:any;
    
   ledgerFolioNumber:any;
    
    societyAccountNumber:any;
    
    isSameAsPermanentAddress:any;
    
    accountStatus:any;
    
    totalBlockAmount:any;
    
    lastTransactionDate:any;
    
    lastInterestPostedDate:any;

    dormantedDate:any;

    inActiveDate:any;
   
    closureDate:any;
    
    closureCharges:any;
    
    closureSignedCopy:any;
    
    remarks:any;
    
    balance:any;
    
    productsCountDate:any;
    
    totalProducts:any;
    
    status:any;
    
    statusName:any;
    
    productName:any;
    
    accountTypeName:any;
    
    memberTypeId:any;
    
   accountStatusName:any;
    
     kycList:any;
    
    sbNomineeDTO:any;
    
    sbJointAccHolderDetailsDTO:any;
    
    sbGuardianDetailsDTO:any;
    
    sbCommunicationDTO:any;
    
    sbCommunicationDTOList :any;
    
    memberShipBasicDetailsDTO:any;
    
    groupDetailsDTO:any;
    
   institutionDTO:any;
    
    kyc :any;
    
    sbJointAccHolderDetailsDTOList :any[] = [];

    admissiondateVal : any;

    memberTypeName : any;

    aadharNumber : any;

    panNumber : any;

    minBalance : any;
    
    accountOpenDateVal : any;

    sbAccountServicesOptedDTOList : any[] = [];

    requiredDocumentDetailsDTOList: any;

}
export class CommunicationDetailsModel {

  id: any;

  sbAccId: any;

  memberType: any;

  memberTypeName: any;

  poperatorType: any;

  memberId: any;

  admissionNumber: any;

  isNewMember: any;

  stateId: any;

  stateName: any;

  districtId: any;

  districtName: any;

  subDistrictId: any;

  subDistrictName: any;

  villageId: any;

  villageName: any;

  address1: any;

  address2: any;

  pincode: any;

  isSameAddress: any;

  permntStateId: any;

  permntDistrictId: any;

  permntSubDistrictId: any;

  permntVillageId: any;

  permenentStateName : any;
  
  permenentDistrictName: any;
  
  permenentSubDistrictName: any;
  
  permenentVillageName: any;

  permntAddress1: any;

  permntAddress2: any;

  permntPincode: any;

  pacsId: any;

  pacsCode: any;

  branchId: any;

  status: any;

  
}
export class KycDetailsModel {

  id : any; 

	sbAccId: any;

	accountNumber: any;

	operatorType: any;

	docTypeId: any;

	docNumber: any;

	docPath: any;

	status: any;

	docTypeName: any;

	filesDTOList: any;

	statusName: any;
	
	admissionNumber: any;

	memberId: any;
	
	memberType: any;
	
	effStartDate: any;

    effEndDate: any;

}
export class NomineeDetailsModel {

  id : any;
    
     sbAccId: any;
    
     accountNumber: any;
    
     relationshipTypeId: any;
    
     surname: any;

    name: any;

     nominatedDate: any;
    
     nomineeEmail: any;

    nomineeType: any;

     CountryId: any;
    
     StateId: any;
    
     DistrictId: any;
    
     MandalId: any;
    
     VillageId: any;
    
     address: any;

     aadharNumber: any;

     age: any;

    dateOfBirth: any;

     maritalStatus: any;
    
     Gender: any;
    
     mobileNumber: any;

     identityProofTypeId: any;
    
     identityProofNumber: any;
    
     identityProofCopyPath: any;

     addressProofTypeId: any;
    
     addressProofNumber: any;
    
     addressProofCopyPath: any;
    
     signedNomineeForm: any;

     status: any;

     relationshipTypeName: any;
    
    countryName: any;
    
     stateName: any;
    
     districtName: any;
    
     mandalName: any;
    
     villageName: any;
    
     statusName: any;
    
     effStartDate: any;

    effEndDate: any;

    nomineeSighnedFormMultiPartList :any;

    nomineeTypeName: any;

    remarks : any;

}

