type ErrosT<T extends string | number | symbol> = {[key in T]?: string}
type DefaultValidFuncT = (value: string | undefined) => string | null
type ValidAndNamesT = DefaultValidFuncT[] | DefaultValidFuncT

export const isEmptyObject = (obj: object) => {
    for (let _ in obj) {
        return false;
    }
    return true;
}

export const isEmptyObjectValues = (obj: object) => {
    for (let key in obj) {
        if (obj[key]) return false
    }
    return true;
}


export function validFormCheck<T extends string | number | symbol>(values: {[key in T]: string}, validAndNames: {[key in T]: ValidAndNamesT}): ErrosT<T> | null {
    const errors: ErrosT<T> = {}
 
    for (const [name, validators] of Object.entries<ValidAndNamesT>(validAndNames)) {
        if (!Array.isArray(validators)) {
            const error = validators(values[name as T])
            if (error) {
                errors[name as T] = error
            }
        }
        else {
            for (let i = 0; i < validators.length; i++) {
                const validator = validators[i]
                const error = validator(values[name as T])
                if (error) {
                    errors[name as T] = error
                    break
                }
            }
        }
    }

    return isEmptyObjectValues(errors) ? null : errors;
}