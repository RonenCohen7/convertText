import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import fs from "fs/promises";



class FileService {
    public async extractTextFromPdf(filePath: string): Promise<string> {
        const buffer = await fs.readFile(filePath)
        const parser = new PDFParse({data: buffer});
        const result = await parser.getText();
        return result.text;
    }


    public async extractTextFromDocx(filePath: string): Promise<string> {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
    }

}

export const fileService = new FileService();