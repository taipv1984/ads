import { Question } from '../types/math-fill.types';

export const MATH_FILL_MOCKS: Question[] = [
  {
    id: 1,
    category: "",
    desc: "viet_so_thich_hop_1.jpg",
    content: "Viết số thích hợp vào ô trống (theo mẫu).",
    inputLength: 2,
    elements: [
      { id: 1, type: "shape", shapeType: "circle", position: { x: 500, y: 200 }, size: 120, isInput: false, value: "27", bgColor: "blue_light", textSize: 50, borderWidth: 5 },
      { id: 2, type: "line", lineType: "straight", start: { x: 500, y: 260 }, end: { x: 300, y: 500 }, color: "black", strokeWidth: 5 },
      { id: 3, type: "line", lineType: "straight", start: { x: 500, y: 260 }, end: { x: 700, y: 500 }, color: "black", strokeWidth: 5 },
      { id: 4, type: "shape", shapeType: "square", position: { x: 300, y: 560 }, size: 120, isInput: false, value: "20", textColor: "blue", textSize: 50, borderWidth: 5 },
      { id: 5, type: "shape", shapeType: "square", position: { x: 700, y: 560 }, size: 120, isInput: false, value: "7", textColor: "blue", textSize: 50, borderWidth: 5 }
    ],
    validations: []
  },
  {
    id: 2,
    category: "",
    desc: "viet_so_thich_hop_1.jpg",
    content: "Viết số thích hợp vào ô trống (theo mẫu).",
    inputLength: 2,
    elements: [
      { id: 6, type: "shape", shapeType: "circle", position: { x: 500, y: 200 }, size: 120, isInput: false, value: "32", bgColor: "blue_light", textSize: 50, borderWidth: 5 },
      { id: 7, type: "line", lineType: "straight", start: { x: 500, y: 260 }, end: { x: 300, y: 500 }, strokeWidth: 5 },
      { id: 8, type: "line", lineType: "straight", start: { x: 500, y: 260 }, end: { x: 700, y: 500 }, strokeWidth: 5 },
      {
        id: 9, type: "shape", shapeType: "rect", position: { x: 300, y: 560 }, width: 200, height: 120, isInput: true, value: "", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50,
        textAlign: 'right'
      },
      {
        id: 10, type: "shape", shapeType: "rect", position: { x: 700, y: 560 }, width: 200, height: 120, isInput: true, value: "", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50,
        textAlign: 'left'
      }
    ],
    validations: [
      { id: 1, formula: "#9 + #10 === 32" }
    ]
  },
  {
    id: 3,
    category: "",
    desc: "viet_so_thich_hop_1.jpg",
    content: "Viết số thích hợp vào ô trống (theo mẫu).",
    inputLength: 2,
    elements: [
      { id: 11, type: "shape", shapeType: "circle", position: { x: 500, y: 200 }, size: 120, isInput: false, value: "46", bgColor: "blue_light", textSize: 50 },
      { id: 12, type: "line", lineType: "straight", start: { x: 500, y: 260 }, end: { x: 300, y: 500 }, strokeWidth: 5 },
      { id: 13, type: "line", lineType: "straight", start: { x: 500, y: 260 }, end: { x: 700, y: 500 }, strokeWidth: 5 },
      { id: 14, type: "shape", shapeType: "square", position: { x: 300, y: 560 }, size: 120, isInput: true, value: "", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50 },
      { id: 15, type: "shape", shapeType: "square", position: { x: 700, y: 560 }, size: 120, isInput: true, value: "", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50 }
    ],
    validations: [
      { id: 1, formula: "#14 + #15 === 46" }
    ]
  },
  {
    id: 4,
    category: "",
    desc: "viet_so_thich_hop_2.jpg",
    content: "Đúng ghi Đ, sai ghi S.",
    inputLength: 1,
    elements: [
      { id: 16, type: "text", position: { x: 200, y: 500 }, content: "a) Ba mươi tư viết là 34.", fontSize: 46 },
      { id: 17, type: "shape", shapeType: "square", position: { x: 880, y: 500 }, size: 100, isInput: true, value: "Đ", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50, valueOptions: '["Đ", "S"]' },
      { id: 171, type: "shape", shapeType: "square", position: { x: 100, y: 500 }, size: 100, isInput: true, value: "Đ", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50, valueOptions: '["Đ1", "S1"]' },
      { id: 172, type: "shape", shapeType: "square", position: { x: 180, y: 1100 }, size: 100, isInput: true, value: "Đ", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50, valueOptions: '["Đ2", "S2", "Phạm Văn Tài xxx"]' },
      { id: 173, type: "shape", shapeType: "square", position: { x: 350, y: 800 }, size: 100, isInput: true, value: "Đ", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50, valueOptions: '["xxx", "yyy", "zzz"]' },
      { id: 174, type: "shape", shapeType: "square", position: { x: 350, y: 200 }, size: 100, isInput: true, value: "Đ", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50, valueOptions: '["xxx", "yyy", "zzz"]' },
    ],
    validations: []
  },
  {
    id: 5,
    category: "",
    desc: "viet_so_thich_hop_2.jpg",
    content: "Đúng ghi Đ, sai ghi S.",
    inputLength: 1,
    elements: [
      { id: 18, type: "text", position: { x: 180, y: 500 }, content: "b) Ba mươi tư viết là 304.", fontSize: 46 },
      { id: 19, type: "shape", shapeType: "square", position: { x: 800, y: 500 }, size: 100, isInput: true, value: "S", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50, valueOptions: '["Đ", "S"]' }
    ],
    validations: []
  },
  {
    id: 6,
    category: "",
    desc: "viet_so_thich_hop_3.jpg",
    content: "Viết số thích hợp vào ô trống.",
    inputLength: 2,
    elements: [
      { id: 20, type: "line", lineType: "curve", start: { x: 150, y: 500 }, end: { x: 850, y: 500 }, controlPoints: [{ x: 350, y: 200 }, { x: 650, y: 800 }], strokeWidth: 6, color: "blue" },
      { id: 21, type: "shape", shapeType: "circle", position: { x: 150, y: 450 }, size: 100, isInput: false, value: "31", bgColor: "blue_light", textSize: 42 },
      { id: 22, type: "shape", shapeType: "circle", position: { x: 300, y: 410 }, size: 100, isInput: false, value: "32", bgColor: "blue_light", textSize: 42 },
      { id: 23, type: "shape", shapeType: "circle", position: { x: 450, y: 460 }, size: 100, isInput: false, value: "33", bgColor: "blue_light", textSize: 42 },
      { id: 24, type: "shape", shapeType: "circle", position: { x: 590, y: 550 }, size: 100, isInput: true, value: "34", bgColor: "white", borderColor: "blue", borderWidth: 5, textSize: 42 },
      { id: 25, type: "shape", shapeType: "circle", position: { x: 760, y: 570 }, size: 100, isInput: true, value: "35", bgColor: "white", borderColor: "blue", borderWidth: 5, textSize: 42 },
      { id: 26, type: "shape", shapeType: "circle", position: { x: 880, y: 460 }, size: 100, isInput: false, value: "36", bgColor: "blue_light", textSize: 42 }
    ],
    validations: []
  },
  {
    id: 7,
    category: "",
    desc: "viet_so_thich_hop_4.jpg",
    content: "Viết số thích hợp vào ô trống.",
    inputLength: 2,
    elements: [
      { id: 27, type: "shape", shapeType: "diamond", position: { x: 160, y: 500 }, size: 120, isInput: false, value: "12", bgColor: "blue_light", textSize: 44 },
      { id: 28, type: "shape", shapeType: "diamond", position: { x: 330, y: 500 }, size: 120, isInput: false, value: "14", bgColor: "blue_light", textSize: 44 },
      { id: 29, type: "shape", shapeType: "diamond", position: { x: 500, y: 500 }, size: 120, isInput: false, value: "16", bgColor: "blue_light", textSize: 44 },
      { id: 30, type: "shape", shapeType: "diamond", position: { x: 670, y: 500 }, size: 120, isInput: true, value: "18", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 44 },
      { id: 31, type: "shape", shapeType: "diamond", position: { x: 840, y: 500 }, size: 120, isInput: true, value: "20", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 44 }
    ],
    validations: []
  },
  {
    id: 8,
    category: "",
    desc: "viet_so_thich_hop_4.jpg",
    content: "Viết số thích hợp vào ô trống.",
    inputLength: 2,
    elements: [
      { id: 32, type: "shape", shapeType: "triangle", position: { x: 160, y: 500 }, size: 120, isInput: false, value: "40", bgColor: "blue_light", textSize: 44 },
      { id: 33, type: "shape", shapeType: "triangle", position: { x: 330, y: 500 }, size: 120, isInput: false, value: "50", bgColor: "blue_light", textSize: 44 },
      { id: 34, type: "shape", shapeType: "triangle", position: { x: 500, y: 500 }, size: 120, isInput: true, value: "60", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 44 },
      { id: 35, type: "shape", shapeType: "triangle", position: { x: 670, y: 500 }, size: 120, isInput: false, value: "70", bgColor: "blue_light", textSize: 44 },
      { id: 36, type: "shape", shapeType: "triangle", position: { x: 840, y: 500 }, size: 120, isInput: true, value: "80", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 44 }
    ],
    validations: []
  },
  {
    id: 9,
    category: "",
    desc: "viet_so_thich_hop_5.jpg",
    content: "Viết các số 1, 2, 3 vào ô trống theo thứ tự từ ngắn nhất đến dài nhất (theo mẫu)",
    inputLength: 1,
    elements: [
      { id: 37, type: "text", position: { x: 100, y: 200 }, content: "Mẫu:", color: "blue", fontSize: 40 },
      { id: 38, type: "shape", shapeType: "square", position: { x: 200, y: 300 }, size: 100, isInput: false, value: "2", textColor: "blue", borderColor: "black", borderWidth: 5, textSize: 50, zIndex: 1 },
      { id: 39, type: "image", url: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png", position: { x: 200, y: 300 }, width: 400, height: 150, zIndex: 0 },

      { id: 40, type: "shape", shapeType: "square", position: { x: 200, y: 500 }, size: 100, isInput: false, value: "3", textColor: "blue", borderColor: "black", borderWidth: 5, textSize: 50 },
      { id: 41, type: "image", url: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png", position: { x: 700, y: 500 }, width: 400, height: 150 },

      { id: 42, type: "shape", shapeType: "square", position: { x: 200, y: 700 }, size: 100, isInput: false, value: "1", textColor: "blue", borderColor: "black", borderWidth: 5, textSize: 50 },
      { id: 43, type: "image", url: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png", position: { x: 600, y: 700 }, width: 400, height: 150 }
    ],
    validations: []
  },
  {
    id: 10,
    category: "",
    desc: "viet_so_thich_hop_5.jpg",
    content: "Viết các số 1, 2, 3 vào ô trống theo thứ tự từ ngắn nhất đến dài nhất.",
    inputLength: 1,
    elements: [
      { id: 44, type: "shape", shapeType: "square", position: { x: 200, y: 300 }, size: 100, isInput: true, value: "2", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50 },
      { id: 45, type: "image", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Placeholder_LC_blue.png/640px-Placeholder_LC_blue.png", position: { x: 400, y: 300 }, width: 400, height: 200 },

      { id: 46, type: "shape", shapeType: "square", position: { x: 200, y: 550 }, size: 100, isInput: true, value: "1", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50 },
      { id: 47, type: "image", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Placeholder_LC_blue.png/640px-Placeholder_LC_blue.png", position: { x: 400, y: 540 }, width: 400, height: 200 },

      { id: 48, type: "shape", shapeType: "square", position: { x: 200, y: 800 }, size: 100, isInput: true, value: "3", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50 },
      { id: 49, type: "image", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Placeholder_LC_blue.png/640px-Placeholder_LC_blue.png", position: { x: 400, y: 800 }, width: 400, height: 200 }
    ],
    validations: []
  },
  {
    id: 11,
    category: "",
    desc: "ket_hop_id1_va_id2.jpg",
    content: "Viết số thích hợp vào ô trống.",
    inputLength: 2,
    elements: [
      // Bên trái
      { id: 50, type: "shape", shapeType: "circle", position: { x: 250, y: 200 }, size: 100, isInput: false, value: "27", bgColor: "blue_light", textSize: 42 },
      { id: 51, type: "line", lineType: "straight", start: { x: 250, y: 250 }, end: { x: 150, y: 500 }, color: "black", strokeWidth: 5 },
      { id: 52, type: "line", lineType: "straight", start: { x: 250, y: 250 }, end: { x: 350, y: 500 }, color: "black", strokeWidth: 5 },
      { id: 53, type: "shape", shapeType: "square", position: { x: 150, y: 540 }, size: 100, isInput: false, value: "20", textColor: "blue", textSize: 42 },
      { id: 54, type: "shape", shapeType: "square", position: { x: 350, y: 540 }, size: 100, isInput: true, value: "7", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 42 },

      // Bên phải
      { id: 55, type: "shape", shapeType: "circle", position: { x: 750, y: 200 }, size: 100, isInput: false, value: "32", bgColor: "blue_light", textSize: 42 },
      { id: 56, type: "line", lineType: "straight", start: { x: 750, y: 250 }, end: { x: 650, y: 500 }, strokeWidth: 5 },
      { id: 57, type: "line", lineType: "straight", start: { x: 750, y: 250 }, end: { x: 850, y: 500 }, strokeWidth: 5 },
      { id: 58, type: "shape", shapeType: "square", position: { x: 650, y: 540 }, size: 100, isInput: true, value: "", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 42 },
      { id: 59, type: "shape", shapeType: "square", position: { x: 850, y: 540 }, size: 100, isInput: true, value: "", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 42 }
    ],
    validations: [
      { id: 1, formula: "#58 + #59 === 32" }
    ]
  }
];
