import SongClip from 0x8c70a3919b2eae8a
import FungibleToken from 0x8c70a3919b2eae8a
import Marketplace from 0x8c70a3919b2eae8a

transaction {

    prepare(acct: AuthAccount) {


        var sale = acct.borrow<&Marketplace.SaleCollection>(from: /storage/NFTForSale)!
        let collectionRef = acct.borrow<&SongClip.Collection>(from: /storage/NFTCollection)
            ?? panic("Could not borrow owner's nft collection reference")
        let token <- collectionRef.withdraw(withdrawID: 3)
        sale.listForSale(token: <-token, price: 900.0)


        log("Sale Created for account 1. Selling NFT 1 for 10 tokens")

    }
}