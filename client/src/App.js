import { React, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ShopPage from './pages/ShopPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";

//Add Auth Check here.


function App() {

    //Create states here
    const [userSignedIn, setUserSignedIn] = useState();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserSignedIn(user.uid)
        } else {
            setUserSignedIn("")
        }
    });

    return (
        <div>
            {userSignedIn ? <BrowserRouter>
                <Header />
                <Routes>
                    <Route exact path="/shop" element={<ShopPage />} />
                    <Route exact path="/checkout" element={<CheckoutPage />} />
                    <Route exact path="/payment" element={<PaymentPage user={userSignedIn} />} />
                    <Route
                        path="*"
                        element={<Navigate to="/shop" replace />}
                    />
                </Routes>
                <Footer />
            </BrowserRouter> : (<LoginPage />)}
        </div>

    );
}

export default App;