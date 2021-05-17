// File: ./src/auth-cluster.js
import {useCurrentUser} from "../hooks/current-user"
import {useProfile} from "../hooks/profile"
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';

function WithAuth({address}) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  }

  useEffect(() => {
    showButton()
  }, [])

  window.addEventListener('resize', showButton);
  const profile = useProfile(address)
  const cu = useCurrentUser()
  useEffect(() => profile.refetch(), [address])
  if (address == null) return null
  return !cu.loggedIn ? null : (
    <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        NFTunes <i class="fas fa-music"></i>

                    </Link>

                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />

                    </div>
                    
                    <ul className ={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/marketplace' className='nav-links' onClick={closeMobileMenu}>
                                Marketplace
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link to='/account' className='nav-links' onClick={closeMobileMenu}>
                                {profile.name}'s Account
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/' className='nav-links' onClick={cu.logOut}>
                                Sign Out
                            </Link>
                        </li>
                    </ul>
                </div>

            </nav>
        </>
    
  )
}

function SansAuth() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  }

  useEffect(() => {
    showButton()
  }, [])

  window.addEventListener('resize', showButton);

  const cu = useCurrentUser()
 
  return cu.loggedIn ? null : (
    <>
    <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                NFTunes <i class="fas fa-music"></i>

            </Link>

            <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />

            </div>
            
            <ul className ={click ? 'nav-menu active' : 'nav-menu'}>
                <li className="nav-item">
                    <Link to='/' className='nav-links' onClick={cu.logIn}>
                       Sign In
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/' className='nav-links' onClick={cu.signUp}>
                        Sign Up
                    </Link>
                </li>
                
          


            </ul>
        </div>

    </nav>
</>
    
  )
}

export function AuthCluster() {
  const cu = useCurrentUser()
  return (
    <>
      <WithAuth address={cu.addr} />
      <SansAuth />
    </>
  )
}