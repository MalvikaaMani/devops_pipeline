import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import React from 'react';

// Mock the entire react-router-dom module
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,  // Mocking BrowserRouter
  useNavigate: jest.fn(),  // Mocking useNavigate
}));

describe('App Component', () => {
  test('should render welcome message and login form by default', () => {
    render(<App />);

    // Check if the welcome message is displayed
    expect(screen.getByText(/Welcome to KLM GameCraft!!/i)).toBeInTheDocument();
    expect(screen.getByText(/Your gateway to an immersive gaming experience./i)).toBeInTheDocument();

    // Check if the Login component is visible (showLogin is true by default)
    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth:/i)).toBeInTheDocument();
  });

  test('should hide login form if showLogin state is false', () => {
    render(<App />);

    // Simulate clicking the "Toggle Login" button
    fireEvent.click(screen.getByText(/Toggle Login/i));

    // Check if the Login component is not visible
    expect(screen.queryByLabelText(/Username:/i)).toBeNull();
    expect(screen.queryByLabelText(/Date of Birth:/i)).toBeNull();
  });

  test('should show login form again if showLogin state is true', () => {
    render(<App />);

    // Simulate clicking the "Toggle Login" button twice to show the form again
    fireEvent.click(screen.getByText(/Toggle Login/i)); // First click to hide
    fireEvent.click(screen.getByText(/Toggle Login/i)); // Second click to show

    // Check if the Login component is visible again
    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth:/i)).toBeInTheDocument();
  });
});
