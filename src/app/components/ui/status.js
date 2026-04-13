"use client";

export default function Status({
  open,
  status = "loading",
  message,
}) {
  if (!open) return null;

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[350px] text-center">
        {isLoading && (
          <>
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h2 className="text-lg font-bold mt-4">Loading...</h2>
          </>
        )}

        {isSuccess && (
          <>
            <div className="text-5xl">✅</div>
            <h2 className="text-lg font-bold text-green-600 mt-3">
              Success
            </h2>
          </>
        )}

        {isError && (
          <>
            <div className="text-5xl">❌</div>
            <h2 className="text-lg font-bold text-red-600 mt-3">
              Error
            </h2>
          </>
        )}

        <p className="text-gray-600 mt-2">{message}</p>
      </div>
    </div>
  );
}