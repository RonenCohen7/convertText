import mongoose, {Document, Schema} from "mongoose";

export interface IDocumentModel extends Document {
    fileName:string;
    fileType:"pdf"|"docx";
    originalName:string;
    extractedText:string;
    uploadDate: Date 
}

const DocumentSchema = new Schema<IDocumentModel>({
    fileName: {
        type: String,
        required:true,
        trim:true
    },
    fileType:{
        type:String,
        required:true,
        enum:["pdf", "docx"]
    },
    originalName:{
        type:String,
        required:true,
        trim:true

    },
    extractedText:{
        type:String,
        required:true
    },
    uploadDate:{
        type:Date,
        default: Date.now
    },
},{
    versionKey:false
});

export const DocumentModel = mongoose.model<IDocumentModel>(
    "Document",
    DocumentSchema,
    "documents"
)