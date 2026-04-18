export interface User {
  id: string;
  name: string;
  email: string;
  totalCoin: number;
  isPurchased: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export interface UserFilter {
  search?: string;
  isPurchased?: boolean;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {
  totalCoin?: number;
  isPurchased?: boolean;
}
