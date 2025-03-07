import React, { useState } from 'react'
import './App.css'
import Landing from "./components/Landing/landing"
import DisplayNames from "./components/Display/DisplayNames"
import { Routes, Route } from "react-router-dom"
import AddName from './components/AddName/AddName'

function App() {

    return (
    	<>
		<Landing />	
		
		<Routes>
			<Route path="/viewnames" element={<DisplayNames />} />
			<Route path="/addnames" element={<AddName />} />
		</Routes>
    	
		</>
    )
}

export default App;