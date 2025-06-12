import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
  X,
} from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';

import { api } from '../../lib/axios';
import { useTransactions } from '../../contexts/TransactionsContext';

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles';

const newTransactionsModalSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
});

type newTransactionsModalValues = z.infer<typeof newTransactionsModalSchema>;

type NewTransactionModalProps = {
  onFecharModal: (value: boolean) => void;
};

export function NewTransactionModal({
  onFecharModal,
}: NewTransactionModalProps) {
  const { updateTransactions, transactions } = useTransactions();
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<newTransactionsModalValues>({
    resolver: zodResolver(newTransactionsModalSchema),
    defaultValues: {
      type: 'income',
    },
  });

  async function handleCreateNewTransaction(data: newTransactionsModalValues) {
    const { category, description, price, type } = data;

    const response = await api.post('transactions', {
      category,
      description,
      price,
      type,
      createdAt: new Date(),
    });

    reset();
    updateTransactions([...transactions, response.data]);
    onFecharModal(false);
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <Dialog.Description />
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton $variant="income" value="income">
                    <ArrowCircleUpIcon size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton $variant="outcome" value="outcome">
                    <ArrowCircleDownIcon size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
