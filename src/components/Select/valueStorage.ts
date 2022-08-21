import create from 'zustand';

export interface IValueStorage {
  value: number,
  setValue: (value: number) => void
}

export const useValueStorage = create<IValueStorage>(
  (set) => ({
    // initial state
    value: 0,
    // methods for manipulating state
    setValue: (value: number) => {
      set((state) => ({
        value: state.value = value
      }));
    }
  })
);
