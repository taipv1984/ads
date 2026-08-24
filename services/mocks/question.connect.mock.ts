import { QuestionType } from "@/enums/math.enum";
import { uniqueID } from "@/utils/app.util";
import { Question } from "../types/question.types";

export const QUESTION_CONNECT_MOCKS: Question[] = [
  // image - image
  {
    id: uniqueID(),
    type: QuestionType.CONNECT,
    question: "Tìm cá cho mèo bằng cách nối phép tính với kết quả đúng",
    score: 1,
    correctConnections: [
      { sourceRef: 11, targetRef: 23 },
      { sourceRef: 12, targetRef: 24 },
      { sourceRef: 13, targetRef: 21 },
      { sourceRef: 14, targetRef: 22 },
    ],
    groups: [
      {
        columns: [
          {
            rows: [
              {
                inputs: [
                  { type: 'image', ref: 11, uri: 'https://i.postimg.cc/nr1RDVQz/11.png', group: 'left', width: 110 },
                  { type: 'image', ref: 21, uri: 'https://i.postimg.cc/gjKSZc6L/21.png', group: 'right', width: 110 },
                ],
                style: { gap: 80 }
              },
              {
                inputs: [
                  { type: 'image', ref: 12, uri: 'https://i.postimg.cc/FzxWLFJ1/12.png', group: 'left', width: 110 },
                  { type: 'image', ref: 22, uri: 'https://i.postimg.cc/1XKCqRNn/22.png', group: 'right', width: 110 },
                ],
                style: { gap: 80 }
              },
              {
                inputs: [
                  { type: 'image', ref: 13, uri: 'https://i.postimg.cc/fyv29W0V/13.png', group: 'left', width: 110 },
                  { type: 'image', ref: 23, uri: 'https://i.postimg.cc/4y1L94h9/23.png', group: 'right', width: 110 },
                ],
                style: { gap: 80 }
              },
              {
                inputs: [
                  { type: 'image', ref: 14, uri: 'https://i.postimg.cc/0jCWw5Jb/14.png', group: 'left', width: 110 },
                  { type: 'image', ref: 24, uri: 'https://i.postimg.cc/BbCYKZ11/24.png', group: 'right', width: 110 },
                ],
                style: { gap: 80 }
              },
            ],
          },
        ],
      },
    ],
  },
  // image - text
  {
    id: uniqueID(),
    type: QuestionType.CONNECT,
    question: "Nối hai đồng hồ chỉ cùng thời gian vào buổi chiều hoặc buổi tối",
    score: 1,
    correctConnections: [
      { sourceRef: 1, targetRef: 11 },
      { sourceRef: 2, targetRef: 13 },
      { sourceRef: 3, targetRef: 14 },
      { sourceRef: 4, targetRef: 12 },
    ],
    groups: [
      {
        columns: [
          {
            rows: [
              {
                inputs: [
                  { type: 'image', ref: 1, uri: 'https://i.postimg.cc/rsgcgktg/clock-4h.png', group: 'left', width: 100 },
                  { type: 'text', id: uniqueID(), ref: 11, value: '16 : 00', group: 'right', width: 90 }
                ],
                style: { gap: 80 }
              },
              {
                inputs: [
                  { type: 'image', ref: 2, uri: 'https://i.postimg.cc/zvp5prR0/clock-6h.png', group: 'left', width: 100 },
                  { type: 'text', id: uniqueID(), ref: 12, value: '20 : 00', group: 'right', width: 90 }
                ],
                style: { gap: 80 }
              },
              {
                inputs: [
                  { type: 'image', ref: 3, uri: 'https://i.postimg.cc/k4Zyk631/clock-5h.png', group: 'left', width: 100 },
                  { type: 'text', id: uniqueID(), ref: 13, value: '18 : 00', group: 'right', width: 90 }
                ],
                style: { gap: 80 }
              },
              {
                inputs: [
                  { type: 'image', ref: 4, uri: 'https://i.postimg.cc/pT7Bghbc/clock-8h.png', group: 'left', width: 100 },
                  { type: 'text', id: uniqueID(), ref: 14, value: '17 : 00', group: 'right', width: 90 }
                ],
                style: { gap: 80 }
              },
            ],
          },
        ],
      },
    ],
  },
  // Các input đồng cấp
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
              { inputs: [{ type: 'text', id: uniqueID(), ref: 101, value: '5 + 3', group: 'left', width: 90 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 102, value: '10 - 4', group: 'left', width: 90 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 103, value: '7 + 2', group: 'left', width: 90 }] },
            ],
          },
          {
            rows: [
              { inputs: [{ type: 'text', id: uniqueID(), ref: 201, value: '6', group: 'right', width: 60 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 202, value: '8', group: 'right', width: 60 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 203, value: '9', group: 'right', width: 60 }] },
            ],
          },
        ],
      },
    ],
  },
  // Các input phân cấp (main -> sub)
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
              { inputs: [{ type: 'text', id: uniqueID(), ref: 11, value: '4 + 6', group: 'left', width: 80 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 12, value: '9 + 3', group: 'left', width: 80 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 13, value: '2 + 13', group: 'left', width: 80 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 14, value: '5 + 15', group: 'left', width: 80 }] },
            ],
          },
          {
            rows: [
              { inputs: [{ type: 'text', id: uniqueID(), ref: 1, value: 'Số 10', group: 'main', width: 80 }], style: { marginTop: 44 + 12 } },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 2, value: 'Số 15', group: 'main', width: 80 }] },
            ],
          },
          {
            rows: [
              { inputs: [{ type: 'text', id: uniqueID(), ref: 21, value: '14 - 6', group: 'right', width: 80 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 22, value: '19 - 9', group: 'right', width: 80 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 23, value: '2 - 8', group: 'right', width: 80 }] },
              { inputs: [{ type: 'text', id: uniqueID(), ref: 24, value: '25 - 10', group: 'right', width: 80 }] },
            ],
          },
        ],
      },
    ],
  },
];