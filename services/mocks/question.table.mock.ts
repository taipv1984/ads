import { QuestionType, TextInputStyle } from "@/enums/math.enum";
import { uniqueID } from "@/utils/app.util";
import { QuestionTable } from "../types/question.types";

export const QUESTION_TABLE_MOCKS: QuestionTable[] = [
  {
    id: 1,
    type: QuestionType.TABLE,
    question: "Tính",
    image: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png",
    columnCount: 5,
    rows: [
      {
        id: uniqueID(),
        cells: [
          {
            id: uniqueID(),
            label: 'PHÉP CỘNG',
            colspan: 5,
            style: { backgroundColor: '#e2e8f0' }, // styling for header
          },
        ],
      },
      {
        id: uniqueID(),
        cells: [
          {
            id: uniqueID(),
            label: '+',
            colspan: 2,
            rowspan: 2,
          },
          { id: uniqueID(), label: '15' },
          { id: uniqueID(), label: '28' },
          { id: uniqueID(), label: '42' },
        ],
      },
      {
        id: uniqueID(),
        cells: [
          { id: uniqueID(), label: '7' },
          { id: uniqueID(), label: '14' },
          { id: uniqueID(), label: '19' },
        ],
      },
      {
        id: uniqueID(),
        cells: [
          {
            id: uniqueID(),
            label: '=',
            colspan: 2,
          },
          {
            id: uniqueID(),
            input: { id: uniqueID(), type: 'text', inputStyle: TextInputStyle.LINE }
          },
          {
            id: uniqueID(),
          input: { id: uniqueID(), type: 'number', inputStyle: TextInputStyle.DOT }
          },
          {
            id: uniqueID(),
            input: { id: uniqueID(), type: 'select', valueOptions: '["Đ", "S"]', width: 44 }
          },
        ],
      },
    ],
  }
]