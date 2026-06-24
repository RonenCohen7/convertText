export interface DifferenceModel {
    lineNumber: number;
    documentAText: string;
    documentBText: string;
}

export interface ComparisonModel {
    _id:string;
    documentAId: string;
    documentBId: string;
    differences: DifferenceModel[];
    totalDifferences:number;
    createdAt: string;

}