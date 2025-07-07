import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erreur capturée par ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-4">
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl border border-red-500/30 p-8 max-w-md w-full text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Oups ! Une erreur s'est produite
            </h2>
            <p className="text-gray-400 mb-6">
              L'application SELEZIONE a rencontré un problème. Nous nous excusons pour la gêne occasionnée.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 flex items-center justify-center mx-auto"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Recharger l'application
            </button>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="text-red-400 cursor-pointer mb-2">
                  Détails de l'erreur (développement)
                </summary>
                <pre className="text-xs text-gray-500 bg-gray-900 p-3 rounded overflow-auto">
                  {this.state.error && this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
