import {appReducer} from "./AppReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {all} from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'
import {appWatcherSaga} from "./app-saga";
const rootReducer = combineReducers({
    convert: appReducer,
})


const   sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher)

function* rootWatcher () {
    yield all([appWatcherSaga()])
}

export type AppRootStateType = ReturnType<typeof rootReducer>
