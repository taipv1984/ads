# Kiến trúc Dữ liệu Game Toán học (React Native Skia)

## 1. Giải pháp Kỹ thuật & Trả lời Câu hỏi

### Câu hỏi 1: Xử lý bài toán có nhiều đáp án đúng (VD: Tổng bằng 32)
Để giải quyết việc học sinh có thể nhập nhiều cặp số khác nhau (30 và 2, 10 và 22...), ta không thể gán chết thuộc tính `value` vào từng shape. 
**Giải pháp:** Đưa logic kiểm tra (validation) lên mức `question` (câu hỏi) thay vì để ở mức `shape`.
Ta sẽ tạo một mảng `validations` chứa các luật kiểm tra. Có 2 loại luật chính:
- `exact`: Khớp chính xác (VD: điền số 34 vào ô trống).
- `expression`: Dùng công thức toán học (VD: `$input_1 + $input_2 === 32`). Hệ thống sẽ lấy giá trị user nhập vào 2 ô (dựa vào `inputKey`), cộng lại và so sánh với 32.

### Câu hỏi 2: Tối ưu `is_change` và `value`
Thuộc tính `is_change` (đổi tên thành `isInput` cho chuẩn ngữ nghĩa) và `value` trong thiết kế cũ đang bị nhập nhằng giữa "dữ liệu hiển thị" và "đáp án".
**Giải pháp:**
- Đổi `is_change` thành `isInput` (boolean).
- NẾU `isInput = false` (hình tĩnh): Shape sẽ có thuộc tính `content` (VD: "27", "32") để hiển thị.
- NẾU `isInput = true` (ô điền đáp án): Shape KHÔNG có `content` và KHÔNG có `value`. Thay vào đó, nó dùng `inputKey` (VD: "input_1") để làm định danh. Khi học sinh bấm vào và nhập "30", app của bạn sẽ lưu vào một state riêng biệt: `{ "input_1": 30 }`. Lúc nộp bài, hàm chấm điểm sẽ lấy state này ra đối chiếu với rule trong mảng `validations`.

### Yêu cầu Responsive trên mọi màn hình & Config
Để hình vẽ không bị méo hay sai tỷ lệ trên các màn hình điện thoại khác nhau (iPhone SE bé, iPhone 15 Pro Max to):
- **Sử dụng Hệ tọa độ Ảo (Virtual Coordinate System):** Mọi tọa độ `x, y, width, height, size` đều thiết kế trên một mặt phẳng chuẩn. Giá trị `virtualWidth` và `virtualHeight` (ví dụ `1000x1000`) được lấy mặc định từ file `game_config.ts`. Khi lên app thật, ta chỉ cần tính tỷ lệ `scale = screenWidth / virtualWidth` và nhân vào tọa độ.
- **Theme Config:** Thay vì lưu mã màu `#FFFFFF`, ta lưu `bgColor: "primary_light"`. Mã màu thực tế sẽ được map từ 1 file config duy nhất.

---

## 2. Cấu trúc Dữ liệu Tối ưu (TypeScript Interfaces)

```typescript
// 1. Point và Virtual Coordinates
interface Point {
  x: number; // Tọa độ ảo
  y: number; // Tọa độ ảo
}

// 2. Các Element vẽ trên Skia
interface BaseElement {
  id: number;            // ID dạng số và không trùng lặp
  inputKey?: string;     // Key dùng thay cho id trong formula nếu là ô nhập liệu (VD: 'input_1')
  type: 'shape' | 'line' | 'text' | 'image';
  zIndex?: number;
}

interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType: 'square' | 'rect' | 'circle' | 'triangle' | 'diamond';
  position: Point; // Tâm của hình
  width?: number;  
  height?: number; 
  size?: number;   // Dùng cho circle (bán kính), square (cạnh)
  
  // Style (sử dụng key từ Theme Config)
  bgColor?: string;      // VD: "primary_light", "white"
  borderColor?: string;
  borderWidth?: number;
  
  // Interactive
  isInput: boolean;      // Bằng true thì ấn vào hiện bàn phím
  content?: string;      // Nội dung text nếu isInput = false
  textColor?: string;
}

interface LineElement extends BaseElement {
  type: 'line';
  lineType: 'straight' | 'curve' | 'arrow';
  start: Point;
  end: Point;
  controlPoints?: Point[]; // Dùng cho đường cong (Bezier curve)
  color?: string;
  strokeWidth?: number;
}

interface TextElement extends BaseElement {
  type: 'text';
  position: Point;
  content: string;
  fontSize?: number;     // Font size không cần config
  color?: string;
}

interface ImageElement extends BaseElement {
  type: 'image';
  url: string; // Tên asset hoặc URL
  position: Point;
  width: number;
  height: number;
}

type CanvasElement = ShapeElement | LineElement | TextElement | ImageElement;

// 3. Validation Rules
interface ValidationRule {
  type: 'exact' | 'expression';
  targetKey?: string;      // Trỏ tới inputKey (Cho exact)
  expected?: string;       // Cho exact (VD: 'Đ', '34')
  formula?: string;        // Cho expression (VD: '$input_1 + $input_2 === 32')
}

// 4. Root Question Object
interface Question {
  id: number;             // ID dạng số
  category: string;       // Để trống
  desc: string;           // Lấy tên hình ảnh đang phân tích
  content: string;        // Nội dung câu hỏi (thay thế instruction)
  elements: CanvasElement[];
  validations: ValidationRule[];
}
```

