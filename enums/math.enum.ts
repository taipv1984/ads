export enum ViewMode {
    EDIT = 'edit',
    REVIEW = 'review',
}

export enum QuestionType {
    FILL = 'fill',
    MATCH = 'match',
    CHOICE = 'choice',
    SORT = 'sort',
    QUIZ = 'quiz',
    STEP = 'step',
}

export enum ElementGroup {
    TOP = 'top',
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right',
    MASTER = 'master',
}

export enum ValueType {
    SINGLE = 'single',
    MULTI = 'multi',
}

export enum LabelFormat {
    HIDE = 'hide',
    ALPHABET = 'alphabet',  //a, b, c, d...
    NUMBER = 'number',      //1, 2, 3, 4...
    INPUT = 'input',        //radio for single choice, checkbox for multi choice
}