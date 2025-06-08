import logoDtMoney from '../../assets/dt_money_logo.svg';

import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoDtMoney} alt="" />

        <NewTransactionButton>Nova transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  );
}
