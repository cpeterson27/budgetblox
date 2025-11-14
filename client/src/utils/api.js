const API_BASE = '/api';

export const api = {
  async signup(name, email, password) {
    try {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content‑Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const contentType = response.headers.get('content‑type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || 'Signup failed (non‑JSON response)');
      }

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
        headers: { 'Content‑Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get('content‑type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || 'Login failed (non‑JSON response)');
      }

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

      const contentType = response.headers.get('content‑type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || 'Logout failed (non‑JSON response)');
      }

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
      const response = await fetch(`${API_BASE}/auth/check`, {
        method: 'GET',
        credentials: 'include',
      });

      const contentType = response.headers.get('content‑type') || '';
      if (!response.ok) {
        // If non‑ok, attempt JSON else fallback
        if (contentType.includes('application/json')) {
          const errorData = await response.json();
          return {
            authenticated: false,
            message: errorData.message || `Status ${response.status}`,
          };
        } else {
          const text = await response.text();
          return {
            authenticated: false,
            message: text || `Status ${response.status}`,
          };
        }
      }

      if (!contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON but got: ${text}`);
      }

      const data = await response.json();
      // Ensure shape: { authenticated: boolean, maybe user, maybe message }
      return data;
    } catch (err) {
      console.error('Auth check error:', err);
      return { authenticated: false, message: err.message };
    }
  },

  // Expense endpoints
  async getExpenses() {
    try {
      const response = await fetch(`${API_BASE}/expenses`, {
        method: 'GET',
        credentials: 'include',
      });

      const contentType = response.headers.get('content‑type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || 'Failed to load expenses (non‑JSON response)');
      }

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
        headers: { 'Content‑Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(expenseData),
      });

      const contentType = response.headers.get('content‑type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || 'Failed to add expense (non‑JSON response)');
      }

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
        headers: { 'Content‑Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(expenseData),
      });

      const contentType = response.headers.get('content‑type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || 'Failed to update expense (non‑JSON response)');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update expense');
      }

      return data;
    } catch (err) {
      throw new Error(err.message || 'Network error updating expense');
    }
  },

  async deleteExpense(id) {
    try {
      const response = await fetch(`${API_BASE}/expenses/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const contentType = response.headers.get('content‑type') || '';
      let data = {};
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // If nothing or HTML, fallback to empty obj
        await response.text();
      }

      if (!response.ok) {
        throw new Error(
          data.message || `Failed to delete, status ${response.status}`,
        );
      }

      return data;
    } catch (err) {
      throw new Error(err.message || `Network error deleting expense`);
    }
  },
};
