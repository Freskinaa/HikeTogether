import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '../../../utils/ScrollToTop';
import { vi } from 'vitest';

vi.stubGlobal('scrollTo', vi.fn());

describe('ScrollToTop util', () => {

  it('should call scrollTo when route changes', () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={['/home']}>
        <ScrollToTop />
        <Routes>
          <Route path="/home" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
      </MemoryRouter>
    );

    rerender(
      <MemoryRouter initialEntries={['/about']}>
        <ScrollToTop />
        <Routes>
          <Route path="/home" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
