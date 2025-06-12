import * as Dialog from "@radix-ui/react-dialog";
import logoDtMoney from "../../assets/dt_money_logo.svg";

import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import { NewTransactionModal } from "../NewTransactionModal";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoDtMoney} alt="" />

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal onFecharModal={setOpen} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
