import { Component } from '@angular/core';
interface DocumentType {
  id: number;
  name: string;
}

@Component({
  selector: 'app-bclass-kyc',
  templateUrl: './bclass-kyc.component.html',
  styleUrls: ['./bclass-kyc.component.css']
})
export class BclassKYCComponent {
  documentTypes: DocumentType[] = [
    { id: 1, name: 'Aadhar Card' },
    { id: 2, name: 'PAN Card' },
    { id: 3, name: 'Passport' }
  ];
  selectedDocumentType!: DocumentType;
  documentNumber!: string;
  selectedFileName!: string;
  
  showDocumentForm: boolean = true;

  showDocumentPreview: boolean = false;
  nameAsPerDocument!: string;

  showDocumentForm2: boolean = false;
  selectedDocumentType2!: DocumentType;
  documentNumber2!: string;
  selectedFileName2!: string;
  nameAsPerDocument2!: string;
  proofDocumentList: any;

  // onFileSelect(event) {
  //   this.selectedFileName = event.files[0].name;
  // }

  save() {
    // Implement save logic here
    this.showDocumentForm = false;
    this.showDocumentPreview = true;
    this.proofDocumentList = [{documentType: "Aadhar Card",documentNumber:"123",name:"harish"},{documentType: "Aadhar Card",documentNumber:"123",name:"bhargavi"}] 
  }
  save2() {
    // Implement save logic here for form 2
    this.showDocumentForm2 = false;
    this.showDocumentPreview = true;
  }

  cancel() {
    // Implement submit logic here
  }

  toggleDocumentForm(row:any) {
    this.showDocumentForm = !this.showDocumentForm;
    this.showDocumentPreview = !this.showDocumentPreview;
  }

  toggleDocumentForm2() {
    this.showDocumentForm2 = !this.showDocumentForm2;
    this.showDocumentForm = false;
    this.showDocumentPreview = !this.showDocumentPreview;
  }



  // addDocument() {
  //   this.showDocumentForm = true;
  //   this.showDocumentPreview = true;
  //   // Reset form fields if needed
  //   // this.selectedDocumentType = null;
  //   this.documentNumber = '';
  //   this.nameAsPerDocument = '';
  //   this.selectedFileName = '';
  // }


  addDocument() {
    if (!this.showDocumentForm) {
      this.showDocumentForm = true;
      this.showDocumentForm2 = false; // Ensure only one form is visible at a time
      this.showDocumentPreview = false;
    } else if (!this.showDocumentForm2) {
      this.showDocumentForm2 = true;
      this.showDocumentForm = false; // Ensure only one form is visible at a time
      this.showDocumentPreview = false;
    }
    // Reset form fields if needed
    // this.selectedDocumentType = null;
    // this.documentNumber = '';
    // this.nameAsPerDocument = '';
    // this.selectedFileName = '';
    // this.selectedDocumentType2 = null;
    // this.documentNumber2 = '';
    // this.nameAsPerDocument2 = '';
    // this.selectedFileName2 = '';
  }

}
