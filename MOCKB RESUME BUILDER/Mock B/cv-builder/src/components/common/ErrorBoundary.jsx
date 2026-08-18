import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, info: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        this.setState({ info });
        console.error('React Error Boundary caught:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    position: 'fixed', inset: 0, background: '#1a0000',
                    color: '#ff8888', fontFamily: 'monospace', padding: '30px',
                    overflow: 'auto', zIndex: 99999
                }}>
                    <h2 style={{ color: '#ff4444', marginBottom: '16px' }}>
                        ⚠ React Crash Report
                    </h2>
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '13px' }}>
                        {this.state.error?.toString()}
                        {'\n\n'}
                        {this.state.info?.componentStack}
                    </pre>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '20px', padding: '10px 20px',
                            background: '#ff4444', color: '#fff',
                            border: 'none', borderRadius: '6px', cursor: 'pointer'
                        }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
