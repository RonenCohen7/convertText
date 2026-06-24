
import { DocumentModel, IDocumentModel } from "../models/document-model";



export interface IDocumentAnalyze {
    documentId: string;
    fileName: string;
    originalName: string;
    filetype: string;
    linesCount: number;
    wordsCount: number;
    charactersCount: number;
}




class DocumentsService {

    public async addDocument(document: IDocumentModel): Promise<IDocumentModel> {
        const newDocuments = new DocumentModel(document);
        return await newDocuments.save();
    }


    public async getAllDocuments(): Promise<IDocumentModel[]> {
        return await DocumentModel.find().exec();
    }

    public async getOneDocument(id: string): Promise<IDocumentModel | null> {
        return await DocumentModel.findById(id).exec();
    }

    public async deleteDocument(id: string): Promise<IDocumentModel | null> {
        return await DocumentModel.findByIdAndDelete(id).exec();
    }


    public async analyzeDocument(id: string): Promise<IDocumentAnalyze> {
        const document = await DocumentModel.findById(id).exec();
        if (!document) {
            throw new Error("Document not found");
        }
        const text = document.extractedText || "";

        const linesCount = text.split("\n").filter(line => line.trim() !== "").length;

        const wordsCount = text.split(/\s+/).filter(word => word.trim() !== "").length;

        const charactersCount = text.length;

        return {
            documentId: document._id.toString(),
            fileName: document.fileName,
            originalName: document.originalName,
            filetype: document.fileType,
            linesCount,
            wordsCount,
            charactersCount

        };
    }



}

export const documentService = new DocumentsService();