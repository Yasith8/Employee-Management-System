    window.addEventListener('load', () => {

        //privilage object
        userPrivilage = getServiceAjaxRequest('/privilage/bymodule/Supplier');

        //refreash supplier table
        refreshSupplierTable();

        //refreash supplier form
        refreshSupplierForm();

    })


    const refreshSupplierTable = () => {
        suppliers = getServiceAjaxRequest("/supplier/alldata");

        let displayColumnList = [
            { dataType: "text", propertyName: "regno" },
            { dataType: "text", propertyName: "name" },
            { dataType: "function", propertyName: getSupplierStatus },
            { dataType: "function", propertyName: getItemNames },
        ]

        fillDataIntoTable1(tableSupplier, suppliers, displayColumnList, refillSupplierForm, deleteSupplier, printSupplier)

    }

    const getItemNames = () => {
        return "Items";
    }

    const getSupplierStatus = (ob) => {
        return ob.supplierstatus_id.name;
    }

    const refillSupplierForm = (rowOb, index) => {
        supplier = JSON.parse(JSON.stringify(rowOb));
        oldSupplier = JSON.parse(JSON.stringify(rowOb));

        textSupplierName.value = supplier.suppliername;

        fillDataIntoSelect(selectSupplierStatus, "select status", supplierStatus, "name", supplier.supplierstatus_id.name);

        fillDataIntoSelect(selectSelectedItem, "", supplier.supplyItems, "itemname");

        items = getServiceAjaxRequest("/item/listwithouthavesupplier/" + supplier.id);

        fillDataIntoSelect(selectAllItem, "", items, "itemname")

    }

    const deleteSupplier = (rowOb, index) => {}

    const printSupplier = (rowOb, index) => {}

    const refreshSupplierForm = () => {
        supplier = {};

        supplier.supplyItems = [];

        items = getServiceAjaxRequest("/item/listbyavailable")
        fillDataIntoSelect(selectAllItem, "", items, "itemname");
        console.log(items)

        supplierStatus = getServiceAjaxRequest("/supplierstatus/findall");
        fillDataIntoSelect(selectSupplierStatus, "selectStatus", "name")
        console.log(supplierStatus)
    }

    const btnAddOneItem = () => {

        //get selected item into selected item veriable
        let selectedItem = JSON.parse(selectAllItem.value);

        //add selected item into supplier.supply items list
        supplier.supplyItems.push(selectedItem);

        //refill selected items side
        fillDataIntoSelect(selectSelectedItem, "", supplier.supplyItems, "itemname")

        //get selecteditem index from allitem list into extIdx variable
        let extidx = items.map((item) => item.id).indexOf(selectedItem.id);


        //chek if index exist
        if (extidx != -1) {
            //remove selected item from allitemlist
            items.splice(extidx, 1);
        }

        //refill allitem side
        fillDataIntoSelect(selectAllItem, "", items, "itemname")
    }
    const btnAddAllItem = () => {

        for (const item of items) {
            supplier.supplyItems.push(item)
        }

        fillDataIntoSelect(selectSelectedItem, "", supplier.supplyItems, "itemname")

        items = [];
        fillDataIntoSelect(selectAllItem, "", items, "itemname")



    }
    const btnRemoveOneItem = () => {
        let selectItem = JSON.parse(selectSelectedItem.value);


        items.push(selectItem);


        //refill selected items side
        fillDataIntoSelect(selectAllItem, "", items, "itemname")

        let extidx = supplier.supplyItems.map((item) => item.id).indexOf(selectItem.id);


        //chek if index exist
        if (extidx != -1) {
            //remove selected item from allitemlist
            supplier.supplyItems.splice(extidx, 1);
        }

        //refill allitem side
        fillDataIntoSelect(selectSelectedItem, "", supplier.supplyItems, "itemname")

    }
    const btnRemoveAllItem = () => {

        for (const supplierItem of supplier.supplyItems) {
            items.push(supplierItem)
        }

        fillDataIntoSelect(selectAllItem, "", items, "itemname")

        supplier.supplyItems = [];
        fillDataIntoSelect(selectSelectedItem, "", supplier.supplyItems, "itemname")
    }


    const buttonModalClose = () => {
        const closeResponse = confirm('Are you sure to close the modal...? \n ');
        if (closeResponse) {
            // close modal
            $('#supplierAddModal').modal('hide');
            formSupplier.reset();
        }
    }

    const checkUpdates = () => {
        let updates = "";

        if (supplier.suppliername != oldSupplier.suppliername) {
            updates = updates + " Supplier name is changed...!\n";
        }

        if (supplier.supplyItems.length != oldSupplier.supplyItems.length) {
            updates = updates + " Supply Item is changed...!\n";
        } else {
            let extCount = 0;

            for (const newSupplyItem of supplier.supplyItems) {
                for (const oldSupplyItem of supplier.supplyItems) {
                    if (newSupplyItem.id != oldSupplyItem.id) {
                        extCount = extCount + 1;
                    }
                }
            }
            if (condition) {
                updates = updates + "Supplier items is changed \n";
            }
        }

        return updates;
    }