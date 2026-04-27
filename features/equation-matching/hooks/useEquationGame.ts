import { useState, useCallback, useMemo } from 'react';
import { EquationQuestion, Connection, EquationItemData } from '../types/equation.types';

export function evaluateExpression(expr: string): number {
  const cleanExpr = expr.replace(/\s+/g, '');
  const match = cleanExpr.match(/^(\d+)([\+\-\*\/×÷])(\d+)$/);
  if (!match) return NaN;
  const num1 = parseInt(match[1]);
  const op = match[2];
  const num2 = parseInt(match[3]);
  switch (op) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case '*':
    case '×': return num1 * num2;
    case '/':
    case '÷': return num2 !== 0 ? num1 / num2 : NaN;
    default: return NaN;
  }
}

export function useEquationGame(questions: EquationQuestion[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [connections, setConnections] = useState<Record<string, Connection[]>>({}); // Key là question ID
  const [isChecked, setIsChecked] = useState<Record<string, boolean>>({});

  const currentQuestion = questions[currentIndex];
  const currentConns = connections[currentQuestion.id] || [];
  const currentChecked = isChecked[currentQuestion.id] || false;

  const addConnection = useCallback((fromItem: EquationItemData, toItem: EquationItemData) => {
    // Luôn lưu fromId là bên trái, toId là bên phải để thống nhất
    const leftItem = fromItem.side === 'left' ? fromItem : toItem;
    const rightItem = fromItem.side === 'right' ? fromItem : toItem;

    if (leftItem.side === rightItem.side) return; // Không nối cùng bên

    const leftVal = evaluateExpression(leftItem.expression);
    const rightVal = evaluateExpression(rightItem.expression);
    const isCorrect = leftVal === rightVal;

    setConnections(prev => {
      const qConns = prev[currentQuestion.id] || [];
      // Xóa kết nối cũ của các item này (1-1 mapping)
      const filtered = qConns.filter(c => c.fromId !== leftItem.id && c.toId !== rightItem.id);
      return {
        ...prev,
        [currentQuestion.id]: [...filtered, { fromId: leftItem.id, toId: rightItem.id, isCorrect }]
      };
    });
    
    // Nếu đã check rồi mà nối lại thì reset trạng thái check của câu đó? 
    // Hoặc giữ nguyên. Ở đây ta chọn reset check nếu có thay đổi.
    setIsChecked(prev => ({ ...prev, [currentQuestion.id]: false }));
  }, [currentQuestion.id]);

  const removeConnection = useCallback((itemId: string) => {
    setConnections(prev => {
      const qConns = prev[currentQuestion.id] || [];
      const filtered = qConns.filter(c => c.fromId !== itemId && c.toId !== itemId);
      return { ...prev, [currentQuestion.id]: filtered };
    });
    setIsChecked(prev => ({ ...prev, [currentQuestion.id]: false }));
  }, [currentQuestion.id]);

  const resetCurrent = useCallback(() => {
    setConnections(prev => ({ ...prev, [currentQuestion.id]: [] }));
    setIsChecked(prev => ({ ...prev, [currentQuestion.id]: false }));
  }, [currentQuestion.id]);

  const checkResult = useCallback(() => {
    setIsChecked(prev => ({ ...prev, [currentQuestion.id]: true }));
  }, [currentQuestion.id]);

  const results = useMemo(() => {
    const conns = connections[currentQuestion.id] || [];
    const correctCount = conns.filter(c => c.isCorrect).length;
    const totalPairs = currentQuestion.leftItems.length;
    return { correctCount, totalPairs, totalConns: conns.length };
  }, [connections, currentQuestion]);

  return {
    currentIndex,
    setCurrentIndex,
    currentQuestion,
    currentConns,
    currentChecked,
    addConnection,
    removeConnection,
    resetCurrent,
    checkResult,
    results
  };
}
