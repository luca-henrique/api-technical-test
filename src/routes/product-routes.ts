import express from 'express';
import ProductController from '../controllers/product-controller';

const router = express.Router();

router.get('/', ProductController.getAll);

router.patch('/:id/checked', ProductController.updateChecked);

router.post('/', ProductController.create);

router.delete('/:id', ProductController.deleteProduct);

export default router;
