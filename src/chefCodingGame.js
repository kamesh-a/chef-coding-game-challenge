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
    console.log(`Pushed item into stack ${item}`);
    stock.unshift(item);
}

function removeItemFromArr(iArr, limit, type) {
    let index = iArr.length - 1;
    let stock = [];
    while (index && iArr.length > limit) {
        if (iArr[index] && iArr[index].indexOf(type) === -1) {
            const [removedItem] = iArr.splice(index, 1);
            console.log(`Removed items: ${removedItem} from stack ${iArr.join(',')}`);
            pushToStockList(removedItem, stock);
        }
        --index;
    }
    return [stock, iArr.join(':')];
}

function createSideDish(inputs, totalDays, limit) {
    const minItemCount = getNumberOfItemsNeededInSameCategory(limit);
    let finalOutput = '';
    // The loop should run the number of days the chef will fetch his
    // items from the store.
    let inHouseItems = [];
    let dishesMade = '';
    for (i = 0; i < totalDays; i++) {

        inHouseItems.push(inputs[i]);

        const [isSufficient, matchType] = isIngridientAreSuffient(inHouseItems, minItemCount);
        console.log(`items in house passed${isSufficient ? `[${matchType}]` : ''} = ${isSufficient} `, inHouseItems);
        // find temp string contains any 60% or else get more
        // either FIBER OR FAT OR CARB
        if (isSufficient) {
            if (inHouseItems.length > limit) {
                /* 
                 * Items and 60% of ingridient is matching, but we have more items in stock
                 * remove the items which were used and keep items in stock which are unused.
                */
                console.log(`Before removing items : `, inHouseItems);
                const [stock, madeDish] = removeItemFromArr(inHouseItems, limit, matchType);
                inHouseItems = [...stock];
                console.log(`After removing items : `, inHouseItems);
                finalOutput += `${dishesMade}${madeDish}`
                dishesMade = '';
                console.log(`Intermidiate > result: ${finalOutput}`);
            } else if (inHouseItems.length === limit) {
                /* 
                 * Items and 60% of ingridient is matching, clearing inHouseStock which was used
                 * make dish as there are no unused stock.
                */
                dishesMade += inHouseItems.join(':');
                finalOutput += `${dishesMade}`
                dishesMade = '';
                inHouseItems = [];
                console.log(`Intermidiate == result: ${finalOutput}`);
            } else if (inHouseItems.length < limit) {
                /* As items are less in the house, we have add wait as we wait for one more day */
                dishesMade = `-${dishesMade}`;
                console.log(`Adding DASH : ${dishesMade}`)
            } else {
                console.log(` ******************** IMP ******************** `);
            }
        } else {
            dishesMade = `-${dishesMade}`
            console.log(`Adding DASH : ${dishesMade}`)
        }
    }

    finalOutput += `${dishesMade}`;

    console.log(`
            
            Input        : ${inputs.join(' ')}
            DayNeeded    : ${totalDays}
            MaxIngridient: ${limit}
            MinItemsNeed : ${minItemCount}
            Expected     : ${expectedOutput}
            Output       : ${finalOutput}
            %cExpected === Ouput: ${ expectedOutput === finalOutput ? 'Test case PASSED' : 'Test case FAILED'}

        `, `${expectedOutput === finalOutput ? 'color:green' : 'color:red'} `);

    return finalOutput;
}

exports.makeDish = createSideDish;