import { Injectable } from '@angular/core';
import { FileUploadModel } from '../layout/mainmenu/shared/file-upload-model.model';
import { ERP_TRANSACTION_CONSTANTS } from '../transcations/erp-transaction-constants';
import { FileUpload } from 'primeng/fileupload';
import { CommonComponent } from './common.component';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  uploadFileData: any; 

  constructor(private commonComponent : CommonComponent) { }

  /**
   * @implements getFileByFilePath
   * @param filePath 
   * @returns multipleFilesList
   */
  getFile(filePath:any , imageValue:any) {
    let multipleFilesList = [];
    if(filePath != null && filePath != undefined){
      let file = new FileUploadModel();
      file.imageValue =imageValue;
      if (filePath != null && filePath != undefined) {
        let objects = filePath.split('.');
        file.fileType = objects[objects.length - 1];
        let name = filePath.replace(/ /g, "_");
        file.fileName = name
        multipleFilesList.push(file);
      }
    }
    return multipleFilesList;
  }
    
}
