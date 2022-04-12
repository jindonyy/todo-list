class BoardStore {
  constructor() {
    this.boardState;
    this.observers = new Set();
  }

  async getInitialData() {
    const response = await fetch('./mockData.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }

  async setState() {
    this.boardState = await this.getInitialData();
  }

  addObserver(observer) {
    this.observers.add(observer);
  }

  async observe(columnName, value) {
    await this.setColumnState(columnName);
    this.observers.forEach(observer => {
      observer.notify(this.boardState.columnName, value);
    });
  }
}

export { BoardStore };
