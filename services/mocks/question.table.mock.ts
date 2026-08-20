import { COLOR } from "@/constants/theme";
import { QuestionType, TextInputStyle } from "@/enums/math.enum";
import { uniqueID } from "@/utils/app.util";
import { QuestionTable } from "../types/question.types";

export const QUESTION_TABLE_MOCKS: QuestionTable[] = [
  {
    id: uniqueID(),
    type: QuestionType.TABLE,
    question: "Quan sát để tìm quy luật rồi điền số thích hợp vào ô trống",
    columnCount: 4,
    rows: [
      {
        id: uniqueID(),
        cells: [
          { id: uniqueID(), label: '3' },
          { id: uniqueID(), label: '4' },
          { id: uniqueID(), label: '3' },
          { id: uniqueID(), label: '13', style: { backgroundColor: COLOR.yellowLight }, textStyle: { color: COLOR.error } },
        ],
      },
      {
        id: uniqueID(),
        cells: [
          { id: uniqueID(), label: '0' },
          { id: uniqueID(), label: '4' },
          { id: uniqueID(), label: '3' },
          { id: uniqueID(), label: '12', style: { backgroundColor: COLOR.yellowLight }, textStyle: { color: COLOR.error } },
        ],
      },
      {
        id: uniqueID(),
        cells: [
          {
            id: uniqueID(),
            input: {
              type: 'image',
              uri: 'https://www.vhv.rs/dpng/d/15-151266_blue-circle-png-logo-transparent-png.png',
              width: 44,
            }
          },
          { id: uniqueID(), label: '4' },
          {
            id: uniqueID(),
            input: {
              type: 'image',
              source: require("@/assets/images/logo.png"),
              width: 34,
            }
          },
          { id: uniqueID(), label: '11', style: { backgroundColor: COLOR.yellowLight }, textStyle: { color: COLOR.error } },
        ],
      },
      {
        id: uniqueID(),
        cells: [
          { id: uniqueID(), label: '10', style: { backgroundColor: COLOR.yellowLight }, textStyle: { color: COLOR.error } },
          { id: uniqueID(), label: '15', style: { backgroundColor: COLOR.yellowLight }, textStyle: { color: COLOR.error } },
          { id: uniqueID(), label: '11', style: { backgroundColor: COLOR.yellowLight }, textStyle: { color: COLOR.error } },
        ],
      },
    ],
  },
  {
    id: uniqueID(),
    type: QuestionType.TABLE,
    question: "Điền số thích hợp vào ô trống (theo mẫu)",
    columnCount: 6,
    rows: [
      {
        id: uniqueID(),
        cells: [
          {
            id: uniqueID(),
            label: '12',
            rowspan: 2,
            style: { backgroundColor: COLOR.bgSuccess }
          },
          { id: uniqueID(), label: '1' },
          { id: uniqueID(), label: '2' },
          { id: uniqueID(), label: '3' },
          { id: uniqueID(), label: '4' },
          { id: uniqueID(), label: '5' },
        ],
      },
      {
        id: uniqueID(),
        cells: [
          {
            id: uniqueID(),
            label: '13',
          },
          {
            id: uniqueID(),
            input: { id: uniqueID(), type: 'number', value: '14', inputStyle: TextInputStyle.DOT }
          },
          {
            id: uniqueID(),
            input: { id: uniqueID(), type: 'number', value: '15', inputStyle: TextInputStyle.DOT }
          },
          {
            id: uniqueID(),
            input: { id: uniqueID(), type: 'number', value: '16', inputStyle: TextInputStyle.DOT }
          },
          {
            id: uniqueID(),
            input: { id: uniqueID(), type: 'number', value: '17', inputStyle: TextInputStyle.DOT }
          },
        ],
      },
    ],
  },
  {
    id: uniqueID(),
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
            input: { id: uniqueID(), type: 'number', style: { borderWidth: 0 } }
          },
        ],
      },
    ],
  }
]