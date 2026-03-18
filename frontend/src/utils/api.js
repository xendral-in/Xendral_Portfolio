const BASE = '/api'

/**
 * Submit a contact / project enquiry.
 * @param {Object} payload - ContactIn fields
 * @returns {Promise<{success: boolean, message: string, id: string}>}
 */
export async function submitContact(payload) {
  const res = await fetch(`${BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.detail || 'Submission failed')
  return data
}

/**
 * Fetch all services from the API.
 * @returns {Promise<Array>}
 */
export async function fetchServices() {
  const res = await fetch(`${BASE}/services`)
  if (!res.ok) throw new Error('Failed to load services')
  return res.json()
}

/**
 * Admin: fetch all submissions with optional filters.
 * @param {{ status?: string, limit?: number, skip?: number }} opts
 */
export async function fetchSubmissions({ status, limit = 50, skip = 0 } = {}) {
  const params = new URLSearchParams({ limit, skip })
  if (status) params.set('status', status)
  const res = await fetch(`${BASE}/submissions?${params}`)
  if (!res.ok) throw new Error('Failed to fetch submissions')
  return res.json()
}

/**
 * Admin: update status of a submission.
 */
export async function updateSubmissionStatus(id, newStatus) {
  const res = await fetch(`${BASE}/submissions/${id}/status?new_status=${newStatus}`, {
    method: 'PATCH',
  })
  if (!res.ok) throw new Error('Failed to update status')
  return res.json()
}
