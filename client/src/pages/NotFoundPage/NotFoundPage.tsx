import { useHistory } from "react-router"

const NotFoundPage = () => {
   const history = useHistory()
   return (
      <>
         <h1>
            NotFoundPage
         </h1>
         <button onClick={() => history.replace(`/`)}>GO TO MAIN PAGE</button>
      </>
   )
}

export { NotFoundPage }