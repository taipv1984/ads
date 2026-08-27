import { Question } from "../types/question.types";
import { QUESTION_CHOICE_MOCKS } from "./question.choice.mock";
import { QUESTION_CONNECT_MOCKS } from "./question.connect.mock";
import { QUESTION_FORM_MOCKS } from "./question.form.mock";
import { QUESTION_QUIZ_MOCKS } from "./question.quiz.mock";
import { QUESTION_SORT_MOCKS } from "./question.sort.mock";
import { QUESTION_TABLE_MOCKS } from "./question.table.mock";

export const QUESTION_MOCKS: Question[] = [
  // ...QUESTION_CONNECT_MOCKS,
  // ...QUESTION_TABLE_MOCKS,
  ...QUESTION_FORM_MOCKS,
  // ...QUESTION_FILL_MOCKS,
  // ...QUESTION_MATCH_MOCKS,
  // ...QUESTION_CHOICE_MOCKS,
  // ...QUESTION_SORT_MOCKS,
  // ...QUESTION_QUIZ_MOCKS,
];
