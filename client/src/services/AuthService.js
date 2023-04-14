const axios = require('axios');

export default {
    getAll: async () => {
        let res = await axios.get(`/api/product`);
        return res.data || [];
    },
    register: async (identity) => {
        const { username, password, phone } = identity;
        await axios.post('/user/reg', { name: username, password, phone });
        return true;
    },
    login: async (identity) => {
        const { username, password, phone } = identity;
        try {
            let res = await axios.post('/user/login', { name: username, password, phone });
            if (res.status === 200) return true;
            else return false;
        } catch(err) {
            return err; 
        }
    },
}