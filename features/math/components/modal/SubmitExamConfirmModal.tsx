import { COLOR, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface _Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReview: (questionIdx: number) => void;
  incompleteQuestions: number[]; // indices
  totalQuestions: number;
}

const SubmitExamConfirmModal: React.FC<_Props> = ({
  visible,
  onClose,
  onConfirm,
  onReview,
  incompleteQuestions,
  totalQuestions
}) => {
  const isComplete = incompleteQuestions.length === 0;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={[styles.iconCircle, { backgroundColor: isComplete ? '#E8F5E9' : '#FFF3E0' }]}>
              <Ionicons
                name={isComplete ? "checkmark-circle" : "warning"}
                size={40}
                color={isComplete ? "#4CAF50" : "#FF9800"}
              />
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>
              {isComplete ? "Sẵn sàng nộp bài?" : "Chưa hoàn thành!"}
            </Text>
            <Text style={styles.description}>
              {isComplete
                ? "Bạn hãy kiểm tra lại một lần nữa trước khi nộp bài nhé."
                : `Bạn còn ${incompleteQuestions.length}/${totalQuestions} câu hỏi chưa làm xong.`
              }
            </Text>

            {!isComplete && (
              <View style={styles.incompleteList}>
                <Text style={styles.listText}>
                  Các câu chưa xong: {incompleteQuestions.map(idx => `#${idx + 1}`).join(', ')}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => onReview(incompleteQuestions[0] || 0)}
            >
              <Ionicons name="eye-outline" size={20} color="white" style={{ marginRight: 8 }} />
              <Text style={styles.reviewButtonText}>Kiểm tra lại</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={isComplete ? styles.submitButtonLarge : styles.submitButtonLink}
              onPress={onConfirm}
            >
              {isComplete && <Ionicons name="send" size={20} color="white" style={{ marginRight: 8 }} />}
              <Text style={isComplete ? styles.submitButtonTextLarge : styles.submitButtonTextLink}>
                {isComplete ? "Nộp bài ngay" : "Vẫn nộp bài"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Ionicons name="close" size={24} color={COLOR.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: SPACING.xl,
    alignItems: 'center',
    ...SHADOWS.lg,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLOR.text,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  description: {
    ...TYPOGRAPHY.body,
    color: COLOR.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  incompleteList: {
    marginTop: SPACING.md,
    padding: SPACING.sm,
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
  },
  listText: {
    ...TYPOGRAPHY.caption,
    color: '#F57C00',
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    gap: SPACING.md,
  },
  reviewButton: {
    flexDirection: 'row',
    backgroundColor: COLOR.primary,
    paddingVertical: SPACING.md,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  reviewButtonText: {
    ...TYPOGRAPHY.button,
    color: 'white',
  },
  submitButtonLarge: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: SPACING.md,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  submitButtonTextLarge: {
    ...TYPOGRAPHY.button,
    color: 'white',
  },
  submitButtonLink: {
    paddingVertical: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonTextLink: {
    ...TYPOGRAPHY.body,
    color: COLOR.textSecondary,
    textDecorationLine: 'underline',
  },
  closeIcon: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
  }
});

export default SubmitExamConfirmModal;
