export const validators = {
  required: (value: string | undefined) => value ? null : `Required!`,

  maxLength: (max: number) => (value: string  | undefined) => value && value.length > max ? `Max length ${max} characters!` : null,

  minLength: (min: number) => (value: string | undefined ) => value && value.length < min ? `Min length ${min} characters!` : null,
  
  email: (value: string | undefined) => value && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? null : `Wrong email format!`,
  
  sameValues: (value1: string , errorText: string | undefined ) => (value2: string ) => value1 === value2 ? null : errorText,
} as const
