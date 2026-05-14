import { SPACING } from '@/constants/theme';
import { SCORE_FEEDBACK } from '@/services/mocks/score-feedback.mock';
import {
  ElementGroup,
  MatchType,
  Question,
  QuestionElement,
  ShapeElement
} from '@/services/types/question.types';
import { ScoreFeedback } from '@/services/types/score-feedback.types';
import { DEFAULT_Z_INDEX, RenderLayer, SCALE } from '../features/math/components/shared/BaseElements';

/**
 * Lấy danh sách các điểm neo (anchors) từ danh sách các phần tử
 */
export const getAnchorElements = (elements: QuestionElement[] = []): ShapeElement[] => {
  return elements.filter(
    (el) => el.type === 'shape' && (el as ShapeElement).isAnchor
  ) as ShapeElement[];
};

/**
 * Xác định matchType ('single' hoặc 'multi') dựa vào shape.group
 * Nếu có ít nhất 1 group='master' thì là 'multi', ngược lại là 'single'
 */
export const getMatchType = (elements: QuestionElement[] = []): MatchType => {
  const anchors = getAnchorElements(elements);
  const hasMaster = anchors.some(a => a.group === ElementGroup.master);
  return hasMaster ? MatchType.multi : MatchType.single;
};

/**
 * Lấy giá trị Z-Index thực tế của một phần tử
 */
export const getEffectiveZIndex = (el: QuestionElement): number => {
  return el.zIndex ?? DEFAULT_Z_INDEX[el.type] ?? 0;
};

/**
 * Nhóm các phần tử thành các lớp (layers) để render theo thứ tự Z-Index
 */
export const groupElementsIntoLayers = (
  elements: QuestionElement[],
  anchorElements: ShapeElement[] = [],
  includeUserConnections: boolean = false
): RenderLayer[] => {
  const allElements: (
    (QuestionElement & { effectiveZIndex: number, anchorIdx?: number }) |
    { type: 'user-connections'; effectiveZIndex: number }
  )[] = [
      ...elements.map((el) => {
        const effectiveZIndex = getEffectiveZIndex(el);
        if (el.type === 'shape' && (el as ShapeElement).isAnchor) {
          const anchorIdx = anchorElements.findIndex((a) => a.id === el.id);
          return { ...el, effectiveZIndex, anchorIdx } as (QuestionElement & { effectiveZIndex: number, anchorIdx: number });
        }
        return { ...el, effectiveZIndex } as (QuestionElement & { effectiveZIndex: number });
      }),
    ];

  if (includeUserConnections) {
    allElements.push({
      type: 'user-connections',
      effectiveZIndex: DEFAULT_Z_INDEX.line,
    });
  }

  allElements.sort((a, b) => a.effectiveZIndex - b.effectiveZIndex);

  const groupedLayers: RenderLayer[] = [];
  allElements.forEach((el) => {
    const zIndex = el.effectiveZIndex;
    const lastLayer = groupedLayers[groupedLayers.length - 1];
    const isCanvasType =
      el.type === 'shape' ||
      el.type === 'line' ||
      el.type === 'user-connections';

    if (
      isCanvasType &&
      lastLayer?.type === 'canvas' &&
      lastLayer.zIndex === zIndex
    ) {
      lastLayer.elements.push(el);
    } else if (isCanvasType) {
      groupedLayers.push({ type: 'canvas', elements: [el], zIndex });
    } else if (el.type === 'text') {
      groupedLayers.push({ type: 'text', elements: [el], zIndex });
    } else if (el.type === 'image') {
      groupedLayers.push({ type: 'image', elements: [el], zIndex });
    }
  });

  return groupedLayers;
};

/**
 * Tính toán layout động cho Canvas (chiều cao và độ lệch Y) dựa trên các phần tử
 */
export const getCanvasLayout = (elements: QuestionElement[]) => {
  let minY = Infinity;
  let maxY = -Infinity;

  elements.forEach((el) => {
    let elementTop: number | undefined = undefined;
    let elementBottom: number | undefined = undefined;

    if (el.type === 'shape') {
      const h = el.height || el.size || 100;
      elementTop = el.position.y - h / 2;
      elementBottom = el.position.y + h / 2;
    } else if (el.type === 'text') {
      const h = el.fontSize || 40;
      elementTop = el.position.y - h / 2;
      elementBottom = el.position.y + h / 2;
    } else if (el.type === 'image') {
      elementTop = el.position.y - el.height / 2;
      elementBottom = el.position.y + el.height / 2;
    } else if (el.type === 'line') {
      const sw = el.strokeWidth || 5;
      const arrowBuffer = el.lineType === 'arrow' ? 40 : 0;
      elementTop = Math.min(el.start.y, el.end.y) - sw - arrowBuffer;
      elementBottom = Math.max(el.start.y, el.end.y) + sw + arrowBuffer;

      if (el.controlPoints) {
        el.controlPoints.forEach((p) => {
          elementTop = Math.min(elementTop as number, p.y - sw);
          elementBottom = Math.max(elementBottom as number, p.y + sw);
        });
      }
    }

    if (elementTop !== undefined) minY = Math.min(minY, elementTop);
    if (elementBottom !== undefined) maxY = Math.max(maxY, elementBottom);
  });

  if (minY === Infinity) return { height: 300, offsetY: 0 };

  const contentHeight = (maxY - minY) * SCALE + SPACING.lg;
  const padding = SPACING.md;

  return {
    height: contentHeight + padding * 2,
    offsetY: padding - minY * SCALE,
  };
};

