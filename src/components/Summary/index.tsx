import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
  CurrencyDollarIcon,
} from '@phosphor-icons/react';

import { SummaryCard, SummaryContainer } from './styles';
import { useTransactions } from '../../contexts/TransactionsContext';

export function Summary() {
  const { transactions } = useTransactions();

  const summaryTotals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }

      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  );

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUpIcon size={32} color="#00b37e" />
        </header>
        <strong>{summaryTotals.income}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDownIcon size={32} color="#f75a68" />
        </header>
        <strong>{summaryTotals.outcome}</strong>
      </SummaryCard>

      <SummaryCard $variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollarIcon size={32} color="#fff" />
        </header>
        <strong>{summaryTotals.total}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
