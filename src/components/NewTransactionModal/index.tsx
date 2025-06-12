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
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const newTransactionsModalSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  // type: z.enum(['income', 'outcome']),
});

type newTransactionsModalValues = z.infer<typeof newTransactionsModalSchema>;

export function NewTransactionModal() {
  const { register, handleSubmit } = useForm<newTransactionsModalValues>({
    resolver: zodResolver(newTransactionsModalSchema),
  });

  function handleCreateNewTransaction(data: newTransactionsModalValues) {
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

          <TransactionType>
            <TransactionTypeButton $variant="income" value="income">
              <ArrowCircleUpIcon size={24} />
              Entrada
            </TransactionTypeButton>

            <TransactionTypeButton $variant="outcome" value="outcome">
              <ArrowCircleDownIcon size={24} />
              Saída
            </TransactionTypeButton>
          </TransactionType>

          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