---

## 3. Danh sách 10 Question Records Mẫu (JSON)

Dưới đây là 10 record mô phỏng chính xác các loại câu hỏi trong 5 hình bạn cung cấp. Các trường `id` đều là số và **không trùng lặp** trong toàn bộ hệ thống (giống auto-increment MySQL). 

```json
[
  {
    "id": 1,
    "category": "",
    "desc": "viet_so_thich_hop_1.jpg",
    "content": "Viết số thích hợp vào ô trống (theo mẫu).",
    "elements": [
      { "id": 1, "type": "shape", "shapeType": "circle", "position": { "x": 500, "y": 200 }, "size": 120, "isInput": false, "content": "27", "bgColor": "blue_light" },
      { "id": 2, "type": "line", "lineType": "straight", "start": { "x": 500, "y": 260 }, "end": { "x": 300, "y": 500 }, "color": "black", "strokeWidth": 2 },
      { "id": 3, "type": "line", "lineType": "straight", "start": { "x": 500, "y": 260 }, "end": { "x": 700, "y": 500 }, "color": "black", "strokeWidth": 2 },
      { "id": 4, "type": "shape", "shapeType": "square", "position": { "x": 300, "y": 560 }, "size": 120, "isInput": false, "content": "20", "textColor": "blue" },
      { "id": 5, "type": "shape", "shapeType": "square", "position": { "x": 700, "y": 560 }, "size": 120, "isInput": false, "content": "7", "textColor": "blue" }
    ],
    "validations": []
  },
  {
    "id": 2,
    "category": "",
    "desc": "viet_so_thich_hop_1.jpg",
    "content": "Viết số thích hợp vào ô trống (theo mẫu).",
    "elements": [
      { "id": 6, "type": "shape", "shapeType": "circle", "position": { "x": 500, "y": 200 }, "size": 120, "isInput": false, "content": "32", "bgColor": "blue_light" },
      { "id": 7, "type": "line", "lineType": "straight", "start": { "x": 500, "y": 260 }, "end": { "x": 300, "y": 500 } },
      { "id": 8, "type": "line", "lineType": "straight", "start": { "x": 500, "y": 260 }, "end": { "x": 700, "y": 500 } },
      { "id": 9, "type": "shape", "shapeType": "square", "position": { "x": 300, "y": 560 }, "size": 120, "isInput": true, "inputKey": "input_1" },
      { "id": 10, "type": "shape", "shapeType": "square", "position": { "x": 700, "y": 560 }, "size": 120, "isInput": true, "inputKey": "input_2" }
    ],
    "validations": [
      { "type": "expression", "formula": "$input_1 + $input_2 === 32" }
    ]
  },
  {
    "id": 3,
    "category": "",
    "desc": "viet_so_thich_hop_1.jpg",
    "content": "Viết số thích hợp vào ô trống (theo mẫu).",
    "elements": [
      { "id": 11, "type": "shape", "shapeType": "circle", "position": { "x": 500, "y": 200 }, "size": 120, "isInput": false, "content": "46", "bgColor": "blue_light" },
      { "id": 12, "type": "line", "lineType": "straight", "start": { "x": 500, "y": 260 }, "end": { "x": 300, "y": 500 } },
      { "id": 13, "type": "line", "lineType": "straight", "start": { "x": 500, "y": 260 }, "end": { "x": 700, "y": 500 } },
      { "id": 14, "type": "shape", "shapeType": "square", "position": { "x": 300, "y": 560 }, "size": 120, "isInput": true, "inputKey": "input_1" },
      { "id": 15, "type": "shape", "shapeType": "square", "position": { "x": 700, "y": 560 }, "size": 120, "isInput": true, "inputKey": "input_2" }
    ],
    "validations": [
      { "type": "expression", "formula": "$input_1 + $input_2 === 46" }
    ]
  },
  {
    "id": 4,
    "category": "",
    "desc": "viet_so_thich_hop_2.jpg",
    "content": "Đúng ghi Đ, sai ghi S.",
    "elements": [
      { "id": 16, "type": "text", "position": { "x": 100, "y": 500 }, "content": "a) Ba mươi tư viết là 34.", "fontSize": 24 },
      { "id": 17, "type": "shape", "shapeType": "square", "position": { "x": 800, "y": 500 }, "size": 100, "isInput": true, "inputKey": "input_1" }
    ],
    "validations": [
      { "type": "exact", "targetKey": "input_1", "expected": "Đ" }
    ]
  },
  {
    "id": 5,
    "category": "",
    "desc": "viet_so_thich_hop_2.jpg",
    "content": "Đúng ghi Đ, sai ghi S.",
    "elements": [
      { "id": 18, "type": "text", "position": { "x": 100, "y": 500 }, "content": "Ba mươi tư viết là 304.", "fontSize": 24 },
      { "id": 19, "type": "shape", "shapeType": "square", "position": { "x": 800, "y": 500 }, "size": 100, "isInput": true, "inputKey": "input_1" }
    ],
    "validations": [
      { "type": "exact", "targetKey": "input_1", "expected": "S" }
    ]
  },
  {
    "id": 6,
    "category": "",
    "desc": "viet_so_thich_hop_3.jpg",
    "content": "Viết số thích hợp vào ô trống.",
    "elements": [
      { "id": 20, "type": "line", "lineType": "curve", "start": { "x": 100, "y": 500 }, "end": { "x": 900, "y": 500 }, "controlPoints": [{ "x": 300, "y": 200 }, { "x": 700, "y": 800 }], "strokeWidth": 6, "color": "blue_dark" },
      { "id": 21, "type": "shape", "shapeType": "circle", "position": { "x": 150, "y": 450 }, "size": 100, "isInput": false, "content": "31", "bgColor": "blue_light" },
      { "id": 22, "type": "shape", "shapeType": "circle", "position": { "x": 300, "y": 350 }, "size": 100, "isInput": false, "content": "32", "bgColor": "blue_light" },
      { "id": 23, "type": "shape", "shapeType": "circle", "position": { "x": 450, "y": 450 }, "size": 100, "isInput": false, "content": "33", "bgColor": "blue_light" },
      { "id": 24, "type": "shape", "shapeType": "circle", "position": { "x": 600, "y": 600 }, "size": 100, "isInput": true, "inputKey": "input_1" },
      { "id": 25, "type": "shape", "shapeType": "circle", "position": { "x": 750, "y": 600 }, "size": 100, "isInput": true, "inputKey": "input_2" },
      { "id": 26, "type": "shape", "shapeType": "circle", "position": { "x": 900, "y": 450 }, "size": 100, "isInput": false, "content": "36", "bgColor": "blue_light" }
    ],
    "validations": [
      { "type": "exact", "targetKey": "input_1", "expected": "34" },
      { "type": "exact", "targetKey": "input_2", "expected": "35" }
    ]
  },
  {
    "id": 7,
    "category": "",
    "desc": "viet_so_thich_hop_4.jpg",
    "content": "Viết số thích hợp vào ô trống.",
    "elements": [
      { "id": 27, "type": "shape", "shapeType": "diamond", "position": { "x": 160, "y": 500 }, "size": 120, "isInput": false, "content": "12", "bgColor": "blue_light" },
      { "id": 28, "type": "shape", "shapeType": "diamond", "position": { "x": 330, "y": 500 }, "size": 120, "isInput": false, "content": "14", "bgColor": "blue_light" },
      { "id": 29, "type": "shape", "shapeType": "diamond", "position": { "x": 500, "y": 500 }, "size": 120, "isInput": false, "content": "16", "bgColor": "blue_light" },
      { "id": 30, "type": "shape", "shapeType": "diamond", "position": { "x": 670, "y": 500 }, "size": 120, "isInput": true, "inputKey": "input_1" },
      { "id": 31, "type": "shape", "shapeType": "diamond", "position": { "x": 840, "y": 500 }, "size": 120, "isInput": true, "inputKey": "input_2" }
    ],
    "validations": [
      { "type": "exact", "targetKey": "input_1", "expected": "18" },
      { "type": "exact", "targetKey": "input_2", "expected": "20" }
    ]
  },
  {
    "id": 8,
    "category": "",
    "desc": "viet_so_thich_hop_4.jpg",
    "content": "Viết số thích hợp vào ô trống.",
    "elements": [
      { "id": 32, "type": "shape", "shapeType": "triangle", "position": { "x": 160, "y": 500 }, "size": 120, "isInput": false, "content": "40", "bgColor": "blue_light" },
      { "id": 33, "type": "shape", "shapeType": "triangle", "position": { "x": 330, "y": 500 }, "size": 120, "isInput": false, "content": "50", "bgColor": "blue_light" },
      { "id": 34, "type": "shape", "shapeType": "triangle", "position": { "x": 500, "y": 500 }, "size": 120, "isInput": true, "inputKey": "input_1" },
      { "id": 35, "type": "shape", "shapeType": "triangle", "position": { "x": 670, "y": 500 }, "size": 120, "isInput": false, "content": "70", "bgColor": "blue_light" },
      { "id": 36, "type": "shape", "shapeType": "triangle", "position": { "x": 840, "y": 500 }, "size": 120, "isInput": true, "inputKey": "input_2" }
    ],
    "validations": [
      { "type": "exact", "targetKey": "input_1", "expected": "60" },
      { "type": "exact", "targetKey": "input_2", "expected": "80" }
    ]
  },
  {
    "id": 9,
    "category": "",
    "desc": "viet_so_thich_hop_5.jpg",
    "content": "Viết các số 1, 2, 3 vào ô trống theo thứ tự từ ngắn nhất đến dài nhất (theo mẫu).",
    "elements": [
      { "id": 37, "type": "text", "position": { "x": 100, "y": 200 }, "content": "Mẫu:", "textColor": "blue" },
      { "id": 38, "type": "shape", "shapeType": "square", "position": { "x": 200, "y": 300 }, "size": 100, "isInput": false, "content": "2", "textColor": "blue" },
      { "id": 39, "type": "image", "url": "caterpillar_medium.png", "position": { "x": 600, "y": 300 }, "width": 400, "height": 150 },
      
      { "id": 40, "type": "shape", "shapeType": "square", "position": { "x": 200, "y": 500 }, "size": 100, "isInput": false, "content": "3", "textColor": "blue" },
      { "id": 41, "type": "image", "url": "caterpillar_long.png", "position": { "x": 600, "y": 500 }, "width": 550, "height": 150 },
      
      { "id": 42, "type": "shape", "shapeType": "square", "position": { "x": 200, "y": 700 }, "size": 100, "isInput": false, "content": "1", "textColor": "blue" },
      { "id": 43, "type": "image", "url": "ant_short.png", "position": { "x": 600, "y": 700 }, "width": 250, "height": 150 }
    ],
    "validations": []
  },
  {
    "id": 10,
    "category": "",
    "desc": "viet_so_thich_hop_5.jpg",
    "content": "Viết các số 1, 2, 3 vào ô trống theo thứ tự từ ngắn nhất đến dài nhất.",
    "elements": [
      { "id": 44, "type": "shape", "shapeType": "square", "position": { "x": 200, "y": 300 }, "size": 100, "isInput": true, "inputKey": "input_1" },
      { "id": 45, "type": "image", "url": "car_sedan.png", "position": { "x": 600, "y": 300 }, "width": 400, "height": 200 },
      
      { "id": 46, "type": "shape", "shapeType": "square", "position": { "x": 200, "y": 550 }, "size": 100, "isInput": true, "inputKey": "input_2" },
      { "id": 47, "type": "image", "url": "car_suv.png", "position": { "x": 600, "y": 550 }, "width": 350, "height": 200 },
      
      { "id": 48, "type": "shape", "shapeType": "square", "position": { "x": 200, "y": 800 }, "size": 100, "isInput": true, "inputKey": "input_3" },
      { "id": 49, "type": "image", "url": "truck.png", "position": { "x": 600, "y": 800 }, "width": 600, "height": 200 }
    ],
    "validations": [
      { "type": "exact", "targetKey": "input_1", "expected": "2" },
      { "type": "exact", "targetKey": "input_2", "expected": "1" },
      { "type": "exact", "targetKey": "input_3", "expected": "3" }
    ]
  }
]
```
