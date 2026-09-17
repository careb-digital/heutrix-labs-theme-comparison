import {handleMockRequest} from './server/mockRequests.js';
export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname === '/api/requests') return handleMockRequest(request);
    return env.ASSETS.fetch(request);
  },
};
