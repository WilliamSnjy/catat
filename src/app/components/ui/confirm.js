"use client"

export default function Confirm({
    open,
    title = "Konfirmasi",
    message = "Apakah kamu yakin?",
    confirmText = "Ya",
    cancelText = "Batal",
    onConfirm,
    onCancel,
}) {
    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-3">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}