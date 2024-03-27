//define browser onload event
//way 1
/* window.addEventListener('load',()=>{

}) */
//way 2
window.onload = () => {

    //tooltip enable
    refreshUserTable();

    refreshUserForm();
}

//define table refresh function
const refreshUserTable = () => {

    //create data array
    /* users = [
        { id: 1, employee_id: { id: 4, fullName: "Haritha Pramodya" }, userName: 'Haritha92', status: true, email: "Haritha@gmail.com", role_id: { id: 3, name: "Cashier" } },
        { id: 2, employee_id: { id: 2, fullName: "Udara Avishka" }, userName: 'jola2001', status: false, email: "usar@gmail.com", role_id: { id: 3, name: "Cashier" } },
        { id: 3, employee_id: { id: 3, fullName: "Akila Perera" }, userName: 'akil34', status: true, email: "akila@gmail.com", role_id: { id: 3, name: "Cashier" } },
    ] */

    //get data from db

    users = getServiceAjaxRequest("/user/alldata");

    /* $.ajax("/user/alldata", {
        contentType: 'json',
        type: "GET",
        async: false,
        success: function(data) {
            console.log("Success " + data);
            users = data;
        },

        error: function(resData) {
            console.log("Error" + resData);
            users = [];
        }
    }); */

    //create display column array
    //text--.number,string,data--->use Propery name
    //function-->object,array,boolean
    const displayColumnList = [
        { dataType: 'function', propertyName: getEmployeeName },
        { dataType: 'text', propertyName: 'username' },
        { dataType: 'text', propertyName: 'email' },
        { dataType: 'function', propertyName: getRoleName },
        { dataType: 'function', propertyName: getStatus },
    ]



    //data fill function
    fillDataIntoTable1(tableUser, users, displayColumnList, refillUserForm, deleteUser, printUser, true);

    //call jquery datatable function
    $('#tableUser').dataTable();

}

//define function to get employee name
const getEmployeeName = (ob) => {
        return ob.employee_id.fullname;
    }
    //define function to get roleName
const getRoleName = (ob) => {
        //return ob.role_id.name;
        let userroles = "";

        ob.roles.forEach((element, index) => {
            if (index == ob.roles.length - 1) {
                userroles = userroles + element.name;
            } else {
                userroles = userroles + element.name + ","
            }
        })
        return userroles;
    }
    //define function to get status
const getStatus = (ob) => {
    if (ob.status) {
        return `<p class='user-active'>Active</p>`
    } else {
        return `<p class='user-inactive'>InActive</p>`
    }

}

//define function for user form refill
const refillUserForm = (rowOb, rowIndex) => {

        //same object cant add in same where
        //rowob is object, value eja save wenne heap,ram eke neme
        //olduser=rowOb-->user and olduser variable has same refference
        user = JSON.parse(JSON.stringify(rowOb));
        olduser = rowOb

        //selectEmployee.disabled=false;
        //textPassword.diabled=false;
        //textPasswordRetype=false;

        //elementId.value=object.relavantPropertyName

        email.value = user.email;
        username.value = user.username;

        textPassword.value = user.password;

        if (user.status) {
            activeBtn.checked = "checked";
            labelUserStatus.innerText = "user account is active"
        } else {
            activeBtn.checked = "";
            labelUserStatus.innerText = "user account is not active"
        }

        employeeListWithoutUserAccount = getServiceAjaxRequest("/employee/listwithoutuseraccount");
        employeeListWithoutUserAccount.push(user.employee_id);
        fillDataIntoSelect(employee, "Select Employee", employeeListWithoutUserAccount, "fullname", user.employee_id.fullname);


        divRoles.innerHTML = "";
        roles.forEach(role => {
            div = document.createElement('div');
            div.className = "form-check form-check-inline";
            inputCHK = document.createElement('input');
            inputCHK.type = "checkbox";
            inputCHK.className = "form-check-input";
            label = document.createElement('label');
            label.className = "form-check-label fw-bold ms-2";
            label.innerText = role.name;

            inputCHK.onchange = function() {

                if (this.checked) {
                    user.roles.push(role);
                } else {
                    //user.roles.pop(role);
                    let extIndex = user.roles.map(element => element.name).indexOf(role.name);

                    if (extIndex != -1) {
                        user.roles.splice(extIndex, 1)
                    }

                }
            }

            let extIndex = user.roles.map(element => element.name).indexOf(role.name);

            if (extIndex != -1) {
                inputCHK.checked = "checked";
            }




            div.appendChild(inputCHK)
            div.appendChild(label)

            divRoles.appendChild(div);
        })
    }
    //define function for user delete
