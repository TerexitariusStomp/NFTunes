import React from 'react';
import './Account.css'
import {AuthCluster} from "../AuthCluster"
import Footer from '../Footer'
import AccountInfo from "../AccountInfo"
export default function Products(){
   

    return (
        <div className = "accountPage">
            <AuthCluster/>
            <AccountInfo/>
            <Footer/>
        </div>
       
    )
}
