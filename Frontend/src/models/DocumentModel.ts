

export interface DocumentModel {
    _id: string;
    fileName:string;
    originalName:string;
    fileType:"pdf"| "docx";
    extractedText:string;
    uploadDate: string
}