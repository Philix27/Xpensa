import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type ISlice = {
  isSidebarOpen: boolean
  setIsSidebarOpen: (val: boolean) => void
}

export const useSettingsStore = create<ISlice>((set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (val) => set((state) => ({ isSidebarOpen: val })),
}))
