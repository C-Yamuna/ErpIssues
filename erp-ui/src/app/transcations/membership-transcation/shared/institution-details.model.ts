export class InstitutionBasicDetailsModel{
      id: any;

      memberTypeId: any;

      institutionName: any;

      registrationDate: any;

      registrationNumber: any;

      admissionDate: any;

      admissionDateVal: any;

      registrationDateVal: any;

      admissionNumber: any;

      name: any;

      mobileNumber: any;

      panNumber: any;

      pan: any;

      gstNumber: any;

      tanNumber: any;

      institutionStatus: any;

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

      institutionCommunicationDTOList: any;

      institutionKycDetailsDTOList: any;

      institutionPromoterList: any;

      institutionPromoterKycDetailsList: any;

      filesDTOList: any;

      approvedComments: any;

      approvedBy: any;

      approvedOn: any;

      statusName: any;

      memStatusChangedDate: any;

      isKycCompleted: any;

      subProductId: any;

      subProductName: any;

      memberClassType: any;

      memberClassTypeName: any;

      status: any;

      pocNumber: any;

      pocName: any;

      multipartFileListForPhotoCopy: any;

      resolutionNumber: any;

      resolutionCopyPath: any;

      applicationCopyList: any;

      applicationCopyPath: any;

}

export class InstituteCommunicationModel{

      id:any;

      institutionId:any;

      stateId:any;

      districtId:any;

      villageId:any;

      subDistrictId:any;

      address1:any;

      address2:any;

      pinCode:any;

     isSameAddress:any;

     permanentStateId:any;

      permanentDistrictId:any;

     permanentSubDistrictId:any;

      permanentVillageId:any;

      permanentAddress1:any;

      permanentAddress2:any;

      permanentPinCode:any;

      pacsId:any;

      pacsCode:any;

     branchId:any;
     
     stateName:any;
     
      districtName:any;
     
      subDistrictName:any;
     
      villageName:any;
     
      permanentStateName:any;
     
      permanentDistrictName:any;
     
      permanentSubDistrictName:any;
     
      permanentVillageName:any;
     
      status:any;
     
      statusName:any;
}

export class InstiteKycDetailsModel{
      id:any;

      institutionId:any;

      kycDocumentTypeId:any;

     documentNumber:any;

     nameAsPerDocument:any;

     kycFilePath:any;

      isDocVerified:any;

      pacsId:any;

     pacsCode:any;

      branchId:any;
    
     kycDocumentTypeName:any;
    
     filesDTO:any;

    multipleFilesList:any

    status:any;

}
export class InstitutePromoterDetails{
     id:any;

     institutionId:any;

     operatorTypeId:any;

      surname:any;

      name:any;

     dob:any;

     memDobVal:any;

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
    
      uploadSignature:any;
 
      uploadImage:any;
    
      filesDTOList:any;
    
      multipartFileListForPhotoCopy:any;
  
      multipartFileListForsignatureCopyPath:any;

      authorizedSignatory:any;

      authorizedSignatoryName:any;
}