import { useState } from 'react';

/**
 * Tracks which single item (by id) is currently expanded within a list — used by both the
 * course sessions schedule and the trips list so opening a new item collapses whichever one
 * was open before, and the logic only exists in one place instead of being reimplemented
 * per list.
 */
export function useAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  return {
    isOpen: (id: string) => openId === id,
    toggle: (id: string) => setOpenId((prev) => (prev === id ? null : id)),
  };
}
