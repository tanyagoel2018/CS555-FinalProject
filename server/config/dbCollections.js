import { getClient } from "./dbConnection.js";
const getCollectionFn = (collection) => {
    let _col = undefined;
  
    return async () => {
      if (!_col) {
         const db = await getClient()
        _col = await db.collection(collection);
      }
  
      return _col;
    };
  };
   
export const users = getCollectionFn('Users');
export const products = getCollectionFn('Products');
  