import { AnyAction } from 'redux';
import { Expense } from '../../types';
import {
  ADD_EXPENSE,
  EDIT_EXPENSE,
  EDIT_MODE,
  REMOVE_EXPENSE,
  REQUEST_FAILED, REQUEST_START, REQUEST_SUCCESS,
} from '../actions';

const walletState = {
  isFetching: false,
  currencies: [''],
  expenses: [] as Expense[],
  errorMessage: '',
  isEditing: false,
  editedId: null,
};

const editExpense = (state: typeof walletState, action: AnyAction) => {
  return {
    ...state,
    isEditing: false,
    editedId: null,
    expenses: state.expenses.map((expense) => {
      if (expense.id === action.payload.id) {
        return {
          ...expense,
          ...action.payload.expense,
        };
      }
      return expense;
    }),
  };
};

const walletReducer = (state = walletState, action: AnyAction) => {
  switch (action.type) {
    case REQUEST_START:
      return {
        ...state,
        isFetching: true,
        currencies: [''],
        errorMessage: '',
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currencies: action.payload,
        errorMessage: '',
      };
    case REQUEST_FAILED:
      return {
        ...state,
        isFetching: false,
        currencies: [''],
        errorMessage: action.payload,
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [
          ...state.expenses,
          action.payload,
        ],
      };
    case REMOVE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };
    case EDIT_EXPENSE:
      return editExpense(state, action);
    case EDIT_MODE:
      return {
        ...state,
        isEditing: true,
        editedId: action.payload,
      };
    default:
      return state;
  }
};

export default walletReducer;
