export enum ViewMode {
    EDIT = 'edit',
    REVIEW = 'review',
}

export enum QuestionType {
    FORM = 'form',
    FILL = 'fill',
    MATCH = 'match',
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

//todo later
export enum LabelFormat {
    HIDE = 'hide',
    ALPHABET = 'alphabet',  //a, b, c, d...
    NUMBER = 'number',      //1, 2, 3, 4...
    INPUT = 'input',        //radio for single choice, checkbox for multi choice
}

export enum TextInputStyle {
    BOX = 'box',        // [ ]  default
    DOT = 'dot',        //......
    LINE = 'line',      //______
    CIRCLE = 'circle',  // ( )
    BLANK = 'blank',    // blank space
}