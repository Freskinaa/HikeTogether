import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import BurgerNav from '../../../../components/Navbar/BurgerNav'
const mockStore = createStore((state = { auth: { accesstoken: null } }) => state);

describe('BurgerNav Component', () => {
  test('should render menu toggle button and menu items', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <BurgerNav scrolled={false} />
        </Router>
      </Provider>
    );

    const menuToggle = screen.getByRole('checkbox');
    fireEvent.click(menuToggle);
    expect(menuToggle.checked).toBe(true);
    
    expect(screen.getByText(/HOME/i)).toBeInTheDocument();
    expect(screen.getByText(/LOGIN/i)).toBeInTheDocument();
  });

  test('should toggle menu open/closed when clicking the hamburger button', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <BurgerNav scrolled={false} />
        </Router>
      </Provider>
    );

    const menuToggle = screen.getByRole('checkbox');
    expect(menuToggle.checked).toBe(false);

    fireEvent.click(menuToggle);
    expect(menuToggle.checked).toBe(true);

    fireEvent.click(menuToggle);
    expect(menuToggle.checked).toBe(false);
  });

  test('should show logged-in routes when access token is available', () => {
    const storeWithToken = createStore((state = { auth: { accesstoken: 'valid_token' } }) => state);

    render(
      <Provider store={storeWithToken}>
        <Router>
          <BurgerNav scrolled={false} />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/PROFILE/i)).toBeInTheDocument();
    expect(screen.getByText(/TRAILS/i)).toBeInTheDocument();
    expect(screen.getByText(/EVENTS/i)).toBeInTheDocument();
  });

  test('should close menu when a link is clicked', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <BurgerNav scrolled={false} />
        </Router>
      </Provider>
    );

    const menuToggle = screen.getByRole('checkbox');
    fireEvent.click(menuToggle);
    expect(menuToggle.checked).toBe(true);

    const homeLink = screen.getByText(/HOME/i);
    fireEvent.click(homeLink);

    expect(menuToggle.checked).toBe(false);
  });

  test('should show the correct footer information', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <BurgerNav scrolled={false} />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Contact us:/i)).toBeInTheDocument();
    expect(screen.getByText(/\+38971 22 22 22/i)).toBeInTheDocument();
    expect(screen.getByText(/Pristina Republic of Kosovo/i)).toBeInTheDocument();
    expect(screen.getByText(/hiking@gmail.com/i)).toBeInTheDocument();
  });
});
