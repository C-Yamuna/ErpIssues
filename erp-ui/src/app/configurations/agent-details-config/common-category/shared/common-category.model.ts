export class CommonCategory {
    id?: any;

    name?: any;

    description?: any;

    status?: any;

    statusName?: any;

    commonStatusDTOList?: any;
}
export class CommonStatusModel {

    id: any;
    description: any;
    name: any;
    status: any;
    statusName: any;
    commonStatusDTOList:any[]=[];

    categoryId?:number;
    commonCategoryName?:string;
    
}
