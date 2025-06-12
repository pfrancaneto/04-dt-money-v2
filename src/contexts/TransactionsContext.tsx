import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { api } from '../lib/axios';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  updateTransactions: (transaction: Transaction[]) => void;
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    });

    setTransactions(response.data);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const updateTransactions = useCallback((transaction: Transaction[]) => {
    setTransactions(transaction);
  }, []);

  const values = {
    transactions,
    fetchTransactions,
    updateTransactions,
  };

  return (
    <TransactionsContext.Provider value={values}>
      {children}
    </TransactionsContext.Provider>
  );
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      'useTransactions deve ser usado dentro de um TransactionsProvider',
    );
  }

  return context;
};