/**
 * Trả về giá trị của một biểu thức đơn giản (dưới dạng string) hoặc chuỗi ban đầu 
 */
export const calcExpression = (text: string): string => {
  if (!text) return '';
  if (/[+\-*/x:]/.test(text)) {
    try {
      // Thay thế các ký hiệu phổ thông sang chuẩn lập trình
      const normalized = text
        .replace(/,/g, '.')
        .replace(/x/g, '*')
        .replace(/:/g, '/');

      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${normalized}`)();
      return String(result);
    } catch (e) {
      return text;
    }
  }
  return text;
};

/**
 * Kiểm tra tính đúng đắn của công thức validation
 */
export const validateFormula = (
  formula: string,
  userInputs: Record<number, string>
): boolean => {
  try {
    let evalStr = formula;
    const matches = evalStr.match(/#(\d+)/g) || [];

    for (const match of matches) {
      const id = parseInt(match.substring(1));
      const val = userInputs[id] || '';
      evalStr = evalStr.replace(match, `Number("${val}")`);
    }

    // eslint-disable-next-line no-new-func
    return new Function(`return ${evalStr}`)();
  } catch (e) {
    console.error('Validation error:', e);
    return false;
  }
};

/**
 * Tra ve tong so cap match dung
 */
export const getMatchCorrectTotal = (elements: QuestionElement[] = []): number => {
  const matchType = getMatchType(elements);
  const anchors = getAnchorElements(elements);
  let total = 0;
  if (matchType === MatchType.single) {
    total = Math.ceil(anchors.length / 2);
  } else {
    const masters = anchors.filter((a) => a.group === ElementGroup.master);
    const slaves = anchors.filter((a) => a.group !== ElementGroup.master);
    masters.forEach((m) => {
      slaves.forEach((s) => {
        let masterValue = calcExpression(m.value || '');
        let slaveValue = calcExpression(s.value || '');
        if (masterValue === slaveValue) {
          total++;
        }
      });
    });
  }
  return total;
};

/**
 * Kiểm tra xem một câu hỏi đã được hoàn thành hay chưa
 */
export const checkQuestionCompletion = (
  question: Question,
  userInputs: Record<number, string>,
  userConnections: { from: number; to: number }[] = []
): boolean => {
  const elements = question.elements || [];

  switch (question.type) {
    case 'fill': {
      // Phải điền tất cả các ô input
      const inputShapes = elements.filter(
        (el) => el.type === 'shape' && (el as ShapeElement).isInput
      );
      if (inputShapes.length === 0) return true;
      return inputShapes.every((s) => userInputs[s.id] && userInputs[s.id].trim() !== '');
    }

    case 'match': {
      // Phải có ít nhất 1 kết nối
      return userConnections.length > 0;
    }

    // Mặc định các loại khác có thể luôn là true hoặc xử lý riêng
    default:
      return true;
  }
};

/**
 * Tính điểm final cho câu hỏi theo boi cua 0.25 (vd: 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2...)
 * questionScore: điểm tối đa của câu hỏi
 * correctTotal: tổng số đáp án đúng của câu hỏi
 * correctCount: số đáp án đúng của user
 * incorrectCount: số đáp án sai của user
 *  totalPossibility = correctTotal + incorrectCount (tổng khả năng đúng + sai)
 *  finalScore = correctCount * (questionScore / totalPossibility)
 *    neu incorrectCount = 0 thi lam tron finalScore len theo step la 0.25 
 *    nguoc lai thi lam tron finalScore xuong theo step la 0.25
 *  kiem tra tiep 
 *    neu finalScore = questionScore=> return finalScore = questionScore- 0.25
 *    neu finalScore = 0 => return finalScore = 0.25
 */
export const calcFinalScore = (
  questionScore: number,
  correctTotal: number,
  correctCount: number,
  incorrectCount: number
): number => {
  // Trường hợp đặc biệt 1: ko có đáp án nào đúng => 0 điểm
  if (correctCount === 0) {
    return 0;
  }

  // Trường hợp đặc biệt 2: đáp án đúng hết => questionScore điểm
  if (correctCount === correctTotal && incorrectCount === 0) {
    return questionScore;
  }

  // Tổng khả năng đúng + sai
  const totalPossibility = correctTotal + incorrectCount;

  //Tìm điểm thô
  let finalScore = correctCount * (questionScore / totalPossibility);

  // Quy tắc làm tròn theo step 0.25
  const step = 0.25;
  if (incorrectCount === 0) {
    // Làm tròn lên theo step 0.25
    finalScore = Math.ceil(Math.round(finalScore * 100) / 100 / step) * step;
  } else {
    // Làm tròn xuống theo step 0.25
    finalScore = Math.floor(Math.round(finalScore * 100) / 100 / step) * step;
  }

  // Đảm bảo không vượt quá biên (questionScore) hoặc thấp hơn step (0.25) 
  if (finalScore >= questionScore) {
    finalScore = questionScore - step;
  }
  if (finalScore <= 0) {
    finalScore = step;
  }

  return finalScore;
};

export const calcQuestionMatchScore = (
  question: Question,
  userConnections: { from: number; to: number }[]
): number => {
  const elements = question.elements || [];
  const questionScore = question.score !== undefined ? question.score : 1;
  const correctTotal = getMatchCorrectTotal(elements);
  let correctCount = 0;
  let incorrectCount = 0;

  userConnections.forEach((conn) => {
    const fromEl = elements.find((el) => el.id === conn.from) as ShapeElement;
    const toEl = elements.find((el) => el.id === conn.to) as ShapeElement;
    if (fromEl && toEl) {
      const fromVal = calcExpression(fromEl.value || '');
      const toVal = calcExpression(toEl.value || '');
      if (fromVal === toVal) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    }
  });

  let finalScore = calcFinalScore(questionScore, correctTotal, correctCount, incorrectCount);
  return finalScore;
};

/**
 * Tính điểm cho câu hỏi dạng điền (fill)
 * todo...
 */
export const calcQuestionFillScore = (
  question: Question,
  userInputs: Record<number, string>
): { isCorrect: boolean; finalScore: number } => {
  let isCorrect = true;
  let totalCorrectCount = 0;
  let totalRequiredCount = 0;
  const questionScore = question.score !== undefined ? question.score : 1;
  const elements = question.elements || [];

  // 1. Kiểm tra các ô Input
  for (const el of elements) {
    if (el.type === 'shape') {
      const shape = el as ShapeElement;
      if (shape.isInput && shape.value && shape.value.trim() !== '') {
        totalRequiredCount++;
        const userVal = userInputs[shape.id] || '';
        if (userVal === shape.value) {
          totalCorrectCount++;
        } else {
          isCorrect = false;
        }
      }
    }
  }

  // 2. Kiểm tra các công thức validation bổ sung
  for (const rule of question.validations || []) {
    if (rule.formula) {
      totalRequiredCount++;
      if (validateFormula(rule.formula, userInputs)) {
        totalCorrectCount++;
      } else {
        isCorrect = false;
      }
    }
  }

  const finalScore =
    totalRequiredCount > 0 ? Math.round((totalCorrectCount / totalRequiredCount) * questionScore) : 0;

  return { isCorrect, finalScore };
};

/**
 * Tính toán điểm số cho một câu hỏi dựa trên loại câu hỏi
 */
export const calcQuestionScore = (
  question: Question,
  userInputs: Record<number, string>,
  userConnections: { from: number; to: number }[] = []
): { isCorrect: boolean; finalScore: number } => {
  let isCorrect = true;
  let finalScore = 0;

  switch (question.type) {
    case 'fill': {
      const result = calcQuestionFillScore(question, userInputs);
      isCorrect = result.isCorrect;
      finalScore = result.finalScore;
      break;
    }

    case 'match': {
      finalScore = calcQuestionMatchScore(question, userConnections);
      const questionScore = question.score !== undefined ? question.score : 1;
      isCorrect = finalScore === questionScore;
      break;
    }

    default:
      break;
  }

  return {
    isCorrect,
    finalScore,
  };
};

/**
 * Lấy nhận xét dựa trên điểm số (thang điểm 10)
 */
export const getScoreFeedback = (score: number): ScoreFeedback => {
  // Đảm bảo điểm trong khoảng 0-10
  const normalizedScore = Math.max(0, Math.min(10, score));

  // Tìm item có score lớn nhất mà vẫn <= normalizedScore
  // Nếu score = 4.5, nó sẽ tìm item score = 4
  const sortedFeedback = [...SCORE_FEEDBACK].sort((a, b) => b.score - a.score);
  const feedback = sortedFeedback.find(f => f.score <= normalizedScore);

  return feedback || SCORE_FEEDBACK[0];
};
