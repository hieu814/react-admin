import { createStore } from 'redux'
import { configureStore } from "@reduxjs/toolkit";
import global from "../stores/global/globalSlice"
import exam from "../stores/exam/examSlice"
const initialState = {
  sidebarShow: true,
}
const rootReducer = {
	global,
  exam

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
