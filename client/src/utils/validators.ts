export const validators = {
  required: (value) => value ? null : `Required!`,

  maxLength: (value, max) => value.length > max ? `Max length ${max} characters!` : null,

  minLength: (value, min) => value.length < min ? `Min length ${min} characters!` : null,
  
  email: (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? null : `Wrong email format!`,
}