import { products as productData } from '../data/products';

export const fetchProducts = async () => {
  return Promise.resolve(productData);
};
