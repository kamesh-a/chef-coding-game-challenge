const INGRIDIENT_MAX_COUNT = 20;
const INGRIDIENT_MIN_COUNT = 1;
const DAYS_MAX_COUNT = 20;
const DAYS_MIN_COUNT = 1;
const INGRIDIENT_ITEM_CATEGORY = ['FAT', 'FIBER', 'CARB'];

function isInteger(no) {
    try {
        const num = no && parseInt(no);
        return !isNaN(num) && num;
    } catch (e) { }
}

function isIngridientInputNumberValid(noOfIngridient) {
    const no = isInteger(noOfIngridient);
    if (no && no >= INGRIDIENT_MIN_COUNT && no <= INGRIDIENT_MAX_COUNT) {
        return true;
    }
}

function isNoOfDayInputNumberValid(noOfDays) {
    const no = isInteger(noOfDays);
    if (no && no >= DAYS_MIN_COUNT && no <= DAYS_MAX_COUNT) {
        return true;
    }
}

function isIngridientNameValid(ingridientName) {
    if (ingridientName && typeof ingridientName === 'string') {
        const ingridientLength = ingridientName.length;
        const isIngridientNameIsProper = ingridientLength >= 6 && ingridientLength <= 20
        if (isIngridientNameIsProper) {
            for (let i = 0; i < INGRIDIENT_ITEM_CATEGORY.length; i++) {
                let ingridientType = INGRIDIENT_ITEM_CATEGORY[i];
                if (ingridientName.indexOf(ingridientType) !== -1) {
                    return true;
                }
            }
        }
    }
}

function getNumberOfItemsNeededInSameCategory(totalNumberOfIngridientCategory) {
    const x = (60 * totalNumberOfIngridientCategory) / 100;
    return Math.ceil(x);
}

function isIngridientAreSuffient(inHouseArr, minItemCount) {
    const currentMaterials = inHouseArr.join(',')
    const types = ['FIBER', 'FAT', 'CARB'];
    let matchType = '';
    const isSufficient = types.reduce((isItemGoodEnough, type) => {
        const reg = new RegExp(type, 'g');
        const isMatched = currentMaterials.match(reg);
        const isTypeNeccessaryQuantity = isMatched && isMatched.length >= minItemCount;
        if (!isItemGoodEnough && isTypeNeccessaryQuantity) {
            matchType = type;
            return true;
        }
        return isItemGoodEnough;
    }, false);

    return [isSufficient, matchType];
}

function pushToStockList(item, stock) {
    stock.unshift(item);
}

function removeItemFromArr(iArr, limit, type) {
    let index = iArr.length - 1;
    let stock = [];
    while (index && iArr.length > limit) {
        if (iArr[index] && iArr[index].indexOf(type) === -1) {
            const [removedItem] = iArr.splice(index, 1);
            pushToStockList(removedItem, stock);
        }
        --index;
    }
    return [stock, iArr.join(':')];
}

function createSideDish(inputs, totalDays, limit) {
    /**
     * If days or ingridient, should follow 1 <= N <= 20;
     */
    if (!isNoOfDayInputNumberValid(totalDays) || !isIngridientInputNumberValid(limit)) {
        return;
    }

    /**
     * Total number of days should be equal to items
     */
    if (inputs && inputs.length !== totalDays) {
        return;
    }

    const minItemCount = getNumberOfItemsNeededInSameCategory(limit);
    let finalOutput = '';
    // The loop should run the number of days the chef will fetch his
    // items from the store.
    let inHouseItems = [];
    let dishesMade = '';
    for (i = 0; i < totalDays; i++) {
        const ingridientName = inputs[i];
        
        /**
         * Ingridient name should follow this condition
         * 6 >= IngridientName <= 20
         */
        if (isIngridientNameValid(ingridientName)) {
            inHouseItems.push(ingridientName);
        }

        const [isSufficient, matchType] = isIngridientAreSuffient(inHouseItems, minItemCount);
        /** 
         * Find output string contains any 60% ingridient or else get more,
         * either FIBER OR FAT OR CARB
         */
        if (isSufficient) {
            if (inHouseItems.length > limit) {
                /* 
                 * Items and 60% of ingridient is matching, but we have more items in stock
                 * remove the items which were used and keep items in stock which are unused.
                */
                const [stock, madeDish] = removeItemFromArr(inHouseItems, limit, matchType);
                inHouseItems = [...stock];
                finalOutput += `${dishesMade}${madeDish}`
                dishesMade = '';
            } else if (inHouseItems.length < limit) {
                /* As items are less in the house, we have add wait as we wait for one more day */
                dishesMade = `-${dishesMade}`;
            } else {
                /* 
                 * Items and 60% of ingridient is matching, clearing inHouseStock which was used
                 * make dish as there are no unused stock.
                */
                dishesMade += inHouseItems.join(':');
                finalOutput += `${dishesMade}`
                dishesMade = '';
                inHouseItems = [];
            }
        } else {
            dishesMade = `-${dishesMade}`
        }
    }

    finalOutput += `${dishesMade}`;
    return finalOutput;
}

exports.makeDish = createSideDish;