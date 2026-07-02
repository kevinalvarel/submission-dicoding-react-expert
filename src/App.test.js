import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from './states';
import App from './App';

test('renders ForumKita navigation', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>,
  );
  const linkElement = screen.getByText(/ForumKita/i);
  expect(linkElement).toBeInTheDocument();
});
