export interface Point {
  x: number;
  y: number;
}

export interface BaseElement {
  id: number;
  type: 'shape' | 'line' | 'text' | 'image';
  zIndex?: number;
}

export interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType: 'square' | 'rect' | 'circle' | 'triangle' | 'diamond';
  position: Point;
  width?: number;   //apply for rect
  height?: number;
  size?: number; // apply for square, circle, triangle, diamond

  bgColor?: string;
  borderColor?: string;
  borderWidth?: number;

  isInput: boolean;
  value?: string;
  valueOptions?: string; //'["Đ", "S"]'
  textColor?: string;
  textSize?: number;
  textAlign?: 'left' | 'center' | 'right';
}

export interface LineElement extends BaseElement {
  type: 'line';
  lineType: 'straight' | 'curve' | 'arrow';
  start: Point;
  end: Point;
  controlPoints?: Point[];
  color?: string;
  strokeWidth?: number;
}

export interface TextElement extends BaseElement {
  type: 'text';
  position: Point;
  content: string;
  fontSize?: number;
  color?: string;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  url: string;
  position: Point;
  width: number;
  height: number;
}

export type CanvasElement = ShapeElement | LineElement | TextElement | ImageElement;

export interface ValidationRule {
  id: number;
  formula: string; //'#9 + #10 === 32'
}

export interface Question {
  id: number;
  category: string;
  desc: string;
  content: string;
  imagePath?: string;
  elements: CanvasElement[];
  validations: ValidationRule[];
  extraData?: string;
  inputLength?: number;
}
