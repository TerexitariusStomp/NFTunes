
import SongClip from 0x8c70a3919b2eae8a

pub fun main() : {String : String} {
    let nftOwner = getAccount(0x8c70a3919b2eae8a)
    // log("NFT Owner")   
    let capability = nftOwner.getCapability<&{SongClip.NFTReceiver}>(/public/NFTReceiver)

    let receiverRef = capability.borrow()
        ?? panic("Could not borrow the receiver reference")

    return receiverRef.getMetadata(id: 1)
}