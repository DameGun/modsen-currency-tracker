import CurrencyCardList from '@/components/containers/CurrencyCardList';

export default function HomePage() {
  return (
    <>
      <CurrencyCardList label='Quotes' />
      <CurrencyCardList label='Another' />
    </>
  );
}
