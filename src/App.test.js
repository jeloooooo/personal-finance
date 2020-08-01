import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App';
import { calculateInterest } from './components/Helpers';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe("Compute interest", () => {
  test("it should compute the correct interest", () => {
    const adb = 100000;
    const interest = 4;
    const daysInMonth = 30;
    const output = 266.6666666666667;

    expect(calculateInterest(adb,interest,daysInMonth)).toEqual(output);
  });
});