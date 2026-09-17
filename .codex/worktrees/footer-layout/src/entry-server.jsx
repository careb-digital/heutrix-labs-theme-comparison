import React from 'react';
import {renderToPipeableStream} from 'react-dom/server';
import {PassThrough} from 'node:stream';
import App from './App.jsx';
import {LeadProvider} from './leadMagnets/LeadContext.jsx';

export function render(path) {
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    let html = '';
    output.setEncoding('utf8');
    output.on('data', chunk => { html += chunk; });
    output.on('end', () => resolve(html));
    output.on('error', reject);
    const stream = renderToPipeableStream(
      <React.StrictMode><LeadProvider><App initialLocation={{path, search: '', hash: ''}} /></LeadProvider></React.StrictMode>,
      {
        // Wait for lazy Markdown too: no loading fallbacks or streaming scripts.
        onAllReady() { stream.pipe(output); },
        onShellError: reject,
        onError: reject,
      },
    );
  });
}
