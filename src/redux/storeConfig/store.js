// ** Redux, Thunk & Root Reducer Imports
import thunk from 'redux-thunk'
import createDebounce from 'redux-debounced'
import rootReducer from '../reducers/rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage
}

// // ** init middleware
const middleware = [thunk, createDebounce()]

// // ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(...middleware)))
const persistor = persistStore(store)

export { store, persistor }

// // ** Create store
// const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)))

// export { store }
