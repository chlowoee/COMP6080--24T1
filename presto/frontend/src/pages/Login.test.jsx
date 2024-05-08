import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import { loginApi } from '../Api';
import React from 'react'

jest.mock('../Api');

describe('Login', () => {
  const email = 'testing@email.com';
  const password = 'pwyay';
  const token = 'null';
  const setTokenFunction = jest.fn();

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login token={token} setTokenFunction={setTokenFunction} />} />
        </Routes>
      </BrowserRouter>
    );
  });

  it('renders login form', () => {
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    // check email input exists an is empty
    const emailInput = screen.getByLabelText(/email-input/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue('');

    // check pw input exists an is empty
    const pwInput = screen.getByLabelText(/email-input/i);
    expect(pwInput).toBeInTheDocument();
    expect(pwInput).toHaveValue('');

    // expect there to be a submission button
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('typing in the form updates the values of email and pw', () => {
    const emailInput = screen.getByLabelText(/email-input/i);
    const pwInput = screen.getByLabelText(/email-input/i);
    // Simulate typing in email input
    fireEvent.change(emailInput, { target: { value: email } });
    // Check if email input value is updated
    expect(emailInput).toHaveValue(email);

    // Simulate typing in pw input
    fireEvent.change(pwInput, { target: { value: password } });
    // Check if pw input value is updated
    expect(pwInput).toHaveValue(password);
  });

  it('submits email and password to loginApi function', async () => {
    const emailInput = screen.getByLabelText(/email-input/i);
    const pwInput = screen.getByLabelText(/pw-input/i);

    // enter email and pw
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(pwInput, { target: { value: password } });

    // click login
    const loginButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(loginButton);

    // check that login api was called with correct params
    expect(loginApi).toHaveBeenCalledTimes(1);
    expect(loginApi).toHaveBeenCalledWith(setTokenFunction, expect.any(Function), email, password);

    // expect fields to now be empty
    expect(pwInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
  });
  it('logs in when Enter key is pressed in the password input field', async () => {
    const emailInput = screen.getByLabelText(/email-input/i);
    const pwInput = screen.getByLabelText(/pw-input/i);

    // enter email
    fireEvent.change(emailInput, { target: { value: email } });

    // enter password
    fireEvent.change(pwInput, { target: { value: password } });

    // press Enter key in the password input field
    fireEvent.keyPress(pwInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    // check that login api was called with correct params
    expect(loginApi).toHaveBeenCalledTimes(1);
    expect(loginApi).toHaveBeenCalledWith(setTokenFunction, expect.any(Function), email, password);

    // expect fields to now be empty
    expect(pwInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
  });
});

describe('redirect to dash', () => {
  const setTokenFunction = jest.fn();
  it('redirect to dash', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login token="validtoken" setTokenFunction={setTokenFunction} />} />
        </Routes>
      </BrowserRouter>
    );
  });
});
