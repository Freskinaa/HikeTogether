import { render, screen } from '@testing-library/react';
import Home from '../../../pages/Home/Home';
import { vi } from 'vitest'; 

vi.mock('../../../components/Home/Banner/Banner', () => ({
  default: () => <div>Mocked Banner</div>, 
}));

vi.mock('../../../components/Home/UpcomingEvents/UpcomingEvents', () => ({
  default: () => <div>Mocked UpcomingEvents</div>, 
}));

describe('Home Page', () => {
  test('renders Banner and UpcomingEvents components', () => {
    render(<Home />);

    expect(screen.getByText('Mocked Banner')).toBeInTheDocument();
    expect(screen.getByText('Mocked UpcomingEvents')).toBeInTheDocument();
  });
});
