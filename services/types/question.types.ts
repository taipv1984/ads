export interface Point {
  x: number;
  y: number;
}

export enum MatchType {
  single = 'single',
  multi = 'multi',
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

  isInput?: boolean;
  isAnchor?: boolean;
  value?: string;
  valueOptions?: string; //'["Đ", "S"]'
  textColor?: string;
  textSize?: number;
  textAlign?: 'left' | 'center' | 'right';
  group?: string;
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

export type QuestionType = 'fill' | 'match' | 'color' | 'quiz' | 'step';

export type QuestionElement = ShapeElement | LineElement | TextElement | ImageElement;

export interface QuestionValidation {
  id: number;
  formula: string; //'#9 + #10 === 32'
}

export interface Question {
  id: number;
  category?: string;
  type: QuestionType;
  title?: string;
  content: string;
  desc?: string;
  imagePath?: string;
  elements?: QuestionElement[];
  validations?: QuestionValidation[];
  inputLength?: number;
  score?: number;
}