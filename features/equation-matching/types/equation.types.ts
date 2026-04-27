export interface EquationItemData {
  id: string;
  expression: string; // Ví dụ: "46 + 23"
  side: 'left' | 'right';
}

export interface EquationQuestion {
  id: string;
  title: string;
  leftItems: EquationItemData[];
  rightItems: EquationItemData[];
}

export interface Connection {
  fromId: string; // Luôn là ID bên trái để dễ quản lý
  toId: string;   // Luôn là ID bên phải
  isCorrect: boolean;
}
