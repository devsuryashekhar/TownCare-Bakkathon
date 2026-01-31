// components/modals/SuccessModal.jsx
import * as Dialog from "@radix-ui/react-dialog";

export default function SuccessModal({
  open,
  onClose,
  title,
  description,
  primaryText,
  secondaryText,
  onPrimary,
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content className="fixed top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">

          <div className="bg-white rounded-xl p-6 shadow-xl">
            <div className="w-12 h-12 mx-auto rounded-full bg-green-100 
              flex items-center justify-center">
              ✅
            </div>

            <Dialog.Title className="text-lg font-semibold text-center mt-3">
              {title}
            </Dialog.Title>

            <Dialog.Description className="text-sm text-center text-gray-500 mt-2">
              {description}
            </Dialog.Description>

            <div className="flex gap-2 mt-6">
              <button
                onClick={onPrimary}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-md"
              >
                {primaryText}
              </button>

              <button
                onClick={onClose}
                className="flex-1 border rounded-md py-2"
              >
                {secondaryText}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}