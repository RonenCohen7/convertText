import axios from "axios";
import type { DocumentModel } from "../models/DocumentModel";
import { appConfig } from "../utils/AppConfig";
import type { DocumentAnalysisModel } from "../models/DocumentAnalysisModel";


class DocumentServices {

    public async getAllDocuments(): Promise<DocumentModel[]> {
        const response = await axios.get<DocumentModel[]>(appConfig.baseUrl);
        return response.data
    }

    public async uploadDocument(file: File): Promise<DocumentModel> {
        const formData = new FormData();
        formData.append("document", file)

        const response = await axios.post<DocumentModel>(appConfig.baseUrl + "/upload",formData);
        return response.data;

    }

    public async analyzeDocument(id: string):Promise<DocumentAnalysisModel>{
        const response = await axios.get<DocumentAnalysisModel>(appConfig.baseUrl + `/${id}/analyze`);
        return response.data;

    }

    public async deleteDocument(id:string):Promise<void> {
        await axios.delete(appConfig.baseUrl + `/${id}`)
    }

}

export const documentServices = new DocumentServices();