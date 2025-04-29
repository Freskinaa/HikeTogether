import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../../../components/Footer/Footer';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Footer component', () => {
  it('renders About section with description', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(
      screen.getByText(/every adventurer needs to know where to go/i)
    ).toBeInTheDocument();
  });

  it('renders Contacts section with location, email, and phone', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('Contacts')).toBeInTheDocument();
    expect(screen.getByText(/Prishtine, Kosove/i)).toBeInTheDocument();
    expect(screen.getByText(/hello@hiketogether.com/i)).toBeInTheDocument();
    expect(screen.getByText('+383 44 111 111')).toBeInTheDocument();
  });

  it('renders social media icons and links', () => {
    renderWithRouter(<Footer />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
    links.forEach(link => {
      expect(link.getAttribute('href')).toBe('/');
    });
  });

  it('renders bottom footer with copyright', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/© 2025 HikeTogether/i)).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Use')).toBeInTheDocument();
  });
});
