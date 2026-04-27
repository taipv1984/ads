export interface CandidateData {
  id: string;
  numerator: number;
  denominator: number;
}

export interface QuestionData {
  id: string;
  title: string;
  target: { numerator: number; denominator: number };
  candidates: CandidateData[]; // exactly 6 items: first 4 = top row, last 2 = bottom sides
}

export const FRACTION_QUESTIONS: QuestionData[] = [
  {
    id: 'q1',
    title: 'Nối với phân số bằng 2/5 (theo mẫu):',
    target: { numerator: 2, denominator: 5 },
    candidates: [
      { id: '1', numerator: 4,  denominator: 8  },
      { id: '2', numerator: 4,  denominator: 10 },
      { id: '3', numerator: 12, denominator: 30 },
      { id: '4', numerator: 16, denominator: 41 },
      { id: '5', numerator: 15, denominator: 6  },
      { id: '6', numerator: 10, denominator: 25 },
    ],
  },
  {
    id: 'q2',
    title: 'Nối với phân số bằng 1/3:',
    target: { numerator: 1, denominator: 3 },
    candidates: [
      { id: '1', numerator: 2,  denominator: 6  },
      { id: '2', numerator: 3,  denominator: 10 },
      { id: '3', numerator: 4,  denominator: 12 },
      { id: '4', numerator: 5,  denominator: 16 },
      { id: '5', numerator: 5,  denominator: 15 },
      { id: '6', numerator: 7,  denominator: 20 },
    ],
  },
  {
    id: 'q3',
    title: 'Nối với phân số bằng 3/4:',
    target: { numerator: 3, denominator: 4 },
    candidates: [
      { id: '1', numerator: 6,  denominator: 8  },
      { id: '2', numerator: 9,  denominator: 12 },
      { id: '3', numerator: 4,  denominator: 5  },
      { id: '4', numerator: 12, denominator: 18 },
      { id: '5', numerator: 6,  denominator: 10 },
      { id: '6', numerator: 15, denominator: 20 },
    ],
  },
  {
    id: 'q4',
    title: 'Nối với phân số bằng 2/3:',
    target: { numerator: 2, denominator: 3 },
    candidates: [
      { id: '1', numerator: 4,  denominator: 6  },
      { id: '2', numerator: 6,  denominator: 9  },
      { id: '3', numerator: 5,  denominator: 8  },
      { id: '4', numerator: 7,  denominator: 10 },
      { id: '5', numerator: 10, denominator: 15 },
      { id: '6', numerator: 3,  denominator: 5  },
    ],
  },
];
