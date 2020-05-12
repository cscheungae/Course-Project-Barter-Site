const mongoose = require('mongoose');
const Item = mongoose.model('item');

module.exports = (app) => {

    /// GET ALL ITEMS
    /// INPUT: [none]
    /// OUTPUT: LIST OF ITEMS in ItemScheme
    app.get('/item/all', async (req, res) => {
        let items = await Item.find({});
        return res.status(200).send(items);
    });

    /// GET SPECIFIC ITEM
    /// INPUT: [itemId: String]
    /// OUTPUT: ITEM instance in ItemScheme
    app.get(`/item/id/:itemId`, async (req, res) => {
        const { itemId } = req.params;

        // check if the itemId matches the objectId format (validation)
        if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({ message: "Invalid itemId" });
        }
        let item = await Item.findOne({ _id: itemId });

        if (item == undefined) return res.status(404).send({ message: "item does not exist." });
        else return res.status(200).send(item);
    });

    /// ADD (SELL) ITEM
    /// INPUT: [name: String, description: String, owner: UserSchema]
    /// OUTPUT: success code 200
    app.post('/item/add', async (req, res) => {
        const { name, description, owner } = req.body;

        if (!!name == false || !!description == false || !!owner == false) {
            return res.status(400).send({ message: "Invalid parameter(s)" });
        }

        let result = await Item.create({
            name: name,
            description: description,
            owner: owner,
            buyers: []
        });
        return res.status(200).send(result);
    });

    /// BUY (ADD/ keep TO BUYER LIST) ITEM
    /// INPUT: [itemId: string, name (username): String, phone: String]
    app.post('/item/buy', async (req, res) => {
        const { itemId, name, phone } = req.body;
        let buyer = { name: name, phone: phone };

        if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({ message: "Invalid itemId" });
        }

        // query for the item first
        let item = await Item.findOne({ _id: itemId });
        if (item == undefined)
            return res.status(404).send({ message: "Item does not exist." });
        // update the item

        if (item.buyers.filter(user => (user.name == buyer.name && user.phone == buyer.phone)).length == 0) {
            let newBuyers = item.buyers;
            newBuyers.push(buyer);
            item.buyers = newBuyers;
            item.save((err) => {
                if (err == undefined)
                    return res.status(200).send({ message: "Item is kept." });
                else {
                    console.log(`/item/buy - ${err}`);
                    return res.status(500).send({ message: "unable to buy item." });
                }
            });
        } else {
            return res.status(200).send({ message: "already bought" });
        }
    });


}