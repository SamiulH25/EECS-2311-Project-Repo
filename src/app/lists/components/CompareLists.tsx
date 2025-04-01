import getUniqueStores from "@/src/app/stores/queries/getUniqueStores";
import {useQuery} from "@blitzjs/rpc";

export const CompareLists = (listItems : string[] , priceTotal : Map<number,any>,itemTotal : Map<number,any>,missingItems : Map<number,any>) => {
    const [stores] = useQuery(getUniqueStores, {});
    let numOfItems = listItems.length;
    //stores the id of the best store
    let bestStoreId = 0;
    let bestStoreName = "";
    //temporaryily stores the lowest price, can be used to show the price if you want.
    let currentLowest = 0;
    //boolean for the next loops
    let hasAllItems = false;
    //offset for the number of items
    let n = 0;
    //loops till a store with (number of items in the list - n) items is found
    while (hasAllItems == false ) {
        //loops over all stores
        stores.forEach((store) => {
            //if a store with the correct number of items is found then does code or skips to next iteration
            if (itemTotal.get(store.id) == numOfItems-n) {
                //if the currentlowest has yet to be set
                if (currentLowest == 0) {
                    currentLowest = priceTotal.get(store.id);
                    bestStoreId = store.id;
                    bestStoreName = store.name;
                    hasAllItems = true;
                } //if the currentlowest has already been set then it compares the currentlowest to the price total of the store we are currrently on
                else {
                    if (currentLowest > priceTotal.get(store.id)) {
                        currentLowest = priceTotal.get(store.id);
                        bestStoreId = store.id;
                        bestStoreName = store.name;
                        hasAllItems = true;
                    }
                }
            }
        })
        //increments the offset
        n++
    }
    //returns a map containing the best stores id and name
    let result = new Map()
    result.set("bestStoreId", bestStoreId);
    result.set("bestStoreName", bestStoreName);
    return result;
}