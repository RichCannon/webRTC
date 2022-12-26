export const isEmptyObject = (obj) => {
    for (let key in obj) {
        return false;
    }
    return true;
}

export const isEmptyObjectValues = (obj) => {
    for (let key in obj) {
        if (obj[key]) return false
    }
    return true;
}