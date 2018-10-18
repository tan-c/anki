import React from 'react';
import toastr from 'toastr';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo, // Details in {this.state.errorInfo.componentStack}
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { errorInfo, error } = this.state;
    // const {children} = this.props;
    if (errorInfo) {
      toastr.error(`${error && error.toString()}`, 'Error Occured');
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
