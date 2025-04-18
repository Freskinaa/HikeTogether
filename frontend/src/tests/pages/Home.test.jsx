import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home/Home';
import { vi } from 'vitest'; // Import vi for mocking

// Mock the child components to avoid deep rendering during tests
vi.mock('../../components/Home/Banner/Banner', () => ({
  default: () => <div>Mocked Banner</div>, // Return the default export properly
}));
vi.mock('../../components/Home/UpcomingEvents/UpcomingEvents', () => ({
  default: () => <div>Mocked UpcomingEvents</div>, // Return the default export properly
}));

describe('Home Component', () => {
  test('renders Banner and UpcomingEvents components', () => {
    render(<Home />);

    // Check if mocked components render
    expect(screen.getByText('Mocked Banner')).toBeInTheDocument();
    expect(screen.getByText('Mocked UpcomingEvents')).toBeInTheDocument();
  });
});
