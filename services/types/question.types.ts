import { QuestionType } from "@/enums/math.enum";

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

  isInput?: boolean;
  isAnchor?: boolean;
  value?: string;
  valueOptions?: string; //'["Đ", "S"]'
  textColor?: string;
  textSize?: number;
  textAlign?: 'left' | 'center' | 'right';
  group?: 'top' | 'bottom' | 'left' | 'right' | 'master'; //ElementGroup
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
  label: string;
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

export type QuestionElement = ShapeElement | LineElement | TextElement | ImageElement;

export type QuestionChild = QuestionChoice | QuestionSort;

export interface QuestionValidation {
  id: number;
  formula: string; //'#9 + #10 === 32'
}

export interface QuestionChoice {
  id: number;
  type?: QuestionType.CHOICE;
  group?: string;
  label?: string;
  options: string[];
  answer: string;   //"123" for single choice or "1,2,3" for multi choice
  score?: number;
}

export interface QuestionSort {
  id: number;
  type?: QuestionType.SORT;
  group?: string;
  label?: string;
  options: string[];
  answer: string;   //"1,2,3"
  score?: number;
}

export interface Question {
  id: number;
  category?: string;
  type: QuestionType;
  label?: string;
  desc?: string;
  imagePath?: string;
  elements?: QuestionElement[];
  childs?: QuestionChild[];
  validations?: QuestionValidation[];
  inputLength?: number;
  score?: number;
}