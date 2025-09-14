class InMemoryStore {
  constructor() {
    this.collections = {
      invitations: [],
      galleries: [
        {
          id: 1,
          imgUrl: 'https://source.unsplash.com/400x300/?wedding,couple',
          desc: '웨딩 포토 1',
          uploadedAt: new Date()
        },
        {
          id: 2,
          imgUrl: 'https://source.unsplash.com/400x300/?wedding,bride',
          desc: '웨딩 포토 2',
          uploadedAt: new Date()
        },
        {
          id: 3,
          imgUrl: 'https://source.unsplash.com/400x300/?wedding,love',
          desc: '웨딩 포토 3',
          uploadedAt: new Date()
        }
      ],
      guestbooks: [],
      accounts: []
    };
  }

  // Collection methods
  find(collection) {
    return Promise.resolve(this.collections[collection] || []);
  }

  findOne(collection, query = {}) {
    const item = (this.collections[collection] || []).find(item => 
      Object.entries(query).every(([key, value]) => item[key] === value)
    );
    return Promise.resolve(item || null);
  }

  create(collection, data) {
    const newItem = {
      ...data,
      id: Date.now(),
      createdAt: new Date()
    };
    this.collections[collection] = this.collections[collection] || [];
    this.collections[collection].push(newItem);
    return Promise.resolve(newItem);
  }

  // Additional methods as needed
}

// Singleton instance
const store = new InMemoryStore();

module.exports = store;