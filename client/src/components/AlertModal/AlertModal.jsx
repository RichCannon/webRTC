import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { showAlertSelector } from '../../logic/appLogic/appSelector'
import * as Styles from './AlertModalStyles'
import { appActions } from '../../logic/appLogic/appReducer'

export const AlertModal = () => {
  const { isVisible, message, type } = useSelector(showAlertSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    let timeoutid
    if (isVisible) {
      timeoutid = setTimeout(() => dispatch(appActions.hideAlert()), 5000)
    }
    return () => {
      clearTimeout(timeoutid)
    }
  }, [isVisible])

  return (
    <Styles.Container type={type} isVisible={isVisible}>
      {message}
    </Styles.Container>
  )
}

