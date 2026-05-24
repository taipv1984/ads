import { LabelFormat, QuestionType } from "@/enums/math.enum";

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

//new update

export interface QuestionValidation {
  id: number;
  formula: string; //'#9 + #10 === 32'
}

export interface BaseQuestion {
  id: number;
  category?: string;
  type: QuestionType;
  question?: string;
  image?: string;
  score?: number; // optional total score for the question
}

export interface QuestionQuizOption {
  value: string;
  image?: string;
  isCorrect?: boolean;
}

export interface QuestionQuiz extends BaseQuestion {
  type: QuestionType.QUIZ;
  labelFormat?: LabelFormat;
  options: QuestionQuizOption[];
  explain?: string;
  explainImage?: string;
}

export interface QuestionChoiceGroup {
  key: string;
  label?: string;
  options: string[];
  answer: string;   //"123" for single choice or "1,2,3" for multi choice
  score?: number;
}

export interface QuestionChoice extends BaseQuestion {
  type: QuestionType.CHOICE;
  groups: QuestionChoiceGroup[];
}

export interface QuestionSortGroup {
  key: string;
  label?: string;
  options: string[];
  answer: string;   //"1,2,3"
  score?: number;
}

export interface QuestionSort extends BaseQuestion {
  type: QuestionType.SORT;
  groups: QuestionSortGroup[];
}

export interface QuestionFill extends BaseQuestion {
  type: QuestionType.FILL;
  elements?: QuestionElement[];
  validations?: QuestionValidation[];
  inputLength?: number;
}

export interface QuestionMatch extends BaseQuestion {
  type: QuestionType.MATCH;
  elements?: QuestionElement[];
}

export type Question = QuestionQuiz | QuestionChoice | QuestionSort | QuestionFill | QuestionMatch;
