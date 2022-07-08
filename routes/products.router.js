import { Router } from 'express';
import { getProductLines } from '../controllers/products.controller.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
  try {
    const products = await getProductLines();
    res.json({ data: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default productsRouter;
