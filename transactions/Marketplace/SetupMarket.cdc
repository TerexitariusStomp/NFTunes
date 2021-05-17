

import SongClip from 0x8c70a3919b2eae8a
import FungibleToken from 0x8c70a3919b2eae8a
import Marketplace from 0x8c70a3919b2eae8a

transaction {

    prepare(acct: AuthAccount) {
        let receiver = acct.getCapability<&{FungibleToken.Receiver}>(/public/MainReceiver)
        let sale <- Marketplace.createSaleCollection(ownerVault: receiver)
        acct.save(<-sale, to: /storage/NFTForSale)
        acct.link<&Marketplace.SaleCollection{Marketplace.SalePublic}>(/public/NFTForSale, target: /storage/NFTForSale)
        log("Worked")
    }
}