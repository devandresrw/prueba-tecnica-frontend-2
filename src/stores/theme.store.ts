import { create } from 'zustand';

interface ThemeState {
    theme: boolean; // true para dark mode, false para light mode
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: false, // Estado inicial (light mode)
    toggleTheme: () => set((state) => ({ theme: !state.theme })),
}));