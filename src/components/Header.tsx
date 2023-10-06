import { useSelector } from 'react-redux';
import { GlobalState } from '../types';
import Logo from './Logo';
import coinsIcon from '../images/coins.svg';
import userIcon from '../images/userIcon.svg';

function Header() {
  // Obter o estado do usuário e da carteira usando o hook useSelector
  const { user, wallet } = useSelector((state: GlobalState) => state);

  // Função para calcular o total de despesas
  const getExpenseTotal = () => {
    return wallet.expenses.reduce((acc, expense) => {
      const { currency, exchangeRates } = expense;
      const ask = Number(exchangeRates[currency].ask);
      return acc + (Number(ask) * Number(expense.value));
    }, 0).toFixed(2);
  };

  return (
    <header className="flex justify-between items-center px-1 py-1">
      {/* Componente de logotipo */}
      <div className="scale-50 px-10">
        <Logo />
      </div>
      {/* Exibir o total de despesas e a moeda */}
      <div className="flex -translate-x-1/4 text-2xl gap-2 text-blue-700">
        <img src={ coinsIcon } alt="stacked coins icon" className="px-2" />
        <p className="font-semibold">
          {'Total de despesas: '}
        </p>
        <p data-testid="total-field">
          {getExpenseTotal()}
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
      {/* Exibir ícone de usuário e o email do usuário */}
      <div className="flex text-xl">
        <img src={ userIcon } alt="user icon" />
        <div className="flex flex-col">
          <p data-testid="email-field">
            {user.email}
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
