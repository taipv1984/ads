import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { USE_MOCK } from '../../config';
import { CreateProductDTO, ProductFilter, UpdateProductDTO } from '../../types/product.type';
import { productApi } from './product.api';
import { productMock } from './product.mock';

// Bridge to switch between API and Mock
const service = USE_MOCK ? productMock : productApi;

// Hooks
export const useProducts = (filter: ProductFilter = {}) => {
  return useQuery({
    queryKey: ['products', filter],
    queryFn: () => service.getProducts(filter),
  });
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ['products', productId],
    queryFn: () => service.getProductById(productId),
    enabled: !!productId,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateProductDTO) => service.createProduct(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateProductDTO }) =>
      service.updateProduct(id, dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.setQueryData(['products', data.id], data);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => service.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
