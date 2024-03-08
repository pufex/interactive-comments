
export const fetchData = (key = "") => {
    if(!localStorage.getItem(key))
        localStorage.setItem(key, "[]")
    return JSON.parse(localStorage.getItem(key));
}

export const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}
