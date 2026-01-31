import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

const URLLink = "https://example.lorem/shortlink";

export default function ShareLinkModal() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(URLLink);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 3000);
  }, [copied]);

  return (
    <Dialog.Root>
      <Dialog.Trigger className="w-32 py-2 shadow-sm rounded-md bg-indigo-600 text-white">
        Share
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg px-4">
          <div className="bg-white rounded-md shadow-lg px-4 py-6">
            <Dialog.Title className="text-lg font-medium">
              Shareable link
            </Dialog.Title>

            <div className="flex items-center justify-between border rounded-md p-2 mt-4">
              <p className="text-sm text-gray-600 truncate">{URLLink}</p>
              <button onClick={copy} className="text-indigo-600 text-sm">
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <Dialog.Close asChild>
              <button className="mt-4 bg-indigo-600 text-white rounded-md px-4 py-2">
                Done
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}