class DatabaseError extends Error {
  constructor(
    // mesma coisa que fazer this.message = message
    public message: string,
    public error?: any
  ) {
    super(message);
  }
}

export default DatabaseError
