window.addEventListener("load", () => {
    refreashPurchaseTable()

    console.log("Loaded")
})


//////////backend ekath  ekka ganna
/////////recieved eke gap eka pennanna epa ..labenna thiyana gap eka withrk pennanna
/////////

const refreashPurchaseTable = () => {

    purchases = getServiceAjaxRequest('/purchaseorder/alldata');



    let displayColumnList = [
        { dataType: "text", propertyName: "pordercode" },
        { dataType: "text", propertyName: "requireddate" },
        { dataType: "function", propertyName: getporderstatus },
        { dataType: "function", propertyName: getSupplierName },
        { dataType: "function", propertyName: getpOrderItem },
        { dataType: "amount", propertyName: 'totalamount' },
        { dataType: "year", propertyName: 'requireddate' },
    ]

    fillDataIntoTable1(tablePurchaseOrder, purchases, displayColumnList, refillPOrderForm, deletepOrder, printpOrder)

    $('tablePurchaseOrder').dataTable();
}

const getporderstatus = (ob) => {
    return ob.porderstatus_id.name;
}

/* const gettotalamount = (ob) => {
    //tofixd used to convert num to string
    return parseFloat(ob.totalamount).toFixed()
} */


const getSupplierName = (ob) => {
    return ob.supplier_id.name;
}

const getpOrderItem = (ob) => {
    let items = "";

    for (const poitem of ob.purchaseorderhasitem) {
        items = items + poitem.item_id.itemname + ",";
    }

    return items;
}

const refillPOrderForm = (ob) => {

}




const deletepOrder = () => {}
const printpOrder = () => {}