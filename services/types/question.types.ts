import { QuestionQuizStyle, QuestionType, TextInputStyle } from "@/enums/math.enum";
import { ViewStyle } from "react-native";

export interface Point {
  x: number;
  y: number;
}

export interface AnchorPoint {
  ref: number;
  x: 'left' | 'center' | 'right';
  y: 'top' | 'center' | 'bottom';
}

export interface ConnectLine {
  source: AnchorPoint;
  target: AnchorPoint;
  color?: string;
  stroke?: number;
  style?: 'solid' | 'dashed' | 'dotted';  //default is solid
}

export interface ElementFrame {
  x: number;
  y: number;
  width: number;
  height: number;
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
  group?: 'top' | 'bottom' | 'left' | 'right' | 'master'; //PositionGroup
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

export interface BaseInput {
  type: 'number' | 'text' | 'select' | 'radio' | 'checkbox' | 'label' | 'image' | 'line';
  width?: number;
  height?: number;
  zIndex?: number;
  ref?: number;
  style?: ViewStyle;
}

export interface TextInput extends BaseInput {
  id: number;
  type: 'number' | 'text';
  value?: string;
  inputStyle?: TextInputStyle;  //box*, dot, line
  textAlign?: 'left' | 'center' | 'right';  //default is center
  isEnabled?: boolean;  //default is true
}

export interface SelectInput extends BaseInput {
  id: number;
  type: 'select';
  value?: string;
  valueOptions?: string; //'["Đ", "S"]'
}

export interface RadioInput extends BaseInput {
  id: number;
  type: 'radio';
  value?: string;
  label?: string;
  textAlign?: 'left' | 'right';   //default is left
}

export interface CheckboxInput extends BaseInput {
  id: number;
  type: 'checkbox';
  value?: string;
  label?: string;
  textAlign?: 'left' | 'right';   //default is left
}

export interface LabelView extends BaseInput {
  type: 'label';
  label: string;
}

export interface ImageView extends BaseInput {
  type: 'image';
  uri: string;
}

export interface LineView extends BaseInput {
  type: 'line';
  color?: string;
  stroke?: number;
}

export interface FormGroup {
  label?: string;
  columns: FormColumn[];
  style?: ViewStyle;
}

export interface FormColumn {
  rows: FormRow[];
  style?: ViewStyle;
}

export interface FormRow {
  inputs: QuestionInput[];
  style?: ViewStyle;
}

export type QuestionInput = TextInput | SelectInput | RadioInput | CheckboxInput |
  LabelView | ImageView | LineView;

export interface QuestionRule {
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
  explain?: string;
}

export interface QuestionQuizOption {
  value: string;
  image?: string;
  isCorrect?: boolean;
}

export interface QuestionQuiz extends BaseQuestion {
  type: QuestionType.QUIZ;
  options: QuestionQuizOption[];
  optionStyle?: QuestionQuizStyle;
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
  rules?: QuestionRule[];
  inputLength?: number;
}

export interface QuestionMatch extends BaseQuestion {
  type: QuestionType.MATCH;
  elements?: QuestionElement[];
}

export interface QuestionForm extends BaseQuestion {
  type: QuestionType.FORM;
  groups?: FormGroup[];
  rules?: QuestionRule[];
  inputLength?: number;
  connectLines?: ConnectLine[];
}

export type Question = QuestionQuiz | QuestionChoice | QuestionSort | QuestionFill | QuestionMatch | QuestionForm;
