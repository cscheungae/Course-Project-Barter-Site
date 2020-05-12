const axios = require('axios');

export default {
    getAll: async () => {
        let res = await axios.get(`/item/all`);
        return res.data || [];
    },
    keepItem: async (name, phone, itemId) => {
        await axios.post(`/item/buy`, { name, phone, itemId });
    },
    sellItem: async (userIdentity, productInfo) => {
        await axios.post(`/item/add`, {
            name: productInfo.name,
            description: productInfo.description,
            owner: userIdentity
        });
    },
    matchItem: async (userIdentity) => {
        let res = await axios.get(`/trans/match`, {
            params: {
                name: userIdentity.name,
                phone: userIdentity.phone
            }
        });
        return res.data["result"]["transactions"] || [];
    },
    deleteTrans: async (giveItemId, tradeItemId) => {
        await axios.delete(`/trans/complete`, {
            params: { giveItemId, tradeItemId }
        });
    }
}