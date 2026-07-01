"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CheckCircle, XCircle, X } from "lucide-react";

export default function AdminToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const message = searchParams.get("toast");
  const type = searchParams.get("toast_type") ?? "success";

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const timer = setTimeout(() => dismiss(), 4000);
    return () => clearTimeout(timer);
  }, [message]);

  const dismiss = () => {
    setVisible(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("toast");
    params.delete("toast_type");
    const qs = params.toString();
    router.replace(pathname + (qs ? `?${qs}` : ""), { scroll: false });
  };

  if (!message || !visible) return null;

  const isSuccess = type === "success";

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 px-5 py-4 rounded-xl shadow-xl border max-w-sm animate-in slide-in-from-bottom-4 duration-300 ${
      isSuccess
        ? "bg-green-50 border-green-200 text-green-800"
        : "bg-red-50 border-red-200 text-red-800"
    }`}>
      {isSuccess
        ? <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
        : <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
      }
      <p className="text-sm font-medium flex-1">{decodeURIComponent(message)}</p>
      <button onClick={dismiss} className="text-current opacity-50 hover:opacity-100">
        <X size={15} />
      </button>
    </div>
  );
}
