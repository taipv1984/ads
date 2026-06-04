import { QuestionType } from "@/enums/math.enum";
import { Question } from "../types/question.types";

export const QUESTION_FORM_MOCKS: Question[] = [
    {
        id: 61, //3 cols  -dat-tinh-roi-tinh-lop-1-phep-cong.png
        type: QuestionType.FORM,
        question: "Tính",
        groups: [
            {
                label: "a)",
                columns: [
                    {
                        rows: [
                            [
                                { type: "label", label: "35" },
                            ],
                            [
                                { type: "label", label: "+" },
                            ],
                            [
                                { type: "label", label: "4" },
                            ],
                            [
                                { type: "line" },
                            ],
                            [
                                { id: 611, type: "number", value: "39" },
                            ]
                        ],
                        style: {},
                    },
                    {
                        rows: [
                            [
                                { type: "label", label: "8" },
                            ],
                            [
                                { type: "label", label: "+" },
                            ],
                            [
                                { type: "label", label: "41" },
                            ],
                            [
                                { type: "line" },
                            ],
                            [
                                { id: 612, type: "number", value: "49" },
                            ]
                        ],
                        style: {},
                    },
                    {
                        rows: [
                            [
                                { type: "label", label: "46" },
                            ],
                            [
                                { type: "label", label: "+" },
                            ],
                            [
                                { type: "label", label: "320" },
                            ],
                            [
                                { type: "line" },
                            ],
                            [
                                { id: 613, type: "number", value: "78" },
                            ]
                        ],
                        style: {},
                    },
                ],
                style: {},
            },
        ],
        image: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png",
        inputLength: 2,
        rules: []
    },
    {
        id: 62, //2 cols + 2 label
        type: QuestionType.FORM,
        question: "Tính nhẩm",
        groups: [
            {
                label: "a)",
                columns: [
                    {
                        rows: [
                            [
                                { type: "label", label: "48 - 40 = " },
                                { id: 621, type: "number", value: "8" }
                            ],
                            [
                                { type: "label", label: "58 - 30 = " },
                                { id: 622, type: "number", value: "28" }
                            ]
                        ],
                        style: {},
                    },
                    {
                        rows: [
                            [
                                { type: "label", label: "69 - 60 = " },
                                { id: 623, type: "number", value: "9" }
                            ],
                            [
                                { type: "label", label: "79 - 50 = " },
                                { id: 624, type: "number", value: "29" }
                            ]
                        ],
                        style: {},
                    }
                ]
            },
            {
                label: "b)",
                columns: [
                    {
                        rows: [
                            [
                                { type: "label", label: "37 - 4 = " },
                                { id: 625, type: "number", value: "33" }
                            ],
                            [
                                { type: "label", label: "37 - 7 = " },
                                { id: 626, type: "number", value: "30" }
                            ]
                        ],
                        style: {},
                    },
                    {
                        rows: [
                            [
                                { type: "label", label: "98 - 8 = " },
                                { id: 627, type: "number", value: "90" }
                            ],
                            [
                                { type: "label", label: "98 - 5 = " },
                                { id: 628, type: "number", value: "93" }
                            ]
                        ],
                        style: {},
                    }
                ]
            },
        ],
        image: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png",
        inputLength: 2,
        rules: []
    },
    {
        id: 63, //2 cols
        type: QuestionType.FORM,
        question: "Điền số thích hợp vào chỗ chấm:",
        groups: [
            {
                columns: [
                    {
                        rows: [
                            [
                                { type: "label", label: "92 - " },
                                { id: 631, type: "number", value: "10" },
                                { type: "label", label: " = 82" },
                            ],
                            [
                                { type: "label", label: "39 - " },
                                { id: 632, type: "number", value: "2" },
                                { type: "label", label: " = 37" }
                            ]
                        ]
                    },
                ]
            },
        ],
        image: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png",
        inputLength: 2,
        rules: []
    },
    {
        id: 64, //1 col + select input
        type: QuestionType.FORM,
        question: "Điền dấu > < = vào ô trống",
        groups: [
            {
                columns: [
                    {
                        rows: [
                            [
                                { type: "label", label: "57 - 7" },
                                { id: 641, type: "select", value: "<", valueOptions: '["<", ">", "="]' },
                                { type: "label", label: "57 - 4" },
                            ],
                            [
                                { type: "label", label: "70 - 50" },
                                { id: 642, type: "select", value: ">", valueOptions: '["<", ">", "="]' },
                                { type: "label", label: "50 - 30" },
                            ],
                        ]
                    }
                ]
            },
        ],
        image: "https://hieusach24h.com/wp-content/uploads/2021/09/logo-hieu-sach-24h.png",
        inputLength: 2,
        rules: []
    },
];

