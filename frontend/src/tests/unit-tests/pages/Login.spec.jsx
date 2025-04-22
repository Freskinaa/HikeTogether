import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loginUser } from '../../store/authSlice';
import Login from '../../pages/Auth/LogIn';
import { MemoryRouter } from 'react-router-dom';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('../../store/authSlice', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    loginUser: vi.fn(() => ({ type: 'auth/loginUser/pending' })),
  };
});

const renderWithProviders = (ui, { preloadedState } = {}) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/login']}>{ui}</MemoryRouter>
    </Provider>
  );
};

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form correctly', () => {
    renderWithProviders(<Login />);
    expect(screen.getByText(/Welcome back!/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('shows error if fields are empty on submit', async () => {
    renderWithProviders(<Login />);
    fireEvent.click(screen.getByText(/Login/i));
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email/i)).toBeInTheDocument();
    });
  });

  it('dispatches loginUser with correct values', async () => {
    renderWithProviders(<Login />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText(/Login/i));
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('displays error message when login fails', async () => {
    const preloadedState = {
      auth: {
        user: null,
        error: 'Invalid credentials',
      },
    };
    renderWithProviders(<Login />, { preloadedState });
    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });

  it('redirects if user is already logged in', async () => {
    const preloadedState = {
      auth: {
        user: { id: 1, name: 'Test User' },
        error: null,
      },
    };
    renderWithProviders(<Login />, { preloadedState });
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });
});
