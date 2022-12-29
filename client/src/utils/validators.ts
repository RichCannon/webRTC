export const validators = {
  required: (value: string | undefined) => value ? null : `Required!`,

  maxLength: (max: number) => (value: string  | undefined) => value && value.length > max ? `Max length ${max} characters!` : null,

  minLength: (min: number) => (value: string | undefined ) => value && value.length < min ? `Min length ${min} characters!` : null,
  
  email: (value: string | undefined) => value && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? null : `Wrong email format!`,
  
  sameValues: (value1: string | undefined , errorText: string ) => (value2: string | undefined ) => value1 === value2 ? null : errorText,
} as const
