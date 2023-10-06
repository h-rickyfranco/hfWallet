import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Rates, RatesOption } from './helper/apiReturn';

export type LoginType = {
  email: string;
  password: string;
};

export type Form = {
  value: string;
  description: string;
  currency: RatesOption;
  method: string;
  tag: string;
};

export type Expense = {
  id: number;
  value: string;
  description: string;
  currency: RatesOption;
  method: string;
  tag: string;
  exchangeRates: Rates;
};

export type GlobalState = {
  user: {
    email: string;
  },
  wallet: {
    currencies: string[];
    expenses: Expense[];
    isFetching: boolean;
    errorMessage: string;
    isEditing: boolean;
    editedId: number;
  }
};

export type Dispatch = ThunkDispatch<GlobalState, null, AnyAction>;
