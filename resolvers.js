const resolvers = {
    Query: {
      users: async (_, __, { db }) => {
        // Fetch all users from the database
        return db.query('SELECT * FROM users').then(res => res.rows);
      },
      events: async (_, __, { db }) => {
        // Fetch all events from the database
        return db.query('SELECT * FROM events').then(res => res.rows);
      },
      event: async (_, { id }, { db }) => {
        // Fetch a single event by ID from the database
        return db.query('SELECT * FROM events WHERE id = $1', [id]).then(res => res.rows[0]);
      },
    },
    Mutation: {
      createUser: async (_, { username, email }, { db }) => {
        // Insert a new user into the database
        return db.query('INSERT INTO users(username, email) VALUES($1, $2) RETURNING *', [username, email])
          .then(res => res.rows[0]);
      },
      createEvent: async (_, { title, description, date, createdBy }, { db }) => {
        // Insert a new event into the database
        return db.query('INSERT INTO events(title, description, date, created_by) VALUES($1, $2, $3, $4) RETURNING *', [title, description, date, createdBy])
          .then(res => res.rows[0]);
      },
    },
    User: {
      events: async (user, _, { db }) => {
        // Fetch events created by a user
        return db.query('SELECT * FROM events WHERE created_by = $1', [user.id]).then(res => res.rows);
      },
    },
    Event: {
      createdBy: async (event, _, { db }) => {
        // Fetch the user who created an event
        return db.query('SELECT * FROM users WHERE id = $1', [event.created_by]).then(res => res.rows[0]);
      },
    },
  };
  
  module.exports = resolvers;