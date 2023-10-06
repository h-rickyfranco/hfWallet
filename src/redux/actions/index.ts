import { Dispatch, Expense } from '../../types';

export const ADD_USER = 'ADD_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_MODE = 'EDIT_MODE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILED = 'REQUEST_FAILED';

// Coloque aqui suas actions
export const addUserAction = (loginInfo: string) => {
  return {
    type: ADD_USER,
    payload: loginInfo,
  };
};

export const addExpenseAction = (expense: Expense) => {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
};

export const editExpenseAction = (
  expenseId: number,
  expense: Omit<Expense, 'id' | 'exchangeRates'>,
) => {
  return {
    type: EDIT_EXPENSE,
    payload: {
      id: expenseId,
      expense,
    },
  };
};

export const removeExpenseAction = (id: number) => {
  return {
    type: REMOVE_EXPENSE,
    payload: id,
  };
};

export const changeToEditMode = (expenseId: number) => {
  return {
    type: EDIT_MODE,
    payload: expenseId,
  };
};

const requestStart = () => {
  return { type: REQUEST_START };
};

const requestSuccess = (currencies: string[]) => {
  return {
    type: REQUEST_SUCCESS,
    payload: currencies,
  };
};

const requestFailed = (error: string) => {
  return {
    type: REQUEST_FAILED,
    payload: error,
  };
};

export const fetchCurrencies = () => {
  return async (dispatch: Dispatch) => {
    dispatch(requestStart());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const currencies = Object.keys(data).filter((curr) => curr !== 'USDT');
      dispatch(requestSuccess(currencies));
    } catch (error: any) {
      dispatch(requestFailed(error.message));
    }
  };
};
