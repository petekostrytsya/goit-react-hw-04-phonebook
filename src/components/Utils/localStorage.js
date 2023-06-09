const loadLocalStorage = key => {
    const loadLocalStorageState = localStorage.getItem(key);
    return loadLocalStorageState === null ? undefined : JSON.parse(loadLocalStorageState);  
};

const saveLocalStorage = (key, value) => {
    const saveLocalStorageState = JSON.stringify(value);
    localStorage.setItem(key, saveLocalStorageState);
};

const removeLocalStorage = key => {
    localStorage.removeItem(key);
};

export { loadLocalStorage, saveLocalStorage, removeLocalStorage };