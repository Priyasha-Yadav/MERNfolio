import Modal from './Modal';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const buttonClass = variant === 'danger' ? 'btn-danger' : 'btn-primary';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
      <div className="flex gap-4 justify-end">
        <button onClick={onClose} className="btn-ghost">
          {cancelText}
        </button>
        <button onClick={handleConfirm} className={buttonClass}>
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;