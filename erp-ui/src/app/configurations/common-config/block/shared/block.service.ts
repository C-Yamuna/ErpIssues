import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateBlock(blockModel:any){
    return this.commonHttpService.put(blockModel, Headers, Configuration.COMMON_MASTER + Configuration.BLOCKS + Configuration.UPDATE);
  }

  addBlock(blockModel:any){
    return this.commonHttpService.post(blockModel, Headers, Configuration.COMMON_MASTER + Configuration.BLOCKS+ Configuration.ADD);
  }

  getAllBlock(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.BLOCKS + Configuration.GET_ALL);
  }

  getBlockById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.BLOCKS + Configuration.GET);
  }

  deleteBlock(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.BLOCKS + Configuration.DELETE);
  }
}
