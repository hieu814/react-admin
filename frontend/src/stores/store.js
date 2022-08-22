import { createStore } from 'redux'
import { configureStore } from "@reduxjs/toolkit";
import global from "../stores/global/globalSlice"
const initialState = {
  sidebarShow: true,
}
const rootReducer = {
	global

};
const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}
const store = configureStore({
	reducer: rootReducer,
});
// const store = createStore(changeState) 
export default store
