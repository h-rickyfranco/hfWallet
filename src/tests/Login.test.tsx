import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const emailInputTestId = 'email-input';
const passwordInputTestId = 'password-input';

describe('Tests related to the login screen', () => {
  it('Tests if input fields are present in the login screen', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('Tests if button remais disabled if fields are not valid', async () => {
    renderWithRouterAndRedux(<App />);
    const user = userEvent.setup();
    const validEmail = 'rick@rick.com';
    const validPassword = '1234567';
    const notValidEmail = 'rickrick.com';
    const notValidPassword = '1234';

    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    const loginButton = screen.getByRole('button');

    await user.type(emailInput, notValidEmail);
    await user.type(passwordInput, notValidPassword);
    expect(loginButton).toBeDisabled();

    await user.clear(emailInput);
    await user.clear(passwordInput);

    await user.type(emailInput, notValidEmail);
    await user.type(passwordInput, validPassword);
    expect(loginButton).toBeDisabled();

    await user.clear(emailInput);
    await user.clear(passwordInput);

    await user.type(emailInput, validEmail);
    await user.type(passwordInput, notValidPassword);
    expect(loginButton).toBeDisabled();

    await user.clear(emailInput);
    await user.clear(passwordInput);

    await user.type(emailInput, validEmail);
    await user.type(passwordInput, validPassword);
    expect(loginButton).toBeEnabled();
  });

  it('Checks if button redirects to carteira if all good', async () => {
    renderWithRouterAndRedux(<App />);
    const user = userEvent.setup();

    const validEmail = 'rick@rick.com';
    const validPassword = '1234567';

    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    const loginButton = screen.getByRole('button');

    await user.type(emailInput, validEmail);
    await user.type(passwordInput, validPassword);
    expect(loginButton).toBeEnabled();

    await user.click(loginButton);
    waitFor(() => expect(global.window.location.pathname).toEqual('/carteira'));
  });
});
