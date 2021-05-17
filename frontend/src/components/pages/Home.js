import React from 'react';
//import '../../App.css';
import Carousel from '../Carousel';
import HeroSection from '../HeroSection';
import Footer from '../Footer'
import "./home.css"
import {AuthCluster} from "../AuthCluster"
function Home() {

    return(

        <div className = "homeSec">   
             <AuthCluster/>  
            <HeroSection />
           {/*} <Carousel/>*/}
            <Footer/>
        </div>
    )
}

export default Home;