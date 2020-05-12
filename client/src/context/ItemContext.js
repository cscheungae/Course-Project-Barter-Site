import React, { createContext, useState } from 'react';
import ItemService from '../services/ItemService';

export const ItemContext = createContext();

const ItemContextProvider = (props) => {
    const [items, setItems] = useState([]);

    const requestItems = async (cb) => {
        let items = await ItemService.getAll();
        setItems(items);
        cb();
    }

    const keepItem = async (name, phone, itemId, cb) => {
        await ItemService.keepItem(name, phone, itemId);
        cb();
    }

    const sellItem = async (params) => {
        const { userIdentity, productInfo, cb } = params;
        await ItemService.sellItem(userIdentity, productInfo);
        cb();
    }

    const matchItem = async (userIdentity, cb) => {
        let res = await ItemService.matchItem(userIdentity);
        cb();
        return res;
    }

    const deleteTrans = async (giveItemId, tradeItemId, cb) => {
        await ItemService.deleteTrans(giveItemId, tradeItemId);
        cb();
    }

    return <ItemContext.Provider value={{ items, setItems, requestItems, keepItem, sellItem, matchItem, deleteTrans }}>
        {props.children}
    </ItemContext.Provider>
}

export default ItemContextProvider;