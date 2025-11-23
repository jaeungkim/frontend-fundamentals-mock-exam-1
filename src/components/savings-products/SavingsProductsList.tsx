import { SavingsProduct } from 'types/savings-products';
import SavingsProductsListItem from './SavingsProductsListItem';

interface SavingsProductsListProps {
  filteredProducts: SavingsProduct[];
}

export default function SavingsProductsList({ filteredProducts }: SavingsProductsListProps) {
  return filteredProducts.map(savingsProduct => (
    <SavingsProductsListItem key={savingsProduct.id} savingsProduct={savingsProduct} />
  ));
}
