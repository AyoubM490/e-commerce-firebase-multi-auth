import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";

function Header() {
    const { totalCount } = useSelector((state) => state.store);

    function logout() {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Signing Out")
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <AppBar position="static">
            <Toolbar className='toolbar' >
                <Typography variant="overline"> My Store</Typography>
                <div className='nav-links'>
                    <Link className='link' to="/shop" >
                        <Typography style={{ marginRight: "10px" }} variant="overline">Shop</Typography>
                    </Link>
                    <Link className='link' to="/checkout">
                        <Typography variant="overline">Cart</Typography>
                        <Typography variant="overline" style={{ fontWeight: "bold" }}>({totalCount})</Typography>
                    </Link>
                    <div className="logout-button" onClick={logout}>LOGOUT</div>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;