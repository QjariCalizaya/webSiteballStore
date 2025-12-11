const API_URL = "http://localhost:3000/api";

export async function apiPost(path, data) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export default { apiPost };
