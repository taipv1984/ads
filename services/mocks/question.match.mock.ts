import { QuestionType } from "@/enums/math.enum";
import { uniqueID } from "@/utils/app.util";
import { Question } from "../types/question.types";

export const QUESTION_MATCH_MOCKS: Question[] = [
  {
    id: uniqueID(),
    type: QuestionType.MATCH,
    question: "Nối các hình có cùng số lượng hoặc giá trị. single",
    elements: [
      // left
      { id: uniqueID(), type: "shape", shapeType: "circle", position: { x: 200, y: 200 }, size: 120, isAnchor: true, value: "5", textSize: 50, borderWidth: 5, group: "left" },
      { id: uniqueID(), type: "shape", shapeType: "circle", position: { x: 200, y: 450 }, size: 120, isAnchor: true, value: "10", textSize: 50, borderWidth: 5, group: "left" },
      { id: uniqueID(), type: "shape", shapeType: "circle", position: { x: 200, y: 700 }, size: 120, isAnchor: true, value: "3", textSize: 50, borderWidth: 5, group: "left" },
      // right
      { id: uniqueID(), type: "shape", shapeType: "square", position: { x: 800, y: 200 }, size: 120, isAnchor: true, value: "10", textSize: 50, borderWidth: 5, group: "right" },
      { id: uniqueID(), type: "shape", shapeType: "square", position: { x: 800, y: 450 }, size: 120, isAnchor: true, value: "3", textSize: 50, borderWidth: 5, group: "right" },
      { id: uniqueID(), type: "shape", shapeType: "square", position: { x: 800, y: 700 }, size: 120, isAnchor: true, value: "5", textSize: 50, borderWidth: 5, group: "right" },
    ],
    score: 1,
  },
  {
    id: uniqueID(),
    type: QuestionType.MATCH,
    question: "Nối các hình có cùng số lượng hoặc giá trị. multi",
    elements: [
      // top
      { id: uniqueID(), type: "shape", shapeType: "circle", position: { x: 200, y: 200 }, size: 120, isAnchor: true, value: "6 - 2", textSize: 40, borderWidth: 5, group: "top" },
      { id: uniqueID(), type: "shape", shapeType: "circle", position: { x: 400, y: 200 }, size: 120, isAnchor: true, value: "4 + 1", textSize: 40, borderWidth: 5, group: "top" },
      { id: uniqueID(), type: "shape", shapeType: "circle", position: { x: 600, y: 200 }, size: 120, isAnchor: true, value: "8 - 4", textSize: 40, borderWidth: 5, group: "top" },
      // master
      { id: uniqueID(), type: "shape", shapeType: "square", position: { x: 400, y: 400 }, size: 120, isAnchor: true, value: "4", textSize: 40, borderWidth: 5, group: "master" },
      { id: uniqueID(), type: "shape", shapeType: "square", position: { x: 600, y: 400 }, size: 120, isAnchor: true, value: "5", textSize: 40, borderWidth: 5, group: "master" },
      // bottom
      { id: uniqueID(), type: "shape", shapeType: "circle", position: { x: 200, y: 700 }, size: 120, isAnchor: true, value: "16 - 11", textSize: 40, borderWidth: 5, group: "bottom" },
      { id: uniqueID(), type: "shape", shapeType: "circle", position: { x: 400, y: 700 }, size: 120, isAnchor: true, value: "4 + 11", textSize: 40, borderWidth: 5, group: "bottom" },
      { id: uniqueID(), type: "shape", shapeType: "circle", position: { x: 600, y: 700 }, size: 120, isAnchor: true, value: "8 - 14", textSize: 40, borderWidth: 5, group: "bottom" },
    ],
    score: 1,
  },
];
