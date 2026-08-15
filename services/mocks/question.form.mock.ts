import { MINUS } from "@/constants/math.const";
import { COLOR, SPACING } from "@/constants/theme";
import { QuestionType, TextInputStyle } from "@/enums/math.enum";
import { uniqueID } from "@/utils/app.util";
import { Question } from "../types/question.types";

export const QUESTION_FORM_MOCKS: Question[] = [
  {
    id: uniqueID(),
    type: QuestionType.FORM,
    question: "Điền số?",
    image: "",
    groups: [
      {
        label: "",
        columns: [
          {
            rows: [
              {
                inputs: [
                  { id: uniqueID(), ref: 1, type: "number", value: "25", width: 52, height: 52, isEnabled: false, style: { borderWidth: 0 } },
                ],
              },
              {
                inputs: [
                  { id: uniqueID(), ref: 2, type: "number", value: "20", width: 52, isEnabled: false, style: { marginHorizontal: 15 } },
                  { id: uniqueID(), ref: 3, type: "number", value: "5", width: 52, isEnabled: false, style: { marginHorizontal: 15 } },
                ],
                style: { marginTop: SPACING.x3 },
              }
            ],
            style: {},
          },
          {
            rows: [
              {
                inputs: [
                  { id: uniqueID(), ref: 4, type: "number", value: "25", width: 52, height: 52, isEnabled: false, style: { borderRadius: 100 } },
                ],
              },
              {
                inputs: [
                  { id: uniqueID(), ref: 5, type: "number", value: "25", width: 52, style: { marginHorizontal: 15 } },
                  { id: uniqueID(), ref: 6, type: "number", value: "25", width: 52, style: { marginHorizontal: 15 } },
                ],
                style: { marginTop: SPACING.x3 },
              }
            ],
            style: {},
          },
        ],
        style: {},
      }
    ],
    connectLines: [
      {
        source: { ref: 1, x: 'center', y: 'bottom' },
        target: { ref: 2, x: 'center', y: 'top' },
        color: 'red',
        label: "+1"
      },
      {
        source: { ref: 1, x: 'center', y: 'bottom' },
        target: { ref: 3, x: 'center', y: 'top' },
        color: 'blue',
        label: "+2"
      },
      {
        source: { ref: 4, x: 'center', y: 'bottom' },
        target: { ref: 5, x: 'center', y: 'top' },
      },
      {
        source: { ref: 4, x: 'center', y: 'bottom' },
        target: { ref: 6, x: 'center', y: 'top' },
      },
    ],
    inputLength: 2,
  },
  {
    id: uniqueID(),
    type: QuestionType.FORM,
    question: "Điền số?",
    image: "",
    groups: [
      {
        label: "",
        columns: [
          {
            rows: [
              {
                inputs: [
                  { id: uniqueID(), ref: 1, type: "number", value: "25", width: 52, height: 52, isEnabled: false, style: { marginHorizontal: 4, borderRadius: 100 } },
                  { id: uniqueID(), ref: 2, type: "number", value: "26", width: 52, isEnabled: false, style: { marginHorizontal: 4 } },
                  { id: uniqueID(), ref: 3, type: "number", value: "27", width: 52, style: { marginHorizontal: 4 } },
                  { id: uniqueID(), ref: 4, type: "number", value: "28", width: 52, isEnabled: false, style: { marginHorizontal: 4 } },
                  { id: uniqueID(), ref: 5, type: "number", value: "29", width: 52, height: 52, style: { marginHorizontal: 4, borderRadius: 100 } }
                ],
                // style: { borderWidth: 1 }
              }
            ],
            style: {},
          },
        ],
        style: {},
      }
    ],
    connectLines: [
      {
        source: { ref: 1, x: 'center', y: 'center' },
        target: { ref: 2, x: 'center', y: 'center' },
        color: '#f0f',
      },
      {
        source: { ref: 2, x: 'center', y: 'center' },
        target: { ref: 3, x: 'center', y: 'center' },
        color: '#f0f',
      },
      {
        source: { ref: 3, x: 'center', y: 'center' },
        target: { ref: 4, x: 'center', y: 'center' },
        color: '#f0f',
      },
      {
        source: { ref: 4, x: 'center', y: 'center' },
        target: { ref: 5, x: 'center', y: 'center' },
        color: '#f0f',
      }
    ],
    inputLength: 2,
  },
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
              { inputs: [{ type: "label", label: "50 " }], style: { width: 52, justifyContent: "flex-end" } },
              { inputs: [{ type: "label", label: "+" }], style: { width: 52, justifyContent: "flex-start" } },
              { inputs: [{ type: "label", label: "47 " }], style: { width: 52, justifyContent: "flex-end" } },
              { inputs: [{ type: "line" }], style: { width: 52, height: 20 } },
              { inputs: [{ id: uniqueID(), ref: 1, type: "number", value: "99", width: 52, textAlign: "right" }] }
            ],
            style: {},
          },
          {
            rows: [
              { inputs: [{ type: "label", label: "88 " }], style: { width: 52, justifyContent: "flex-end" } },
              { inputs: [{ type: "label", label: MINUS }], style: { width: 52, justifyContent: "flex-start" } },
              { inputs: [{ type: "label", label: "40 " }], style: { width: 52, justifyContent: "flex-end" } },
              { inputs: [{ type: "line" }], style: { width: 52, height: 20 } },
              { inputs: [{ id: uniqueID(), ref: 2, type: "number", value: "44", width: 52, textAlign: "right" }] }
            ],
            style: {},
          },
          {
            rows: [
              { inputs: [{ type: "label", label: "46 " }], style: { width: 52, justifyContent: "flex-end" } },
              { inputs: [{ type: "label", label: MINUS }], style: { width: 52, justifyContent: "flex-start" } },
              { inputs: [{ type: "label", label: "6 " }], style: { width: 52, justifyContent: "flex-end" } },
              { inputs: [{ type: "line" }], style: { width: 52, height: 20 } },
              { inputs: [{ id: uniqueID(), ref: 3, type: "number", value: "40", width: 52, textAlign: "right" }] }
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
              { inputs: [{ type: "label", label: "50 + 47" }], style: { width: 70, justifyContent: "flex-end", paddingRight: 4 } },
              { inputs: [{ id: uniqueID(), type: "number", value: "50", width: 70, textAlign: "right", inputStyle: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "+", width: 70, textAlign: "left", inputStyle: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "47", width: 70, textAlign: "right", inputStyle: TextInputStyle.LINE }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "99", width: 70, textAlign: "right", inputStyle: TextInputStyle.DOT }] },
            ],
            style: {},
          },
          {
            rows: [
              { inputs: [{ type: "label", label: "47 + 50" }], style: { width: 70, justifyContent: "flex-end", paddingRight: 4 } },
              { inputs: [{ id: uniqueID(), type: "number", value: "47", width: 70, textAlign: "right", inputStyle: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "+", width: 70, textAlign: "left", inputStyle: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "50", width: 70, textAlign: "right", inputStyle: TextInputStyle.LINE }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "99", width: 70, textAlign: "right", inputStyle: TextInputStyle.DOT }] },
            ],
            style: {},
          },
          {
            rows: [
              { inputs: [{ type: "label", label: "99 " + MINUS + " 47" }], style: { width: 70, justifyContent: "flex-end", paddingRight: 4 } },
              { inputs: [{ id: uniqueID(), type: "number", value: "99", width: 70, textAlign: "right", inputStyle: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: MINUS, width: 70, textAlign: "left", inputStyle: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "47", width: 70, textAlign: "right", inputStyle: TextInputStyle.LINE }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "50", width: 70, textAlign: "right", inputStyle: TextInputStyle.DOT }] },
            ],
            style: {},
          },
        ],
        style: {},
      },
      {
        label: "c) Đặt tính rồi tính (clone)",
        columns: [
          {
            rows: [
              { inputs: [{ type: "label", label: "50 + 47" }], style: { width: 70, justifyContent: "flex-end" } },
              { inputs: [{ id: uniqueID(), type: "number", value: "50", width: 70, textAlign: "right", inputStyle: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "+", width: 70, textAlign: "left", inputStyle: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "47", width: 70, textAlign: "right", inputStyle: TextInputStyle.LINE }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "99", width: 70, textAlign: "right", inputStyle: TextInputStyle.DOT }] },
            ],
            style: {},
          },
          {
            rows: [
              { inputs: [{ type: "label", label: "47 + 50" }], style: { width: 70, justifyContent: "flex-end" } },
              { inputs: [{ id: uniqueID(), type: "number", value: "47", width: 70, textAlign: "right", inputStyle: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "+", width: 70, textAlign: "left", inputStyle: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "50", width: 70, textAlign: "right", inputStyle: TextInputStyle.LINE }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "99", width: 70, textAlign: "right", inputStyle: TextInputStyle.DOT }] },
            ],
            style: {},
          },
          {
            rows: [
              { inputs: [{ type: "label", label: "99 " + MINUS + " 47" }], style: { width: 70, justifyContent: "flex-end" } },
              { inputs: [{ id: uniqueID(), type: "number", value: "99", width: 70, textAlign: "right", inputStyle: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: MINUS, width: 70, textAlign: "left", inputStyle: TextInputStyle.DOT }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "47", width: 70, textAlign: "right", inputStyle: TextInputStyle.LINE }] },
              { inputs: [{ id: uniqueID(), type: "number", value: "50", width: 70, textAlign: "right", inputStyle: TextInputStyle.DOT }] },
            ],
            style: {},
          },
        ],
        style: {},
      },
    ],
    inputLength: 2,
    connectLines: [
      {
        source: { ref: 1, x: 'right', y: 'top' },
        target: { ref: 2, x: 'left', y: 'bottom' },
        color: COLOR.primary,
        stroke: 1,
        label: "+2"
      },
      {
        source: { ref: 2, x: 'right', y: 'bottom' },
        target: { ref: 3, x: 'left', y: 'top' },
        style: 'dashed',
        stroke: 1,
        label: "+2"
      }
    ]
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
                ]
              },
              { inputs: [{ type: "label", label: "+" }], style: { width: 80, justifyContent: "flex-start" } },
              {
                inputs: [
                  { type: "label", label: "3", width: 40 },
                  { id: uniqueID(), type: "number", value: "3" }
                ],
              },
              { inputs: [{ type: "line" }], style: { width: 80, height: 20 } },
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "7" },
                  { type: "label", label: "8", width: 40 },
                ],
              },
            ],
          },
          {
            rows: [
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "3" },
                  { type: "label", label: "9", width: 40 },
                ],
              },
              { inputs: [{ type: "label", label: MINUS, }], style: { width: 80, justifyContent: "flex-start" } },
              {
                inputs: [
                  { type: "label", label: "2", width: 40 },
                  { type: "label", label: "7", width: 40 },
                ],
              },
              { inputs: [{ type: "line" }], style: { width: 80, height: 20 } },
              {
                inputs: [
                  { type: "label", label: "5", width: 40 },
                  { id: uniqueID(), type: "number", value: "7" },
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
                  { id: uniqueID(), type: "number", value: "3", inputStyle: TextInputStyle.DOT },
                  { type: "label", label: "3", width: 40 },
                ],
              },
              { inputs: [{ type: "label", label: "+" }], style: { width: 80, justifyContent: "flex-start" } },
              {
                inputs: [
                  { type: "label", label: "6", width: 40 },
                  { id: uniqueID(), type: "number", value: "5", inputStyle: TextInputStyle.DOT }
                ],
              },
              { inputs: [{ type: "line" }], style: { width: 80, height: 20 } },
              {
                inputs: [
                  { type: "label", label: "9", width: 40, height: 40 },
                  { type: "label", label: "8", width: 40, height: 40 },
                ],
              },
            ],
          },
          {
            rows: [
              {
                inputs: [
                  { type: "label", label: "9", width: 40, height: 40 },
                  { type: "label", label: "6", width: 40, height: 40 },
                ],
              },
              { inputs: [{ type: "label", label: MINUS }], style: { width: 80, justifyContent: "flex-start" } },
              {
                inputs: [
                  { type: "label", label: "2", width: 40 },
                  { id: uniqueID(), type: "number", value: "4", inputStyle: TextInputStyle.LINE }
                ],
              },
              { inputs: [{ type: "line" }], style: { width: 80, height: 20 } },
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "7", inputStyle: TextInputStyle.LINE },
                  { type: "label", label: "2", width: 40 },
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
              { inputs: [{ type: "label", label: "35", width: 52, height: 40 }], },
              {
                inputs: [{ type: "label", label: MINUS }],
                style: { width: 52, justifyContent: "flex-start" }
              },
              { inputs: [{ type: "label", label: "5", width: 52, height: 40 }], },
              { inputs: [{ type: "line" }], style: { width: 52, height: 20 } },
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
              { inputs: [{ type: "label", label: "38", width: 52, height: 40 }], },
              {
                inputs: [{ type: "label", label: MINUS }],
                style: { width: 52, justifyContent: "flex-start" }
              },
              { inputs: [{ id: uniqueID(), type: "number", value: "8", width: 40 }], },
              { inputs: [{ type: "line" }], style: { width: 52, height: 20 } },
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
                style: { width: 52, justifyContent: "flex-start" }
              },
              { inputs: [{ id: uniqueID(), type: "number", value: "8", width: 40 }], },
              { inputs: [{ type: "line" }], style: { width: 52, height: 20 } },
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
                style: { width: 52, justifyContent: "flex-start" }
              },
              { inputs: [{ id: uniqueID(), type: "number", value: "8", width: 40 }], },
              { inputs: [{ type: "line" }], style: { width: 52, height: 20 } },
              { inputs: [{ id: uniqueID(), type: "number", value: "30", width: 40 }], },
            ],
            style: { borderWidth: 1, borderColor: COLOR.blue, borderRadius: 8, padding: SPACING.md }
          }
        ]
      },
    ],
  },
];
