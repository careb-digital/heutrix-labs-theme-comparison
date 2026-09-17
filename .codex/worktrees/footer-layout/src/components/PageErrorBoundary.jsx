import React from 'react';

// Keep navigation and a direct contact route available if a page or lazy module fails.
export default class PageErrorBoundary extends React.Component {
  state = {failed: false};

  static getDerivedStateFromError() {
    return {failed: true};
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return <section className="r-page r-section r-page-hero">
      <div className="r-container">
        <p className="r-eyebrow">Please try again</p>
        <h1 className="r-interior-title">This page could not load.</h1>
        <p className="r-lead">Reload the page, or email us to continue your enquiry.</p>
        <div className="r-actions">
          <button className="r-button" type="button" onClick={() => window.location.reload()}>Reload page</button>
          <a className="r-text-link" href="mailto:hello@heutrix.com.au">hello@heutrix.com.au</a>
        </div>
        <p className="r-small">Reloading clears unsent form drafts and assessment answers. Keep any email enquiry general and free of sensitive information.</p>
      </div>
    </section>;
  }
}
