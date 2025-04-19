import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SubTitle from '../../components/Shared/Subtitle/SubTitle';

describe('SubTitle component', () => {
  it('renders the provided text', () => {
    render(<SubTitle text="Section Title" />);
    expect(screen.getByText('Section Title')).toBeInTheDocument();
  });

  it('applies "bothLines" class when both beforeLine and afterLine are true', () => {
    render(<SubTitle text="Title" beforeLine={true} afterLine={true} />);
    const span = screen.getByText('Title');
    expect(span).toHaveClass('bothLines');
  });

  it('applies "beforeLine" class when only beforeLine is true', () => {
    render(<SubTitle text="Title" beforeLine={true} />);
    const span = screen.getByText('Title');
    expect(span).toHaveClass('beforeLine');
  });

  it('applies "afterLine" class when only afterLine is true', () => {
    render(<SubTitle text="Title" afterLine={true} />);
    const span = screen.getByText('Title');
    expect(span).toHaveClass('afterLine');
  });

  it('applies no extra class when neither beforeLine nor afterLine are true', () => {
    render(<SubTitle text="Plain Title" />);
    const span = screen.getByText('Plain Title');
    expect(span.className).toBe('');
  });
});
