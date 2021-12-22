import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { showAlertSelector } from '../../logic/appLogic/appSelector'
import * as Styles from './AlertModalStyles'
import appActions from '../../logic/appLogic/appReducer'

export const AlertModal = () => {

  const { isVisible, errorMessage } = useSelector(showAlertSelector)

  useEffect(() => {
    setTimeout(() => appActions.hideAlert, 1000)
  }, [])

  return (
    <Styles.Container isVisible={isVisible}>
      {errorMessage}
    </Styles.Container>
  )
}

