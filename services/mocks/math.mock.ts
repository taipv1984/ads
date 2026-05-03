import { Question } from "../types/math.types";

export const MATH_FILL_MOCKS: Question[] = [
  // {
  //   id: 1,
  //   type: "fill",
  //   category: "",
  //   desc: "viet_so_thich_hop_1.jpg",
  //   content: "Viết số thích hợp vào ô trống (theo mẫu).",
  //   inputLength: 2,
  //   elements: [
  //     { id: 1, type: "shape", shapeType: "circle", position: { x: 500, y: 120 }, size: 120, isInput: false, value: "27", bgColor: "blue_light", textSize: 50, borderWidth: 4 },
  //     { id: 2, type: "line", lineType: "straight", start: { x: 500, y: 180 }, end: { x: 300, y: 420 }, color: "black", strokeWidth: 5 },
  //     { id: 3, type: "line", lineType: "straight", start: { x: 500, y: 180 }, end: { x: 700, y: 420 }, color: "black", strokeWidth: 5 },
  //     { id: 4, type: "shape", shapeType: "square", position: { x: 300, y: 480 }, size: 120, isInput: false, value: "20", textColor: "blue", textSize: 50, borderWidth: 4 },
  //     { id: 5, type: "shape", shapeType: "square", position: { x: 700, y: 480 }, size: 120, isInput: false, value: "7", textColor: "blue", textSize: 50, borderWidth: 4 }
  //   ],
  //   validations: []
  // },
  {
    id: 2,
    category: "",
    type: "fill",
    desc: "viet_so_thich_hop_1.jpg",
    content: "Viết số thích hợp vào ô trống (theo mẫu).",
    inputLength: 2,
    elements: [
      { id: 6, type: "shape", shapeType: "circle", position: { x: 500, y: 120 }, size: 120, isInput: false, value: "32", bgColor: "blue_light", textSize: 50, borderWidth: 4 },
      { id: 7, type: "line", lineType: "straight", start: { x: 500, y: 180 }, end: { x: 300, y: 420 }, strokeWidth: 5 },
      { id: 8, type: "line", lineType: "straight", start: { x: 500, y: 180 }, end: { x: 700, y: 420 }, strokeWidth: 5 },
      {
        id: 9, type: "shape", shapeType: "rect", position: { x: 300, y: 480 }, width: 200, height: 120, isInput: true, value: "", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50,
        textAlign: 'right'
      },
      {
        id: 10, type: "shape", shapeType: "rect", position: { x: 700, y: 480 }, width: 200, height: 120, isInput: true, value: "", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50,
        textAlign: 'left'
      }
    ],
    validations: [
      { id: 1, formula: "#9 + #10 === 32" }
    ]
  },
  // {
  //   id: 3,
  //   category: "",
  //   type: "fill",
  //   desc: "viet_so_thich_hop_1.jpg",
  //   content: "Viết số thích hợp vào ô trống (theo mẫu).",
  //   inputLength: 2,
  //   elements: [
  //     { id: 11, type: "shape", shapeType: "circle", position: { x: 500, y: 120 }, size: 120, isInput: false, value: "46", bgColor: "blue_light", textSize: 50 },
  //     { id: 12, type: "line", lineType: "straight", start: { x: 500, y: 180 }, end: { x: 300, y: 420 }, strokeWidth: 5 },
  //     { id: 13, type: "line", lineType: "straight", start: { x: 500, y: 180 }, end: { x: 700, y: 420 }, strokeWidth: 5 },
  //     { id: 14, type: "shape", shapeType: "square", position: { x: 300, y: 480 }, size: 120, isInput: true, value: "", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50 },
  //     { id: 15, type: "shape", shapeType: "square", position: { x: 700, y: 480 }, size: 120, isInput: true, value: "", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50 }
  //   ],
  //   validations: [
  //     { id: 1, formula: "#14 + #15 === 46" }
  //   ]
  // },
  // {
  //   id: 4,
  //   type: "fill",
  //   category: "",
  //   desc: "viet_so_thich_hop_2.jpg",
  //   content: "Đúng ghi Đ, sai ghi S.",
  //   imagePath: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png",
  //   inputLength: 1,
  //   elements: [
  //     { id: 16, type: "text", position: { x: 200, y: 410 }, content: "a) Ba mươi tư viết là 34.", fontSize: 46 },
  //     { id: 17, type: "shape", shapeType: "square", position: { x: 880, y: 410 }, size: 100, isInput: true, value: "Đ", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50, valueOptions: '["Đ", "S"]' },
  //     { id: 171, type: "shape", shapeType: "square", position: { x: 100, y: 410 }, size: 100, isInput: true, value: "Đ", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50, valueOptions: '["Đ1", "S1"]' },
  //     { id: 172, type: "shape", shapeType: "square", position: { x: 180, y: 1010 }, size: 100, isInput: true, value: "Đ", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50, valueOptions: '["Đ2", "S2", "Phạm Văn Tài xxx"]' },
  //     { id: 173, type: "shape", shapeType: "square", position: { x: 350, y: 710 }, size: 100, isInput: true, value: "Đ", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50, valueOptions: '["xxx", "yyy", "zzz"]' },
  //     { id: 174, type: "shape", shapeType: "square", position: { x: 350, y: 110 }, size: 100, isInput: true, value: "Đ", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50, valueOptions: '["xxx2", "yyy2", "zzz2"]' },
  //   ],
  //   validations: []
  // },
  // {
  //   id: 5,
  //   type: "fill",
  //   category: "",
  //   desc: "viet_so_thich_hop_2.jpg",
  //   content: "Đúng ghi Đ, sai ghi S.",
  //   inputLength: 1,
  //   elements: [
  //     { id: 18, type: "text", position: { x: 180, y: 83 }, content: "b) Ba mươi tư viết là 304.", fontSize: 46 },
  //     { id: 19, type: "shape", shapeType: "square", position: { x: 800, y: 110 }, size: 100, isInput: true, value: "S", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50, valueOptions: '["Đ", "S"]' }
  //   ],
  //   validations: []
  // },
  // {
  //   id: 6,
  //   category: "",
  //   type: "fill",
  //   desc: "viet_so_thich_hop_3.jpg",
  //   content: "Viết số thích hợp vào ô trống.",
  //   inputLength: 2,
  //   elements: [
  //     { id: 20, type: "line", lineType: "curve", start: { x: 150, y: 360 }, end: { x: 850, y: 360 }, controlPoints: [{ x: 350, y: 60 }, { x: 650, y: 660 }], strokeWidth: 6, color: "blue" },
  //     { id: 21, type: "shape", shapeType: "circle", position: { x: 150, y: 310 }, size: 100, isInput: false, value: "31", bgColor: "blue_light", textSize: 42 },
  //     { id: 22, type: "shape", shapeType: "circle", position: { x: 300, y: 270 }, size: 100, isInput: false, value: "32", bgColor: "blue_light", textSize: 42 },
  //     { id: 23, type: "shape", shapeType: "circle", position: { x: 450, y: 320 }, size: 100, isInput: false, value: "33", bgColor: "blue_light", textSize: 42 },
  //     { id: 24, type: "shape", shapeType: "circle", position: { x: 590, y: 410 }, size: 100, isInput: true, value: "34", bgColor: "white", borderColor: "blue", borderWidth: 5, textSize: 42 },
  //     { id: 25, type: "shape", shapeType: "circle", position: { x: 760, y: 430 }, size: 100, isInput: true, value: "35", bgColor: "white", borderColor: "blue", borderWidth: 5, textSize: 42 },
  //     { id: 26, type: "shape", shapeType: "circle", position: { x: 880, y: 320 }, size: 100, isInput: false, value: "36", bgColor: "blue_light", textSize: 42 }
  //   ],
  //   validations: []
  // },
  // {
  //   id: 7,
  //   category: "",
  //   type: "fill",
  //   desc: "viet_so_thich_hop_4.jpg",
  //   content: "Viết số thích hợp vào ô trống.",
  //   inputLength: 2,
  //   elements: [
  //     { id: 27, type: "shape", shapeType: "diamond", position: { x: 160, y: 120 }, size: 120, isInput: false, value: "12", bgColor: "blue_light", textSize: 44 },
  //     { id: 28, type: "shape", shapeType: "diamond", position: { x: 330, y: 120 }, size: 120, isInput: false, value: "14", bgColor: "blue_light", textSize: 44 },
  //     { id: 29, type: "shape", shapeType: "diamond", position: { x: 500, y: 120 }, size: 120, isInput: false, value: "16", bgColor: "blue_light", textSize: 44 },
  //     { id: 30, type: "shape", shapeType: "diamond", position: { x: 670, y: 120 }, size: 120, isInput: true, value: "18", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 44 },
  //     { id: 31, type: "shape", shapeType: "diamond", position: { x: 840, y: 120 }, size: 120, isInput: true, value: "20", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 44 }
  //   ],
  //   validations: []
  // },
  // {
  //   id: 8,
  //   category: "",
  //   type: "fill",
  //   desc: "viet_so_thich_hop_4.jpg",
  //   content: "Viết số thích hợp vào ô trống.",
  //   inputLength: 2,
  //   elements: [
  //     { id: 32, type: "shape", shapeType: "triangle", position: { x: 160, y: 120 }, size: 120, isInput: false, value: "40", bgColor: "blue_light", textSize: 44 },
  //     { id: 33, type: "shape", shapeType: "triangle", position: { x: 330, y: 120 }, size: 120, isInput: false, value: "50", bgColor: "blue_light", textSize: 44 },
  //     { id: 34, type: "shape", shapeType: "triangle", position: { x: 500, y: 120 }, size: 120, isInput: true, value: "60", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 44 },
  //     { id: 35, type: "shape", shapeType: "triangle", position: { x: 670, y: 120 }, size: 120, isInput: false, value: "70", bgColor: "blue_light", textSize: 44 },
  //     { id: 36, type: "shape", shapeType: "triangle", position: { x: 840, y: 120 }, size: 120, isInput: true, value: "80", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 44 }
  //   ],
  //   validations: []
  // },
  // {
  //   id: 9,
  //   category: "",
  //   type: "fill",
  //   desc: "viet_so_thich_hop_5.jpg",
  //   content: "Viết các số 1, 2, 3 vào ô trống theo thứ tự từ ngắn nhất đến dài nhất (theo mẫu)",
  //   inputLength: 1,
  //   elements: [
  //     { id: 37, type: "text", position: { x: 100, y: 80 }, content: "Mẫu:", color: "blue", fontSize: 40 },
  //     { id: 38, type: "shape", shapeType: "square", position: { x: 200, y: 160 }, size: 100, isInput: false, value: "2", textColor: "blue", borderColor: "black", borderWidth: 5, textSize: 50, zIndex: 1 },
  //     { id: 39, type: "image", url: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png", position: { x: 200, y: 185 }, width: 400, height: 150, zIndex: 0 },

  //     { id: 40, type: "shape", shapeType: "square", position: { x: 200, y: 360 }, size: 100, isInput: false, value: "3", textColor: "blue", borderColor: "black", borderWidth: 5, textSize: 50 },
  //     { id: 41, type: "image", url: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png", position: { x: 700, y: 385 }, width: 400, height: 150 },

  //     { id: 42, type: "shape", shapeType: "square", position: { x: 200, y: 560 }, size: 100, isInput: false, value: "1", textColor: "blue", borderColor: "black", borderWidth: 5, textSize: 50 },
  //     { id: 43, type: "image", url: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png", position: { x: 600, y: 585 }, width: 400, height: 150 }
  //   ],
  //   validations: []
  // },
  // {
  //   id: 10,
  //   category: "",
  //   type: "fill",
  //   desc: "viet_so_thich_hop_5.jpg",
  //   content: "Viết các số 1, 2, 3 vào ô trống theo thứ tự từ ngắn nhất đến dài nhất.",
  //   inputLength: 1,
  //   elements: [
  //     { id: 44, type: "shape", shapeType: "square", position: { x: 200, y: 110 }, size: 100, isInput: true, value: "2", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50 },
  //     { id: 45, type: "image", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Placeholder_LC_blue.png/640px-Placeholder_LC_blue.png", position: { x: 400, y: 160 }, width: 400, height: 200 },

  //     { id: 46, type: "shape", shapeType: "square", position: { x: 200, y: 360 }, size: 100, isInput: true, value: "1", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50 },
  //     { id: 47, type: "image", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Placeholder_LC_blue.png/640px-Placeholder_LC_blue.png", position: { x: 400, y: 400 }, width: 400, height: 200 },

  //     { id: 48, type: "shape", shapeType: "square", position: { x: 200, y: 610 }, size: 100, isInput: true, value: "3", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 50 },
  //     { id: 49, type: "image", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Placeholder_LC_blue.png/640px-Placeholder_LC_blue.png", position: { x: 400, y: 660 }, width: 400, height: 200 }
  //   ],
  //   validations: []
  // },
  // {
  //   id: 11,
  //   category: "",
  //   type: "fill",
  //   desc: "ket_hop_id1_va_id2.jpg",
  //   content: "Viết số thích hợp vào ô trống.",
  //   inputLength: 2,
  //   elements: [
  //     // Bên trái
  //     { id: 50, type: "shape", shapeType: "circle", position: { x: 250, y: 110 }, size: 100, isInput: false, value: "27", bgColor: "blue_light", textSize: 42 },
  //     { id: 51, type: "line", lineType: "straight", start: { x: 250, y: 160 }, end: { x: 150, y: 410 }, color: "black", strokeWidth: 5 },
  //     { id: 52, type: "line", lineType: "straight", start: { x: 250, y: 160 }, end: { x: 350, y: 410 }, color: "black", strokeWidth: 5 },
  //     { id: 53, type: "shape", shapeType: "square", position: { x: 150, y: 450 }, size: 100, isInput: false, value: "20", textColor: "blue", textSize: 42 },
  //     { id: 54, type: "shape", shapeType: "square", position: { x: 350, y: 450 }, size: 100, isInput: true, value: "7", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 42 },

  //     // Bên phải
  //     { id: 55, type: "shape", shapeType: "circle", position: { x: 750, y: 110 }, size: 100, isInput: false, value: "32", bgColor: "blue_light", textSize: 42 },
  //     { id: 56, type: "line", lineType: "straight", start: { x: 750, y: 160 }, end: { x: 650, y: 410 }, strokeWidth: 5 },
  //     { id: 57, type: "line", lineType: "straight", start: { x: 750, y: 160 }, end: { x: 850, y: 410 }, strokeWidth: 5 },
  //     { id: 58, type: "shape", shapeType: "square", position: { x: 650, y: 450 }, size: 100, isInput: true, value: "", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 42 },
  //     { id: 59, type: "shape", shapeType: "square", position: { x: 850, y: 450 }, size: 100, isInput: true, value: "", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 42 }
  //   ],
  //   validations: [
  //     { id: 1, formula: "#58 + #59 === 32" }
  //   ]
  // },
  // {
  //   type: "fill",
  //   id: 12,
  //   category: "",
  //   desc: "viet_so_thich_hop_8.jpg",
  //   content: "#8 Viết số thích hợp vào ô trống.",
  //   inputLength: 2,
  //   elements: [
  //     // Hàng a)
  //     { id: 301, type: "text", position: { x: 80, y: 122 }, content: "a)", fontSize: 44 },
  //     { id: 302, type: "shape", shapeType: "square", position: { x: 220, y: 122 }, size: 100, isInput: false, value: "47", bgColor: "blue_light", borderWidth: 5, textSize: 44 },
  //     { id: 303, type: "line", lineType: "arrow", start: { x: 270, y: 122 }, end: { x: 470, y: 122 }, strokeWidth: 5, color: "black" },
  //     { id: 304, type: "text", position: { x: 320, y: 82 }, content: "– 3", fontSize: 44 },
  //     { id: 305, type: "shape", shapeType: "circle", position: { x: 530, y: 132 }, size: 120, isInput: true, value: "44", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 44 },
  //     { id: 306, type: "line", lineType: "arrow", start: { x: 590, y: 122 }, end: { x: 820, y: 122 }, strokeWidth: 5, color: "black" },
  //     { id: 307, type: "text", position: { x: 650, y: 82 }, content: "– 4", fontSize: 44 },
  //     { id: 308, type: "shape", shapeType: "triangle", position: { x: 850, y: 132 }, size: 120, isInput: true, value: "40", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 44 },

  //     // Hàng b)
  //     { id: 309, type: "text", position: { x: 80, y: 422 }, content: "b)", fontSize: 44 },
  //     { id: 310, type: "shape", shapeType: "square", position: { x: 220, y: 422 }, size: 100, isInput: false, value: "82", bgColor: "blue_light", borderWidth: 5, textSize: 44 },
  //     { id: 311, type: "line", lineType: "arrow", start: { x: 280, y: 422 }, end: { x: 450, y: 422 }, strokeWidth: 5, color: "black" },
  //     { id: 312, type: "text", position: { x: 360, y: 382 }, content: "+ 7", fontSize: 44 },
  //     { id: 313, type: "shape", shapeType: "triangle", position: { x: 530, y: 432 }, size: 120, isInput: true, value: "89", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 44 },
  //     { id: 314, type: "line", lineType: "arrow", start: { x: 590, y: 422 }, end: { x: 770, y: 422 }, strokeWidth: 5, color: "black" },
  //     { id: 315, type: "text", position: { x: 680, y: 382 }, content: "– 5", fontSize: 44 },
  //     { id: 316, type: "shape", shapeType: "circle", position: { x: 850, y: 432 }, size: 120, isInput: true, value: "84", bgColor: "white", borderColor: "black", borderWidth: 5, textSize: 44 },
  //   ],
  //   validations: []
  // },
  // {
  //   id: 13,
  //   category: "",
  //   type: "fill",
  //   desc: "viet_so_thich_hop_4.jpg",
  //   content: "#4 Viết số thích hợp vào ô trống.",
  //   inputLength: 2,
  //   elements: [
  //     // Hàng a) Diamond (12, 14, 16, 18, 20, 22)
  //     { id: 401, type: "text", position: { x: 50, y: 80 }, content: "a)", fontSize: 40 },
  //     { id: 402, type: "shape", shapeType: "diamond", position: { x: 150, y: 110 }, size: 100, isInput: false, value: "12", bgColor: "blue_light", textSize: 40 },
  //     { id: 403, type: "shape", shapeType: "diamond", position: { x: 300, y: 110 }, size: 100, isInput: false, value: "14", bgColor: "blue_light", textSize: 40 },
  //     { id: 404, type: "shape", shapeType: "diamond", position: { x: 450, y: 110 }, size: 100, isInput: false, value: "16", bgColor: "blue_light", textSize: 40 },
  //     { id: 405, type: "shape", shapeType: "diamond", position: { x: 600, y: 110 }, size: 100, isInput: true, value: "18", bgColor: "white", borderColor: "black", borderWidth: 3, textSize: 40 },
  //     { id: 406, type: "shape", shapeType: "diamond", position: { x: 750, y: 110 }, size: 100, isInput: true, value: "20", bgColor: "white", borderColor: "black", borderWidth: 3, textSize: 40 },
  //     { id: 407, type: "shape", shapeType: "diamond", position: { x: 900, y: 110 }, size: 100, isInput: true, value: "22", bgColor: "white", borderColor: "black", borderWidth: 3, textSize: 40 },

  //     // Hàng b) Circle (21, 23, 25, 27, 29, 31)
  //     { id: 408, type: "text", position: { x: 50, y: 280 }, content: "b)", fontSize: 40 },
  //     { id: 409, type: "shape", shapeType: "circle", position: { x: 150, y: 310 }, size: 100, isInput: false, value: "21", bgColor: "blue_light", textSize: 40 },
  //     { id: 410, type: "shape", shapeType: "circle", position: { x: 300, y: 310 }, size: 100, isInput: false, value: "23", bgColor: "blue_light", textSize: 40 },
  //     { id: 411, type: "shape", shapeType: "circle", position: { x: 450, y: 310 }, size: 100, isInput: true, value: "25", bgColor: "white", borderColor: "black", borderWidth: 3, textSize: 40 },
  //     { id: 412, type: "shape", shapeType: "circle", position: { x: 600, y: 310 }, size: 100, isInput: false, value: "27", bgColor: "blue_light", textSize: 40 },
  //     { id: 413, type: "shape", shapeType: "circle", position: { x: 750, y: 310 }, size: 100, isInput: true, value: "29", bgColor: "white", borderColor: "black", borderWidth: 3, textSize: 40 },
  //     { id: 414, type: "shape", shapeType: "circle", position: { x: 900, y: 310 }, size: 100, isInput: true, value: "31", bgColor: "white", borderColor: "black", borderWidth: 3, textSize: 40 },

  //     // Hàng c) Square (50, 55, 60, 65, 70, 75)
  //     { id: 415, type: "text", position: { x: 50, y: 480 }, content: "c)", fontSize: 40 },
  //     { id: 416, type: "shape", shapeType: "square", position: { x: 150, y: 510 }, size: 100, isInput: false, value: "50", bgColor: "blue_light", textSize: 40 },
  //     { id: 417, type: "shape", shapeType: "square", position: { x: 300, y: 510 }, size: 100, isInput: false, value: "55", bgColor: "blue_light", textSize: 40 },
  //     { id: 418, type: "shape", shapeType: "square", position: { x: 450, y: 510 }, size: 100, isInput: false, value: "60", bgColor: "blue_light", textSize: 40 },
  //     { id: 419, type: "shape", shapeType: "square", position: { x: 600, y: 510 }, size: 100, isInput: true, value: "65", bgColor: "white", borderColor: "black", borderWidth: 3, textSize: 40 },
  //     { id: 420, type: "shape", shapeType: "square", position: { x: 750, y: 510 }, size: 100, isInput: true, value: "70", bgColor: "white", borderColor: "black", borderWidth: 3, textSize: 40 },
  //     { id: 421, type: "shape", shapeType: "square", position: { x: 900, y: 510 }, size: 100, isInput: true, value: "75", bgColor: "white", borderColor: "black", borderWidth: 3, textSize: 40 },

  //     // Hàng d) Triangle (40, 50, 60, 70, 80, 90)
  //     { id: 422, type: "text", position: { x: 50, y: 680 }, content: "d)", fontSize: 40 },
  //     { id: 423, type: "shape", shapeType: "triangle", position: { x: 150, y: 710 }, size: 100, isInput: false, value: "40", bgColor: "blue_light", textSize: 40 },
  //     { id: 424, type: "shape", shapeType: "triangle", position: { x: 300, y: 710 }, size: 100, isInput: false, value: "50", bgColor: "blue_light", textSize: 40 },
  //     { id: 425, type: "shape", shapeType: "triangle", position: { x: 450, y: 710 }, size: 100, isInput: true, value: "60", bgColor: "white", borderColor: "black", borderWidth: 3, textSize: 40 },
  //     { id: 426, type: "shape", shapeType: "triangle", position: { x: 600, y: 710 }, size: 100, isInput: false, value: "70", bgColor: "blue_light", textSize: 40 },
  //     { id: 427, type: "shape", shapeType: "triangle", position: { x: 750, y: 710 }, size: 100, isInput: true, value: "80", bgColor: "white", borderColor: "black", borderWidth: 3, textSize: 40 },
  //     { id: 428, type: "shape", shapeType: "triangle", position: { x: 900, y: 710 }, size: 100, isInput: true, value: "90", bgColor: "white", borderColor: "black", borderWidth: 3, textSize: 40 },
  //   ],
  //   validations: []
  // },
  {
    id: 14,
    type: "match",
    category: "",
    desc: "",
    content: "Nối các hình có cùng số lượng hoặc giá trị. 1-n",
    elements: [
      //left
      { id: 1001, type: "shape", shapeType: "circle", position: { x: 200, y: 200 }, size: 120, isAnchor: true, value: "5", bgColor: "blue_light", textSize: 50, borderWidth: 5, group: "1" },
      { id: 1002, type: "shape", shapeType: "circle", position: { x: 200, y: 450 }, size: 120, isAnchor: true, value: "10", bgColor: "green_light", textSize: 50, borderWidth: 5, group: "1" },
      { id: 1003, type: "shape", shapeType: "circle", position: { x: 200, y: 700 }, size: 120, isAnchor: true, value: "3", bgColor: "orange_light", textSize: 50, borderWidth: 5, group: "1" },
      //right
      { id: 1004, type: "shape", shapeType: "square", position: { x: 800, y: 200 }, size: 120, isAnchor: true, value: "10", bgColor: "green_light", textSize: 50, borderWidth: 5, group: "2" },
      { id: 1005, type: "shape", shapeType: "square", position: { x: 800, y: 450 }, size: 120, isAnchor: true, value: "3", bgColor: "orange_light", textSize: 50, borderWidth: 5, group: "2" },
      { id: 1006, type: "shape", shapeType: "square", position: { x: 800, y: 700 }, size: 120, isAnchor: true, value: "5", bgColor: "blue_light", textSize: 50, borderWidth: 5, group: "2" },
    ],
    extraData: {
      id: 1,
      matchMode: '1-1'
    }
  },
  {
    id: 15,
    type: "match",
    category: "",
    desc: "",
    content: "Nối các hình có cùng số lượng hoặc giá trị. 1-n",
    elements: [
      //top
      { id: 1007, type: "shape", shapeType: "circle", position: { x: 200, y: 200 }, size: 120, isAnchor: true, value: "6 - 2", bgColor: "blue_light", textSize: 40, borderWidth: 5, group: "top" },
      { id: 1008, type: "shape", shapeType: "circle", position: { x: 400, y: 200 }, size: 120, isAnchor: true, value: "4 + 1", bgColor: "green_light", textSize: 40, borderWidth: 5, group: "top" },
      { id: 1009, type: "shape", shapeType: "circle", position: { x: 600, y: 200 }, size: 120, isAnchor: true, value: "8 - 4", bgColor: "orange_light", textSize: 40, borderWidth: 5, group: "top" },
      //master
      { id: 2001, type: "shape", shapeType: "square", position: { x: 400, y: 400 }, size: 120, isAnchor: true, value: "4", bgColor: "green_light", textSize: 40, borderWidth: 5, group: "master" },
      { id: 2002, type: "shape", shapeType: "square", position: { x: 600, y: 400 }, size: 120, isAnchor: true, value: "5", bgColor: "green_light", textSize: 40, borderWidth: 5, group: "master" },
      //bottom
      { id: 1010, type: "shape", shapeType: "circle", position: { x: 200, y: 700 }, size: 120, isAnchor: true, value: "16 - 9", bgColor: "blue_light", textSize: 40, borderWidth: 5, group: "bottom" },
      { id: 1011, type: "shape", shapeType: "circle", position: { x: 400, y: 700 }, size: 120, isAnchor: true, value: "4 + 11", bgColor: "green_light", textSize: 40, borderWidth: 5, group: "bottom" },
      { id: 1012, type: "shape", shapeType: "circle", position: { x: 600, y: 700 }, size: 120, isAnchor: true, value: "8 - 14", bgColor: "orange_light", textSize: 40, borderWidth: 5, group: "bottom" },
    ],
    extraData: {
      id: 2,
      matchMode: '1-n'
    }
  },
];

