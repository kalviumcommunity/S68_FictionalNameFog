import React, { useState } from 'react'
import './App.css'
import Landing from "./components/Landing/landing"
import DisplayNames from "./components/Display/DisplayNames"
import { Routes, Route } from "react-router-dom"
import AddName from './components/AddName/AddName'
import EditName from './components/EditName/EditName'

function App() {

    return (
    	<>
		<Landing />	
		
		<Routes>
			<Route path="/viewnames" element={<DisplayNames />} />
			<Route path="/addnames" element={<AddName />} />
			<Route path="/editData" element={<EditName />} />
		</Routes>
    	
		</>
    )
}

export default App;