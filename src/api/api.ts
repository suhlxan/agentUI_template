// ADF: This is just a placeholder for backend API interactions.
// Replace or extend as needed when backend endpoints are available.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("API Base URL:", API_BASE_URL);

export const sendToAgent = async (message: string) => {
  const res = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "accept": "application/json", "api-key": import.meta.env.VITE_API_KEY },
    body: message,
  });
  console.log("API response status:", res.status);
  console.log("API response headers:", res.headers);
  if (!res.ok) throw new Error("API error");

  return await res.text(); // expected to return: { reply: "..." }
};