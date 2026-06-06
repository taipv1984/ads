import { LabelFormat, QuestionType } from "@/enums/math.enum";
import { uniqueID } from "@/utils/app.util";
import { Question } from "../types/question.types";

export const QUESTION_QUIZ_MOCKS: Question[] = [
    {
        id: uniqueID(),
        type: QuestionType.QUIZ,
        question: "Câu hỏi trắc nghiệm: Ai là người phát minh ra thuyết tương đối?",
        labelFormat: LabelFormat.INPUT,
        options: [
            { value: "Isaac Newton" },
            { value: "Albert Einstein", isCorrect: true },
            { value: "Galileo Galilei" },
            { value: "Nikola Tesla" },
        ],
        score: 1.0,
        explain: "Albert Einstein là người đã phát minh ra thuyết tương đối rộng và thuyết tương đối hẹp.",
    },
    {
        id: uniqueID(),
        type: QuestionType.QUIZ,
        question: "Hãy chọn các số nguyên tố trong các số sau đây:",
        labelFormat: LabelFormat.ALPHABET,
        options: [
            { value: "2", isCorrect: true },
            { value: "4" },
            { value: "5", isCorrect: true },
            { value: "9" },
        ],
        score: 1.0,
        explain:
            "Số 2 và số 5 chỉ chia hết cho 1 và chính nó, nên chúng là các số nguyên tố. Số 4 và số 9 có nhiều hơn 2 ước số.\n![image](https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png)",
    },
];

