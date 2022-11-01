import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { TableauSchemas } from './tableau'
import {RefreshSpotifyToken,SpotifyPlaylist} from './spotify'
import './index.css'

import Token from './token'


const router = createBrowserRouter([{
  path:'/',
  element:  <App />
},{
  path:'/token',
  element:  <Token />
}])



ReactDOM.createRoot(document.getElementById('root')).render(

  <RouterProvider router={router}></RouterProvider>

)
