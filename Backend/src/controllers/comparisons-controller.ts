import express, { NextFunction, Request, Response } from "express";
import { comparisonService } from "../services/comparison-service";


class ComparisonsController {

    public readonly router = express.Router()

    public constructor(){

        this.router.post("/api/comparisons", this.compareDocuments);
        this.router.get("/api/comparisons", this.getAllComparisons);
        this.router.get("/api/comparisons/:id", this.getOneComparison);
        this.router.delete("/api/comparisons/:id", this.deleteComparison);


    }

    private async compareDocuments(request:Request, response:Response, next: NextFunction){
        try{
            const documentAId = request.body.documentAId;
            const documentBId = request.body.documentBId;

            const comparison = await comparisonService.compareDocuments(documentAId,documentBId);
            response.status(201).json(comparison);
        }
        catch(err: any){
            next(err)
        }
    }


    private async getAllComparisons(request:Request,response:Response, next:NextFunction){
        try{
            const comparisons = await comparisonService.getAllComparisons();
            response.status(201).json(comparisons)
        }catch(err){
            next(err)
        }
    }


    private async getOneComparison(request:Request, response: Response, next: NextFunction){
        try{

            const id = request.params.id as string;
            const comparison = await comparisonService.getOneComparison(id);
            response.json(comparison);

        }catch(err){
            next(err)
        }
    }


    private async deleteComparison(request:Request, response:Response, next: NextFunction){
        try{
            const id =  request.params.id as string;
            const deleteComparison = await comparisonService.deleteComparison(id);
            response.json(deleteComparison);
        }
        catch(err:any){
            next(err)
        }
    }

}


export const comparisonController = new ComparisonsController();