const deleteUser = (rowOb, rowIndex) => {

}

//define function for user print
const printUser = (rowOb, rowIndex) => {

}


const refreshUserForm = () => {
    user = new Object();
    olduser = null;


    user.roles = new Array();

    //selectEmployee.disabled=false;
    //textPassword.diabled=false;
    //textPasswordRetype=false;

    employeeListWithoutUserAccount = getServiceAjaxRequest("/employee/listwithoutuseraccount");
    fillDataIntoSelect(employee, "Select Employee", employeeListWithoutUserAccount, "fullname");


    //get a role list
    roles = getServiceAjaxRequest("/role/listwithoutadmin");

    divRoles.innerHTML = "";



    roles.forEach(role => {
        div = document.createElement('div');
        div.className = "form-check form-check-inline";
        inputCHK = document.createElement('input');
        inputCHK.type = "checkbox";
        inputCHK.className = "form-check-input";
        label = document.createElement('label');
        label.className = "form-check-label fw-bold ms-2";
        label.innerText = role.name;

        inputCHK.onchange = function() {

            if (this.checked) {
                user.roles.push(role);
            } else {
                //user.roles.pop(role);
                let extIndex = user.roles.map(element => element.name).indexOf(role.name);

                if (extIndex != -1) {
                    user.roles.splice(extIndex, 1)
                }

            }
        }

        div.appendChild(inputCHK)
        div.appendChild(label)

        divRoles.appendChild(div);
    });

    user.status = false;
    labelUserStatus.innerText = "User Accpunt Not Active";
}


const buttonUpdateUser = () => {

    //need to check form error
    let errors = checkUserFormErrors()

    if (errors == "") {
        //need to check updates
        let updates = checkUserformUpdates()
        if (updates == "") {
            alert("Nothing Updated data")
        } else {
            let userConform = confirm("Are you sure to update following changes?\n" + updates);

            if (userConform) {
                let putResponse;

                $.ajax("/user", {
                    type: "PUT",
                    async: false,
                    contentType: "application/json",
                    data: JSON.stringify(user),


                    success: function(successResponseOb) {
                        putResponse = successResponseOb;
                    },

                    error: function(failedResponseOb) {
                        putResponse = failedResponseOb;
                    }

                });

                if (putResponse == "OK") {
                    alert("Update Successfully..!")
                    refreshUserTable()
                    userform.reset();
                    refreshUserForm()
                } else {
                    alert("Update not Successfully..! \n" + putResponse)
                }
            }
        }
    } else {
        alert("Form has following errors :\n" + errors)
    }
}

const checkUserformUpdates = () => {
    let updates = ""

    if (user.username != olduser.username) {
        updates = updates + " Username is changed \n";
    }
    if (user.email != olduser.email) {
        updates = updates + " email is changed \n";

    } else {
        let extcount = 0;
        for (let newrole of user.roles) {
            for (let oldrole of olduser.roles) {
                if (newrole.id == oldrole.id)
                    extcount = extcount + 1;
            }
        }
    }

    return updates
}

//Define function form Check Error
const checkUserFormErrors = () => {
    let errors = "";

    if (user.employee_id == null) {
        errors = errors + "Select Employee..!\n";
    }

    if (username == null) {
        errors = errors + "Enter Username..!\n";
    }
    if (olduser == null) {

        if (textPassword == null) {
            errors = errors + "Should Provide a Password..!\n";
        }



        if (textPasswordRetype.value == "") {
            errors = errors + "Should Provide the Password again..!\n";
        }
    }

    if (user.email == null) {
        errors = errors + "Eenter Email..!\n";
    }
    if (user.roles.length == 0) {
        errors = errors + " Please select roles...!"
    }

    return errors;
}



//Define function for user form submit
const buttonUserFormSubmit = () => {
    console.log("Submit");
    console.log(user);

    //check form error
    let errors = checkUserFormErrors();
    if (errors == "") {

        //get user confirmation
        let userConfirm = confirm("Are you sure to submit following user?\n" + "Username: " + user.username);

        if (userConfirm) {

            //call post service

            //

        }


        //check post service response


    } else {
        alert("form has following errors..\n" + errors);

    }

    //get user confirmation

    //call post service

    //check post service response
}


const passwordRetypeValidator = () => {

    if (textPassword.value == textPasswordRetype.value) {

        user.password = textPassword.value;
        textPasswordRetype.style.border = '2px solid green'
    } else {

        user.password = null;
        textPasswordRetype.style.border = '2px solid red'
    }
}