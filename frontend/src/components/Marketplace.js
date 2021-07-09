import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"
import "./Marketplace.css"
import RecordItem from "./recordItem"
const Marketplace = () => {
  const [tokensToSell, setTokensToSell] = useState([])
  useEffect(() => {
    checkMarketplace();
  }, []);

  const checkMarketplace = async () => {
    try {
      const encoded = await fcl.send([
        fcl.script`
        import SongClip from 0x8c70a3919b2eae8a
        import FungibleToken from 0x8c70a3919b2eae8a
        import Marketplace from 0x8c70a3919b2eae8a
        
        // This script prints the NFTs that account 0x01 has for sale.
        pub fun main():[UInt64] {
            // Get the public account object for account 0x01
            let account1 = getAccount(0x8c70a3919b2eae8a)
        
            // Find the public Sale reference to their Collection
            let acct1saleRef = account1.getCapability<&AnyResource{Marketplace.SalePublic}>(/public/NFTForSale)
                .borrow()
                ?? panic("Could not borrow acct2 nft sale reference")
        
            // Los the NFTs that are for sale
            log("Account 1 NFTs for sale")
            return(acct1saleRef.getIDs())
        }
        
        `,
      ]);
      const decoded = await fcl.decode(encoded);
      //console.log("IDS: " + decoded)
      let marketplaceMetadata = [];
      for (const id of decoded) {
     
        const encodedMetadata = await fcl.send([
          fcl.script`
            import SongClip from 0x8c70a3919b2eae8a
            pub fun main(id: UInt64) : {String : String} {
              let nftOwner = getAccount(0x8c70a3919b2eae8a)  
              let capability = nftOwner.getCapability<&{SongClip.NFTReceiver}>(/public/NFTReceiver)
          
              let receiverRef = capability.borrow()
                  ?? panic("Could not borrow the receiver reference")
          
              return receiverRef.getMetadata(id: id)
            }
          `,
          fcl.args([
            fcl.arg(id, t.UInt64)    
          ])
        ]);

        const decodedMetadata = await fcl.decode(encodedMetadata);
        /*const encodedPrice = await fcl.send([
          fcl.script`
            import Marketplace from 0x8c70a3919b2eae8a
            pub fun main(id: UInt64): UFix64? {
                let account1 = getAccount(0x8c70a3919b2eae8a)
            
                let acct1saleRef = account1.getCapability<&AnyResource{Marketplace.SalePublic}>(/public/NFTSale)
                    .borrow()
                    ?? panic("Could not borrow acct nft sale reference")
            
                return acct1saleRef.idPrice(tokenID: id)
            }
          `, 
          fcl.args([
            fcl.arg(id, t.UInt64)
          ])
        ])
        const decodedPrice = await fcl.decode(encodedPrice)
        decodedMetadata["price"] = decodedPrice;*/
        marketplaceMetadata.push(decodedMetadata);
      }
      setTokensToSell(marketplaceMetadata);
    } catch (error) {
      console.log("NO NFTs FOR SALE");
      console.log("ERROR: " + error)
    }
  };

  const buyToken = async (tokenId) => {
    const txId = await fcl
    .send([
      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(50),
      fcl.args([
        fcl.arg(tokenId, t.UInt64)
      ]),
      fcl.transaction`
        import SongClip from 0x8c70a3919b2eae8a
        import NonfungibleToken from 0x8c70a3919b2eae8a
        import Marketplace from 0x8c70a3919b2eae8a
        
        transaction {
            let collectionRef: &AnyResource{SongClip.NFTReceiver}
            let temporaryVault: @NonfungibleToken.Vault
        
            prepare(acct: AuthAccount) {
                self.collectionRef = acct.borrow<&AnyResource{SongClip.NFTReceiver}>(from: /storage/NFTCollection)!
                let vaultRef = acct.borrow<&NonfungibleToken.Vault>(from: /storage/MainVault)
                    ?? panic("Could not borrow owner's vault reference")
        
                self.temporaryVault <- vaultRef.withdraw(amount: 10.0)
            }
        
            execute {
                let seller = getAccount(0x8c70a3919b2eae8a)
                let saleRef = seller.getCapability<&AnyResource{Marketplace.SalePublic}>(/public/NFTSale)
                    .borrow()
                    ?? panic("Could not borrow seller's sale reference")
        
                saleRef.purchase(tokenID: tokenId, recipient: self.collectionRef, buyTokens: <-self.temporaryVault)
            }
        }
      `,      
    ])
    const decoded = await fcl.decode(txId);
    console.log(decoded);
    console.log(fcl.tx(txId).onceSealed());
    checkMarketplace();
  }
  return (
        <div className="token-data">
        <div class="container">
          <div class="neon">RECORDS</div>
        </div>
        {
       
          tokensToSell.map(token => {
            return (
              <div className = "row">
                <div  key={token.uri}>
                    <RecordItem className = "item"
                    image={`https://ipfs.io/ipfs/${token.cover.split("://")[1]}`}
                    src={`https://ipfs.io/ipfs/${token.uri.split("://")[1]}`}
                    artist = {token.artist}
                    album= {token.album}
                    song={token.song}
                    lyric= {token.lyric}
                    />
                </div>
              </div>
            )
            
          })
          
        }
        <div className="shelf"></div>
        </div>
    
  );
};

export default Marketplace;