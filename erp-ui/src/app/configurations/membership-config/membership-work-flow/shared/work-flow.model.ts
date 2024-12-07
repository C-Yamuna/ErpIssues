export class Workflowmodel {
    id?: any
    name?:any;
    description?:any;
    effStartDate?:any;
    effEndDate?:any;
    isActive?:any;
    statusName?:any;
    noOfSteps?:any;
    code?:any;
    workFlowStepsDTOList?: any;
    categoryId?:any;
    isExceptional?:any;
    categoryName?:any;
    isExceptionalName?: any;
    effEndDateVal?: any;

    effStartDateVal?: any;

}
export class WorkFlowSteps {
    id?: any
    name?:any;
    code?:any;
    workFlowId?:any;
    cmnStatusId?:any;
    level?:any;
    previousStep?:any;
    isActive?:any;
    statusName?:any;
    noOfSteps?:any;
    activityName?:any;
    commonStatusName?:any;
    workFlowname?:any;
    relationshipType?:any;
    relationshipTypeName?:any;
    isExceptional?:any;
    categoryId?:any;
    categoryName?:any;
    prevStepName?:any;
    isExceptionalName?:any;
    relationshipTypeId?:any;
    effEndDateVal?: any;

    effStartDateVal?: any;
    levelName?: any;

    
}
