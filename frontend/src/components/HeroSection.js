import React from 'react'
import '../App.css';
import { Button } from './Button'
import './HeroSection.css';

function HeroSection() {
    return (
        <div className = 'hero-container'>
            <video className = "heroVid" src="https://ipfs.io/ipfs/QmZC6sSdT51Ci6PxDYec9KkxcZUV5RwXVs7oVruzhtUqXd" autoPlay loop muted/>
            <h1>NFTunes</h1>
            <p>Collect, Sell, Connect</p>
            <div className="hero-btns">
                <Button className = 'btns' buttonStyle='btn--outline'
                buttonSize='btn--large'>GET STARTED</Button>
                {/*<Button className = 'btns' buttonStyle='btn--primary'
                buttonSize='btn--large'>WATCH TRAILER <i className='far fa-play-circle' /></Button>*/}

            </div>
            
        </div>
    )
}

export default HeroSection
