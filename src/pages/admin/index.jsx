import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import AddProduct  from '../../components/AddProduct/index.jsx'
import ListProduct from '../../components/ListProduct/index.jsx'

import './index.css'

const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar />
        <Routes>
            <Route path='/addproduct' element={<AddProduct/>}></Route>
            <Route path='/listproduct' element={<ListProduct/>}></Route>
        </Routes>
    </div>
  )
}

export default Admin

