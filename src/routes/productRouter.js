const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', productController.getAllProducts);

router.post('/', upload.single('image'), productController.createProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;