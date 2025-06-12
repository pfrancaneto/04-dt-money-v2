import * as Dialog from '@radix-ui/react-dialog';
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles';
import { ArrowCircleDownIcon, X } from '@phosphor-icons/react';
import { ArrowCircleUpIcon } from '@phosphor-icons/react/dist/ssr';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const newTransactionsModalSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
});

type newTransactionsModalValues = z.infer<typeof newTransactionsModalSchema>;

export function NewTransactionModal() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<newTransactionsModalValues>({
    resolver: zodResolver(newTransactionsModalSchema),
    defaultValues: {
      type: 'income',
    },
  });

  async function handleCreateNewTransaction(data: newTransactionsModalValues) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(data);
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
