import { Provider, } from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

// Reducers 
import roomReducer from './logic/roomLogic/roomReducer'
import userReducer from './logic/userLogic/userReducer'
import { AppRouter } from './AppRouter';
import { Global } from './assets/styles/Global';



const reducer = combineReducers({
   room: roomReducer,
   user: userReducer
})


const store = configureStore({
   reducer,
})

function App() {
   return (
      <Provider store={store}>
         <Global/>
         <AppRouter />
      </Provider>
   );
}



export default App;
