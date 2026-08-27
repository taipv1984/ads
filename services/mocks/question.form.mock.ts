import { MINUS } from "@/constants/math.const";
import { COLOR, SPACING } from "@/constants/theme";
import { QuestionType, TextInputStyle } from "@/enums/math.enum";
import { uniqueID } from "@/utils/app.util";
import { Question } from "../types/question.types";

export const QUESTION_FORM_MOCKS: Question[] = [
  {
    id: uniqueID(),
    type: QuestionType.FORM,
    question: "Điền các số **2, 3, 4, 5, 6** vào 5 ô vuông dưới đây, sao cho tổng của ba số thẳng hàng và thẳng cột đều bằng số đã ghi dưới hình?",
    image: "",
    groups: [
      {
        columns: [
          {
            rows: [
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "3", style: { borderRadius: 0, marginBottom: -1 } },
                ],
              },
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "4", style: { borderRadius: 0, marginRight: -1 } },
                  { id: uniqueID(), type: "number", value: "2", style: { borderRadius: 0, } },
                  { id: uniqueID(), type: "number", value: "5", style: { borderRadius: 0, marginLeft: -1 } },
                ],
              },
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "6", style: { borderRadius: 0, marginTop: -1 } },
                ],
              },
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "11", isEnabled: false, style: { backgroundColor: COLOR.bgSuccess } },
                ],
                style: { marginTop: SPACING.lg }
              },
            ],
          }
        ],
        style: { marginBottom: 30 }
      },
    ],
    connectLines: [],
    inputLength: 2,
  },
  {
    id: uniqueID(),
    type: QuestionType.FORM,
    question: "Điền các số **3, 4, 5, 6, 7** vào hình bên. Trong 5 hình tròn, sao cho tổng của 3 số trên mỗi đường thẳng đều bằng **15**?",
    image: "",
    groups: [
      {
        columns: [
          {
            rows: [
              {
                inputs: [
                  { id: uniqueID(), ref: 2, type: "number", value: "4", style: { borderRadius: 100 } },
                ],
                style: { marginBottom: SPACING.x3 }
              },
              {
                inputs: [
                  { id: uniqueID(), ref: 3, type: "number", value: "3", style: { borderRadius: 100 } },
                  { id: uniqueID(), ref: 1, type: "number", value: "5", style: { borderRadius: 100, marginHorizontal: SPACING.x3 } },
                  { id: uniqueID(), ref: 4, type: "number", value: "7", style: { borderRadius: 100 } },
                ],
              },
              {
                inputs: [
                  { id: uniqueID(), ref: 5, type: "number", value: "6", style: { borderRadius: 100 } },
                ],
                style: { marginTop: SPACING.x3 }
              },
            ],
          }
        ],
        style: { marginBottom: 30 }
      },
      {
        columns: [
          {
            rows: [
              {
                inputs: [
                  { id: uniqueID(), ref: 11, type: "number", value: "3", style: { borderRadius: 100 } },
                ],
                style: { marginBottom: 30 }
              },
              {
                inputs: [
                  { id: uniqueID(), ref: 12, type: "number", value: "7", style: { borderRadius: 100, marginHorizontal: 40 } },
                  { id: uniqueID(), ref: 13, type: "number", value: "5", style: { borderRadius: 100, marginHorizontal: 40 } },
                ],
              },
              {
                inputs: [
                  { id: uniqueID(), ref: 14, type: "number", value: "2", style: { borderRadius: 100 } },
                  { id: uniqueID(), ref: 15, type: "number", value: "6", style: { borderRadius: 100, marginHorizontal: 80 } },
                  { id: uniqueID(), ref: 16, type: "number", value: "4", style: { borderRadius: 100 } },
                ],
                style: { marginTop: SPACING.x3 }
              },
            ],
          }
        ],
        style: {}
      },
    ],
    connectLines: [
      {
        source: { ref: 1, x: 'center', y: 'center' },
        target: { ref: 2, x: 'center', y: 'center' },
      },
      {
        source: { ref: 1, x: 'center', y: 'center' },
        target: { ref: 3, x: 'center', y: 'center' },
      },
      {
        source: { ref: 1, x: 'center', y: 'center' },
        target: { ref: 4, x: 'center', y: 'center' },
      },
      {
        source: { ref: 1, x: 'center', y: 'center' },
        target: { ref: 5, x: 'center', y: 'center' },
      },
      {
        source: { ref: 14, x: 'center', y: 'center' },
        target: { ref: 15, x: 'center', y: 'center' },
      },
      {
        source: { ref: 11, x: 'center', y: 'center' },
        target: { ref: 12, x: 'center', y: 'center' },
      },
      {
        source: { ref: 11, x: 'center', y: 'center' },
        target: { ref: 13, x: 'center', y: 'center' },
      },
      {
        source: { ref: 12, x: 'center', y: 'center' },
        target: { ref: 14, x: 'center', y: 'center' },
      },
      {
        source: { ref: 13, x: 'center', y: 'center' },
        target: { ref: 16, x: 'center', y: 'center' },
      },
      {
        source: { ref: 14, x: 'center', y: 'center' },
        target: { ref: 15, x: 'center', y: 'center' },
      },
      {
        source: { ref: 15, x: 'center', y: 'center' },
        target: { ref: 16, x: 'center', y: 'center' },
      },
    ],
    inputLength: 2,
  },
  {
    id: uniqueID(),
    type: QuestionType.FORM,
    question: "Tách số?",
    image: "",
    groups: [
      {
        columns: [
          {
            rows: [
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "14", isEnabled: false, style: { borderWidth: 0, backgroundColor: '#fff' } },
                  { id: uniqueID(), type: "number", value: MINUS, isEnabled: false, style: { borderWidth: 0, backgroundColor: '#fff' } },
                  { id: uniqueID(), ref: 1, type: "number", value: "9", isEnabled: false, style: { borderWidth: 0, backgroundColor: '#fff' } },
                  { id: uniqueID(), type: "number", value: "=", isEnabled: false, style: { borderWidth: 0, backgroundColor: '#fff' } },
                  { id: uniqueID(), type: "number", value: "5", style: {} },
                ],
              },
              {
                inputs: [
                  { id: uniqueID(), ref: 2, type: "number", value: "4", style: { marginHorizontal: 10, borderRadius: 100 } },
                  { id: uniqueID(), ref: 3, type: "number", value: "4", style: { marginHorizontal: 10, borderRadius: 100 } }
                ],
                style: { marginTop: SPACING.x3 }
              },
            ],
          }
        ]
      },
    ],
    connectLines: [
      {
        source: { ref: 1, x: 'center', y: 'bottom' },
        target: { ref: 2, x: 'center', y: 'top' },
        style: 'arrow',
      },
      {
        source: { ref: 1, x: 'center', y: 'bottom' },
        target: { ref: 3, x: 'center', y: 'top' },
        style: 'arrow',
      },
    ],
    inputLength: 2,
  },
  {
    id: uniqueID(),
    type: QuestionType.FORM,
    question: "Điền số? a",
    image: "",
    groups: [
      {
        columns: [
          {
            rows: [
              {
                inputs: [{ id: uniqueID(), ref: 1, type: "number", value: "1", isEnabled: false, style: { marginTop: 100, borderRadius: 100 } }],
              },
            ],
          },
          {
            rows: [
              {
                inputs: [{ id: uniqueID(), ref: 2, type: "number", value: "3", style: {} }],
              },
              {
                inputs: [{ id: uniqueID(), ref: 3, type: "number", value: "4", style: { marginTop: 10 } }],
              },
              {
                inputs: [{ id: uniqueID(), ref: 4, type: "number", value: "5", style: { marginTop: 10 } }],
              },
              {
                inputs: [{ id: uniqueID(), ref: 5, type: "number", value: "6", style: { marginTop: 10 } }],
              },
              {
                inputs: [{ id: uniqueID(), ref: 6, type: "number", value: "7", style: { marginTop: 10 } }],
              },
            ],
          }
        ]
      },
      {
        columns: [
          {
            rows: [
              {
                inputs: [{ id: uniqueID(), ref: 7, type: "number", value: "8", style: {} }],
              },
              {
                inputs: [{ id: uniqueID(), ref: 8, type: "number", value: "9", style: { marginTop: 10 } }],
              },
              {
                inputs: [{ id: uniqueID(), ref: 9, type: "number", value: "10", style: { marginTop: 10 } }],
              },
              {
                inputs: [{ id: uniqueID(), ref: 10, type: "number", value: "11", style: { marginTop: 10 } }],
              },
              {
                inputs: [{ id: uniqueID(), ref: 11, type: "number", value: "12", style: { marginTop: 10 } }],
              },
            ],
          },
          {
            rows: [
              {
                inputs: [{ id: uniqueID(), ref: 12, type: "number", value: "2", isEnabled: false, style: { marginTop: 100, borderRadius: 100 } }],
              },
            ],
          },
        ],
      }
    ],
    connectLines: [
      {
        source: { ref: 1, x: 'center', y: 'center' },
        target: { ref: 2, x: 'left', y: 'center' },
        label: "+1",
        labelAnchor: 'last',
        style: 'arrow',
      },
      {
        source: { ref: 1, x: 'center', y: 'center' },
        target: { ref: 3, x: 'left', y: 'center' },
        label: "+2",
        labelAnchor: 'last',
        style: 'arrow',
      },
      {
        source: { ref: 1, x: 'center', y: 'center' },
        target: { ref: 4, x: 'left', y: 'center' },
        label: "+3",
        labelAnchor: 'last',
        style: 'arrow',
      },
      {
        source: { ref: 1, x: 'center', y: 'center' },
        target: { ref: 5, x: 'left', y: 'center' },
        label: "+4",
        labelAnchor: 'last',
        style: 'arrow',
      },
      {
        source: { ref: 1, x: 'center', y: 'center' },
        target: { ref: 6, x: 'left', y: 'center' },
        label: "+5",
        labelAnchor: 'last',
        style: 'arrow',
      },
      {
        source: { ref: 12, x: 'center', y: 'center' },
        target: { ref: 7, x: 'right', y: 'center' },
        label: "+6",
        labelAnchor: 'last',
        style: 'arrow',
      },
      {
        source: { ref: 12, x: 'center', y: 'center' },
        target: { ref: 8, x: 'right', y: 'center' },
        label: "+7",
        labelAnchor: 'last',
        style: 'arrow',
      },
      {
        source: { ref: 12, x: 'center', y: 'center' },
        target: { ref: 9, x: 'right', y: 'center' },
        label: "+8",
        labelAnchor: 'last',
        style: 'arrow',
      },
      {
        source: { ref: 12, x: 'center', y: 'center' },
        target: { ref: 10, x: 'right', y: 'center' },
        label: "+9",
        labelAnchor: 'last',
        style: 'arrow',
      },
      {
        source: { ref: 12, x: 'center', y: 'center' },
        target: { ref: 11, x: 'right', y: 'center' },
        label: "+10",
        labelAnchor: 'last',
        style: 'arrow',
      },
    ],
    inputLength: 2,
  },
  {
    id: uniqueID(),
    type: QuestionType.FORM,
    question: "Điền số? b",
    image: "",
    groups: [
      {
        columns: [
          {
            rows: [
              {
                inputs: [
                  { id: uniqueID(), ref: 1, type: "number", value: "25", isEnabled: false, style: { borderRadius: 100 } },
                ],
              },
              {
                inputs: [
                  { id: uniqueID(), ref: 2, type: "number", value: "25", style: { marginHorizontal: 10 } },
                  { id: uniqueID(), ref: 3, type: "number", value: "25", style: { marginHorizontal: 10 } },
                  { id: uniqueID(), ref: 4, type: "number", value: "25", style: { marginHorizontal: 10 } },
                  { id: uniqueID(), ref: 5, type: "number", value: "25", style: { marginHorizontal: 10 } },
                  { id: uniqueID(), ref: 6, type: "number", value: "25", style: { marginHorizontal: 10 } },
                ],
                style: { marginTop: SPACING.x6 },
              }
            ],
          },
        ],
        style: { marginBottom: SPACING.x6 },
      },
      {
        columns: [
          {
            rows: [
              {
                inputs: [
                  { id: uniqueID(), ref: 7, type: "number", value: "25", style: { marginHorizontal: 10 } },
                  { id: uniqueID(), ref: 8, type: "number", value: "25", style: { marginHorizontal: 10 } },
                  { id: uniqueID(), ref: 9, type: "number", value: "25", style: { marginHorizontal: 10 } },
                  { id: uniqueID(), ref: 10, type: "number", value: "25", style: { marginHorizontal: 10 } },
                  { id: uniqueID(), ref: 11, type: "number", value: "25", style: { marginHorizontal: 10 } },
                ],
              },
              {
                inputs: [
                  { id: uniqueID(), ref: 12, type: "number", value: "25", isEnabled: false, style: { borderRadius: 100 } },
                ],
                style: { marginTop: SPACING.x6 },
              }
            ],
          },
        ],
        style: { marginTop: SPACING.x6 },
      }
    ],
    connectLines: [
      {
        source: { ref: 1, x: 'center', y: 'center' },
        target: { ref: 2, x: 'center', y: 'top' },
        label: "+a",
        labelAnchor: 'last',
        style: 'arrow',
      },
      {
        source: { ref: 1, x: 'center', y: 'center' },
        target: { ref: 3, x: 'center', y: 'top' },
        label: "+b",
        labelAnchor: 'last',
        style: 'arrow',
      },
      {
        source: { ref: 1, x: 'center', y: 'center' },
        target: { ref: 4, x: 'center', y: 'top' },
        label: "+c",
        labelAnchor: 'last',
        style: 'arrow',
      },
      {
        source: { ref: 1, x: 'center', y: 'center' },
        target: { ref: 5, x: 'center', y: 'top' },
        label: "+d",
        labelAnchor: 'last'
      },
      {
        source: { ref: 1, x: 'center', y: 'center' },
        target: { ref: 6, x: 'center', y: 'top' },
        label: "+e",
        labelAnchor: 'last'
      },
      {
        source: { ref: 12, x: 'center', y: 'center' },
        target: { ref: 7, x: 'center', y: 'bottom' },
        label: "+x",
        labelOffset: -12,
        labelAnchor: 'last',
        style: 'arrow',
      },
      {
        source: { ref: 12, x: 'center', y: 'center' },
        target: { ref: 8, x: 'center', y: 'bottom' },
        label: "+y",
        labelOffset: -12,
        labelAnchor: 'last',
        style: 'arrow',
      },
      {
        source: { ref: 12, x: 'center', y: 'center' },
        target: { ref: 9, x: 'center', y: 'bottom' },
        label: "+z",
        labelOffset: -12,
        labelAnchor: 'last',
        style: 'arrow',
      },
      {
        source: { ref: 12, x: 'center', y: 'center' },
        target: { ref: 10, x: 'center', y: 'bottom' },
        label: "+w",
        labelOffset: -12,
        labelAnchor: 'last',
        style: 'arrow',
      },
      {
        source: { ref: 12, x: 'center', y: 'center' },
        target: { ref: 11, x: 'center', y: 'bottom' },
        label: "+@",
        labelOffset: -12,
        labelAnchor: 'last',
        style: 'arrow',
      },
    ],
    inputLength: 2,
  },
  {
    id: uniqueID(),
    type: QuestionType.FORM,
    question: "Điền số? c",
    groups: [
      {
        columns: [
          {
            rows: [
              {
                inputs: [
                  { id: uniqueID(), ref: 1, type: "number", value: "25", isEnabled: false, style: { marginHorizontal: 4, borderRadius: 100 } },
                  { id: uniqueID(), ref: 2, type: "number", value: "26", isEnabled: false, style: { marginHorizontal: 4 } },
                  { id: uniqueID(), ref: 3, type: "number", value: "27", style: { marginHorizontal: 4 } },
                  { id: uniqueID(), ref: 4, type: "number", value: "28", isEnabled: false, style: { marginHorizontal: 4 } },
                  { id: uniqueID(), ref: 5, type: "number", value: "29", style: { marginHorizontal: 4, borderRadius: 100 } }
                ],
              }
            ],
          },
        ],
        // style: {borderWidth: 1},
      },
      {
        columns: [
          {
            rows: [
              {
                inputs: [
                  { id: uniqueID(), ref: 11, type: "number", value: "5", isEnabled: false, style: { marginHorizontal: 30, borderRadius: 100 } },
                  { id: uniqueID(), ref: 12, type: "number", value: "0", style: { marginHorizontal: 30 } },
                ],
              }
            ],
          },
        ],
        style: { marginTop: 10 },
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
      },
      {
        source: { ref: 11, x: 'right', y: 'center' },
        target: { ref: 12, x: 'left', y: 'center' },
        label: '-5',
        style: 'arrow',
        color: '#00f',
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
              { inputs: [{ type: "label", label: "50 " }], style: { width: 44, justifyContent: "flex-end" } },
              { inputs: [{ type: "label", label: "+" }], style: { width: 44, justifyContent: "flex-start" } },
              { inputs: [{ type: "label", label: "47 " }], style: { width: 44, justifyContent: "flex-end" } },
              { inputs: [{ type: "line" }], style: { width: 44, height: 20 } },
              { inputs: [{ id: uniqueID(), ref: 1, type: "number", value: "99", width: 44, textAlign: "right" }] }
            ],
            style: {},
          },
          {
            rows: [
              { inputs: [{ type: "label", label: "88 " }], style: { width: 44, justifyContent: "flex-end" } },
              { inputs: [{ type: "label", label: MINUS }], style: { width: 44, justifyContent: "flex-start" } },
              { inputs: [{ type: "label", label: "40 " }], style: { width: 44, justifyContent: "flex-end" } },
              { inputs: [{ type: "line" }], style: { width: 44, height: 20 } },
              { inputs: [{ id: uniqueID(), ref: 2, type: "number", value: "44", width: 44, textAlign: "right" }] }
            ],
            style: {},
          },
          {
            rows: [
              { inputs: [{ type: "label", label: "46 " }], style: { width: 44, justifyContent: "flex-end" } },
              { inputs: [{ type: "label", label: MINUS }], style: { width: 44, justifyContent: "flex-start" } },
              { inputs: [{ type: "label", label: "6 " }], style: { width: 44, justifyContent: "flex-end" } },
              { inputs: [{ type: "line" }], style: { width: 44, height: 20 } },
              { inputs: [{ id: uniqueID(), ref: 3, type: "number", value: "40", width: 44, textAlign: "right" }] }
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
        style: 'arrow',
        stroke: 1,
        label: "+2"
      }
    ]
  },
  {
    id: uniqueID(), //3 cols
    type: QuestionType.FORM,
    question: "Điền số? d",
    groups: [
      {
        label: 'a) Điền số thích hợp vào ô trống',
        columns: [
          {
            rows: [
              {
                inputs: [
                  { type: "label", label: "4", width: 44 },
                  { type: "label", label: "5", width: 44 },
                ]
              },
              { inputs: [{ type: "label", label: "+" }], style: { width: 80, justifyContent: "flex-start" } },
              {
                inputs: [
                  { type: "label", label: "3", width: 44 },
                  { id: uniqueID(), type: "number", value: "3" }
                ],
              },
              { inputs: [{ type: "line" }], style: { width: 80, height: 20 } },
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "7" },
                  { type: "label", label: "8", width: 44 },
                ],
              },
            ],
          },
          {
            rows: [
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "3" },
                  { type: "label", label: "9", width: 44 },
                ],
              },
              { inputs: [{ type: "label", label: MINUS, }], style: { width: 80, justifyContent: "flex-start" } },
              {
                inputs: [
                  { type: "label", label: "2", width: 44 },
                  { type: "label", label: "7", width: 44 },
                ],
              },
              { inputs: [{ type: "line" }], style: { width: 80, height: 20 } },
              {
                inputs: [
                  { type: "label", label: "5", width: 44 },
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
                  { type: "label", label: "3", width: 44 },
                ],
              },
              { inputs: [{ type: "label", label: "+" }], style: { width: 80, justifyContent: "flex-start" } },
              {
                inputs: [
                  { type: "label", label: "6", width: 44 },
                  { id: uniqueID(), type: "number", value: "5", inputStyle: TextInputStyle.DOT }
                ],
              },
              { inputs: [{ type: "line" }], style: { width: 80, height: 20 } },
              {
                inputs: [
                  { type: "label", label: "9", width: 44 },
                  { type: "label", label: "8", width: 44 },
                ],
              },
            ],
          },
          {
            rows: [
              {
                inputs: [
                  { type: "label", label: "9", width: 44 },
                  { type: "label", label: "6", width: 44 },
                ],
              },
              { inputs: [{ type: "label", label: MINUS }], style: { width: 80, justifyContent: "flex-start" } },
              {
                inputs: [
                  { type: "label", label: "2", width: 44 },
                  { id: uniqueID(), type: "number", value: "4", inputStyle: TextInputStyle.LINE }
                ],
              },
              { inputs: [{ type: "line" }], style: { width: 80, height: 20 } },
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "7", inputStyle: TextInputStyle.LINE },
                  { type: "label", label: "2", width: 44 },
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
                  { id: uniqueID(), type: "select", value: ">", valueOptions: '["<", ">", "="]', width: 44 },
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
    inputLength: 0
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
              { inputs: [{ type: "label", label: "35", width: 44 }], },
              {
                inputs: [{ type: "label", label: MINUS }],
                style: { width: 44, justifyContent: "flex-start" }
              },
              { inputs: [{ type: "label", label: "5", width: 44 }], },
              { inputs: [{ type: "line" }], style: { width: 44, height: 20 } },
              {
                inputs: [
                  { id: uniqueID(), type: "number", value: "30", width: 44 },
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
              { inputs: [{ type: "label", label: "38" }], },
              {
                inputs: [{ type: "label", label: MINUS }],
                style: { width: 44, justifyContent: "flex-start" }
              },
              { inputs: [{ id: uniqueID(), type: "number", value: "8", width: 44 }], },
              { inputs: [{ type: "line" }], style: { width: 44, height: 20 } },
              { inputs: [{ id: uniqueID(), type: "number", value: "30", width: 44 }], },
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
              { inputs: [{ id: uniqueID(), type: "number", value: "38", width: 44 }], },
              {
                inputs: [{ type: "label", label: MINUS }],
                style: { width: 44, justifyContent: "flex-start" }
              },
              { inputs: [{ id: uniqueID(), type: "number", value: "8", width: 44 }], },
              { inputs: [{ type: "line" }], style: { width: 44, height: 20 } },
              { inputs: [{ id: uniqueID(), type: "number", value: "30", width: 44 }], },
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
              { inputs: [{ id: uniqueID(), type: "number", value: "38", width: 44 }], },
              {
                inputs: [{ type: "label", label: MINUS }],
                style: { width: 44, justifyContent: "flex-start" }
              },
              { inputs: [{ id: uniqueID(), type: "number", value: "8", width: 44 }], },
              { inputs: [{ type: "line" }], style: { width: 44, height: 20 } },
              { inputs: [{ id: uniqueID(), type: "number", value: "30", width: 44 }], },
            ],
            style: { borderWidth: 1, borderColor: COLOR.blue, borderRadius: 8, padding: SPACING.md }
          }
        ]
      },
    ],
  },
];
