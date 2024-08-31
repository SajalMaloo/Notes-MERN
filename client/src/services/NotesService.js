class NotesService {
  baseUrl = import.meta.env.VITE_SERVER_URL;

  async getAllNotes() {
    try {
      const response = await fetch(`${this.baseUrl}/api/notes`);

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  async getNote(id) {
    try {
      const response = await fetch(`${this.baseUrl}/api/notes/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  async updateNote(id, payload) {
    try {
      const response = await fetch(`${this.baseUrl}/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  async deleteNote(id) {
    try {
      const response = await fetch(`${this.baseUrl}/api/notes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  async addNote(payload) {
    try {
      const response = await fetch(`${this.baseUrl}/api/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
}

const NotesServiceInstance = new NotesService();
export default NotesServiceInstance;