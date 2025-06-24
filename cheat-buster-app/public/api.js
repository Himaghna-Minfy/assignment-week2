const API_BASE = 'http://localhost:3000/api';

export async function searchUser({ email, name }) {
  const params = {};
  if (email) params.email = email;
  if (name) params.name = name;

  const res = await axios.get(`${API_BASE}/search`, { params });
  return res.data;
}
