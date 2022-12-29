import { useState, useRef, useCallback, useEffect } from 'react'

type NewStateT<T> = T extends Function ? never : (T | ((prop: T) => T))

export default function useStateWithCallback<T>(initState: T) {
   const [state, setState] = useState<T>(initState)
   const cbRef = useRef<((prop: T) => void) | undefined>(undefined)

   const updateState = useCallback((newState: NewStateT<T>, cb?: (prop: T) => void) => {
      cbRef.current = cb
      setState(prev => typeof newState === `function` ? newState(prev) : newState)
   }, [])

   useEffect(() => {
      if (cbRef.current) {
         cbRef.current(state)
         cbRef.current = undefined
      }
   }, [state])

   return [state, updateState] as const
}
