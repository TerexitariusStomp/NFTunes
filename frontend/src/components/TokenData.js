import React, { useState } from "react";
import * as fcl from "@onflow/fcl";
import "../App.css"

const TokenData = () => {
  const [nftInfo, setNftInfo] = useState(null)
  const fetchTokenData = async () => {
    const encoded = await fcl
      .send([
        fcl.script`
        import SongClip from 0x5058d4121b9a302a
        pub fun main() : {String : String} {
          let nftOwner = getAccount(0x5058d4121b9a302a)  
          let capability = nftOwner.getCapability<&{SongClip.NFTReceiver}>(/public/NFTReceiver)
      
          let receiverRef = capability.borrow()
              ?? panic("Could not borrow the receiver reference")
      
          return receiverRef.getMetadata(id: 1)
        }
      `
      ])
    
    const decoded = await fcl.decode(encoded)
    setNftInfo(decoded)
  };
  return (
    <div className="token-data">
      <div className="center">
        <button className="btn-primary" onClick={fetchTokenData}>Fetch Token Data</button>        
      </div>
      {
        nftInfo &&
        <div>
          {
            Object.keys(nftInfo).map(k => {
              return (
                <p>{k}: {nftInfo[k]}</p>
              )
            })
          }
          <video loop={true} preload="auto" autoPlay={true} width="85%">
                  <source src={`https://ipfs.io/ipfs/${nftInfo.uri.split("://")[1]}`} type="video/mp4" />
          </video>
          <button onClick={() => setNftInfo(null)} className="btn-secondary">Clear Token Info</button>
        </div>
      }
    </div>
  );
};

export default TokenData;