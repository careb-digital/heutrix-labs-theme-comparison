import React, {useEffect, useState} from 'react';
import { ctas, footerCopy, footerNav, homeServices } from '../siteContent';
import {workflowFromSearch} from '../leadMagnets/model';
import './footer.css';
import BrandLogo from './BrandLogo';

const footerLink = (path) => footerNav.find((item) => item.path === path);
const navigationGroups = [
  {
    id: 'services',
    label: 'Services',
    items: [footerLink('/services'), ...homeServices.map((service) => ({
      label: service.title,
      path: service.cta.href
    }))]
  },
  {
    id: 'explore',
    label: 'Explore',
    items: ['/about', '/case-studies', '/resources', '/disability-providers', '/allied-health', '/faq'].map(footerLink)
  },
  {
    id: 'important',
    label: 'Important',
    items: ['/privacy-and-data-handling', '/terms-of-use', '/website-disclaimer'].map(footerLink)
  }
];

export default function Footer({currentPath, currentHash = '', currentSearch = ''}) {
  const [lastScorecardHref, setLastScorecardHref] = useState(ctas.scorecard.href);
  const currentScorecardHref = currentPath === ctas.scorecard.href
    ? ctas.scorecard.href + (workflowFromSearch(currentSearch)
      ? `?workflow=${encodeURIComponent(new URLSearchParams(currentSearch).get('workflow'))}` : '')
    : null;
  // Resume the same in-memory workflow draft, including after a visit to another page.
  // Retain only the allowlisted workflow key, never arbitrary query parameters or answers.
  useEffect(() => {
    if (currentScorecardHref) setLastScorecardHref(currentScorecardHref);
  }, [currentScorecardHref]);
  const scorecardHref = currentScorecardHref || lastScorecardHref;

  function currentDestination(href) {
    const [destination, hash] = href.split('#');
    const path = destination.split('?')[0];
    if (path !== currentPath) return undefined;
    if (hash) return currentHash === `#${hash}` ? 'location' : undefined;
    // A named service is the current location within this navigation group.
    if (navigationGroups.some(group => group.items.some(item => item.path === `${path}${currentHash}` && item.path.includes('#')))) return undefined;
    return 'page';
  }

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-intro">
            <a className="footer-brand brand-home" href="/" aria-label="Heutrix home" aria-current={currentDestination('/')}>
              <BrandLogo reversed />
            </a>
            <p>{footerCopy.summary}</p>
            <div className="footer-contact">
              <a className="footer-contact-link" href={ctas.fitCall.href} aria-current={currentDestination(ctas.fitCall.href)}>
                {ctas.fitCall.label}<span aria-hidden="true">↗</span>
              </a>
              <a className="footer-scorecard-link" href={scorecardHref} aria-current={currentDestination(scorecardHref)}>{ctas.scorecard.label}<span aria-hidden="true">→</span></a>
            </div>
          </div>

          {navigationGroups.map((group) => (
            <nav key={group.id} aria-labelledby={`footer-${group.id}`}>
              <h2 id={`footer-${group.id}`} className="footer-nav-heading">{group.label}</h2>
              <ul className="footer-links">
                {group.items.map((item) => (
                  <li key={item.path}><a href={item.path} aria-current={currentDestination(item.path)}>{item.label}</a></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-meta">
            <p>Heutrix is operated by Heutrix Pty Ltd · ABN 64 702 109 662</p>
            <p>© 2026 Heutrix Pty Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
