const API_BASE = '/api';

export const api = {
  async signup(name, email, password) {
    try {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      return data;
    } catch (err) {
      throw new Error(err.message || 'Network error during signup');
    }
  },

  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return data;
    } catch (err) {
      throw new Error(err.message || 'Network error during login');
    }
  },

  async logout() {
    try {
      const response = await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Logout failed');
      }

      return data;
    } catch (err) {
      throw new Error(err.message || 'Network error during logout');
    }
  },

  async checkAuth() {
    try {
      const response = await fetch('/api/auth/check', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Auth check error:', err);
      return { authenticated: false };
    }
  },

  // Expense endpoints
  async getExpenses() {
    try {
      const response = await fetch(`${API_BASE}/expenses`, {
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load expenses');
      }

      return data;
    } catch (err) {
      throw new Error(err.message || 'Network error loading expenses');
    }
  },

  async addExpense(expenseData) {
    try {
      const response = await fetch(`${API_BASE}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(expenseData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add expense');
      }

      return data;
    } catch (err) {
      throw new Error(err.message || 'Network error adding expense');
    }
  },

  async updateExpense(id, expenseData) {
    try {
      const response = await fetch(`${API_BASE}/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(expenseData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update expense');
      }

      return data;
    } catch (err) {
      throw new Error(err.message || 'Network error updating expense');
    }
  },
  async deleteExpense(id) {
    const response = await fetch(`${API_BASE}/expenses/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `Failed to delete, status ${response.status}`);
  }
  return data;
  },
};
