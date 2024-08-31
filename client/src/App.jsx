import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home/index.jsx';
import About from './routes/About/index.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AddNote from './components/AddNote.jsx';
import UpdateNote from './components/UpdateNote.jsx';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/note/:id" element={<UpdateNote />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App;
