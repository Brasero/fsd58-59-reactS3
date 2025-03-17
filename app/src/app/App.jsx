import './App.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HomePage from '../pages/HomePage'
import Error404 from '../components/Error404'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import GamePage from '../pages/GamePage';
import AuthGuard from './AuthGuard';
import LoginPage from '../pages/LoginPage';
import AdminPage from '../pages/AdminPage';
import AdminAddPastriePage from '../pages/AdminAddPastriePage';
import LogoutPage from '../pages/LogoutPage';
import AdminEditPastriePage from '../pages/AdminEditPastriePage';


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="*" element={ <Error404 /> } />
                <Route path="/" element={ <HomePage /> } />
                <Route path="/play" element={ <GamePage /> } />
                <Route path="/login" element={ <LoginPage /> } />
                <Route path="/logout" element={ <AuthGuard element={<LogoutPage />} /> } />
                <Route path="/admin" element={ <AuthGuard element={<AdminPage />} /> } />
                <Route path="/admin/pastrie/add/" element={ <AuthGuard element={<AdminAddPastriePage />} /> } />
                <Route path="/admin/pastrie/edit/:pastrieId" element={ <AuthGuard element={<AdminEditPastriePage />} /> } />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
