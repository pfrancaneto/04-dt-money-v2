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

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <Dialog.Description />
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="">
          <input type="text" placeholder="Descrição" />
          <input type="number" placeholder="Preço" />
          <input type="text" placeholder="Categoria" />

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
