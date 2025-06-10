import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { SearchFormContainer } from './styles';

export function SearchForm() {
  return (
    <SearchFormContainer>
      <input type="text" placeholder="Busque por transações" />

      <button type="submit">
        <MagnifyingGlassIcon size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
