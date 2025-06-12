import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useTransactions } from '../../../../contexts/TransactionsContext';

import { SearchFormContainer } from './styles';

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const { fetchTransactions } = useTransactions();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
  });

  const handleSearchTransactions = useCallback(
    async (data: SearchFormValues) => {
      await fetchTransactions(data.query);
    },
    []
  );

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlassIcon size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
