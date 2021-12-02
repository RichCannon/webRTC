export const validators = {
  required: (value) => value ? `Required!` : ``,

  maxLength: (value, max) => value.length > max ? `Max length ${max}!` : ``,

  minLength: (value, min) => value.length < min ? `Min length ${min}!` : ``,
  
  email: (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? `` : `Wrong email format!`,
}