import SongClip from 0x8c70a3919b2eae8a

transaction {
  let receiverRef: &{SongClip.NFTReceiver}
  let minterRef: &SongClip.NFTMinter

  prepare(acct: AuthAccount) {
      self.receiverRef = acct.getCapability<&{SongClip.NFTReceiver}>(/public/NFTReceiver)
          .borrow()
          ?? panic("Could not borrow receiver reference")        
      
      self.minterRef = acct.borrow<&SongClip.NFTMinter>(from: /storage/NFTMinter)
          ?? panic("could not borrow minter reference")
  }

  execute {
      let metadata : {String : String} = {
        "artist": "Drake",
        "song": "Hotline Bling",
        "lyric": "I know when that hotline bling",
        "rating": "rare",
        "cover": "ipfs://QmbX7ZQzg2DYVYZjBRTYYATNCZznybuiPAU7ms1cokmtGm",
        "uri": "ipfs://QmNfnyvdPJ9oMAjaQnprExm2xXXUN87sV1tYUC9JQdQBgh"
      }
      let newNFT <- self.minterRef.mintNFT()
  
      self.receiverRef.deposit(token: <-newNFT, metadata: metadata)

      log("NFT Minted and deposited to Account 2's Collection")
  }
}