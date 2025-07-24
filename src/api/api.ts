// ADF: This is just a placeholder for backend API interactions.
// Replace or extend as needed when backend endpoints are available.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendToAgent = async (message: string) => {
  const res = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) throw new Error("API error");

  return await res.json(); // expected to return: { reply: "..." }
};