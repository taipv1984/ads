import { QuestionType } from "@/enums/math.enum";
import { uniqueID } from "@/utils/app.util";
import { Question } from "../types/question.types";

export const QUESTION_CHOICE_MOCKS: Question[] = [
  {
    id: uniqueID(),
    type: QuestionType.CHOICE,
    question: "Khoanh vào số lớn nhất (single choice)",
    groups: [
      { key: "a", options: ["72", "76", "70"], answer: "76", score: 0.5 },
      { key: "b", options: ["82", "77", "88"], answer: "88", score: 0.5 },
    ],
  },
  {
    id: uniqueID(),
    type: QuestionType.CHOICE,
    question: "Khoanh vào các số chẵn (multi choice)",
    groups: [
      { key: "a", options: ["72", "75", "77"], answer: "72", score: 0.5 },
      { key: "b", options: ["82", "84", "89"], answer: "82,84", score: 0.5 },
    ],
  },
  {
    id: uniqueID(),
    type: QuestionType.CHOICE,
    question: "Khoanh vào các số chẵn",
    groups: [
      { key: "a", options: ["Phạm Văn Tài", "Võ Thị Nhi", "Thành Tâm"], answer: "Thành Tâm", score: 0.5 },
      { key: "b", options: ["80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90"], answer: "80,85,90", score: 0.5 },
    ],
  },
  {
    id: uniqueID(),
    type: QuestionType.CHOICE,
    question: "Khoanh vào số nhỏ nhất",
    groups: [
      { key: "a", options: ["72", "76", "70"], answer: "70", score: 0.5 },
    ],
  },
];
