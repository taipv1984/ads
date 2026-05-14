export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;
  createdAt: string;
}

export interface ProductFilter {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface CreateProductDTO {
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> { }
