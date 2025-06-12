import { SearchForm } from './components/SearchForm';

import { Header } from '../../components/Header';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { Summary } from '../../components/Summary';
import { useTransactions } from '../../contexts/TransactionsContext';

import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles';

export function Transactions() {
  const { transactions } = useTransactions();

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="40%">{transaction.description}</td>
                  <td>
                    <PriceHighLight $variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
