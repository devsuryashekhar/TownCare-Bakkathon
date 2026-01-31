import * as Dialog from "@radix-ui/react-dialog";

export default function TermsModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="w-32 py-2 shadow-sm rounded-md bg-indigo-600 text-white">
        Terms
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg px-4">
          <div className="bg-white rounded-md shadow-lg">
            <div className="p-4 border-b flex justify-between">
              <Dialog.Title className="text-lg font-medium">
                Terms & Agreements
              </Dialog.Title>
              <Dialog.Close>✕</Dialog.Close>
            </div>

            <div className="p-4 text-sm text-gray-500 space-y-3">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Nam pharetra faucibus eget facilisis pulvinar.</p>
            </div>

            <div className="p-4 border-t flex gap-3">
              <Dialog.Close asChild>
                <button className="bg-indigo-600 text-white rounded-md px-4 py-2">
                  Accept
                </button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <button className="border rounded-md px-4 py-2">
                  Cancel
                </button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}