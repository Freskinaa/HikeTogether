import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InputField from '../../../../components/Shared/InputField/InputField';

describe('InputField component', () => {
  it('renders with correct placeholder', () => {
    render(<InputField label="Enter name" />);
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });

  it('renders with the correct type', () => {
    render(<InputField type="number" label="Enter age" />);
    expect(screen.getByPlaceholderText('Enter age')).toHaveAttribute('type', 'number');
  });

  it('displays the correct value', () => {
    render(<InputField value="John" label="Name" onChange={() => {}} />);
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(<InputField value="" onChange={handleChange} label="Email" />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies the given className', () => {
    render(<InputField classname="input-style" label="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('input-style');
  });

  it('sets min and max attributes if provided', () => {
    render(<InputField type="number" label="Age" min="18" max="99" />);
    const input = screen.getByPlaceholderText('Age');
    expect(input).toHaveAttribute('min', '18');
    expect(input).toHaveAttribute('max', '99');
  });
});
