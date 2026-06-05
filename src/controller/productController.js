const Product = require('../model/product.model');
const Category = require('../model/Category.model');

const ImageKit = require('imagekit'); 

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().lean().exec(); 
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};



exports.createProduct = async (req, res) => {
    try {
        const { name, category, price } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

       
        const uploadResponse = await imagekit.upload({
            file: req.file.buffer,          
            fileName: req.file.originalname, 
            folder: "/product_images"           
        });

        const newProduct = new Product({
            name,
            category,
            price,
            image: uploadResponse.url
        });

        await newProduct.save();

        res.status(201).json({ 
            message: "Product created successfully!", 
            product: newProduct 
        });

    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price } = req.body;
        
        let updateData = { name, category, price };
        if (req.file) {
            const uploadResponse = await imagekit.upload({
                file: req.file.buffer,          
                fileName: req.file.originalname, 
                folder: "/product_images"           
            });
            updateData.image = uploadResponse.url;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        
        res.status(200).json({ message: "Product updated successfully!", product: updatedProduct });

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        
        res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

