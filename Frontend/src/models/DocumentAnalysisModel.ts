export interface DocumentAnalysisModel {
    documentId: string;
    fileName: string;
    originalName:string;
    fileType:string;
    linesCount:number;
    wordsCount:number;
    charactersCount:number;
}