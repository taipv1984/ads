import { QuestionType } from "@/enums/math.enum";
import { uniqueID } from "@/utils/app.util";
import { Question } from "../types/question.types";

export const QUESTION_CONNECT_MOCKS: Question[] = [
  // Case 1: Các input đồng cấp
  {
    id: uniqueID(),
    type: QuestionType.CONNECT,
    question: "Nối phép tính ở vế trái với kết quả đúng tương ứng ở vế phải (Case 1: Đồng cấp):",
    score: 2,
    correctConnections: [
      { sourceRef: 101, targetRef: 202 }, // 5 + 3 -> 8
      { sourceRef: 102, targetRef: 201 }, // 10 - 4 -> 6
      { sourceRef: 103, targetRef: 203 }, // 7 + 2 -> 9
    ],
    groups: [
      {
        columns: [
          {
            rows: [
              { inputs: [{ type: 'text', id: uniqueID(), ref: 101, value: '5 + 3', connectGroup: 'left', width: 90, allowConnect: false }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 102, value: '10 - 4', connectGroup: 'left', width: 90 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 103, value: '7 + 2', connectGroup: 'left', width: 90 }] },
            ],
          },
          {
            rows: [
              { inputs: [{ type: 'text', id: uniqueID(), ref: 201, value: '6', connectGroup: 'right', width: 60 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 202, value: '8', connectGroup: 'right', width: 60 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 203, value: '9', connectGroup: 'right', width: 60 }] },
            ],
          },
        ],
      },
    ],
  },
  // Case 2: Các input phân cấp (main -> sub)
  {
    id: uniqueID(),
    type: QuestionType.CONNECT,
    question: "Nối số chính với các ô có giá trị bằng số đó (Case 2: Phân cấp Main-Sub):",
    score: 3,
    correctConnections: [
      { sourceRef: 1, targetRef: 11 },
      { sourceRef: 1, targetRef: 22 },
      { sourceRef: 2, targetRef: 13 },
      { sourceRef: 2, targetRef: 24 },
    ],
    groups: [
      {
        columns: [
          {
            rows: [
              { inputs: [{ type: 'text', id: uniqueID(), ref: 11, value: '4 + 6', connectGroup: 'left', width: 80 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 12, value: '9 + 3', connectGroup: 'left', width: 80 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 13, value: '2 + 13', connectGroup: 'left', width: 80 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 14, value: '5 + 15', connectGroup: 'left', width: 80 }] },
            ],
          },
          {
            rows: [
              { inputs: [{ type: 'text', id: uniqueID(), ref: 1, value: 'Số 10', connectGroup: 'main', width: 80 }], style: { marginTop: 44 + 12 } },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 2, value: 'Số 15', connectGroup: 'main', width: 80 }] },
            ],
          },
          {
            rows: [
              { inputs: [{ type: 'text', id: uniqueID(), ref: 21, value: '14 - 6', connectGroup: 'right', width: 80 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 22, value: '19 - 9', connectGroup: 'right', width: 80 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 23, value: '2 - 8', connectGroup: 'right', width: 80 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 24, value: '25 - 10', connectGroup: 'right', width: 80 }] },
            ],
          },
        ],
      },
    ],
  },
];