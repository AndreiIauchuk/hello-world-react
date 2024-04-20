import { render, screen } from '@testing-library/react';
import App from './App';

test('requested Golang message', () => {
  render(App());
  const linkElement = screen.getByText('Hello from Golang!');
  expect(linkElement).toBeInTheDocument();
});
