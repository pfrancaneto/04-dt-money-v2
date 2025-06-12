import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
  CurrencyDollarIcon,
} from '@phosphor-icons/react';

import { priceFormatter } from '../../utils/formatter';
import { useSummary } from '../../hooks/useSummary';

import { SummaryCard, SummaryContainer } from './styles';

export function Summary() {
  const summaryTotals = useSummary();

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUpIcon size={32} color="#00b37e" />
        </header>
        <strong>{priceFormatter.format(summaryTotals.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDownIcon size={32} color="#f75a68" />
        </header>
        <strong>{priceFormatter.format(summaryTotals.outcome)}</strong>
      </SummaryCard>

      <SummaryCard $variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollarIcon size={32} color="#fff" />
        </header>
        <strong>{priceFormatter.format(summaryTotals.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
