import Modal from './Modal'
import Button from './Button'
import Icon from './Icon'

const variantStyles = {
  danger: {
    iconBg: 'bg-error/10',
    iconColor: 'text-error',
    defaultIcon: 'delete',
  },
  warning: {
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
    defaultIcon: 'warning',
  },
  primary: {
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    defaultIcon: 'help',
  },
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Emin misiniz?',
  message = 'Bu işlem geri alınamaz.',
  confirmLabel = 'Sil',
  cancelLabel = 'İptal',
  variant = 'danger',
  iconName,
}) {
  const style = variantStyles[variant] || variantStyles.danger
  const displayIcon = iconName || style.defaultIcon

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center pt-2 pb-2">
        <div
          className={`w-16 h-16 rounded-full ${style.iconBg} flex items-center justify-center mb-5`}
        >
          <Icon name={displayIcon} size="text-3xl" className={style.iconColor} fill />
        </div>
        <h3 className="text-lg font-bold text-text mb-2">{title}</h3>
        <p className="text-text-secondary text-sm mb-8 max-w-xs leading-relaxed">
          {message}
        </p>
        <div className="flex gap-3 w-full">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'warning' ? 'primary' : 'danger'}
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="flex-1"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
