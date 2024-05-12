import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
},
{
    collection: "products",
    timestamps: true
});

export default mongoose.model("Product", productSchema);