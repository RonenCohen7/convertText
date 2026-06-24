import mongoose, {Document, Schema } from "mongoose";

export interface IDifference {
    lineNumber:number;
    documentAText:string;
    documentBText:string;

}


export interface IComparisonModel extends Document {
    documentAId:mongoose.Types.ObjectId;
    documentBId:mongoose.Types.ObjectId;
    differences: IDifference[]
    totalDifferences:number;
    createdAt: Date;

}


const DifferenceSchema = new Schema<IDifference>({
    lineNumber:{
        type:Number,
        required:true
    },
    documentAText:{
        type:String,
         default: ""
    },
    documentBText:{
        type:String,
        default: ""
    }
},{
    _id:false
})



const ComparisonSchema = new Schema<IComparisonModel>({
    documentAId:{
        type: Schema.Types.ObjectId,
        ref:"Document",
        required:true
    },
    documentBId:{
        type:Schema.Types.ObjectId,
        ref:"Document",
        required:true
    },
    differences:{
        type:[DifferenceSchema],
        required:true
    },
    totalDifferences:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }

},{
    versionKey:false
})


export const ComparisonModel = mongoose.model<IComparisonModel>(
    "Comparison",
    ComparisonSchema,
    "comparisons"
)