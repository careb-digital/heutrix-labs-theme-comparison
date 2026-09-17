import React from 'react';
import './brand-logo.css';

export default function BrandLogo({ reversed = false }) {
  return <img className="brand-logo" src={`/images/brand/heutrix-logo-${reversed ? 'reversed' : 'colour'}.svg`}
    width="908" height="247" alt="Heutrix" decoding="async" />;
}
