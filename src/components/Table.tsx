import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../types';
import { changeToEditMode, removeExpenseAction } from '../redux/actions';
import editIcon from '../images/editIcon.svg';
import deleteIcon from '../images/deleteIcon.svg';

function Table() {
  // Obtém a lista de despesas do estado global usando o useSelector
  const { expenses } = useSelector((state: GlobalState) => state.wallet);

  // Obtém a função de despacho (dispatch) para disparar ações do Redux
  const dispatch = useDispatch();

  return (
    <div
      className="w-11/12 pb-14 bg-blue-700
    text-white flex flex-col rounded-xl pt-[320px] -translate-y-[309px]"
    >
      <table className="w-11/12 border-separate border-spacing-y-4 m-auto">
        <thead className="h-8">
          <tr className="text-center">
            <th className="w-24 py-2 border-r-2 border-slate-300">Descrição</th>
            <th className="w-24 border-r-2 border-slate-300">Tag</th>
            <th className="w-24 border-r-2 break-words border-slate-300">
              Método de pagamento
            </th>
            <th className="w-24 border-r-2 border-slate-300">Valor</th>
            <th className="w-24 border-r-2 border-slate-300">Moeda</th>
            <th className="w-24 border-r-2 border-slate-300">Câmbio utilizado</th>
            <th className="w-20 border-r-2 break-words border-slate-300">
              Valor convertido
            </th>
            <th className="w-24 border-r-2 break-words border-slate-300">
              Moeda de conversão
            </th>
            <th className="w-24">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id } className="text-center border-t-2">
              <td className="border-t-2 py-8">{expense.description}</td>
              <td className="border-t-2">{expense.tag}</td>
              <td className="border-t-2">{expense.method}</td>
              <td className="border-t-2">{Number(expense.value).toFixed(2)}</td>
              <td className="border-t-2">
                {expense.exchangeRates[expense.currency].name}
              </td>
              <td className="border-t-2">
                {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td className="border-t-2">
                {(Number(expense.exchangeRates[expense.currency].ask)
                  * Number(expense.value)).toFixed(2)}
              </td>
              <td className="border-t-2">Real</td>
              <td className="border-t-2">
                {/* Botão de edição */}
                <button
                  data-testid="edit-btn"
                  onClick={ () => dispatch(changeToEditMode(expense.id)) }
                  className="mr-4"
                >
                  <img src={ editIcon } alt="icone de edicão" className="w-6" />
                </button>
                {/* Botão de exclusão */}
                <button
                  data-testid="delete-btn"
                  onClick={ () => dispatch(removeExpenseAction(expense.id)) }
                >
                  <img src={ deleteIcon } alt="icone de deletar" className="w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
