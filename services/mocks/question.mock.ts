import { Question } from "../types/question.types";

import { QUESTION_FORM_MOCKS } from "./question.form.mock";
import { QUESTION_TABLE_MOCKS } from "./question.table.mock";

export const QUESTION_MOCKS: Question[] = [
  ...QUESTION_TABLE_MOCKS,
  ...QUESTION_FORM_MOCKS,
  // ...QUESTION_FILL_MOCKS,
  // ...QUESTION_MATCH_MOCKS,
  // ...QUESTION_CHOICE_MOCKS,
  // ...QUESTION_SORT_MOCKS,
  // ...QUESTION_QUIZ_MOCKS,
];

