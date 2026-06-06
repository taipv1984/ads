import { QuestionType } from "@/enums/math.enum";
import { uniqueID } from "@/utils/app.util";
import { Question } from "../types/question.types";

export const QUESTION_SORT_MOCKS: Question[] = [
    {
        id: uniqueID(),
        type: QuestionType.SORT,
        question: "Sắp xếp các số sau theo thứ tự tăng",
        groups: [
            { key: "a", options: ["72", "76", "70"], answer: "70,72,76", score: 0.5 },
            { key: "b", options: ["82", "77", "88"], answer: "77,82,88", score: 0.5 },
        ],
    },
    {
        id: uniqueID(),
        type: QuestionType.SORT,
        question: "Sắp xếp?",
        groups: [
            {
                key: "a",
                label: "Viết các số **72**, **76**, **70** theo thứ tự từ lớn đến bé",
                options: ["72", "76", "70"],
                answer: "70,72,76",
                score: 0.5,
            },
            {
                key: "b",
                label: "Viết các số **82**, **77**, **88** theo thứ tự từ lớn đến bé",
                options: ["82", "77", "88"],
                answer: "77,82,88",
                score: 0.5,
            },
        ],
    },
];

