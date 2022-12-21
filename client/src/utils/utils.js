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



export const validFormCheck = (values, validAndNames) => {
    const errors = {}
    console.log(validAndNames)
    
    for (const [name, validators] of Object.entries(validAndNames)) {
        if (!Array.isArray(validators)) {
            const error = validators(values[name])
            if (error) {
                errors[name] = error
            }
        }
        else {
            for (let i = 0; i < validators.length; i++) {
                const validator = validators[i]
                const error = validator(values[name])
                if (error) {
                    errors[name] = error
                    break
                }
            }
        }
    }

    return isEmptyObjectValues(errors) ? null : errors;
}