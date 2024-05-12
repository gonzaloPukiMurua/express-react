import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
    const {name, description, cost, code} = req.body;
    const productToAdd = await Product({
        name,
        description,
        cost,
        code
    });
    console.log("Product: ", name, " | ", description, " | ", cost, " | ", code);
    const savedProduct = await productToAdd.save();
    res.json(savedProduct);
}

export const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({ message: "Product not found"});
    res.json(product);
}

export const allProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
}

export const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!product) return res.status(404).json({ message: "Product not found"});
    res.json(product);
}

export const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product) return res.status(404).json({ message: "Product not found"});
    res.json(product);
}


