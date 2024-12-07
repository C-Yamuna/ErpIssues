import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class WorkFlowService {


  constructor(private commonHttpService:CommonHttpService) { }

  updateWorkFlow(commoncategoryModel:any){
    return this.commonHttpService.put(commoncategoryModel, Headers, Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOW + Configuration.UPDATE);
  }

  addWorkFlow(commoncategoryModel:any){
    return this.commonHttpService.post(commoncategoryModel, Headers, Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOW+ Configuration.ADD);
  }
  getAllWorkFlow(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOW + Configuration.GET_ALL);
  }
  getWorkFlowById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOW + Configuration.GET);
  }

  deleteWorkFlow(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOW + Configuration.DELETE);
  }
  // getworkFlowId(){
  //   return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOW + Configuration.GET_WORKFLOW_ID);
  // }

  getById(id:any) {
    const headers = new HttpHeaders({ 'id': id + '' });
    return this.commonHttpService.getById(headers, Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOW + Configuration.GET);
  }

  updateWorkFlowSteps(commoncategoryModel:any){
    return this.commonHttpService.put(commoncategoryModel, Headers, Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOW_STEPS + Configuration.UPDATE);
  }

  addWorkFlowSteps(commoncategoryModel:any){
    return this.commonHttpService.post(commoncategoryModel, Headers, Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOW_STEPS+ Configuration.ADD);
  }
  getAllWorkFlowSteps(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOW_STEPS + Configuration.GET_ALL);
  }
  getWorkFlowStepsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOW_STEPS + Configuration.GET);
  }

  deleteWorkFlowSteps(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOW_STEPS + Configuration.DELETE);
  }
  getAllCommonStatus() {
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.COMMON_STATUS + Configuration.GET_ALL);
  }
  getByWorkFlowId(categoryId:any,workFlowId:any,isActive:any) {
    let headers = new HttpHeaders({'categoryId': categoryId+'','workFlowId':workFlowId+'','isActive':isActive+''})
    return this.commonHttpService.getById(headers, Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOW_STEPS + Configuration.WORK_FLOW_STEPS_LIST);
  }
  getAllOrgChartNodes(categoryId:any,workFlowId:any,) {
    let headers = new HttpHeaders({'categoryId': categoryId+'','workFlowId':workFlowId+'',})
    return this.commonHttpService.getById(headers, Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOW_STEPS + Configuration.ORG_HEIRACHY);
  }

  getCommonStatusbyCategory(id:any){
    let headers = new HttpHeaders({'id': id+''})
    return this.commonHttpService.getById(headers,Configuration.DEMANDDEPOSITS + Configuration.COMMON_STATUS + Configuration.COMMON_STATUS_LIST_BY_CATEGORY)
  }

  getCommonCategoryById(id:any){
    let headers = new HttpHeaders({'id': id+''})
    return this.commonHttpService.getById(headers,Configuration.DEMANDDEPOSITS + Configuration.COMMON_CATEGORY + Configuration.GET)
  }

  getAllCommonCategories() {
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.COMMON_CATEGORY + Configuration.GET_ALL);
  }

  updateWorkFlowStepsByWorkFlow(workFlowStepsmodel:any) {
    return this.commonHttpService.put(workFlowStepsmodel, Headers, Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOWSTEPS + Configuration.UPDATE);
  }

  saveWorkFlowSteps(workFlowStepsmodel:any) {
    return this.commonHttpService.post(workFlowStepsmodel, Headers, Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOWSTEPS + Configuration.ADD);
  }

  deleteWorkFlowStep(id:any) {
    let headers = new HttpHeaders({'id': id+''})
    return  this.commonHttpService.delete(headers,Configuration.DEMANDDEPOSITS +Configuration.WORK_FLOWSTEPS+Configuration.DELETE);
}

getAllOrgChart(workFlowId:any,categoryId:any) {
  let headers = new HttpHeaders({'workFlowId':workFlowId+'','categoryId': categoryId+'',})
  return this.commonHttpService.getById(headers,Configuration.DEMANDDEPOSITS + Configuration.WORK_FLOWSTEPS + Configuration.ORG_HEIRARCHY);
}

getAllRoles(){
  return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.USERL_ROLES + Configuration.GET_ALL);

}

  
}
