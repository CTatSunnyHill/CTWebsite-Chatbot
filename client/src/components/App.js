import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import About from './pages/About'
import Header from './Header'
import Chatbot from './chatbot/Chatbot'
import Technologies from './services/Tech'
import Support from './pages/Support'
import Research from './pages/CurrentResearch'

const App = () => (
        <div>
            <BrowserRouter>
            <div className="container">
                <Header/>
                <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/Our Team" element={<About />} />
                <Route path="/Technologies" element={<Technologies />} />
                <Route path="/Support" element={<Support />} />
                <Route path="/Research" element={<Research />} />
                </Routes>
                <Chatbot/>
            </div>
            </BrowserRouter>
        </div>
    )
export default App