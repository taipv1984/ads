import apiClient from '../../api.client';
import { Product, CreateProductDTO, UpdateProductDTO, ProductFilter } from '../../types/product.type';

export const productApi = {
  getProducts: async (filter?: ProductFilter): Promise<Product[]> => {
    const { data } = await apiClient.get('/products', { params: filter });
    return data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
  },

  createProduct: async (product: CreateProductDTO): Promise<Product> => {
    const { data } = await apiClient.post('/products', product);
    return data;
  },

  updateProduct: async (id: string, product: UpdateProductDTO): Promise<Product> => {
    const { data } = await apiClient.patch(`/products/${id}`, product);
    return data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};
