const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const handleResponse = async (res) => {
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = payload.message || payload.error || 'Request failed';
    throw new Error(message);
  }
  return payload;
};

const isNetworkError = (error) =>
  error instanceof TypeError || /failed to fetch/i.test(error.message || '');

const mockUsersKey = 'mock_users';
const mockCurrentUserKey = 'mock_current_user';

const loadMockUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(mockUsersKey) || '[]');
  } catch {
    return [];
  }
};

const saveMockUsers = (users) => {
  localStorage.setItem(mockUsersKey, JSON.stringify(users));
};

const getMockCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(mockCurrentUserKey) || 'null');
  } catch {
    return null;
  }
};

const setMockCurrentUser = (user) => {
  localStorage.setItem(mockCurrentUserKey, JSON.stringify(user));
};

const clearMockCurrentUser = () => {
  localStorage.removeItem(mockCurrentUserKey);
};

const mockRegister = async (user) => {
  const users = loadMockUsers();
  const email = user.email.trim().toLowerCase();
  if (users.some((item) => item.email.toLowerCase() === email)) {
    throw new Error('Email already registered.');
  }

  const newUser = {
    name: user.name.trim(),
    email,
    password: user.password,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveMockUsers(users);
  setMockCurrentUser(newUser);
  return { data: { name: newUser.name, email: newUser.email, createdAt: newUser.createdAt } };
};

const mockLogin = async ({ email, password }) => {
  const users = loadMockUsers();
  const user = users.find((item) => item.email.toLowerCase() === email.trim().toLowerCase());
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password.');
  }
  setMockCurrentUser(user);
  return { data: { name: user.name, email: user.email, createdAt: user.createdAt } };
};

const mockGetProfile = async () => {
  const user = getMockCurrentUser();
  if (!user) {
    throw new Error('Not authenticated.');
  }
  return { data: { name: user.name, email: user.email, createdAt: user.createdAt } };
};

const mockLogout = async () => {
  clearMockCurrentUser();
  return { data: null };
};

const networkFallback = async (networkCall, fallback) => {
  try {
    return await networkCall();
  } catch (error) {
    if (isNetworkError(error)) {
      return fallback();
    }
    throw error;
  }
};

export const register = (user) =>
  networkFallback(
    () =>
      fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      }).then(handleResponse),
    () => mockRegister(user)
  );

export const login = (credentials) =>
  networkFallback(
    () =>
      fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      }).then(handleResponse),
    () => mockLogin(credentials)
  );

export const logout = () =>
  networkFallback(
    () =>
      fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      }).then(handleResponse),
    () => mockLogout()
  );

export const getProfile = () =>
  networkFallback(
    () =>
      fetch(`${API_URL}/api/profile`, {
        method: 'GET',
        credentials: 'include',
      }).then(handleResponse),
    () => mockGetProfile()
  );

export const getCryptos = (type = 'all') => {
  const endpoint = type === 'gainers' ? '/api/crypto/gainers' : type === 'new' ? '/api/crypto/new' : '/api/crypto';
  return fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    credentials: 'include',
  }).then(handleResponse);
};

export const createCrypto = (payload) =>
  fetch(`${API_URL}/api/crypto`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(handleResponse);
