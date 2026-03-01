"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ children, raw, ...props }: any) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    // If raw code string is passed via rehype plugin, use it. Otherwise fallback to textContent.
    const text = raw || children?.props?.children?.toString() || "";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden my-6 border border-white/10 bg-black/50">
      <button
        onClick={onCopy}
        className="absolute right-3 top-3 p-2 rounded-md bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 text-white/70 hover:text-white"
        aria-label="Copy code"
      >
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
      <pre {...props} className="p-4 overflow-x-auto text-sm leading-relaxed hide-scrollbar">
        {children}
      </pre>
    </div>
  );
}