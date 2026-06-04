const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', blogController.getAllBlogs);
router.post('/', upload.single('image'), blogController.createBlog);

router.put('/:id', upload.single('image'), blogController.updateBlog); 
router.delete('/:id', blogController.deleteBlog);

module.exports = router;