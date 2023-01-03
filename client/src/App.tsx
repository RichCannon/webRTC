import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from "styled-components"
import createSagaMiddleware from '@redux-saga/core';

// Reducers 
import roomReducer from './logic/roomLogic/roomReducer'
import userReducer from './logic/userLogic/userReducer'
import appReducer from './logic/appLogic/appReducer';
// Components
import { AppRouter } from './AppRouter';
import { Global } from './assets/styles/Global';
import { AlertModal } from './components/AlertModal/AlertModal';

import { theme } from "./assets/styles/theme"



const reducer = combineReducers({
   room: roomReducer,
   user: userReducer,
   app: appReducer
})

const sagaMiddleware = createSagaMiddleware()


const store = configureStore({
   reducer,
   middleware: applyMiddleware(sagaMiddleware)
})

function App() {
   return (
      <Provider store={store}>
         <ThemeProvider theme={theme}>
            <Global />
            <AlertModal />
            <AppRouter />
         </ThemeProvider>
      </Provider>
   );
}



export default App;
