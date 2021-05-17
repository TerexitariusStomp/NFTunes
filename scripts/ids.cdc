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
