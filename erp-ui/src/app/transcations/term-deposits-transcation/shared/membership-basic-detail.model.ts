    export class MembershipBasicDetail {

        id: any;

        memberTypeId: any;

        memberTypeName: any;

        surname: any;

        name: any;

        dob: any;

        dobVal: any;

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

        admissionDateVal: any;

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

        isStaff: any;

        photoPath: any;

        signaturePath: any;

        status: any;

        statusName: any;

        fdCummulativeAccountsDTOList: any;

        fdNonCummulativeAccountsDTOList: any;

        rdAccountsDTOList: any;

        memberShipKycDetailsDTOList: any;

        kycDetailsList: any;

        fdNonCummkycDetailsList: any;

        fdCummkycDetailsList: any;

        fdNonCummCommunicationDto: any;

        fdCummCommunicationDto: any;

        rdAccountCommunicationDTO: any;

        isNewMember: any;

        filesDTOList: any;

        isKycApproved: any;

        photoCopyPath: any;

        signatureCopyPath: any

        multipartFileListForsignatureCopyPath: any;

        multipartFileListForPhotoCopy: any;

        relationTypeName?: any;

    }



    export class MemberGroupDetailsModel {

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

        groupPromotersDTOList:any;

        isNewMember: any;

        isKycApproved?: any;

        signaturePath?: any;

        photoCopyPath?: any;


    }
    export class MembershipInstitutionDetailsModel {

        id: any;

        memberTypeId: any;

        institutionName: any;

        registrationDate: any;

        registrationDateVal: any;

        registrationNumber: any;

        admissionDate: any;

        admissionDateVal: any;

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

        statusName: any;

        institutionPromoterDetailsDTOList: any;

        isInstAccountClosedName: any;

        fdCummkycDetailsList: any;

        fdCummCommunicationDto: any;

        isNewMember: any

        institutionKycDetailsDTOList?: any;

        isKycApproved?: any

        filesDTOList?: any;

        signaturePath?: any;

        photoCopyPath?: any;

        pocName:any;

        pocNumber:any;

        institutionPromoterList:any;

    }
    export class promoterDetailsModel {
        id: any;

        groupId: any;

        operatorTypeId: any;

        surname: any;

        name: any;

        dob: any;

        memDobVal: any;

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
    export class InstitutionPromoterDetailsModel {
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

        filesDTO: any;

    }

    export class GroupPromoterDetailsModel {
        id: any;

        groupId: any;

        operatorTypeId: any;

        surname: any;

        name: any;

        dob: any;

        memDobVal: any;

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

    export class RdKycModel {

        id: any;

        rdAccId: any;

        accountNumber: any;

        operatorType: any;

        kycDocumentTypeId: any;

        documentNumber: any;

        kycFilePath: any;

        status: any;

        docTypeName: any;

        filesDTOList: any;

        statusName: any;

        admissionNumber: any;

        memberId: any;

        memberType: any;

        effStartDate: any;

        effStartDateVal: any;

        effEndDate: any;

        effEndDateVal: any;

        multipartFileList: any;

        memberTypeName: any;

        kycDocumentTypeName: any;

        isNewMember: any;

        isKycApproved: any;

    }

    export class RdAccountNominee {
        id: any;

        rdProductId: any;

        rdAccId: any;

        nomineeType: any;

        nomineeTypeName:any;

        relationTypeId: any;

        surName: any;

        nomineeName: any;

        gender: any;

        marritalStatus: any;

        dateOfBirth: any;

        age: any;

        identityProofDocType: any;

        identityProofDocNumber: any;

        identityProofDocPath: any;

        addressProofDocType: any;

        addressProofDocNumber: any;

        addressProofDocPath: any;

        nomineeFilePath: any;

        status: any;

        relationTypeName: any;

        identityProofDocTypeName: any;

        addressProofDocTypeName: any;

        accountNumber: any;

        nominatedDate: any;

        nomineeEmailId: any;

        address: any;

        nomineeAadharNumber: any;

        nomineeMobileNumber: any;

        genderName: any;

        maritalStatusName: any;

        effectiveStartDate: any;

        effectiveEndDate: any;

        statusName: any;

        productName: any;

        remarks: any;

        nomineeMultiPartList: any;

        filesDTOList: any;

        signedNomineeForm:any;

        RdAccountGuardian:any;

        flagForNomineeTypeValue: any;
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

    
