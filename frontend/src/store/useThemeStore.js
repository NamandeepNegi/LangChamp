import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("LangChamp-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("LangChamp-theme", theme);
    set({ theme });
  },
}));
