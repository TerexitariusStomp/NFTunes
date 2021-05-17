import React from 'react';
import Footer from '../Footer'
import Marketplace from "../Marketplace"
import TokenData from "../TokenData"
import "./Marketplace.css"
import {AuthCluster} from "../AuthCluster"

export default function Products(){
    return (
       <div className = "market">
           <div className = "bg-image"></div>
            <AuthCluster/>
            <div className="marketItems">
            <Marketplace/>
            </div>
            <Footer/>
       </div>

        
    )

}