import { useState, useRef, useCallback, useEffect } from 'react'

const useStateWithCallback = initState => {
   const [state, setState] = useState(initState)
   const cbRef = useRef(null)

   const updateState = useCallback((newState, cb) => {
      cbRef.current = cb
      setState(prev => typeof newState === `function` ? newState(prev) : newState)
   }, [])

   useEffect(() => {
      if (cbRef.current) {
         cbRef.current(state)
         cbRef.current = null
      }
   }, [state])

   return [state, updateState]
}

export default useStateWithCallback