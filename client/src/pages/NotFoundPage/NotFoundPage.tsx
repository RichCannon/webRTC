import { useHistory } from "react-router"

import * as Styled from './NotFoundPageStyles'

const NotFoundPage = () => {
   const history = useHistory()
   return (
      <Styled.Container>
         <h1>
            NotFoundPage
         </h1>
         <button onClick={() => history.replace(`/`)}>GO TO MAIN PAGE</button>
      </Styled.Container>
   )
}

export { NotFoundPage }