import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { create } from "zustand";

type Store = {
  range: DateRange;
  setRange: SelectRangeEventHandler;
  resetRange: () => void;
};

export const useStore = create<Store>((set) => ({
  range: { from: undefined, to: undefined },
  setRange(range) {
    if (range?.from || range?.to) {
      set({ range });
    }
  },
  resetRange() {
    set({ range: { from: undefined, to: undefined } });
  },
}));
