import { LabelFormat, QuestionType } from "@/enums/math.enum";
import { Question } from "../types/question.types";

export const QUESTION_MOCKS: Question[] = [
  // {
  //   id: 2,
  //   category: "",
  //   type: QuestionType.FILL,
  //   question: "Viết số thích hợp vào ô trống (theo mẫu).",
  //   inputLength: 2,
  //   elements: [
  //     { id: 6, type: "shape", shapeType: "circle", position: { x: 500, y: 120 }, size: 120, isInput: false, value: "32", textSize: 50, borderWidth: 4 },
  //     { id: 7, type: "line", lineType: "straight", start: { x: 500, y: 180 }, end: { x: 300, y: 420 }, strokeWidth: 5 },
  //     { id: 8, type: "line", lineType: "straight", start: { x: 500, y: 180 }, end: { x: 700, y: 420 }, strokeWidth: 5 },
  //     {
  //       id: 9, type: "shape", shapeType: "rect", position: { x: 300, y: 480 }, width: 200, height: 120, isInput: true, bgColor: "white", borderWidth: 5, textSize: 50,
  //       textAlign: 'right'
  //     },
  //     {
  //       id: 10, type: "shape", shapeType: "rect", position: { x: 700, y: 480 }, width: 200, height: 120, isInput: true, bgColor: "white", borderWidth: 5, textSize: 50,
  //       textAlign: 'left'
  //     }
  //   ],
  //   validations: [
  //     { id: 1, formula: "#9 + #10 === 32" }
  //   ],
  //   score: 1
  // },
  {
    id: 4,
    type: QuestionType.FILL,
    category: "",
    question: "Đúng ghi Đ, sai ghi S.",
    // image: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png",
    inputLength: 1,
    elements: [
      { id: 16, type: "text", position: { x: 200, y: 100 }, label: "a) Ba mươi tư viết là 34.", fontSize: 46 },
      { id: 17, type: "shape", shapeType: "square", position: { x: 800, y: 110 }, size: 100, isInput: true, value: "Đ", bgColor: "white", borderWidth: 5, textSize: 50, valueOptions: '["Đ", "S"]' },
      { id: 18, type: "text", position: { x: 180, y: 220 }, label: "b) Ba mươi tư viết là 304.", fontSize: 46 },
      { id: 19, type: "shape", shapeType: "square", position: { x: 800, y: 230 }, size: 100, isInput: true, value: "S", bgColor: "white", borderWidth: 5, textSize: 50, valueOptions: '["Đ", "S"]' }
    ],
    validations: [],
    score: 1
  },
  // {
  //   id: 6,
  //   category: "",
  //   type: QuestionType.FILL,
  //   question: "Viết số thích hợp vào ô trống.",
  //   inputLength: 2,
  //   elements: [
  //     { id: 20, type: "line", lineType: "curve", start: { x: 150, y: 360 }, end: { x: 850, y: 360 }, controlPoints: [{ x: 350, y: 60 }, { x: 650, y: 660 }], strokeWidth: 6 },
  //     { id: 21, type: "shape", shapeType: "circle", position: { x: 150, y: 310 }, size: 100, isInput: false, value: "31", textSize: 42 },
  //     { id: 22, type: "shape", shapeType: "circle", position: { x: 300, y: 270 }, size: 100, isInput: false, value: "32", textSize: 42 },
  //     { id: 23, type: "shape", shapeType: "circle", position: { x: 450, y: 320 }, size: 100, isInput: false, value: "33", textSize: 42 },
  //     { id: 24, type: "shape", shapeType: "circle", position: { x: 590, y: 410 }, size: 100, isInput: true, value: "34", bgColor: "white", borderWidth: 5, textSize: 42 },
  //     { id: 25, type: "shape", shapeType: "circle", position: { x: 760, y: 430 }, size: 100, isInput: true, value: "35", bgColor: "white", borderWidth: 5, textSize: 42 },
  //     { id: 26, type: "shape", shapeType: "circle", position: { x: 880, y: 320 }, size: 100, isInput: false, value: "36", textSize: 42 }
  //   ],
  //   validations: [],
  //   score: 1
  // },
  // {
  //   id: 7,
  //   category: "",
  //   type: QuestionType.FILL,
  //   question: "Viết số thích hợp vào ô trống.",
  //   inputLength: 2,
  //   elements: [
  //     { id: 27, type: "shape", shapeType: "diamond", position: { x: 160, y: 120 }, size: 120, isInput: false, value: "12", textSize: 44 },
  //     { id: 28, type: "shape", shapeType: "diamond", position: { x: 330, y: 120 }, size: 120, isInput: false, value: "14", textSize: 44 },
  //     { id: 29, type: "shape", shapeType: "diamond", position: { x: 500, y: 120 }, size: 120, isInput: false, value: "16", textSize: 44 },
  //     { id: 30, type: "shape", shapeType: "diamond", position: { x: 670, y: 120 }, size: 120, isInput: true, value: "18", bgColor: "white", borderWidth: 5, textSize: 44 },
  //     { id: 31, type: "shape", shapeType: "diamond", position: { x: 840, y: 120 }, size: 120, isInput: true, value: "20", bgColor: "white", borderWidth: 5, textSize: 44 }
  //   ],
  //   validations: [],
  //   score: 1
  // },
  // {
  //   id: 8,
  //   category: "",
  //   type: QuestionType.FILL,
  //   question: "Viết số thích hợp vào ô trống.",
  //   inputLength: 2,
  //   elements: [
  //     { id: 32, type: "shape", shapeType: "triangle", position: { x: 160, y: 120 }, size: 120, isInput: false, value: "40", textSize: 44 },
  //     { id: 33, type: "shape", shapeType: "triangle", position: { x: 330, y: 120 }, size: 120, isInput: false, value: "50", textSize: 44 },
  //     { id: 34, type: "shape", shapeType: "triangle", position: { x: 500, y: 120 }, size: 120, isInput: true, value: "60", bgColor: "white", borderWidth: 5, textSize: 44 },
  //     { id: 35, type: "shape", shapeType: "triangle", position: { x: 670, y: 120 }, size: 120, isInput: false, value: "70", textSize: 44 },
  //     { id: 36, type: "shape", shapeType: "triangle", position: { x: 840, y: 120 }, size: 120, isInput: true, value: "80", bgColor: "white", borderWidth: 5, textSize: 44 }
  //   ],
  //   validations: [],
  //   score: 1
  // },
  // {
  //   id: 10,
  //   category: "",
  //   type: QuestionType.FILL,
  //   question: "Viết các số 1, 2, 3 vào ô trống theo thứ tự từ ngắn nhất đến dài nhất.",
  //   inputLength: 1,
  //   elements: [
  //     { id: 44, type: "shape", shapeType: "square", position: { x: 200, y: 110 }, size: 100, isInput: true, value: "2", bgColor: "white", borderWidth: 5, textSize: 50 },
  //     { id: 45, type: "image", url: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png", position: { x: 400, y: 100 }, width: 400, height: 200 },
  //     { id: 46, type: "shape", shapeType: "square", position: { x: 200, y: 360 }, size: 100, isInput: true, value: "1", bgColor: "white", borderWidth: 5, textSize: 50 },
  //     { id: 47, type: "image", url: "https://upload.wikimedia.org/no-found.png", position: { x: 400, y: 400 }, width: 400, height: 200 },
  //     { id: 48, type: "shape", shapeType: "square", position: { x: 200, y: 610 }, size: 100, isInput: true, value: "3", bgColor: "white", borderWidth: 5, textSize: 50 },
  //     { id: 49, type: "image", url: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png", position: { x: 600, y: 660 }, width: 400, height: 200 }
  //   ],
  //   validations: [],
  //   score: 1
  // },
  // {
  //   type: QuestionType.FILL,
  //   id: 12,
  //   category: "",
  //   question: "#8 Viết số thích hợp vào ô trống.",
  //   inputLength: 2,
  //   elements: [
  //     // Hàng a)
  //     { id: 301, type: "text", position: { x: 80, y: 122 }, label: "a)", fontSize: 44 },
  //     { id: 302, type: "shape", shapeType: "square", position: { x: 220, y: 122 }, size: 100, isInput: false, value: "47", borderWidth: 5, textSize: 44 },
  //     { id: 303, type: "line", lineType: "arrow", start: { x: 270, y: 122 }, end: { x: 470, y: 122 }, strokeWidth: 5 },
  //     { id: 304, type: "text", position: { x: 320, y: 82 }, label: "– 3", fontSize: 44 },
  //     { id: 305, type: "shape", shapeType: "circle", position: { x: 530, y: 132 }, size: 120, isInput: true, value: "44", bgColor: "white", borderWidth: 5, textSize: 44 },
  //     { id: 306, type: "line", lineType: "arrow", start: { x: 590, y: 122 }, end: { x: 820, y: 122 }, strokeWidth: 5 },
  //     { id: 307, type: "text", position: { x: 650, y: 82 }, label: "– 4", fontSize: 44 },
  //     { id: 308, type: "shape", shapeType: "triangle", position: { x: 850, y: 132 }, size: 120, isInput: true, value: "40", bgColor: "white", borderWidth: 5, textSize: 44 },

  //     // Hàng b)
  //     { id: 309, type: "text", position: { x: 80, y: 422 }, label: "b)", fontSize: 44 },
  //     { id: 310, type: "shape", shapeType: "square", position: { x: 220, y: 422 }, size: 100, isInput: false, value: "82", borderWidth: 5, textSize: 44 },
  //     { id: 311, type: "line", lineType: "arrow", start: { x: 280, y: 422 }, end: { x: 450, y: 422 }, strokeWidth: 5 },
  //     { id: 312, type: "text", position: { x: 360, y: 382 }, label: "+ 7", fontSize: 44 },
  //     { id: 313, type: "shape", shapeType: "triangle", position: { x: 530, y: 432 }, size: 120, isInput: true, value: "89", bgColor: "white", borderWidth: 5, textSize: 44 },
  //     { id: 314, type: "line", lineType: "arrow", start: { x: 590, y: 422 }, end: { x: 770, y: 422 }, strokeWidth: 5 },
  //     { id: 315, type: "text", position: { x: 680, y: 382 }, label: "– 5", fontSize: 44 },
  //     { id: 316, type: "shape", shapeType: "circle", position: { x: 850, y: 432 }, size: 120, isInput: true, value: "84", bgColor: "white", borderWidth: 5, textSize: 44 },
  //   ],
  //   validations: [],
  //   score: 1
  // },
  {
    id: 141,
    type: QuestionType.MATCH,
    category: "",
    question: "Nối các hình có cùng số lượng hoặc giá trị. single",
    elements: [
      //left
      { id: 1411, type: "shape", shapeType: "circle", position: { x: 200, y: 200 }, size: 120, isAnchor: true, value: "5", textSize: 50, borderWidth: 5, group: "left" },
      { id: 1412, type: "shape", shapeType: "circle", position: { x: 200, y: 450 }, size: 120, isAnchor: true, value: "10", textSize: 50, borderWidth: 5, group: "left" },
      { id: 1413, type: "shape", shapeType: "circle", position: { x: 200, y: 700 }, size: 120, isAnchor: true, value: "3", textSize: 50, borderWidth: 5, group: "left" },
      //right
      { id: 1414, type: "shape", shapeType: "square", position: { x: 800, y: 200 }, size: 120, isAnchor: true, value: "10", textSize: 50, borderWidth: 5, group: "right" },
      { id: 1415, type: "shape", shapeType: "square", position: { x: 800, y: 450 }, size: 120, isAnchor: true, value: "3", textSize: 50, borderWidth: 5, group: "right" },
      { id: 1416, type: "shape", shapeType: "square", position: { x: 800, y: 700 }, size: 120, isAnchor: true, value: "5", textSize: 50, borderWidth: 5, group: "right" },
    ],
    score: 1
  },
  {
    id: 151,
    type: QuestionType.MATCH,
    category: "",
    question: "Nối các hình có cùng số lượng hoặc giá trị. multi",
    elements: [
      //top
      { id: 1511, type: "shape", shapeType: "circle", position: { x: 200, y: 200 }, size: 120, isAnchor: true, value: "6 - 2", textSize: 40, borderWidth: 5, group: "top" },
      { id: 1512, type: "shape", shapeType: "circle", position: { x: 400, y: 200 }, size: 120, isAnchor: true, value: "4 + 1", textSize: 40, borderWidth: 5, group: "top" },
      { id: 1513, type: "shape", shapeType: "circle", position: { x: 600, y: 200 }, size: 120, isAnchor: true, value: "8 - 4", textSize: 40, borderWidth: 5, group: "top" },
      //master
      { id: 1514, type: "shape", shapeType: "square", position: { x: 400, y: 400 }, size: 120, isAnchor: true, value: "4", textSize: 40, borderWidth: 5, group: "master" },
      { id: 1515, type: "shape", shapeType: "square", position: { x: 600, y: 400 }, size: 120, isAnchor: true, value: "5", textSize: 40, borderWidth: 5, group: "master" },
      //bottom
      { id: 1516, type: "shape", shapeType: "circle", position: { x: 200, y: 700 }, size: 120, isAnchor: true, value: "16 - 11", textSize: 40, borderWidth: 5, group: "bottom" },
      { id: 1517, type: "shape", shapeType: "circle", position: { x: 400, y: 700 }, size: 120, isAnchor: true, value: "4 + 11", textSize: 40, borderWidth: 5, group: "bottom" },
      { id: 1518, type: "shape", shapeType: "circle", position: { x: 600, y: 700 }, size: 120, isAnchor: true, value: "8 - 14", textSize: 40, borderWidth: 5, group: "bottom" },
    ],
    score: 1
  },

  //questionChoice
  {
    id: 301,
    type: QuestionType.CHOICE,
    category: "",
    question: "Khoanh vào số lớn nhất (single choice)",
    groups: [
      { key: "a", options: ['72', '76', '70'], answer: '76', score: 0.5 },
      { key: "b", options: ['82', '77', '88'], answer: '88', score: 0.5 },
    ],
  },
  {
    id: 302,
    type: QuestionType.CHOICE,
    category: "",
    question: "Khoanh vào các số chẵn (multi choice)",
    groups: [
      { key: "a", options: ['72', '75', '77'], answer: '72', score: 0.5 },
      { key: "b", options: ['82', '84', '89'], answer: '82,84', score: 0.5 },
    ],
  },
  // {
  //   id: 303,
  //   type: QuestionType.CHOICE,
  //   category: "",
  //   question: "Khoanh vào các số chẵn",
  //   groups: [
  //     { key: "a", options: ['Phạm Văn Tài', 'Võ Thị Nhi', 'Thành Tâm'], answer: 'Thành Tâm', score: 0.5 },
  //     { key: "b", options: ['80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90'], answer: '80,85,90', score: 0.5 },
  //   ],
  // },
  // {
  //   id: 304,
  //   type: QuestionType.CHOICE,
  //   category: "",
  //   question: "Khoanh vào số nhỏ nhất",
  //   groups: [
  //     { key: "a", options: ['72', '76', '70'], answer: '70', score: 0.5 },
  //   ],
  // },

  //questionSort
  {
    id: 401,
    type: QuestionType.SORT,
    category: "",
    question: "Sắp xếp các số sau theo thứ tự tăng dần",
    groups: [
      { key: "a", options: ['72', '76', '70'], answer: '70,72,76', score: 0.5 },
      { key: "b", options: ['82', '77', '88'], answer: '77,82,88', score: 0.5 },
    ],
  },
  {
    id: 402,
    type: QuestionType.SORT,
    category: "",
    groups: [
      { key: "a", label: "Viết các số **72**, **76**, **70** theo thứ tự từ lớn đến bé", options: ['72', '76', '70'], answer: '70,72,76', score: 0.5 },
      { key: "b", label: "Viết các số **82**, **77**, **88** theo thứ tự từ lớn đến bé", options: ['82', '77', '88'], answer: '77,82,88', score: 0.5 },
    ],
  },
  {
    id: 501,
    type: QuestionType.QUIZ,
    category: "",
    question: "Câu hỏi trắc nghiệm: Ai là người phát minh ra thuyết tương đối?",
    labelFormat: LabelFormat.INPUT,
    options: [
      { value: "Isaac Newton" },
      { value: "Albert Einstein", isCorrect: true },
      { value: "Galileo Galilei" },
      { value: "Nikola Tesla" }
    ],
    score: 1.0,
    explain: "Albert Einstein là người đã phát minh ra thuyết tương đối rộng và thuyết tương đối hẹp."
  },
  {
    id: 502,
    type: QuestionType.QUIZ,
    category: "",
    question: "Hãy chọn các số nguyên tố trong các số sau đây:",
    labelFormat: LabelFormat.ALPHABET,
    options: [
      // { value: "Isaac Newton", isCorrect: true },
      { value: "4aa" },
      { value: "5", isCorrect: true },
      { value: "9" }
    ],
    score: 1.0,
    explain: "Số 2 và số 5 chỉ chia hết cho 1 và chính nó, nên chúng là các số nguyên tố. Số 4 và số 9 có nhiều hơn 2 ước số.",
    explainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Placeholder_LC_blue.png/640px-Placeholder_LC_blue.png"
  }
  //todo quiz with image  
];

