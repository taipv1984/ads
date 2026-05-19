import { QuestionType } from "@/enums/math.enum";
import { Question } from "../types/question.types";

export const QUESTION_MOCKS: Question[] = [
  {
    id: 2,
    category: "",
    type: QuestionType.FILL,
    desc: "viet_so_thich_hop_1.jpg",
    label: "Viết số thích hợp vào ô trống (theo mẫu).",
    inputLength: 2,
    elements: [
      { id: 6, type: "shape", shapeType: "circle", position: { x: 500, y: 120 }, size: 120, isInput: false, value: "32", textSize: 50, borderWidth: 4 },
      { id: 7, type: "line", lineType: "straight", start: { x: 500, y: 180 }, end: { x: 300, y: 420 }, strokeWidth: 5 },
      { id: 8, type: "line", lineType: "straight", start: { x: 500, y: 180 }, end: { x: 700, y: 420 }, strokeWidth: 5 },
      {
        id: 9, type: "shape", shapeType: "rect", position: { x: 300, y: 480 }, width: 200, height: 120, isInput: true, value: "", bgColor: "white", borderWidth: 5, textSize: 50,
        textAlign: 'right'
      },
      {
        id: 10, type: "shape", shapeType: "rect", position: { x: 700, y: 480 }, width: 200, height: 120, isInput: true, value: "", bgColor: "white", borderWidth: 5, textSize: 50,
        textAlign: 'left'
      }
    ],
    validations: [
      { id: 1, formula: "#9 + #10 === 32" }
    ],
    // score: 1
  },
  // {
  //   id: 3,
  //   category: "",
  //   type: QuestionType.FILL,
  //   desc: "viet_so_thich_hop_1.jpg",
  //   label: "Viết số thích hợp vào ô trống (theo mẫu).",
  //   inputLength: 2,
  //   elements: [
  //     { id: 11, type: "shape", shapeType: "circle", position: { x: 500, y: 120 }, size: 120, isInput: false, value: "46", textSize: 50 },
  //     { id: 12, type: "line", lineType: "straight", start: { x: 500, y: 180 }, end: { x: 300, y: 420 }, strokeWidth: 5 },
  //     { id: 13, type: "line", lineType: "straight", start: { x: 500, y: 180 }, end: { x: 700, y: 420 }, strokeWidth: 5 },
  //     { id: 14, type: "shape", shapeType: "square", position: { x: 300, y: 480 }, size: 120, isInput: true, value: "", bgColor: "white", borderWidth: 5, textSize: 50 },
  //     { id: 15, type: "shape", shapeType: "square", position: { x: 700, y: 480 }, size: 120, isInput: true, value: "", bgColor: "white", borderWidth: 5, textSize: 50 }
  //   ],
  //   validations: [
  //     { id: 1, formula: "#14 + #15 === 46" }
  //   ],
  //   score: 1
  // },
  // {
  //   id: 4,
  //   type: QuestionType.FILL,
  //   category: "",
  //   desc: "viet_so_thich_hop_2.jpg",
  //   label: "Đúng ghi Đ, sai ghi S.",
  //   // imagePath: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png",
  //   inputLength: 1,
  //   elements: [
  //     { id: 16, type: "text", position: { x: 200, y: 410 }, label: "a) Ba mươi tư viết là 34.", fontSize: 46 },
  //     { id: 17, type: "shape", shapeType: "square", position: { x: 800, y: 420 }, size: 100, isInput: true, value: "Đ", bgColor: "white", borderWidth: 5, textSize: 50, valueOptions: '["Đ", "S"]' },
  //   ],
  //   validations: [],
  //   score: 1
  // },
  // {
  //   id: 5,
  //   type: QuestionType.FILL,
  //   category: "",
  //   desc: "viet_so_thich_hop_2.jpg",
  //   label: "Đúng ghi Đ, sai ghi S.",
  //   inputLength: 1,
  //   elements: [
  //     { id: 18, type: "text", position: { x: 180, y: 83 }, label: "b) Ba mươi tư viết là 304.", fontSize: 46 },
  //     { id: 19, type: "shape", shapeType: "square", position: { x: 800, y: 110 }, size: 100, isInput: true, value: "S", bgColor: "white", borderWidth: 5, textSize: 50, valueOptions: '["Đ", "S"]' }
  //   ],
  //   validations: [],
  //   score: 1
  // },
  // {
  //   id: 6,
  //   category: "",
  //   type: QuestionType.FILL,
  //   desc: "viet_so_thich_hop_3.jpg",
  //   label: "Viết số thích hợp vào ô trống.",
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
  //   desc: "viet_so_thich_hop_4.jpg",
  //   label: "Viết số thích hợp vào ô trống.",
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
  //   desc: "viet_so_thich_hop_4.jpg",
  //   label: "Viết số thích hợp vào ô trống.",
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
  //   id: 9,
  //   category: "",
  //   type: QuestionType.FILL,
  //   desc: "viet_so_thich_hop_5.jpg",
  //   label: "Viết các số 1, 2, 3 vào ô trống theo thứ tự từ ngắn nhất đến dài nhất (theo mẫu)",
  //   inputLength: 1,
  //   elements: [
  //     { id: 37, type: "text", position: { x: 100, y: 80 }, label: "Mẫu:", fontSize: 40 },
  //     { id: 38, type: "shape", shapeType: "square", position: { x: 200, y: 160 }, size: 100, isInput: false, value: "2", borderWidth: 5, textSize: 50, zIndex: 1 },
  //     { id: 39, type: "image", url: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png", position: { x: 200, y: 185 }, width: 400, height: 150, zIndex: 0 },

  //     { id: 40, type: "shape", shapeType: "square", position: { x: 200, y: 360 }, size: 100, isInput: false, value: "3", borderWidth: 5, textSize: 50 },
  //     { id: 41, type: "image", url: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png", position: { x: 700, y: 385 }, width: 400, height: 150 },

  //     { id: 42, type: "shape", shapeType: "square", position: { x: 200, y: 560 }, size: 100, isInput: false, value: "1", borderWidth: 5, textSize: 50 },
  //     { id: 43, type: "image", url: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png", position: { x: 600, y: 585 }, width: 400, height: 150 }
  //   ],
  //   validations: [],
  //   score: 1
  // },
  // {
  //   id: 10,
  //   category: "",
  //   type: QuestionType.FILL,
  //   desc: "viet_so_thich_hop_5.jpg",
  //   label: "Viết các số 1, 2, 3 vào ô trống theo thứ tự từ ngắn nhất đến dài nhất.",
  //   inputLength: 1,
  //   elements: [
  //     { id: 44, type: "shape", shapeType: "square", position: { x: 200, y: 110 }, size: 100, isInput: true, value: "2", bgColor: "white", borderWidth: 5, textSize: 50 },
  //     { id: 45, type: "image", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Placeholder_LC_blue.png/640px-Placeholder_LC_blue.png", position: { x: 400, y: 160 }, width: 400, height: 200 },

  //     { id: 46, type: "shape", shapeType: "square", position: { x: 200, y: 360 }, size: 100, isInput: true, value: "1", bgColor: "white", borderWidth: 5, textSize: 50 },
  //     { id: 47, type: "image", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Placeholder_LC_blue.png/640px-Placeholder_LC_blue.png", position: { x: 400, y: 400 }, width: 400, height: 200 },

  //     { id: 48, type: "shape", shapeType: "square", position: { x: 200, y: 610 }, size: 100, isInput: true, value: "3", bgColor: "white", borderWidth: 5, textSize: 50 },
  //     { id: 49, type: "image", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Placeholder_LC_blue.png/640px-Placeholder_LC_blue.png", position: { x: 400, y: 660 }, width: 400, height: 200 }
  //   ],
  //   validations: [],
  //   score: 1
  // },
  // {
  //   id: 11,
  //   category: "",
  //   type: QuestionType.FILL,
  //   desc: "ket_hop_id1_va_id2.jpg",
  //   label: "Viết số thích hợp vào ô trống.",
  //   inputLength: 2,
  //   elements: [
  //     // Bên trái
  //     { id: 50, type: "shape", shapeType: "circle", position: { x: 250, y: 110 }, size: 100, isInput: false, value: "27", textSize: 42 },
  //     { id: 51, type: "line", lineType: "straight", start: { x: 250, y: 160 }, end: { x: 150, y: 410 }, strokeWidth: 5 },
  //     { id: 52, type: "line", lineType: "straight", start: { x: 250, y: 160 }, end: { x: 350, y: 410 }, strokeWidth: 5 },
  //     { id: 53, type: "shape", shapeType: "square", position: { x: 150, y: 450 }, size: 100, isInput: false, value: "20", textSize: 42 },
  //     { id: 54, type: "shape", shapeType: "square", position: { x: 350, y: 450 }, size: 100, isInput: true, value: "7", bgColor: "white", borderWidth: 5, textSize: 42 },

  //     // Bên phải
  //     { id: 55, type: "shape", shapeType: "circle", position: { x: 750, y: 110 }, size: 100, isInput: false, value: "32", textSize: 42 },
  //     { id: 56, type: "line", lineType: "straight", start: { x: 750, y: 160 }, end: { x: 650, y: 410 }, strokeWidth: 5 },
  //     { id: 57, type: "line", lineType: "straight", start: { x: 750, y: 160 }, end: { x: 850, y: 410 }, strokeWidth: 5 },
  //     { id: 58, type: "shape", shapeType: "square", position: { x: 650, y: 450 }, size: 100, isInput: true, value: "", bgColor: "white", borderWidth: 5, textSize: 42 },
  //     { id: 59, type: "shape", shapeType: "square", position: { x: 850, y: 450 }, size: 100, isInput: true, value: "", bgColor: "white", borderWidth: 5, textSize: 42 }
  //   ],
  //   validations: [
  //     { id: 1, formula: "#58 + #59 === 32" }
  //   ],
  //   score: 1
  // },
  // {
  //   type: QuestionType.FILL,
  //   id: 12,
  //   category: "",
  //   desc: "viet_so_thich_hop_8.jpg",
  //   label: "#8 Viết số thích hợp vào ô trống.",
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
  // {
  //   id: 13,
  //   category: "",
  //   type: QuestionType.FILL,
  //   desc: "viet_so_thich_hop_4.jpg",
  //   label: "#4 Viết số thích hợp vào ô trống.",
  //   inputLength: 2,
  //   elements: [
  //     // Hàng a) Diamond (12, 14, 16, 18, 20, 22)
  //     { id: 401, type: "text", position: { x: 50, y: 80 }, label: "a)", fontSize: 40 },
  //     { id: 402, type: "shape", shapeType: "diamond", position: { x: 150, y: 110 }, size: 100, isInput: false, value: "12", textSize: 40 },
  //     { id: 403, type: "shape", shapeType: "diamond", position: { x: 300, y: 110 }, size: 100, isInput: false, value: "14", textSize: 40 },
  //     { id: 404, type: "shape", shapeType: "diamond", position: { x: 450, y: 110 }, size: 100, isInput: false, value: "16", textSize: 40 },
  //     { id: 405, type: "shape", shapeType: "diamond", position: { x: 600, y: 110 }, size: 100, isInput: true, value: "18", bgColor: "white", borderWidth: 3, textSize: 40 },
  //     { id: 406, type: "shape", shapeType: "diamond", position: { x: 750, y: 110 }, size: 100, isInput: true, value: "20", bgColor: "white", borderWidth: 3, textSize: 40 },
  //     { id: 407, type: "shape", shapeType: "diamond", position: { x: 900, y: 110 }, size: 100, isInput: true, value: "22", bgColor: "white", borderWidth: 3, textSize: 40 },

  //     // Hàng b) Circle (21, 23, 25, 27, 29, 31)
  //     { id: 408, type: "text", position: { x: 50, y: 280 }, label: "b)", fontSize: 40 },
  //     { id: 409, type: "shape", shapeType: "circle", position: { x: 150, y: 310 }, size: 100, isInput: false, value: "21", textSize: 40 },
  //     { id: 410, type: "shape", shapeType: "circle", position: { x: 300, y: 310 }, size: 100, isInput: false, value: "23", textSize: 40 },
  //     { id: 411, type: "shape", shapeType: "circle", position: { x: 450, y: 310 }, size: 100, isInput: true, value: "25", bgColor: "white", borderWidth: 3, textSize: 40 },
  //     { id: 412, type: "shape", shapeType: "circle", position: { x: 600, y: 310 }, size: 100, isInput: false, value: "27", textSize: 40 },
  //     { id: 413, type: "shape", shapeType: "circle", position: { x: 750, y: 310 }, size: 100, isInput: true, value: "29", bgColor: "white", borderWidth: 3, textSize: 40 },
  //     { id: 414, type: "shape", shapeType: "circle", position: { x: 900, y: 310 }, size: 100, isInput: true, value: "31", bgColor: "white", borderWidth: 3, textSize: 40 },

  //     // Hàng c) Square (50, 55, 60, 65, 70, 75)
  //     { id: 415, type: "text", position: { x: 50, y: 480 }, label: "c)", fontSize: 40 },
  //     { id: 416, type: "shape", shapeType: "square", position: { x: 150, y: 510 }, size: 100, isInput: false, value: "50", textSize: 40 },
  //     { id: 417, type: "shape", shapeType: "square", position: { x: 300, y: 510 }, size: 100, isInput: false, value: "55", textSize: 40 },
  //     { id: 418, type: "shape", shapeType: "square", position: { x: 450, y: 510 }, size: 100, isInput: false, value: "60", textSize: 40 },
  //     { id: 419, type: "shape", shapeType: "square", position: { x: 600, y: 510 }, size: 100, isInput: true, value: "65", bgColor: "white", borderWidth: 3, textSize: 40 },
  //     { id: 420, type: "shape", shapeType: "square", position: { x: 750, y: 510 }, size: 100, isInput: true, value: "70", bgColor: "white", borderWidth: 3, textSize: 40 },
  //     { id: 421, type: "shape", shapeType: "square", position: { x: 900, y: 510 }, size: 100, isInput: true, value: "75", bgColor: "white", borderWidth: 3, textSize: 40 },

  //     // Hàng d) Triangle (40, 50, 60, 70, 80, 90)
  //     { id: 422, type: "text", position: { x: 50, y: 680 }, label: "d)", fontSize: 40 },
  //     { id: 423, type: "shape", shapeType: "triangle", position: { x: 150, y: 710 }, size: 100, isInput: false, value: "40", textSize: 40 },
  //     { id: 424, type: "shape", shapeType: "triangle", position: { x: 300, y: 710 }, size: 100, isInput: false, value: "50", textSize: 40 },
  //     { id: 425, type: "shape", shapeType: "triangle", position: { x: 450, y: 710 }, size: 100, isInput: true, value: "60", bgColor: "white", borderWidth: 3, textSize: 40 },
  //     { id: 426, type: "shape", shapeType: "triangle", position: { x: 600, y: 710 }, size: 100, isInput: false, value: "70", textSize: 40 },
  //     { id: 427, type: "shape", shapeType: "triangle", position: { x: 750, y: 710 }, size: 100, isInput: true, value: "80", bgColor: "white", borderWidth: 3, textSize: 40 },
  //     { id: 428, type: "shape", shapeType: "triangle", position: { x: 900, y: 710 }, size: 100, isInput: true, value: "90", bgColor: "white", borderWidth: 3, textSize: 40 },
  //   ],
  //   validations: [],
  //   score: 1
  // },
  {
    id: 141,
    type: QuestionType.MATCH,
    category: "",
    desc: "",
    label: "Nối các hình có cùng số lượng hoặc giá trị. single",
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
    // score: 1
  },
  // {
  //   id: 151,
  //   type: QuestionType.MATCH,
  //   category: "",
  //   desc: "",
  //   label: "Nối các hình có cùng số lượng hoặc giá trị. multi",
  //   elements: [
  //     //top
  //     { id: 1511, type: "shape", shapeType: "circle", position: { x: 200, y: 200 }, size: 120, isAnchor: true, value: "6 - 2", textSize: 40, borderWidth: 5, group: "top" },
  //     { id: 1512, type: "shape", shapeType: "circle", position: { x: 400, y: 200 }, size: 120, isAnchor: true, value: "4 + 1", textSize: 40, borderWidth: 5, group: "top" },
  //     { id: 1513, type: "shape", shapeType: "circle", position: { x: 600, y: 200 }, size: 120, isAnchor: true, value: "8 - 4", textSize: 40, borderWidth: 5, group: "top" },
  //     //master
  //     { id: 1514, type: "shape", shapeType: "square", position: { x: 400, y: 400 }, size: 120, isAnchor: true, value: "4", textSize: 40, borderWidth: 5, group: "master" },
  //     { id: 1515, type: "shape", shapeType: "square", position: { x: 600, y: 400 }, size: 120, isAnchor: true, value: "5", textSize: 40, borderWidth: 5, group: "master" },
  //     //bottom
  //     { id: 1516, type: "shape", shapeType: "circle", position: { x: 200, y: 700 }, size: 120, isAnchor: true, value: "16 - 11", textSize: 40, borderWidth: 5, group: "bottom" },
  //     { id: 1517, type: "shape", shapeType: "circle", position: { x: 400, y: 700 }, size: 120, isAnchor: true, value: "4 + 11", textSize: 40, borderWidth: 5, group: "bottom" },
  //     { id: 1518, type: "shape", shapeType: "circle", position: { x: 600, y: 700 }, size: 120, isAnchor: true, value: "8 - 14", textSize: 40, borderWidth: 5, group: "bottom" },
  //   ],
  //   score: 1
  // },

  //questionChoice
  {
    id: 301,
    type: QuestionType.CHOICE,
    category: "",
    desc: "",
    label: "Khoanh vào số lớn nhất (single choice)",
    childs: [
      { id: 3011, group: "a", options: ['72', '76', '70'], answer: '76', score: 0.5 },
      { id: 3012, group: "b", options: ['82', '77', '88'], answer: '88', score: 0.5 },
    ],
  },
  {
    id: 302,
    type: QuestionType.CHOICE,
    category: "",
    desc: "",
    label: "Khoanh vào các số chẵn (multi choice)",
    childs: [
      { id: 3021, group: "a", options: ['72', '75', '77'], answer: '72', score: 0.5 },
      { id: 3022, group: "b", options: ['82', '84', '89'], answer: '82,84', score: 0.5 },
    ],
  },
  // {
  //   id: 303,
  //   type: QuestionType.CHOICE,
  //   category: "",
  //   desc: "",
  //   label: "Khoanh vào các số chẵn",
  //   childs: [
  //     { id: 3031, group: "a", options: ['Phạm Văn Tài', 'Võ Thị Nhi', 'Thành Tâm'], answer: 'Thành Tâm', score: 0.5 },
  //     { id: 3032, group: "b", options: ['80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90'], answer: '80,85,90', score: 0.5 },
  //   ],
  // }
  // {
  //   id: 304,
  //   type: QuestionType.CHOICE,
  //   category: "",
  //   desc: "",
  //   label: "",
  //   childs: [
  //     { id: 3041, group: "a", label: "Khoanh vào số nhỏ nhất", options: ['72', '76', '70'], answer: '70', score: 0.5 },
  //   ],
  // },

  //questionSort
  {
    id: 401,
    type: QuestionType.SORT,
    category: "",
    desc: "",
    label: "Sắp xếp các số sau theo thứ tự tăng dần",
    childs: [
      { id: 4011, group: "a", options: ['72', '76', '70'], answer: '70,72,76', score: 0.5 },
      { id: 4012, group: "b", options: ['82', '77', '88'], answer: '77,82,88', score: 0.5 },
    ],
  },
  {
    id: 402,
    type: QuestionType.SORT,
    category: "",
    desc: "",
    // label: "Sắp xếp các số sau theo thứ tự tăng dần",
    childs: [
      { id: 4021, group: "a", label: "Viết các số **72**, **76**, **70** theo thứ tự từ lớn đến bé", options: ['72', '76', '70'], answer: '70,72,76', score: 0.5 },
      { id: 4022, group: "b", label: "Viết các số **82**, **77**, **88** theo thứ tự từ lớn đến bé", options: ['82', '77', '88'], answer: '77,82,88', score: 0.5 },
    ],
  },
];

