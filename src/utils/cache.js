
export class LocalCache {
  /**
   * true为localStorage，false为sessionStorage
   * @param {*} islocalStorage
   */
  constructor(islocalStorage = true) {
    this.storage = islocalStorage ? window.localStorage : window.sessionStorage;
  }
  setCache(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }
  getCache(key) {
    if (!key) return;
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  deleteCache(key) {
    this.storage.removeItem(key);
  }
  clearCache() {
    this.storage.clear();
  }
}
export default new LocalCache(false);