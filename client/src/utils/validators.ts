export const validators = {
  required: (value) => value ? null : `Required!`,

  maxLength: (max) => (value) => value.length > max ? `Max length ${max} characters!` : null,

  minLength: (min) => (value) => value.length < min ? `Min length ${min} characters!` : null,
  
  email: (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? null : `Wrong email format!`,
  
  sameValues: (value1, errorText) => (value2) => value1 === value2 ? null : errorText,
}