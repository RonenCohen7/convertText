import { ComparisonModel, IComparisonModel, IDifference } from "../models/comparison-model";
import { DocumentModel } from "../models/document-model";



class ComparisonService {

    public async compareDocuments(documentAId: string, documentBId: string): Promise<IComparisonModel> {
        const documentA = await DocumentModel.findById(documentAId).exec();
        const documentB = await DocumentModel.findById(documentBId).exec();

        if (!documentA || !documentB) {
            throw new Error("One or both documents not found");
        }
        const differences = this.findDifferences(
            documentA.extractedText,
            documentB.extractedText
        );
        const comparison = new ComparisonModel({
            documentAId: documentA._id,
            documentBId: documentB._id,
            differences,
            totalDifferences: differences.length
        });
        return await comparison.save();
    }

    private findDifferences(textA: string, textB: string): IDifference[] {
        const linesA = textA.split("\n");
        const linesB = textB.split("\n");
        const maxLines = Math.max(linesA.length, linesB.length);
        
        const differences: IDifference[] = [];
        for (let i = 0; i < maxLines; i++) {
            const lineA = linesA[i] ?? "";
            const lineB = linesB[i] ?? "";

            if (lineA !== lineB) {
                differences.push({
                    lineNumber: i + 1,
                    documentAText: lineA,
                    documentBText: lineB

                });
            }
        }
        return differences;

    }

    public async getAllComparisons(): Promise<IComparisonModel[]> {
        return await ComparisonModel.find()
            .populate("documentAId")
            .populate("documentBId")
            .exec();
    }

    public async getOneComparison(id: string): Promise<IComparisonModel | null> {
        return await ComparisonModel.findById(id)
            .populate("documentAId")
            .populate("documentBId")
            .exec();
    }


    public async deleteComparison(id: string): Promise<IComparisonModel | null> {
        return await ComparisonModel.findByIdAndDelete(id).exec();
    }

}


export const comparisonService = new ComparisonService();