import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTransactions } from "../context/TransactionsContext";
import useUnlinkAccount from "../features/bank/useUnlinkAccount";
import useOutsideClick from "../utils/useOutsideClick";

export function ManageAccountsModal({ isOpen, onClose, connectBank }) {
  const { user, token } = useAuth();
  const modalRef = useOutsideClick(onClose);
  const { setSelectedAccountId } = useTransactions();
  const { unLink, isPending } = useUnlinkAccount();

  const [deletingId, setDeletingId] = useState(null);

  if (!isOpen) return null;

  const handleUnlink = (e, accId) => {
    e.stopPropagation(); //
    setDeletingId(accId);

    unLink(
      { accountId: accId, token },
      {
        onSettled: () => setDeletingId(null),
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="flex max-h-[85vh] w-full max-w-md flex-col rounded-2xl border border-neutral-800 bg-[#1a1a1a] p-6 text-white shadow-xl"
      >
        <div className="mb-4 flex flex-shrink-0 items-center justify-between">
          <h3 className="text-lg font-semibold">Manage Bank Accounts</h3>
          <button
            onClick={onClose}
            className="text-neutral-400 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mb-6 flex-grow space-y-3 overflow-y-auto pr-1">
          {!user?.monoAccountId || user.monoAccountId.length === 0 ? (
            <p className="py-6 text-center text-sm text-neutral-400">
              No connected bank accounts.
            </p>
          ) : (
            user.monoAccountId.map((accId, index) => {
              const isThisDeleting = isPending && deletingId === accId;

              return (
                <div
                  key={accId}
                  onClick={() => {
                    if (isPending) return;
                    setSelectedAccountId(accId);
                    onClose();
                  }}
                  className={`flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 p-3 transition ${
                    isPending
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer hover:border-orange-500/50 hover:bg-neutral-800/50"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium">
                      Bank Account {index + 1}
                    </p>
                    <p className="font-mono text-xs text-neutral-400">
                      ID: {accId.slice(-6)}...
                    </p>
                  </div>
                  <button
                    disabled={isPending}
                    className={`text-xs transition ${
                      isPending
                        ? "cursor-not-allowed text-neutral-500"
                        : "text-red-400 hover:underline"
                    }`}
                    onClick={(e) => handleUnlink(e, accId)}
                  >
                    {isThisDeleting ? "Unlinking..." : "Unlink"}
                  </button>
                </div>
              );
            })
          )}
        </div>

        <button
          className="w-full flex-shrink-0 rounded-xl bg-orange-500 py-2.5 text-sm font-medium transition hover:bg-orange-600 disabled:opacity-50"
          disabled={isPending}
          onClick={() => {
            connectBank();
            onClose();
          }}
        >
          + Link Another Bank
        </button>
      </div>
    </div>
  );
}
