import { render } from '@testing-library/react';
import LazyLoading from '../../../utils/LazyLoading';

describe('LazyLoading Component', () => {
  it('should render the loading container and spinner', () => {
    const { container } = render(<LazyLoading />);

    const loadingContainer = container.querySelector('.loading-container');
    expect(loadingContainer).toBeInTheDocument();

    const loadingSpiral = container.querySelector('.loading-spiral');
    expect(loadingSpiral).toBeInTheDocument();
  });

  it('should have the correct class names', () => {
    const { container } = render(<LazyLoading />);

    const loadingContainer = container.querySelector('.loading-container');
    expect(loadingContainer).toHaveClass('loading-container');

    const loadingSpiral = container.querySelector('.loading-spiral');
    expect(loadingSpiral).toHaveClass('loading-spiral');
  });
});
