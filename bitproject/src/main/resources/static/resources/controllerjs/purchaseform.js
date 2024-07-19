window.addEventListener('load', () => {
    orderRefreshform()
})

const orderRefreshform = () => {

    porder = {};

    suppliers = getServiceAjaxRequest("/supplier/alldata");
    fillDataIntoSelect(selectSupplier, "Please Select Supplier", suppliers, "name");

    items = getServiceAjaxRequest("/item/listbyavailable");
    fillDataIntoSelect(selectItem, "Please Select Item", items, "itemname");

}



const pOrderSubmitHandler = () => {

}