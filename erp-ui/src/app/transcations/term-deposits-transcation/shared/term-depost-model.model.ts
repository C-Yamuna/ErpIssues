export class TermDepostModel {
}

export class RdAccountsModel {

    id: any;

    rdAccId: any;

    pacsId: any;

    pacsCode: any;

    adminssionNumber: any;

    branchId: any;

    rdProductId: any;

    rdProductName: any;

    accountType: any;

    memberType: any;

    memberTypeName: any;

    accountNumber: any;

    depositAmount: any;

    depositDate: any;

    tenureInDays: any;

    tenureInMonths: any;

    tenureInYears: any;

    roi: any;

    age:any;

    minDepositAmount: any;

    maxDepositAmount: any;

    maxTenure: any;

    minTenure: any;

    penalRoi: any;

    foreClosureRoi: any;

    installmentFrequency: any;

    installmentAmount: any;

    noOfInstallments: any;

    maturityInterest: any;

    excessPaidMaturityInterest: any;

    maturityAmount: any;

    maturityAmountTransactionMode: any;

    transferToAccount: any;

    signedCopyPath: any;

    foreClosureReqSignedCopy: any;

    depositBondCopyPath: any;

    isSameAsPermanentAddress: any;

    isForeClosure: any;

    isLoanAvailable: any;

    loanAvailableInterest: any;

    loanAmount: any;

    foreClosureMaturityIntrestAmount: any;

    foreClosureMaturityAmount: any;

    lastInterestPostedDate: any;

    maturityDate: any;

    closureDate: any;

    status: any;

    productName: any;

    rdAccountCommunicationDTOList: any;

    termAccountGaurdianList: any;

    rdAccountKycList: any;

    termAccountNomineeList: any;

    memberShipBasicDetailsDTO: any;

    memberShipGroupDetailsDTO: any;

    memInstitutionDTO: any;

    tdJointAccHolderDetailsDTOList: any;

    termAccountsTransactionDTOList: any;

    termAccountInstallmentsDTOList: any;

    statusName: any;

    rdAccountsTransactionDTO: any;

    isDeathClaim: any;

    remarks: any;

    sbInterest: any;

    isRenewal: any;

    renewalCount: any;

    previousAccountId: any;

    renewalType: any;

    noOfInstallmentsPaid: any;

    accountTypeName: any;

    isNewMember: any;

    passbookNumber: any;

    passbookCopy: any;

    filesDTOList: any;

    rdAccountCommunicationDTO: any;

    rdAccountKyc: any;

    ledgerFolioNumber: any;

    societyAccountNumber: any;

    resolutionNumber: any;

    fdCummulativeProductDefinitionDTO: any;

    FdNonCummulativeProductDefinitionDTO: any;

    rdProductDefinitionDTO: any;

    securityTypeId: any;

    securityTypeName:any;

    tempDepositDate: any;

    rdRequiredDocumentDetailsDTOList:any

    multipartFileList:any
}

export class RdAccountCommunication {

    id: any;

    rdAccId: any;

    stateId: any;

    districtId: any;

    villageId: any;

    subDistrictId: any;

    address1: any;

    address2: any;

    pinCode: any;

    isSameAddress: any;

    permanentStateId: any;

    permanentDistrictId: any;

    permanentSubDistrictId: any;

    permanentVillageId: any;

    permanentAddress1: any;

    permanentAddress2: any;

    permanentPinCode: any;

    pacsId: any;

    pacsCode: any;

    branchId: any;

    stateName: any;

    districtName: any;

    subDistrictName: any;

    villageName: any;

    permanentStateName: any;

    permanentDistrictName: any;

    permanentSubDistrictName: any;

    permanentVillageName: any;

    status: any;

    admissionNumber: any;

    statusName: any;

    memberType: any;

    memberTypeName: any;

    memberId: any;

    accountNumber:any;

    rdProductId:any;

}

export class RdProductDefinition {
    id:any;

    rdProductId:any;

    pacsCode:any;

    pacsId:any;

    name:any;

    minDepositAmount:any;

    maxDepositAmount:any;

    minTenure:any;

    maxTenure:any;

    isAutoRenewal:any;

    previousRoiConsiderableDays:any;

    sbRoiConsiderableDays:any;

    effectiveStartDate:any;

    effectiveEndDate:any;

    status:any;

    remarks:any;
  
    ledgerFolioNumber:any;
      
    resolutionNumber:any;

    roi:any;

    intestPolicyConfigList:any;

    requiredDocumentsConfigList:any;

}


export class RdAccountGuardian {

    id:any;

    rdProductId:any;

    rdAccId:any;

    gaurdianType:any;

    guardianTypeName:any;

    relationshipTypeId : any;

    surName:any;

    guardianName: any;

    gender:any;

    marritalStatus:any;

    dateOfBirth:any;

    age:any;

    identityProofDocType:any;

    identityProofDocNumber:any;

    identityProofDocPath:any;

    addressProofDocType:any;

    addressProofDocNumber:any;

    addressProofDocPath:any;

    uploadFilePath:any;

    status:any;

    relationshipTypeName:any;

    identityProofDocTypeName:any;

    addressProofDocTypeName:any;

    accountNumber:any;

    guardianAadharNumber:any;

    address:any;

    guardianEmailId: any;

    guardianMobileNumber : any;

    countryId:any;

    countryName:any;

    stateId:any;

    stateName:any;

    districtId:any;

    districtName:any;

    mandalId:any;

    mandalName:any;

    villageId:any;

    villageName:any;

    genderName:any;

    maritalStatusName:any;

    effectiveStartDate:any;

    effectiveEndDate:any;

    statusName:any;

    productName:any;

    guardainMultipartList: any;

    filesDTOList:any;

    remarks:any;
}

export class RdRequiredDocuments {

id:any

rdAccId:any

accountNumber:any

operatorType:any

requiredDocumentTypeId:any

documentNumber:any

requiredDocumentFilePath:any

status:any

requiredDocumentTypeName:any

filesDTOList:any

statusName:any

admissionNumber:any

memberId:any

memberType:any

memberTypeName:any

effStartDate:any

effEndDate:any

isNewMember:any

productId:any

productName:any

multipartFileList:any;

}

export class RdJointHolder {

    id: any;

    rdAccId: any;

    accountNumber: any;

    admissionNumber: any;

    surName: any;

    name: any;

    dateOfBirth: any;

    age: any;

    gender: any;

    maritalStatus: any;

    email: any;

    mobileNumber: any;

    status: any;

    statusName: any;

    rdAccountCommunicationDTO: any;

    memberShipBasicDetailsDTO: any;

    memberShipGroupDetailsDTO: any;

    memInstitutionDTO: any;

    jointHolderList: any;
}

