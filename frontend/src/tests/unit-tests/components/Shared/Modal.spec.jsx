import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from '../../../../components/Shared/Modal/Modal';

describe('Modal component', () => {
  it('renders children inside the modal', () => {
    render(<Modal onClose={() => {}}>Hello Modal</Modal>);
    expect(screen.getByText('Hello Modal')).toBeInTheDocument();
  });

  it('calls onClose when background is clicked', () => {
    const handleClose = vi.fn();
    const { container } = render(<Modal onClose={handleClose}>Content</Modal>);
    
    const backdrop = container.querySelector('.template-wrapper-modal');
    fireEvent.click(backdrop);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<Modal onClose={handleClose}>Content</Modal>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders FontAwesomeIcon close button', () => {
    render(<Modal onClose={() => {}}>Test</Modal>);
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });
});
