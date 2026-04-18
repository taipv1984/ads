import { Product, CreateProductDTO, UpdateProductDTO, ProductFilter } from '../../types/product.type';
import { initialProducts } from '../../mocks/product.mock';

// In-memory state for mock data
let products: Product[] = [...initialProducts];

export const productMock = {
  getProducts: async (filter?: ProductFilter): Promise<Product[]> => {
    let filteredProducts = [...products];
    if (filter?.search) {
      const search = filter.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) => p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search)
      );
    }
    if (filter?.category) {
      filteredProducts = filteredProducts.filter((p) => p.category === filter.category);
    }
    if (filter?.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter((p) => p.price >= filter.minPrice!);
    }
    if (filter?.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter((p) => p.price <= filter.maxPrice!);
    }
    return filteredProducts;
  },

  getProductById: async (id: string): Promise<Product> => {
    const product = products.find((p) => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  },

  createProduct: async (dto: CreateProductDTO): Promise<Product> => {
    const newProduct: Product = {
      ...dto,
      id: `p${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    products = [newProduct, ...products];
    return newProduct;
  },

  updateProduct: async (id: string, dto: UpdateProductDTO): Promise<Product> => {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Product not found');
    
    products[index] = { ...products[index], ...dto };
    return products[index];
  },

  deleteProduct: async (id: string): Promise<void> => {
    products = products.filter((p) => p.id !== id);
  },
};
