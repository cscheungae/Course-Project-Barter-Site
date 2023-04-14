const mongoose = require('mongoose');
const Item = mongoose.model('item');
const _ = require('lodash');

module.exports = (app) => {

    /// MATCH: find any possible transaction
    /// INPUT: [name (username): String, phone: String]
    /// OUTPUT: [ { owner, owner's item, buyer, buyer's item } ]
    /// If that single owner's item matches more than one buyers' item
    /// each matches will have sinegle output
    /// owner/ buyer: {name, phone}
    /// owner's/ buyer's item: {_id, name, description }
    app.get('/trans/match', async (req, res) => {
        console.log(`trans/match - query: name ${req.query.name}, phone ${req.query.phone}`);
        // obtain all the parameters
        const { name, phone } = req.query;
        let owner = { name: name, phone: phone };
        // get all the items owned by the user
        let ownerItems = await Item.find({ owner: owner });
        // initialize the result 
        let matches = [];
        // if the owner does not own any items, barter can't happen
        if (ownerItems.length == 0) {
            return res.status(200).send({
                message: `${matches.length} is found.`,
                result: { amount: matches.length, transactions: matches }
            });
        }
        // for each items, for each buyer, check their owned item's buyers list 
        // includes this user, if yes return the the item 
        for (let i = 0; i < ownerItems.length; i++) {
            let ownerItem = ownerItems[i];
            for (let j = 0; j < ownerItem.buyers.length; j++) {
                let buyer = ownerItem.buyers[j];
                let buyerItems = await Item.find({ owner: { name: buyer.name, phone: buyer.phone } });
                for (let k = 0; k < buyerItems.length; k++) {
                    let buyerItem = buyerItems[k];
                    if (buyerItem.buyers.filter(user => (user.name == owner.name && user.phone == owner.phone)).length > 0) {
                        let simplifiedOwnerItem = _.cloneDeep(ownerItem);
                        simplifiedOwnerItem.buyers = undefined;     // remove the uncessary parts for cleaner output
                        let simplifiedBuyerItem = _.cloneDeep(buyerItem);
                        simplifiedBuyerItem.buyers = undefined;
                        matches.push(
                            {
                                give: {
                                    owner: owner,
                                    item: simplifiedOwnerItem
                                },
                                trade: {
                                    buyer: buyer,
                                    item: simplifiedBuyerItem
                                }
                            }
                        );
                    }
                }
            }
        }

        return res.status(200).send({
            message: `${matches.length} match${matches.length > 1 ? 'es are' : ' is'} found.`,
            result: { amount: matches.length, transactions: matches }
        });
    });

    /// COMPLETE: remove any related products of this transaction
    /// INPUT: [itemId of the give side, itemId of the trade side]
    /// OUTPUR: success code 200
    app.delete('/trans/complete', async (req, res) => {
        const { giveItemId, tradeItemId } = req.query;

        // check if the itemId matches the objectId format (validation)
        if (!giveItemId.match(/^[0-9a-fA-F]{24}$/) || !tradeItemId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({ message: "Invalid itemId(s)" });
        }

        await Item.deleteOne({ _id: giveItemId });
        await Item.deleteOne({ _id: tradeItemId });

        return res.status(200).send({ message: "transaction completed." });
    });
}