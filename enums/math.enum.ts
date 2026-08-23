export enum ViewMode {
    EDIT = 'edit',
    REVIEW = 'review',
}

export enum QuestionType {
    FORM = 'form',
    TABLE = 'table',
    CONNECT = 'connect',    //like MATCH
    FILL = 'fill',      //canvas
    MATCH = 'match',    //canvas
    CHOICE = 'choice',
    SORT = 'sort',
    QUIZ = 'quiz',
    STEP = 'step',
}

export enum PositionGroup {
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

export enum QuestionQuizStyle {
    BLANK = 'blank',        //default
    ALPHABET = 'alphabet',  //a, b, c, d...
    NUMBER = 'number',      //1, 2, 3, 4...
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
}

export enum TextInputStyle {
    BOX = 'box',        // [ ]  default
    DOT = 'dot',        //......
    LINE = 'line',      //______
}