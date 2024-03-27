window.addEventListener('load', () =>{

    refreshItemForm();

    refreshItemTable();

});

const refreshItemTable = () =>{

    items = [];


     //call jquary ajax function
     //ajax ("URL" , option)
     $.ajax("/item/findall",{
        contentType: 'json',
        type:"GET", async:false,
        success: function(data){
            console.log("Success " + data);
            items = data;
        },

        error: function(resData){
            console.log("Error " + resData);
            items = []
        }
     })

    const displayPropertyList = [
                                 {dataType: 'function' , propertyName: getcategory},
                                 {dataType: 'text' , propertyName: 'itemName'},
                                 {dataType: 'number' , propertyName: 'purchasePrice'},
                                 {dataType: 'number' , propertyName: 'salesPrice'},
                                 {dataType: 'function' , propertyName: getStatus},
                                ] ;
                                
                                fillDataIntoTable1(itemtable, items, displayPropertyList,itemFormRefill);

                                $('#itemTable').dataTabel();
}


const getStatus = (ob) =>{

    if (ob.itemstatus_id.name == 'available') {
        return '<p class="status-available">' + ob.itemstatus_id.name + '</p>'
    }

    if (ob.itemstatus_id.name == 'Not-available') {
        return '<p class="status-Not-available">' + ob.itemstatus_id.name + '</p>'
    }

    else{
        return '<p class="status-other">' + ob.itemstatus_id.name + '</p>'
    }
}

const getcategory = (ob) =>{
    return ob.category_id.name;
}

const getErrors = () =>{
    let errors = '';
    if(item.category_id == null){
        errors = errors + 'please select Category..! \n';
    }
    if(item.brand == null){
        errors = errors + 'please select brand..! \n';
    }
    if(item.packagetpe == null){
        errors = errors + 'please select Package type..! \n';
    }
    if(item.subcategory == null){
        errors = errors + 'please select Sub-category..! \n';
    }
    if(item.unittype == null){
        errors = errors + 'please select Unit-type..! \n';
    }
    if(item.itemname == null){
        errors = errors + 'please select Item Name..! \n';
    }
    if(item.purchaseprice == null){
        errors = errors + 'please select Purchase price..! \n';
    }
    if(item.salesprice == null){
        errors = errors + 'please select Sales price..! \n';
    }
    if(item.status_id == null){
        errors = errors + 'please select Status..! \n';
    }

    return errors;   
}

const refreshItemForm = () =>{

    employee = new Object();


}

