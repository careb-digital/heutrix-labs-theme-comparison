import {Readable} from 'node:stream';
import {handleMockRequest} from './mockRequests.js';

function attach(server) {
  server.middlewares.use(async (req, res, next) => {
    if (new URL(req.url, 'http://localhost').pathname !== '/api/requests') return next();
    try {
      const request = new Request(`http://${req.headers.host}${req.url}`, {
        method: req.method, headers: req.headers,
        ...(['GET', 'HEAD'].includes(req.method) ? {} : {body: Readable.toWeb(req), duplex: 'half'}),
      });
      const result = await handleMockRequest(request);
      res.writeHead(result.status, Object.fromEntries(result.headers)); res.end(await result.text());
    } catch {
      res.writeHead(500, {'Content-Type': 'application/json', 'Cache-Control': 'no-store'});
      res.end(JSON.stringify({mode: 'mock', error: 'The demo endpoint is unavailable. Try again.'}));
    }
  });
}
export const mockRequestPlugin = () => ({name: 'heutrix-demo-requests', configureServer: attach, configurePreviewServer: attach});
