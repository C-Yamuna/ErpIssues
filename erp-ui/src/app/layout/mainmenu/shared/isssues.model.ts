export class Isssues {

    code: any;
    issueType: any;
    issueId: any;
    raisedOn: any;
    raisedByName: any;
    issueDetails: any;
    comments: any;
    status: any;
    statusName: any;
    id: any;
    issuelstId: any;
    reportedBy: any;
    assignedTo: any;
    projectId: any;
    escalationTimeStamp: any;
    issueLevel: any;
    issueStatus: any;
    resolvedBy: any;
    resolvedOn: any;
    createdOn: any;
    createdBy: any;
    modifiedOn: any;
    modifiedBy: any;
    societyId: any;
    societyCode: any;
    issueListName: any;
    societyName: any;
    assignToName: any;
    projectName: any;
    issueTypeName: any;
    issuesEsclationHistories: any[] = [];
    issueComments: any;
    commentsHistory: any[] = [];
    issueDetailsData: any;
    createdOnDate: any;
    noOfEscalations: any;
    raisedOnDate: any;
    files: any;


    assignedDate: any;
    assignedToName: any;
    comment: any;
    commentedBy: any;
    commentedOn: any;
    escalationTime: any;
    issueCode: any;
    issueName: any;
    reportedByName: any;
    issueCategoryId: any;
    issueComment: any;
    uploadFilePath: any;
    filePath;
    filesDTO;
}


export class PacsDetails {

    id: any;

    pacsCode: any;

    name: any;

    regNumber: any;

    regDate: any;

    branches: any;

    coveredVilCount: any;

    address1: any;

    address2: any;

    villageId: any;

    mandalId: any;

    districtId: any;

    stateId: any;

    countryId: any;

    pinCode: any;

    buildingType: any;

    apexId: any;

    dccbId: any;

    dccbbrId: any;

    distToDccbbr: any;

    numOfTxnPerDay: any;

    isbranch: any;

    parentPacsId: any;

    status: any;

    fhrApprovalStatus: any;

    fhrCopyPath: any;

    pacsCoveredVillagesList: any;

    isObjChanged: any;

    typeOfSocietyId: any;

    shortName: any;
}


export class PacsScreenCaptureModel {
    id?: any;
    raisedOn?: any;
    raisedBy?: any;
    issueDetails?: any;
    filePath?: any;
    status?: any;
    filesDTO?: any;
    issue?: any;
    resolvedBy?: any;
    resolvedOn?: any;
    pacsId?: any;
    uploadedFileDTO?: any;
    uploadFilePath?: any;

}
