import express, { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "node:path";
import { documentService } from "../services/documents-service";
import { fileService } from "../services/file-service";

class DocumentsController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/api/documents", this.getAllDocuments);

        this.router.get("/api/documents/:id/analyze", this.analyzeDocument);

        this.router.get("/api/documents/:id", this.getOneDocument);

        this.router.delete("/api/documents/:id", this.deleteDocument);

        this.router.post("/api/documents/upload", this.uploadDocument);

    }


    private async getAllDocuments(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const documents = await documentService.getAllDocuments();
            response.json(documents)
        }
        catch (err: any) {
            next(err)
        }
    }


    private async getOneDocument(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = request.params.id as string;
            const document = await documentService.getOneDocument(id);
            response.json(document)
        }
        catch (err: any) {
            next(err)
        }
    }


    private async deleteDocument(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = request.params.id as string;
            const deleteDocument = await documentService.deleteDocument(id);
            response.json(deleteDocument)
        }
        catch (err) {
            next(err)
        }
    }



    private async uploadDocument(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {

            if (!request.files?.document) {
                response.status(400).send("Missing document");
                return;
            }
            const documentFile = request.files.document as UploadedFile;

            const extension = path.extname(documentFile.name).toLowerCase();

            if (extension !== ".pdf" && extension !== ".docx") {
                response.status(400).send("Only PDF and DOCX files are allowed");
                return;
            }
            const fileName = Date.now() + extension

            const filePath = path.join(process.cwd(), "src", "assets", "uploads", fileName);

            await documentFile.mv(filePath);

            let extractedText = "";
            if (extension === ".pdf") {
                extractedText = await fileService.extractTextFromPdf(filePath)
            }
            if (extension === ".docx") {
                extractedText = await fileService.extractTextFromDocx(filePath);
            }

            const savedDocument = await documentService.addDocument({
                fileName,
                originalName: documentFile.name,
                fileType: extension.replace(".", "") as "pdf" | "docx",
                extractedText
            } as any)
            response.status(201).json(savedDocument);
        }
        catch (err: any) {
            next(err)
        }
    }



    private async analyzeDocument(request:Request, response:Response, next: NextFunction):Promise<void>{
        try{

            const id = request.params.id as string;
            const analysis = await documentService.analyzeDocument(id);
            response.json(analysis);

        }catch(err){
            next(err)
        }
    }



}

export const documentController = new DocumentsController();