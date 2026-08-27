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
        cells: [
          { label: '3' },
          { label: '4' },
          { label: '3' },
          { label: '13', style: { backgroundColor: COLOR.yellowLight }, textStyle: { color: COLOR.error } },
        ],
      },
      {
        cells: [
          { label: '0' },
          { label: '4' },
          { label: '3' },
          { label: '12', style: { backgroundColor: COLOR.yellowLight }, textStyle: { color: COLOR.error } },
        ],
      },
      {
        cells: [
          {
            input: {
              type: 'image',
              uri: 'https://www.vhv.rs/dpng/d/15-151266_blue-circle-png-logo-transparent-png.png',
              width: 44,
            }
          },
          { label: '4' },
          {
            input: {
              type: 'image',
              source: require("@/assets/images/logo.png"),
              width: 34,
            }
          },
          { label: '11', style: { backgroundColor: COLOR.yellowLight }, textStyle: { color: COLOR.error } },
        ],
      },
      {
        cells: [
          { label: '10', style: { backgroundColor: COLOR.yellowLight }, textStyle: { color: COLOR.error } },
          { label: '15', style: { backgroundColor: COLOR.yellowLight }, textStyle: { color: COLOR.error } },
          { label: '11', style: { backgroundColor: COLOR.yellowLight }, textStyle: { color: COLOR.error } },
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
        cells: [
          {
            label: '12',
            rowspan: 2,
            style: { backgroundColor: COLOR.bgSuccess }
          },
          { label: '1' },
          { label: '2' },
          { label: '3' },
          { label: '4' },
          { label: '5' },
        ],
      },
      {
        cells: [
          { label: '13', },
          { input: { id: uniqueID(), type: 'number', value: '14', inputStyle: TextInputStyle.DOT } },
          { input: { id: uniqueID(), type: 'number', value: '15', inputStyle: TextInputStyle.DOT } },
          { input: { id: uniqueID(), type: 'number', value: '16', inputStyle: TextInputStyle.DOT } },
          { input: { id: uniqueID(), type: 'number', value: '17', inputStyle: TextInputStyle.DOT } },
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
        cells: [
          {
            label: 'PHÉP CỘNG',
            colspan: 5,
            style: { backgroundColor: '#e2e8f0' }, // styling for header
          },
        ],
      },
      {
        cells: [
          { label: '+', colspan: 2, rowspan: 2, },
          { label: '15' },
          { label: '28' },
          { label: '42' },
        ],
      },
      {
        cells: [
          { label: '7' },
          { label: '14' },
          { label: '19' },
        ],
      },
      {
        cells: [
          { label: '=', colspan: 2, },
          { input: { id: uniqueID(), type: 'text', inputStyle: TextInputStyle.LINE } },
          { input: { id: uniqueID(), type: 'number', inputStyle: TextInputStyle.DOT } },
          { input: { id: uniqueID(), type: 'number', style: { borderWidth: 0 } } },
        ],
      },
    ],
  }
]