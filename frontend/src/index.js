import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('Unhandled render error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding:24}}>
          <h2>앱 렌더링 중 문제가 발생했습니다.</h2>
          <pre style={{whiteSpace:'pre-wrap',color:'crimson'}}>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootEl = document.getElementById('root');
if (!rootEl) {
  // 안전망: root가 없으면 콘솔에 메시지만 남기고 종료
  console.error('Root element with id "root" not found.');
} else {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
