import decode from 'jwt-decode';

export function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) return false;
  const decoded = decode(token);
  if (decoded.exp > Date.now() / 1000) return decoded.data;
  return false;
}

export function returnDecodedToken(token) {
  const decoded = decode(token)
  return decoded.data
}

export async function fetchAccessToken(user) {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (response.status === 200) {
    const token = await response.json();
    return token
  }
  if (response.status !== 200) {
    throw new Error('CHECK YOUR CREDENTIALS')
  }
}

export async function registerUser(user) {
  const response = await fetch('/auth/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (response.status === 200) {
    const access_token = await response.json();
    return access_token;
  }
  if (response.status !== 200) {
    throw new Error('ACCOUNT CREATION FAILED')
  }
}