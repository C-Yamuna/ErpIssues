export class NewMembershipAdd {

     id:any;

     memberTypeId:any;
    
     memberTypeName:any;

	 surname:any;

     name:any;

     dob:any;

     dobVal:any;

      age:any;

     genderId:any;
    
     genderName:any;

	 martialId:any;
	
	 maritalStatusName:any;

	 relationId:any;
	
	 relationName:any;

	 relativeName:any;

     qualificationId:any;
    
     qualificationName:any;

	 occupationId:any;
	
	 occupationName:any;

	 aadharNumber:any;

     panNumber:any;

     mobileNumber:any;

     emailId:any;

     casteId:any;
    
     casteName:any;

	 communityId:any;
	
	 communityName:any;

	 mcrNumber:any;

     admissionDate:any;

     admissionDateVal:any

     admissionNumber:any;
    
     tempAdmissionNumber:any;

     admissionFee:any;

      memStatus:any;
    
     memStatusName:any;

	 memStartDate:any;

      isMemClosed:any;

     closureComments:any;

     pacsId:any;

     pacsCode:any;

     memClosingDate:any;

     shareCapita:any;

     branchId:any;

     surnameLocalLang:any;

     nameLocalLang:any;

      isMinor:any;

     totalLandInUnits:any;

     totalLandInSubUnits:any;

     dependentsCount:any;

     assetCount:any;

      isNominee:any;
    
      isStaff:any;
    
     photoPath:any;
    
      status:any;
    
     statusName:any;
    
    fdCummulativeAccountsDTOList:any;
    
     fdNonCummulativeAccountsDTOList:any;
    
   rdAccountsDTOList:any;
    
     memberShipKycDetailsDTOList:any;

     kycDetailsList:any;
    
     fdNonCummkycDetailsList:any;
    
     fdCummkycDetailsList:any;
    
     fdNonCummCommunicationDto:any;
    
     fdCummCommunicationDto:any;

     fdCummulativeAccId: any;

     accountNumber: any;

     signatureCopyPath:any

     multipartFileListForsignatureCopyPath:any;

     multipartFileListForPhotoCopy:any;

     isNewMember:any;

     isKycApproved?: any;

     relationTypeName?: any;

     filesDTOList?: any;

     signaturePath?: any;

}

export class MemberGroupDetailsModel{

    id: any;

    memberTypeId: any;
  
    groupName: any;

    registrationDate: any;

    registrationDateVal:any;

    registrationNumber: any;

    groupTypeId: any;

    admissionDate: any;

    admissionDateVal:any;

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
  
    status: any;
  
    statusName: any;
  
    groupPromoterList: any;
  
    groupStatusName: any;
  
   fdCummkycDetailsList: any;
  
   fdCummCommunicationDto: any;

   isNewMember:any;

   groupKycList?:any;

   isKycApproved?: any;

   filesDTOList?: any;

   signaturePath?: any;

   photoPath?: any;

   pocNumber?:any;

   pocName?: any;
}

export class MembershipInstitutionDetailsModel {

    id:any;

    memberTypeId:any;
  
    institutionName: any;

    registrationDate:any;

    registrationDateVal:any;

    registrationNumber:any;

    admissionDate:any;

    admissionDateVal:any;

    admissionNumber:any;
  
    tempAdmissionNumber:any;

    name:any;

    mobileNumber:any;

    panNumber:any;

    pan:any;

    gstNumber:any;

    tanNumber:any;

    institution:any;

    status:any;

    pacsId:any;

    pacsCode:any;

    isInstAccountClosed:any;

    closureDate:any;

    closureComments:any;

    incorporationTypeId:any;

    branchId:any;

    emailId:any;

    promoterCount:any;
      
    memberTypeName:any;
  
    statusName:any;
  
    institutionPromoterList:any;
  
    isInstAccountClosedName:any;
  
   fdCummkycDetailsList:any;
  
  fdCummCommunicationDto:any;

  isNewMember:any

  institutionKycDetailsDTOList?: any;

  isKycApproved?:any

  filesDTOList?: any;

  signaturePath?: any;

  photoPath?: any;

  pocNumber?:any;

  pocName?: any;
}

export class GroupPromoterDetailsModel {
    id: any;
  
    groupId: any;
  
    operatorTypeId: any;
  
    surname: any;
  
    name: any;
  
    dob: any;
  
    memDobVal:any;
  
    age: any;
  
    aadharNumber: any;
  
    mobileNumber: any;
  
    emailId: any;
  
    docFilePath: any;
  
    pacsId: any;
  
    pacsCode: any;
  
    startDate: any;
  
    startDateVal: any;
  
    genderId: any;
  
    martialId: any;
  
    endDate: any;
  
    branchId: any;
  
    isGroupLeader: any;
  
    operatorTypeName: any;
  
    genderName: any;
  
    maritalStatusName: any;
  
    filesDTO: any;
  }

  export class InstitutionPromoterDetailsModel{
     id:any;

     institutionId:any;

     operatorTypeId:any;

      surname:any;

      name:any;

     dob:any;

     age:any;

     genderId:any;

     martialId:any;

      aadharNumber:any;

      mobileNumber:any;

      emailId:any;

      docFilePath:any;

     pacsId:any;

      pacsCode:any;

     startDate:any;

     endDate:any;

     branchId:any;
    
      operatorTypeName:any;
    
      genderTypeName:any;
    
      maritalStatusName:any;
    
     filesDTO:any;
     
}
