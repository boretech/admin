import { ElMessageBox, ElMessage, ElNotification } from 'element-plus'

import { useI18n } from './useI18n.js'

const createConfirm = (options) => {
  const icon = options.icon || 'warning'
  Reflect.deleteProperty(options, 'icon')
  const opt = {
    ...options,
    icon,
    center: true,
  }
  return ElMessageBox.confirm(opt)
}

const getBaseOptions = () => {
  const { t } = useI18n()
  return {
    "confirm-button-text": t('common.okText'),
    center: true,
  }
}


const createModalOptions = (options, icon) => {
  return {
    ...getBaseOptions(),
    ...options,
    icon,
  }
}

const createSuccessModal = (options) => ElMessageBox.success(createModalOptions(options, 'success'))

const createErrorModal = (options) => ElMessageBox.error(createModalOptions(options, 'error'))

const createWarningModal = (options) => ElMessageBox.warning(createModalOptions(options, 'warning'))

const createInfoModal = (options) => ElMessageBox.info(createModalOptions(options, 'info'))

export const useMessage = () => ({
  createMessage: ElMessage,
  notification: ElNotification,
  createConfirm,
  createSuccessModal,
  createErrorModal,
  createWarningModal,
  createInfoModal,
})