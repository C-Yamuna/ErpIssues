
export class IndividualMemberDetailsModel{
    id: any;

    aadharFilePath: any;

    aadharNumber: any;

    admisionFee: any;

    name: any;

    surname: any;

    casteId: any;

    closingDate: any;

    comments: any;

    communityId: any;

    deathCertificatePath: any;

    deathDate: any;

    dob: any;

    emailId: any;

    farmerType: any;

    maritalStatus: any;

    memberCode: any;

    memberId: any;

    memberType: any;
  
    memberTypeName: any;

    mobileNumber: any;

    occupationId: any;
  
    occupationName: any;

    admissionDate: any;

    pancardFilePath: any;

    photoFilePath: any;

    qualificationId: any;

    signatureFilePath: any;

    pacsId: any;

    pacsCode: any;

    branchId: any;

    status: any;

    dobVal: any;

    admissionDateVal: any;

    realtionTypeName: any;

    gender: any;

    genderId: any;

    age: any;

    qualificationName: any;

    casteName: any;

    relativeName: any;

    relationId: any;

    admissionNumber:any;

    memberShipCommunicationDetailsDTOList: any;

    saoLoanCommunicationDetailsDTOList: any;

    memberShipKycDetailsDTOList: any;

    photoCopyPath:any;

    signatureCopyPath :any;

    isKycApproved : any;

    multipartFileListForPhotoCopy :any;

    multipartFileListForsignatureCopyPath :any;

    panNumber: any;

    maritalStatusName: any;

    relationTypeName: any;

}
export class MemberShipGroupDetailsModel{
    id: any;

    memberTypeId: any;

    groupName: any;

    registrationDate: any;

    registrationNumber: any;

    groupTypeId: any;

    admissionDate: any;

    admissionNumber: any;
  
    tempAdmissionNumber: any;

    name: any;

    mobileNumber: any;

    emailId: any;

    panNumber: any;

    gstNumber: any;

    tanNumber: any;

    groupStatus: any;

    isGroupClosed: any;

    closureDate: any;

    closureComments: any;

    promoterCount: any;

    pacsId: any;

    pacsCode: any;

    branchId: any;
  
    memberTypeName: any;
  
    groupStatusName: any;
  
    status: any;
  
    statusName: any;
  
    groupPromotersDTOList: any [] = [];

    registrationDateVal: any;

    admissionDateVal: any;

    pocName: any;

    memberShipCommunicationDetailsDTOList: any;

    groupCommunicationList: any;

    groupKycList: any;

    isKycCompleted: any;
   
}
export class MemInstitutionModel{
    id: any;

    memberTypeId: any;

    institutionName: any;

    registrationDate: any;

    registrationNumber: any;

    admissionDate: any;

    admissionNumber: any;
  
    tempAdmissionNumber: any;

    name: any;

    mobileNumber: any;

    panNumber: any;

    pan: any;

    gstNumber: any;

    tanNumber: any;

    institution: any;

    status: any;

    pacsId: any;

    pacsCode: any;

    isInstAccountClosed: any;

    closureDate: any;

    closureComments: any;

    incorporationTypeId: any;

    branchId: any;

    emailId: any;

    promoterCount: any;
      
    memberTypeName: any;
  
   institutionPromoterDetailsDTOList: any [] = [];
  
    statusName: any;
  
    isInstAccountClosedName: any;

    registrationDateVal: any;

    admissionDateVal: any;

    pocName: any;

    institutionCommunicationDTOList: any[] = [];

    isKycCompleted: any;

    pocNumber: any;
}
export class GroupPromotersModel{
    id: any;

    groupId: any;

    operatorTypeId: any;

    surname: any;

    name: any;

    dob: any;

    age: any;

    aadharNumber: any;

    mobileNumber: any;

    emailId: any;

    docFilePath: any;

    pacsId: any;

    pacsCode: any;

    startDate: any;

    genderId: any;

    martialId: any;

    endDate: any;

    branchId: any;

    isGroupLeader: any;
  
    operationTypeName: any;
  
    genderName: any;
  
    maritalStatusName: any;
  
    status: any;
  
    statusName: any;

    startDateVal: any;
}
export class InstitutionPromoterDetailsModel{
    id: any;

    institutionId: any;

    operatorTypeId: any;

    surname: any;

    name: any;

    dob: any;

    age: any;

    genderId: any;

    martialId: any;

    aadharNumber: any;

    mobileNumber: any;

    emailId: any;

    docFilePath: any;

    pacsId: any;

    pacsCode: any;

    startDate: any;

    endDate: any;

    branchId: any;
  
    operatorTypeName: any;
  
    genderTypeName: any;
  
    maritalStatusName: any;
  
    status: any;
  
    statusName: any;

    startDateVal: any;

}