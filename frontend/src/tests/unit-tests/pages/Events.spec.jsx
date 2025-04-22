import { render, screen, fireEvent } from '@testing-library/react';
import Events from '../../pages/Event/Events';
import { useDispatch, useSelector } from 'react-redux';
import { vi } from 'vitest';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../../components/Event/EventCard', () => ({
  default: ({ event }) => <div data-testid="event-card">{event.title}</div>,
}));

vi.mock('antd', async () => {
  const antd = await vi.importActual('antd');
  return {
    ...antd,
    Button: ({ onClick, children }) => (
      <button onClick={onClick} data-testid="antd-button">
        {children}
      </button>
    ),
    message: { success: vi.fn(), error: vi.fn() },
  };
});

describe('Events Page', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders "No events found." if there are no events', () => {
    useSelector.mockReturnValue({ events: [] });

    render(<Events />);
    expect(screen.getByText('No events found.')).toBeInTheDocument();
  });

  it('renders 10 event cards initially and loads more on button click', () => {
    const mockEvents = Array.from({ length: 15 }, (_, i) => ({ title: `Event ${i + 1}` }));
    useSelector.mockReturnValue({ events: mockEvents });

    render(<Events />);

    const initialCards = screen.getAllByTestId('event-card');
    expect(initialCards.length).toBe(10);

    fireEvent.click(screen.getByTestId('antd-button'));

    const updatedCards = screen.getAllByTestId('event-card');
    expect(updatedCards.length).toBe(15);
  });

  it('dispatches getAllEvents on mount', () => {
    useSelector.mockReturnValue({ events: [] });
    render(<Events />);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
