export class MemberGroupBasicDetails {

  id: any;

  memberTypeId: any;

  groupName: any;

  registrationDate: any;

  registrationDateVal: any;

  registrationNumber: any;

  groupTypeId: any;

  admissionDate: any;

  admissionDateVal: any;

  admissionNumber: any;

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

  groupCommunicationList: any;

  groupKycList: any;

  groupPromoterList: any;

  groupPromoterKycDetailsList: any;

  statusName: any;

  groupTypeName: any;

  memberTypeName: any;

  approvedComments: any;

  approvedBy: any;

  approvedOn: any;

  subProductId: any;

  subProductName: any;

  isKycCompleted: any;

  memStatusChangedDate: any;

  memberClassType:any;

  memberClassTypeName:any;

  status:any;
	
	pocNumber:any;
	
	pocName:any;

  applicationCopyPath :any;

  filesDTOList:any;
  
  multipartFileListForsignatureCopyPath:any;

  applicationCopyList:any;

  resolutionNumber:any;

  resolutionCopyPath:any;
	
}
export class GroupCommunicationModel {
  id: any;

  groupId: any;

  stateId: any;

  districtId: any;

  subDistrictId: any;

  villageId: any;

  address1: any;

  address2: any;

  pincode: any;

  isSameAddress: any;

  permanentStateId: any;

  permanentDistrictId: any;

  permanentSubDistrictId: any;

  permanentVillageId: any;

  permanentAddress1: any;

  permanentAddress2: any;

  permanentPincode: any;

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

}
export class GroupKycDeatilsModel {
  id: any;

  groupId: any;

  kycDocumentTypeId: any;

  documentNumber: any;

  nameAsPerDocument: any;

  kycFilePath: any;

  isDocVerified: any;

  pacsId: any;

  pacsCode: any;

  branchId: any;

  kycDocumentTypeName: any;

  filesDTO: any;

  multipleFilesList:any

  status:any
	    
  statusName:any
  
  approvedOn:any
}

export class promoterDetailsModel {
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

  genderTypeName: any;

  maritalStatusName: any;

  filesDTO: any;

  uploadSignature:any;
 
  uploadImage:any;

  filesDTOList:any;

  multipartFileListForPhotoCopy:any;
  
  multipartFileListForsignatureCopyPath:any;

  authorizedSignatory:any;

  authorizedSignatoryName:any;
}

