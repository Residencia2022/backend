import { Router } from 'express';
import { getProductLines } from '../controllers/products.controller.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await getProductLines();
    res.json({ data: products });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
