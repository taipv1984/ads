import { initialUsers } from '@/services/mocks/user.mock';
import { CreateUserDTO, UpdateUserDTO, User, UserFilter } from '@/services/types/user.type';

// In-memory state for mock data
let users: User[] = [...initialUsers];

export const userMock = {
  getUsers: async (filter?: UserFilter): Promise<User[]> => {
    let filteredUsers = [...users];
    if (filter?.search) {
      const search = filter.search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (u) => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search)
      );
    }
    if (filter?.isPurchased !== undefined) {
      filteredUsers = filteredUsers.filter((u) => u.isPurchased === filter.isPurchased);
    }
    return filteredUsers;
  },

  getUserById: async (id: string): Promise<User> => {
    const user = users.find((u) => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  },

  createUser: async (dto: CreateUserDTO): Promise<User> => {
    const newUser: User = {
      ...dto,
      id: `u${Date.now()}`,
      totalCoin: 0,
      isPurchased: false,
      createdAt: new Date().toISOString(),
    };
    users = [newUser, ...users];
    return newUser;
  },

  updateUser: async (id: string, dto: UpdateUserDTO): Promise<User> => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('User not found');

    users[index] = { ...users[index], ...dto };
    return users[index];
  },

  deleteUser: async (id: string): Promise<void> => {
    users = users.filter((u) => u.id !== id);
  },
};
