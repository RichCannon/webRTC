import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { showAlertSelector } from '../../logic/appLogic/appSelector'
import * as Styled from './AlertModalStyles'
import { appActions } from '../../logic/appLogic/appReducer'

const ALERT_SHOW_TIME = 5000 // ms

export const AlertModal = () => {
  const { isVisible, message, type } = useSelector(showAlertSelector)

  const dispatch = useDispatch()

  const hideAlertHandler = () => dispatch(appActions.hideAlert())

  useEffect(() => {
    let timeoutid: number
    if (isVisible) {
      timeoutid = setTimeout(hideAlertHandler, ALERT_SHOW_TIME)
    }
    return () => {
      clearTimeout(timeoutid)
    }
  }, [isVisible])

  return (
    <Styled.Container onClick={hideAlertHandler} type={type} isVisible={isVisible}>
      {message}
    </Styled.Container>
  )
}

