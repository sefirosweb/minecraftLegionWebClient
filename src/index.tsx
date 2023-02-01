import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './routes/App';
import reportWebVitals from './reportWebVitals';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers/reducers_index'
import { BrowserRouter } from 'react-router-dom';


const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);


const store = createStore(
  reducers, // Todos los reducers
  {}, // Estado inicial
  applyMiddleware(reduxThunk)
)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
