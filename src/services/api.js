const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Get active JWT token from storage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  // 1. Sign In / Authenticate
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || 'Failed to authenticate');
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user_name', data.user_name || 'User');
    return data;
  },

  // 2. Sign Up / Create User
  signup: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || 'Registration failed');
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user_name', data.user_name || name);
    return data;
  },

  // 3. Upload Chat File
  uploadChat: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
      },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || 'File upload failed');
    }

    return await response.json();
  },

  // 4. Retrieve Analysis History list
  getHistory: async () => {
    const response = await fetch(`${API_BASE_URL}/history`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || 'Failed to retrieve analysis history');
    }

    return await response.json();
  },

  // 5. Retrieve Analytics detailed report
  getAnalytics: async (analysisId) => {
    const response = await fetch(`${API_BASE_URL}/analytics/${analysisId}`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || 'Failed to retrieve report data');
    }

    return await response.json();
  },

  // Logout utility
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
  }
};
