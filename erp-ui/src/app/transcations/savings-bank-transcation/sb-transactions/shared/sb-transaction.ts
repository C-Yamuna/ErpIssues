export class SbTransaction {
    id: any;
    pacsCode: any;
    pacsId: any;
    branchId: any;
    sbAccId: any;
    accountNumber: any;
    accountTypeId: any;
    accountTypeName: any;
    transactionType: any;
    transactionTypeName:any;
    transactionMode: any;
    transactionModeName: any;
    transactionAmount: any;
   
    transactionDate: any;
    trnasactionDateVal : any;
    transactionCode: any;
    isInternalTransaction: any;
    particulars: any;
    balance: any;
    noOfDays: any;
    products: any;
    transactionApprovedBy: any;
    transactionRequestedBy: any;
    remarks: any;
    status: any;
   
    isPanAvailable: any;
    statusName: any;
    transferTransactionDetailsDTO: any;
    chequeTransactionDetailsDTO: any;
    denominationList: any;
    depositAmount : any;
    withdrawlAmount : any;

    // new feilds
    branchName : any;
    transactionAmountInWords : any;
    accountHolderName : any;
}
export class ChequeDetails{

    id: any;

    sbTransactionDetailsId: any;

    chequeIssueDate: any;

    chequeIssueDateVal: any;

    chequeNumber: any;

    depositDate: any;

    beneficiaryName: any;

    amount: any;

    amountTransferedDate: any;

    amountTransferedDateVal : any;

    status: any;

    statusName: any;

    transactionAmountInWords :any;

}
export class TransferTransactionDetails{

    id: any;

    sbTransactionDetailsId: any;

    toAccountNumber: any;


    beneficiaryName: any;


    ifscCode: any;


    transactionAmount: any;


    transactionCode: any;


    status: any;


    statusName: any;

    amountInWords : any;

    narration : any;

    branchName : any;

}