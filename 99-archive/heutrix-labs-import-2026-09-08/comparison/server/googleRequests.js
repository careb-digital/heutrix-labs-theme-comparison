// Reserved intake boundary for the planned Google Apps Script / Sheets deployment.
// Deliberately disabled until delivery, notification and retry handling are verified.
export async function handleGoogleRequest(request) {
  const headers = {'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store'};
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({error: 'Use POST for an enquiry.'}), {status: 405, headers: {...headers, Allow: 'POST'}});
  }
  return new Response(JSON.stringify({
    status: 'unavailable',
    error: 'Online enquiries are not connected yet. Please review and send your email draft.',
  }), {status: 503, headers});
}
