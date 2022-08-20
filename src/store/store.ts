import create from 'zustand';

interface IRole {
  role: string;
  setRole: (role: string) => void;
}

export const useRoleStore = create<IRole>((set) => ({
  role: 'issuer',
  setRole: (role) =>
    set((state) => ({
      ...state,
      role
    }))
}));
