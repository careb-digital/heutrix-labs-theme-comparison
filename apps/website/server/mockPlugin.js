import {Readable} from 'node:stream';
import {handleGoogleRequest} from './googleRequests.js';

function attach(server) {
  server.middlewares.use(async (req, res, next) => {
    if (new URL(req.url, 'http://localhost').pathname !== '/api/requests') return next();
    try {
      const request = new Request(`http://${req.headers.host}${req.url}`, {
        method: req.method, headers: req.headers,
        ...(['GET', 'HEAD'].includes(req.method) ? {} : {body: Readable.toWeb(req), duplex: 'half'}),
      });
      const result = await handleGoogleRequest(request);
      res.writeHead(result.status, Object.fromEntries(result.headers)); res.end(await result.text());
    } catch {
      res.writeHead(500, {'Content-Type': 'application/json', 'Cache-Control': 'no-store'});
      res.end(JSON.stringify({error: 'Online enquiries are unavailable. Please use the email draft.'}));
    }
  });
}
export const mockRequestPlugin = () => ({name: 'heutrix-enquiry-requests', configureServer: attach, configurePreviewServer: attach});
