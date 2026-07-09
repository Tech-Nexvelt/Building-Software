import { Router } from 'express';
import { requireAuth, requireRole } from '../middlewares/auth';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';

const router = Router();

// Apply auth middleware to all routes
router.use(requireAuth);

// Categories
router.get('/categories', getCategories);
router.post('/categories', requireRole(['owner', 'manager']), createCategory);
router.put('/categories/:id', requireRole(['owner', 'manager']), updateCategory);
router.delete('/categories/:id', requireRole(['owner', 'manager']), deleteCategory);

// Products
router.get('/', getProducts);
router.post('/', requireRole(['owner', 'manager']), createProduct);
router.put('/:id', requireRole(['owner', 'manager']), updateProduct);
router.delete('/:id', requireRole(['owner', 'manager']), deleteProduct);

export default router;
