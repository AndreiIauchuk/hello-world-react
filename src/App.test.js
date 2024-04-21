import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from './App';

describe('App component test', () => {
  it('fetches message and renders it', async () => {
    fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ text: 'Hello from Golang!' }),
      })
    );

    render(<App />);
    expect(fetch).toHaveBeenCalledWith('say-hello');
    await waitFor(() => screen.getByText('Hello from Golang!'));
    expect(screen.getByText('Hello from Golang!')).toBeInTheDocument();
  });

  it('handles fetch error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const errorMessage = 'Fetch error'
    fetch = jest.fn(() => Promise.reject(errorMessage))
    render(<App />);
    expect(fetch).toHaveBeenCalledWith('say-hello');
    await waitFor(() =>
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching message:', errorMessage)
    );
  });
});