export default {
  get: (index) => {
    const obj = localStorage.getItem(index);
    return obj ? JSON.parse(obj) : null;
  },
  set: (index, object) => {
    localStorage.setItem(index, JSON.stringify(object));
  },
  getSession: (index) => {
    const obj = sessionStorage.getItem(index);
    return obj ? JSON.parse(obj) : null;
  },
  setSession: (index, object) =>
    sessionStorage.setItem(index, JSON.stringify(object)),
  getTemp: () => {
    const obj = sessionStorage.getItem("temp");
    return obj ? JSON.parse(obj) : null;
  },
  setTemp: (object) => sessionStorage.setItem("temp", JSON.stringify(object)),
  clearTemp: sessionStorage.removeItem("temp"),
  clear: () => {
    localStorage.clear();
    sessionStorage.clear();
  },
};
