import React, { useState } from 'react'
import './App.css'
import Landing from "./components/Landing/landing"
import DisplayNames from "./components/Display/DisplayNames"
import { Routes, Route } from "react-router-dom"

function App() {

    return (
    	<>
		<Landing />	
		
		<Routes>
			<Route path="/viewnames" element={<DisplayNames />} />
		</Routes>
    	
		</>
    )
}

export default App;