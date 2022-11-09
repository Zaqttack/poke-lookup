import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe("<App />", () => {
  test('render pokemon name input', () => {
    render(<App />);
 
    const inputEl = screen.getByTestId("pokemon-input");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
  })
 
  test('pass valid pokemon to test input field', () => {
    render(<App />);
 
    const inputEl = screen.getByTestId("pokemon-input");
    userEvent.type(inputEl, "pikachu");
 
    expect(screen.getByTestId("pokemon-input")).toHaveValue("pikachu");
  });
 
  // test('pass invalid pokemon to test input value', () => {
  //   render(<App />);
 
  //   const inputEl = screen.getByTestId("pokemon-input");
  //   userEvent.type(inputEl, "test");
 
  //   expect(screen.getByTestId("pokemon-input")).toHaveValue("test");
  //   expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
  //   expect(screen.queryByTestId("error-msg").textContent).toEqual("Please enter a valid email.");
  // });
})
