import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Alert, Paper } from '@mui/material';
import { Refresh as RefreshIcon, BugReport as BugIcon } from '@mui/icons-material';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box className={styles.container}>
          <Paper elevation={3} className={styles.paper}>
            <BugIcon className={styles.icon} />
            
            <Typography variant="h5" component="h2" className={styles.title}>
              Oops! Something went wrong
            </Typography>
            
            <Typography variant="body1" className={styles.description}>
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </Typography>

            {this.state.error && (
              <Alert severity="error" className={styles.errorAlert}>
                <Typography variant="body2" component="pre" className={styles.errorText}>
                  {this.state.error.message}
                </Typography>
              </Alert>
            )}

            <Box className={styles.actions}>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={this.handleRetry}
                className={styles.button}
              >
                Try Again
              </Button>
              
              <Button
                variant="outlined"
                onClick={() => window.location.reload()}
                className={styles.button}
              >
                Reload Page
              </Button>
            </Box>

            {import.meta.env.DEV && this.state.errorInfo && (
              <Box className={styles.stackTrace}>
                <Typography variant="h6" className={styles.stackTraceTitle}>
                  Error Details (Development)
                </Typography>
                <Paper className={styles.stackTraceContent}>
                  <Typography
                    variant="body2"
                    component="pre"
                    className={styles.stackTraceText}
                  >
                    {this.state.errorInfo.componentStack}
                  </Typography>
                </Paper>
              </Box>
            )}
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 