import { COLOR, SHADOWS, SIZE, SPACING } from '@/constants/theme';
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
            <View style={[styles.iconCircle, { backgroundColor: isComplete ? COLOR.bgSuccess : COLOR.bgWarning }]}>
              <Ionicons
                name={isComplete ? "checkmark-circle" : "warning"}
                size={40}
                color={isComplete ? COLOR.success : COLOR.warning}
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
                : `Bạn còn ${incompleteQuestions.length}/${totalQuestions} câu hỏi chưa làm xong`
              }
            </Text>

            {!isComplete && (
              <View style={styles.incompleteList}>
                <Text style={styles.listText}>
                  {"Các câu chưa xong\n"}{incompleteQuestions.map(idx => `#${idx + 1}`).join(', ')}
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
    backgroundColor: COLOR.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: COLOR.white,
    borderRadius: 24,
    padding: SPACING.md,
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
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: SIZE.xl,
    fontWeight: 'bold',
    color: COLOR.text,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  description: {
    color: COLOR.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    fontSize: SIZE.md,
    fontStyle: 'italic',
  },
  incompleteList: {
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLOR.bgWarning,
    borderRadius: 10,
    width: '100%',
  },
  listText: {
    fontSize: SIZE.md,
    color: COLOR.error,
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    gap: SPACING.md,
  },
  reviewButton: {
    flexDirection: 'row',
    backgroundColor: COLOR.primary,
    paddingVertical: SPACING.md,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: SIZE.md,
    ...SHADOWS.md,
  },
  reviewButtonText: {
    fontSize: SIZE.md,
    fontWeight: 'bold',
    color: COLOR.white,
  },
  submitButtonLarge: {
    flexDirection: 'row',
    backgroundColor: COLOR.success,
    paddingVertical: SPACING.md,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  submitButtonTextLarge: {
    fontSize: SIZE.md,
    fontWeight: 'bold',
    color: COLOR.white,
  },
  submitButtonLink: {
    paddingVertical: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonTextLink: {
    color: COLOR.textSecondary,
    textDecorationLine: 'underline',
    fontSize: SIZE.md,
    paddingBottom: SPACING.sm
  },
  closeIcon: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
  }
});

export default SubmitExamConfirmModal;
