const StorageService = {
  get: (index) => {
    const obj = localStorage.getItem(index);
    return obj ? JSON.parse(obj) : null;
  },
  set: (index, object) => {
    localStorage.setItem(index, JSON.stringify(object));
  },
  clear: () => {
    localStorage.clear();
  },
};
export default StorageService;
