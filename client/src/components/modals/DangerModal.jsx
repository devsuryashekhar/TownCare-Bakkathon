import * as Dialog from "@radix-ui/react-dialog";

export default function DangerModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="w-32 py-2 shadow-sm rounded-md bg-red-600 text-white flex items-center justify-center">
        Danger
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg px-4">
          <div className="bg-white rounded-md shadow-lg px-4 py-6 sm:flex gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div>
              <Dialog.Title className="text-lg font-medium">
                An error occurred!
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-500 mt-2">
                Something went wrong. Please try again.
              </Dialog.Description>

              <div className="flex gap-2 mt-4">
                <Dialog.Close asChild>
                  <button className="bg-red-600 text-white rounded-md py-2 px-4">
                    Delete
                  </button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <button className="border rounded-md py-2 px-4">
                    Cancel
                  </button>
                </Dialog.Close>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}