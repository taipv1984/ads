import { QuestionType, TextInputStyle } from "@/enums/math.enum";

import { MINUS } from "@/constants/math.const";
import { COLOR, SPACING } from "@/constants/theme";
import { uniqueID } from "@/utils/app.util";
import { Question } from "../types/question.types";


export const QUESTION_FORM_MOCKS: Question[] = [
  {
    id: uniqueID(), //3 cols
    type: QuestionType.FORM,
    question: "Tính",
    image: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png",
    groups: [
      {
        label: "a) Tính",
        columns: [
          {
            rows: [
              { inputs: [{ type: "label", label: "52 " }], style: { width: 50, justifyContent: "flex-end" } },
              { inputs: [{ type: "label", label: "+" }], style: { width: 50, justifyContent: "flex-start" } },
              { inputs: [{ type: "label", label: "47 " }], style: { width: 50, justifyContent: "flex-end" } },
              { inputs: [{ type: "line" }], style: { width: 50, height: 20 } },
              { inputs: [{ id: uniqueID(), type: "number", value: "99", width: 50, textAlign: "right" }] }
            ],
            style: {},
          },
          {
            rows: [
              { inputs: [{ type: "label", label: "88 " }], style: { width: 50, justifyContent: "flex-end" } },
              { inputs: [{ type: "label", label: MINUS }], style: { width: 50, justifyContent: "flex-start" } },
              { inputs: [{ type: "label", label: "40 " }], style: { width: 50, justifyContent: "flex-end" } },
              { inputs: [{ type: "line" }], style: { width: 50, height: 20 } },
              { inputs: [{ id: uniqueID(), type: "number", value: "44", width: 50, textAlign: "right" }] }

            ],
            style: {},
          },
          {
            rows: [
              { inputs: [{ type: "label", label: "46 " }], style: { width: 50, justifyContent: "flex-end" } },
              { inputs: [{ type: "label", label: MINUS }], style: { width: 50, justifyContent: "flex-start" } },
              { inputs: [{ type: "label", label: "6 " }], style: { width: 50, justifyContent: "flex-end" } },
              { inputs: [{ type: "line" }], style: { width: 50, height: 20 } },
              { inputs: [{ id: uniqueID(), type: "number", value: "40", width: 50, textAlign: "right" }] }
            ],
            style: {},
          },
        ],
        style: {},
      },
      {
        label: "b) Đặt tính rồi tính",
        columns: [
          {
            rows: [
              { inputs: [{ type: "label", label: "52 + 47" }], style: { width: 70, justifyContent: "flex-end" } },
              { inputs: [{ id: uniqueID(), type: "number", value: "52", width: 70, textAlign: "right", style: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "+", width: 70, textAlign: "left", style: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "47", width: 70, textAlign: "right", style: TextInputStyle.LINE }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "99", width: 70, textAlign: "right", style: TextInputStyle.DOT }] },
            ],
            style: {},
          },
          {
            rows: [
              { inputs: [{ type: "label", label: "47 + 52" }], style: { width: 70, justifyContent: "flex-end" } },
              { inputs: [{ id: uniqueID(), type: "number", value: "47", width: 70, textAlign: "right", style: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "+", width: 70, textAlign: "left", style: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "52", width: 70, textAlign: "right", style: TextInputStyle.LINE }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "99", width: 70, textAlign: "right", style: TextInputStyle.DOT }] },
            ],
            style: {},
          },
          {
            rows: [
              { inputs: [{ type: "label", label: "99 " + MINUS + " 47" }], style: { width: 70, justifyContent: "flex-end" } },
              { inputs: [{ id: uniqueID(), type: "number", value: "99", width: 70, textAlign: "right", style: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: MINUS, width: 70, textAlign: "left", style: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "47", width: 70, textAlign: "right", style: TextInputStyle.LINE }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "52", width: 70, textAlign: "right", style: TextInputStyle.DOT }] },
            ],
            style: {},
          },
        ],
        style: {},
      },
    ],
    inputLength: 2,
  },
  {
    id: uniqueID(), //3 cols
    type: QuestionType.FORM,
    question: "Điền số?",
    groups: [
      {
        label: 'a) Điền số thích hợp vào ô trống',
        columns: [
          {
            rows: [
              {
                inputs: [
                  { type: "label", label: "4", width: 40 },
                  { type: "label", label: "5", width: 40 },
                ],
              },
              { inputs: [{ type: "label", label: "+" }], style: { width: 100, justifyContent: "flex-start" } },
              {
                inputs: [
                  { type: "label", label: "3", width: 40 },
                  { id: uniqueID(), type: "number", value: "3", width: 40 }
                ],
              },
              { inputs: [{ type: "line" }], style: { width: 100, height: 20 } },
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "7", width: 40 },
                  { type: "label", label: "8", width: 40 },
                ],
              },
            ],
          },
          {
            rows: [
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "3", width: 40 },
                  { type: "label", label: "9", width: 40 },
                ],
              },
              { inputs: [{ type: "label", label: MINUS, }], style: { width: 100, justifyContent: "flex-start" } },
              {
                inputs: [
                  { type: "label", label: "2", width: 40 },
                  { type: "label", label: "7", width: 40 },
                ],
              },
              { inputs: [{ type: "line" }], style: { width: 100, height: 20 } },
              {
                inputs: [
                  { type: "label", label: "5", width: 40 },
                  { id: uniqueID(), type: "number", value: "7", width: 40 },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'b) Điền số thích hợp vào chỗ chấm',
        columns: [
          {
            rows: [
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "3", width: 20, style: TextInputStyle.DOT },
                  { type: "label", label: "3", width: 20 },
                ],
              },
              { inputs: [{ type: "label", label: "+" }], style: { width: 60, justifyContent: "flex-start" } },
              {
                inputs: [
                  { type: "label", label: "6", width: 20 },
                  { id: uniqueID(), type: "number", value: "5", width: 20, style: TextInputStyle.DOT }
                ],
              },
              { inputs: [{ type: "line" }], style: { width: 60, height: 20 } },
              {
                inputs: [
                  { type: "label", label: "9", width: 20 },
                  { type: "label", label: "8", width: 20 },
                ],
              },
            ],
          },
          {
            rows: [
              {
                inputs: [
                  { type: "label", label: "9", width: 20, height: 40 },
                  { type: "label", label: "6", width: 20, height: 40 },
                ],
              },
              { inputs: [{ type: "label", label: MINUS }], style: { width: 60, justifyContent: "flex-start" } },
              {
                inputs: [
                  { type: "label", label: "2", width: 20 },
                  { id: uniqueID(), type: "number", value: "4", width: 20, style: TextInputStyle.DOT }
                ],
              },
              { inputs: [{ type: "line" }], style: { width: 60, height: 20 } },
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "7", width: 20, style: TextInputStyle.DOT },
                  { type: "label", label: "2", width: 20 },
                ],
              },
            ],
          },
          {
            rows: [
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "5", width: 20, style: TextInputStyle.DOT },
                  { type: "label", label: "6", width: 20 },
                ],
              },
              { inputs: [{ type: "label", label: "+" }], style: { width: 60, justifyContent: "flex-start" } },
              {
                inputs: [
                  { type: "label", label: "3", width: 20 },
                  { id: uniqueID(), type: "number", value: "3", width: 20, style: TextInputStyle.DOT }
                ],
              },
              { inputs: [{ type: "line" }], style: { width: 60, height: 20 } },
              {
                inputs: [
                  { type: "label", label: "8", width: 20 },
                  { type: "label", label: "9", width: 20 },
                ],
              },
            ],
          },
        ],
      },
    ],
    inputLength: 1,
  },
  {
    id: uniqueID(), //2 cols+ 2 label
    type: QuestionType.FORM,
    question: "Tính nhẩm",
    groups: [
      {
        label: "a)",
        columns: [
          {
            rows: [
              {
                inputs: [
                  { type: "label", label: "48 - 40 = " },
                  { id: uniqueID(), type: "number", value: "8" }
                ],
                style: { marginBottom: SPACING.md }
              },
              {
                inputs: [
                  { type: "label", label: "58 - 33 = " },
                  { id: uniqueID(), type: "number", value: "28" }
                ],
              }
            ],
            style: {},
          },
          {
            rows: [
              {
                inputs: [
                  { type: "label", label: "69 - 60 = " },
                  { id: uniqueID(), type: "number", value: "9" }
                ],
                style: { marginBottom: SPACING.md }
              },
              {
                inputs: [
                  { type: "label", label: "79 - 50 = " },
                  { id: uniqueID(), type: "number", value: "29" }
                ],
              }
            ],
            style: {},
          }
        ]
      },
      {
        label: "b)",
        columns: [
          {
            rows: [
              {
                inputs: [
                  { type: "label", label: "37 - 4 = " },
                  { id: uniqueID(), type: "number", value: "33" }
                ],
                style: { marginBottom: SPACING.md }
              },
              {
                inputs: [
                  { type: "label", label: "37 - 7 = " },
                  { id: uniqueID(), type: "number", value: "30" }
                ]
              }
            ],
            style: {},
          },
          {
            rows: [
              {
                inputs: [
                  { type: "label", label: "98 - 8 = " },
                  { id: uniqueID(), type: "number", value: "90" }
                ],
                style: { marginBottom: SPACING.md }
              },
              {
                inputs: [
                  { type: "label", label: "98 - 5 = " },
                  { id: uniqueID(), type: "number", value: "93" }
                ]
              }
            ],
            style: {},
          }
        ]
      },
    ],
    image: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png",
    inputLength: 2,
  },
  {
    id: uniqueID(), //2 cols
    type: QuestionType.FORM,
    question: "Điền số thích hợp vào chỗ chấm:",
    groups: [
      {
        columns: [
          {
            rows: [
              {
                inputs: [
                  { type: "label", label: "92 - " },
                  { id: uniqueID(), type: "number", value: "10" },
                  { type: "label", label: " = 82" },
                ],
                style: { marginBottom: SPACING.md }
              },
              {
                inputs: [
                  { type: "label", label: "39 - " },
                  { id: uniqueID(), type: "number", value: "2" },
                  { type: "label", label: " = 37" }
                ]
              }
            ],
            style: {},
          },
        ]
      },
    ],
    inputLength: 2,
  },
  {
    id: uniqueID(), //1 col+ select input
    type: QuestionType.FORM,
    question: "Điền dấu **> < =** vào ô trống",
    groups: [
      {
        columns: [
          {
            rows: [
              {
                inputs: [
                  { type: "label", label: "57 - 7 " },
                  { id: uniqueID(), type: "select", value: "<", valueOptions: '["<", ">", "="]' },
                  { type: "label", label: " 57 - 4" },
                ],
                style: { marginBottom: SPACING.md }
              },
              {
                inputs: [
                  { type: "label", label: "70 - 50 " },
                  { id: uniqueID(), type: "select", value: ">", valueOptions: '["<", ">", "="]', width: 40 },
                  { type: "label", label: " 50 - 30" },
                ],
                style: { marginBottom: SPACING.md }
              },
              {
                inputs: [
                  { type: "label", label: "70 - 50 " },
                  { id: uniqueID(), type: "select", value: ">", valueOptions: '["<", ">", "="]', width: 120 },
                  { type: "label", label: " 50 - 30" },
                ]
              },
            ],
            style: {},
          }
        ]
      },
    ],
    inputLength: 2,
  },
  {
    id: uniqueID(),
    type: QuestionType.FORM,
    question: "Thực hiện phép tính",
    groups: [
      {
        columns: [
          {
            rows: [
              {
                inputs: [
                  { type: "label", label: "30 cm + 20 cm - 40 cm = " },
                  { id: uniqueID(), type: "text", value: "10 cm", width: 80 },
                ],
                style: { justifyContent: "flex-start", marginBottom: SPACING.md }
              },
              {
                inputs: [
                  { type: "label", label: "70 cm - 30 cm + 50 cm = " },
                  { id: uniqueID(), type: "text", value: "10 cm", width: 80 },
                ],
                style: { justifyContent: "flex-start", marginBottom: SPACING.md }
              },
            ],
          }
        ]
      },
    ],
  },
  {
    id: uniqueID(),
    type: QuestionType.FORM,
    question: "Thực hiện phép tính",
    groups: [
      {
        columns: [
          {
            rows: [
              {
                inputs: [
                  { type: "label", label: "35  -  5  =  " },
                  { id: uniqueID(), type: "text", value: "30" },
                ],
                style: { marginBottom: SPACING.md }
              },
              { inputs: [{ type: "label", label: "35", width: 50, height: 40 }], },
              {
                inputs: [{ type: "label", label: MINUS }],
                style: { width: 50, justifyContent: "flex-start" }
              },
              { inputs: [{ type: "label", label: "5", width: 50, height: 40 }], },
              { inputs: [{ type: "line" }], style: { width: 50, height: 20 } },
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "30", width: 40 },
                ],
              },
            ],
            style: { borderWidth: 1, borderColor: COLOR.blue, borderRadius: 8, padding: SPACING.md }
          },
          {
            rows: [
              {
                inputs: [
                  { type: "label", label: "38  -  8  =  " },
                  { id: uniqueID(), type: "text", value: "30" },
                ],
                style: { marginBottom: SPACING.md }
              },
              { inputs: [{ type: "label", label: "38", width: 50, height: 40 }], },
              {
                inputs: [{ type: "label", label: MINUS }],
                style: { width: 50, justifyContent: "flex-start" }
              },
              { inputs: [{ id: uniqueID(), type: "number", value: "8", width: 40 }], },
              { inputs: [{ type: "line" }], style: { width: 50, height: 20 } },
              { inputs: [{ id: uniqueID(), type: "number", value: "30", width: 40 }], },
            ],
            style: { borderWidth: 1, borderColor: COLOR.blue, borderRadius: 8, padding: SPACING.md }
          }
        ],
        style: { marginBottom: SPACING.md }
      },
      {
        columns: [
          {
            rows: [
              {
                inputs: [
                  { type: "label", label: "38  -  8  =  " },
                  { id: uniqueID(), type: "text", value: "30" },
                ],
                style: { marginBottom: SPACING.md }
              },
              { inputs: [{ id: uniqueID(), type: "number", value: "38", width: 40 }], },
              {
                inputs: [{ type: "label", label: MINUS }],
                style: { width: 50, justifyContent: "flex-start" }
              },
              { inputs: [{ id: uniqueID(), type: "number", value: "8", width: 40 }], },
              { inputs: [{ type: "line" }], style: { width: 50, height: 20 } },
              { inputs: [{ id: uniqueID(), type: "number", value: "30", width: 40 }], },
            ],
            style: { borderWidth: 1, borderColor: COLOR.blue, borderRadius: 8, padding: SPACING.md }
          },
          {
            rows: [
              {
                inputs: [
                  { type: "label", label: "38  -  8  =  " },
                  { id: uniqueID(), type: "text", value: "30" },
                ],
                style: { marginBottom: SPACING.md }
              },
              { inputs: [{ id: uniqueID(), type: "number", value: "38", width: 40 }], },
              {
                inputs: [{ type: "label", label: MINUS }],
                style: { width: 50, justifyContent: "flex-start" }
              },
              { inputs: [{ id: uniqueID(), type: "number", value: "8", width: 40 }], },
              { inputs: [{ type: "line" }], style: { width: 50, height: 20 } },
              { inputs: [{ id: uniqueID(), type: "number", value: "30", width: 40 }], },
            ],
            style: { borderWidth: 1, borderColor: COLOR.blue, borderRadius: 8, padding: SPACING.md }
          }
        ]
      },
    ],
  },
];
