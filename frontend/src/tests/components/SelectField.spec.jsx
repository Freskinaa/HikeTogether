import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SelectField from '../../components/Shared/SelectField/SelectField';

const options = [
  { label: 'Select an option', value: '' },
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
];

describe('SelectField component', () => {
  it('renders with the default selected option', () => {
    render(<SelectField options={options} value="" onChange={() => {}} />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('opens the dropdown when clicked', () => {
    render(<SelectField options={options} value="" onChange={() => {}} />);
    const trigger = screen.getByText('Select an option');
    fireEvent.click(trigger);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('calls onChange and updates selected option on selection', () => {
    const handleChange = vi.fn();
    render(<SelectField options={options} value="" onChange={handleChange} />);
    const trigger = screen.getByText('Select an option');
    fireEvent.click(trigger);
    const optionA = screen.getByText('Option A');
    fireEvent.click(optionA);

    expect(handleChange).toHaveBeenCalledWith('a');
  });

  it('closes the menu when clicking outside', () => {
    const { container } = render(
      <div>
        <SelectField options={options} value="" onChange={() => {}} />
        <div data-testid="outside">Outside</div>
      </div>
    );

    fireEvent.click(screen.getByText('Select an option')); 
    expect(screen.getByText('Option A')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId('outside')); 
    expect(screen.queryByText('Option A')).not.toBeInTheDocument();
  });
});
