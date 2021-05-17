import React, {useState, useEffect} from 'react';
import {useCurrentUser} from "../hooks/current-user"
import {useProfile} from "../hooks/profile"
import './Account.css';


function AccountInfo({address}) {
    const profile = useProfile(address)
    const cu = useCurrentUser()
    useEffect(() => profile.refetch(), [address])
    if (address == null) return null
    return (
        <div className='account-container'>
            <h1>Hello</h1>
        </div>
    )
}

export default AccountInfo
