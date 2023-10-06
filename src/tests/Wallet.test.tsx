import { vi } from 'vitest';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { Expense } from '../types';
import { apiReturn } from '../helper/apiReturn';

const initialState = {
  user: {
    email: 'teste@test.com',
  },
  wallet: {
    isFetching: false,
    currencies: Object.keys(apiReturn),
    expenses: [] as Expense[],
    errorMessage: '',
    isEditing: false,
    editedId: null,
  },
};

describe('Tests related to the wallet screen', () => {
  it('tests if header shows stuff correctly', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const emailField = screen.getByTestId('email-field');
    const totalField = screen.getByTestId('total-field');
    const headerCurrencyField = screen.getByTestId('header-currency-field');

    expect(emailField).toHaveTextContent(initialState.user.email);
    expect(totalField).toHaveTextContent('0.00');
    expect(headerCurrencyField).toHaveTextContent('BRL');
  });

  it('tests if form works correctly', async () => {
    const MOCK_RESPONSE = { json: async () => apiReturn } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    await act(async () => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    });

    const descriptionInput = 'Comprei uma bike';

    const totalField = screen.getByTestId('total-field');
    const valueField = screen.getByTestId('value-input');
    const descriptionField = screen.getByTestId('description-input');
    const currencyField = await screen.findByTestId('currency-input');
    const methodField = screen.getByTestId('method-input');
    const tagField = screen.getByTestId('tag-input');
    const addButton = screen.getByRole('button', { name: /Adicionar/i });

    expect(valueField).toHaveTextContent('');
    expect(descriptionField).toHaveTextContent('');
    expect(currencyField).toHaveTextContent('USD');
    expect(methodField).toHaveTextContent('Dinheiro');
    expect(tagField).toHaveTextContent('Lazer');

    await userEvent.type(valueField, '100');
    await userEvent.type(descriptionField, descriptionInput);
    await userEvent.selectOptions(currencyField, 'CAD');
    await userEvent.selectOptions(methodField, 'Cartão de crédito');
    await userEvent.selectOptions(tagField, 'Lazer');
    await userEvent.click(addButton);

    expect(valueField).toHaveTextContent('');
    expect(descriptionField).toHaveTextContent('');

    expect(screen.getByText(descriptionInput)).toBeInTheDocument();
    expect(totalField).toHaveTextContent('366.03');

    await userEvent.type(valueField, '50');
    await userEvent.type(descriptionField, 'Comprei um picolé');
    await userEvent.selectOptions(currencyField, 'USD');
    await userEvent.selectOptions(methodField, 'Cartão de crédito');
    await userEvent.selectOptions(tagField, 'Lazer');
    await userEvent.click(addButton);

    expect(valueField).toHaveTextContent('');
    expect(descriptionField).toHaveTextContent('');

    expect(screen.getByText('Comprei um picolé')).toBeInTheDocument();
    expect(totalField).toHaveTextContent('612.89');

    const editButton = screen.getAllByTestId('edit-btn');
    await userEvent.click(editButton[0]);

    const editExpenseButton = screen.getByRole('button', { name: /Editar despesa/i });

    expect(valueField).toHaveValue(100);
    expect(descriptionField).toHaveValue(descriptionInput);
    userEvent.click(editExpenseButton);

    const deleteButton = screen.getAllByTestId('delete-btn');

    await userEvent.click(deleteButton[0]);

    expect(totalField).toHaveTextContent('246.86');
  });
});
