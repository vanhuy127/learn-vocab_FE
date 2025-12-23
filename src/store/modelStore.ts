import { create } from 'zustand';

import { MODAL_TYPE } from '@/constants';

type ModalData = Record<string, any> | null;

interface ModalState {
  isOpen: boolean;
  type: MODAL_TYPE | null;
  data: ModalData;

  openModal: (type: MODAL_TYPE, data?: ModalData) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  data: null,

  openModal: (type, data = null) =>
    set({
      isOpen: true,
      type,
      data,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      type: null,
      data: null,
    }),
}));
