import { SavingsProduct } from 'types/savings-products';
import { create } from 'zustand';

interface SelectedProductState {
  selectedProduct: SavingsProduct | null;
  setSelectedProduct: (product: SavingsProduct | null) => void;
}

export const useSelectedProductStore = create<SelectedProductState>(set => ({
  selectedProduct: null,
  setSelectedProduct: product => set({ selectedProduct: product }),
}));
