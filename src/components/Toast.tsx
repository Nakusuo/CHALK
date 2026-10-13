import { useEffect, useState } from "react";

type Action = { label: string; onClick: () => void };
type Item = { id: number; message: string; action?: Action };

let push: (i: Item) => void = () => {};
let seq = 0;

export function toast(message: string, action?: Action) {
  push({ id: ++seq, message, action });
}

export function Toaster() {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    push = (i) => setItems((cur) => [...cur.slice(-2), i]);
    return () => {
      push = () => {};
    };
  }, []);
  useEffect(() => {
    if (!items.length) return;
    const t = setTimeout(() => setItems((cur) => cur.slice(1)), 5000);
    return () => clearTimeout(t);
  }, [items]);
  const dismiss = (id: number) => setItems((cur) => cur.filter((x) => x.id !== id));

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4">
      {items.map((i) => {
        const { action } = i;
        return (
          <div key={i.id} role="status" className="flex items-center gap-4 rounded-xl bg-fg px-4 py-3 text-sm text-bg shadow-lift">
            {i.message}
            {action && (
              <button
                className="font-semibold text-[#C9C1FF] hover:underline dark:text-[#4B3BC4]"
                onClick={() => {
                  action.onClick();
                  dismiss(i.id);
                }}
              >
                {action.label}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
