import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toast from '../components/Toast';

describe('Toast Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders toast with message', () => {
    render(<Toast message="Test message" type="success" onClose={mockOnClose} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('displays correct icon for success type', () => {
    render(<Toast message="Success" type="success" onClose={mockOnClose} />);
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('displays correct icon for error type', () => {
    render(<Toast message="Error" type="error" onClose={mockOnClose} />);
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Toast message="Test" type="info" onClose={mockOnClose} />);
    
    const closeButton = screen.getByLabelText('Close notification');
    await user.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('auto-closes after duration', async () => {
    jest.useFakeTimers();
    render(<Toast message="Test" type="info" onClose={mockOnClose} duration={1000} />);
    
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
    
    jest.useRealTimers();
  });
});