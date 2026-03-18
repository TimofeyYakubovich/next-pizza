import { create } from 'zustand';

interface State {
  activeId: number;
  setActiveId: (activeId: number) => void;
}

export const useCategoryStore = create<State>()((set) => ({ // экспортируем хук создаем его create из зустанда и его сразу можно использовать в нужном компаненте
  activeId: 0,
  setActiveId: (activeId: number) => set({ activeId }),
}));