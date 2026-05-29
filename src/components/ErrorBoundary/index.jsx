import { Component } from "react";

/**
 * Catches render/runtime errors in the active section and shows an on-theme
 * fallback instead of unmounting the whole app to a blank screen. The instance
 * is keyed by section slug in App.jsx, so navigating to another section mounts
 * a fresh boundary and clears the error automatically.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Surface to the console for diagnostics; no telemetry on a static site.
    console.error("Section render error:", error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback" role="alert">
          <p className="error-fallback-kicker">Something went sideways</p>
          <h2 className="error-fallback-title">This section hit a snag</h2>
          <p className="error-fallback-copy">
            That&rsquo;s on me, not you. Reload to try again, or jump back to the start.
          </p>
          <div className="error-fallback-actions">
            <a className="hero-cta hero-cta--primary" href="#about">
              Back to start
            </a>
            <button
              type="button"
              className="hero-cta hero-cta--secondary"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
