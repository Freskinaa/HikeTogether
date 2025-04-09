import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import {store} from "./store/store.js"
// Main entry point of the application
// This file is responsible for rendering the App component to the DOM.
// It wraps the App component with a Redux Provider to give access 
// to the Redux store throughout the app. It also ensures that React runs 
// in Strict Mode to catch potential problems in development.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App /> 
    </Provider>
  </StrictMode>,
)
