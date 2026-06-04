const Blog = require('../model/blog.model');
const ImageKit = require('imagekit');


const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

exports.createBlog = async (req, res) => {
    try {
        const { title, category, excerpt } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

       
        const uploadResponse = await imagekit.upload({
            file: req.file.buffer,          
            fileName: req.file.originalname, 
            folder: "/blog_images"           
        });

        const newBlog = new Blog({
            title,
            category,
            excerpt,
            image: uploadResponse.url 
        });

        await newBlog.save();

        res.status(201).json({ 
            message: "Blog created successfully!", 
            blog: newBlog 
        });

    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error: error.message });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, excerpt } = req.body;
        
        
        let updateData = { title, category, excerpt };
 
        if (req.file) {
            const uploadResponse = await imagekit.upload({
                file: req.file.buffer,          
                fileName: req.file.originalname, 
                folder: "/blog_images"           
            });
            updateData.image = uploadResponse.url;  
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
        
        res.status(200).json({ message: "Blog updated successfully!", blog: updatedBlog });

    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ message: "Error updating blog", error: error.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        
        if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });
        
        res.status(200).json({ message: "Blog deleted successfully!" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Error deleting blog", error: error.message });
    }
};