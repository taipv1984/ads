import { EquationQuestion } from "../../features/equation-matching/types/equation.types";

export const EQUATION_QUESTIONS: EquationQuestion[] = [
  {
    id: 'q1',
    title: 'Nối hai phép tính có cùng kết quả.',
    leftItems: [
      { id: 'L1', expression: '46 + 23', side: 'left' },
      { id: 'L2', expression: '42 + 6',  side: 'left' },
      { id: 'L3', expression: '62 + 17', side: 'left' },
      { id: 'L4', expression: '50 + 30', side: 'left' },
      { id: 'L5', expression: '29 + 20', side: 'left' },
    ],
    rightItems: [
      { id: 'R1', expression: '33 + 15', side: 'right' }, // = 48 (L2)
      { id: 'R2', expression: '40 + 9',  side: 'right' }, // = 49 (L5)
      { id: 'R3', expression: '60 + 9',  side: 'right' }, // = 69 (L1)
      { id: 'R4', expression: '33 + 46', side: 'right' }, // = 79 (L3)
      { id: 'R5', expression: '20 + 60', side: 'right' }, // = 80 (L4)
    ],
  },
  {
    id: 'q2',
    title: 'Nối các phép tính trừ có cùng kết quả.',
    leftItems: [
      { id: 'L1', expression: '50 - 10', side: 'left' },
      { id: 'L2', expression: '30 - 5',  side: 'left' },
      { id: 'L3', expression: '100 - 20', side: 'left' },
    ],
    rightItems: [
      { id: 'R1', expression: '90 - 10', side: 'right' }, // = 80 (L3)
      { id: 'R2', expression: '45 - 5',  side: 'right' }, // = 40 (L1)
      { id: 'R3', expression: '28 - 3',  side: 'right' }, // = 25 (L2)
    ],
  }
];
