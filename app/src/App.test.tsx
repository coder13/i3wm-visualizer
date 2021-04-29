import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App works', () => {
  const app = render(<App />);
  expect(app).toBeDefined();
});
