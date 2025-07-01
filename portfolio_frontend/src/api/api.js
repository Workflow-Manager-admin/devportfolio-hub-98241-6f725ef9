/**
 * PUBLIC_INTERFACE
 * API utility module for communicating with the backend endpoints.
 * Uses fetch to handle requests for projects, resume, and contact functionality.
 * All requests prefixed with '/api/' assume calls proxied to the backend server.
 */

const handleResponse = async (response) => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `HTTP error! status: ${response.status}`);
  }
  // Avoid parsing empty responses as JSON
  const text = await response.text();
  return text ? JSON.parse(text) : {};
};

// PUBLIC_INTERFACE
export async function fetchProjects() {
  /** Fetches the list of projects from the backend. */
  const res = await fetch('/api/projects');
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function fetchResume() {
  /** Fetches the resume data from the backend. */
  const res = await fetch('/api/resume');
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function sendContact(formData) {
  /** Sends the contact form data to backend and returns the result.
   * @param {Object} formData - { name, email, message }
   */
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData)
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function fetchProfile() {
  /** Fetches the user profile info from the backend. */
  const res = await fetch('/api/profile');
  return handleResponse(res);
}
