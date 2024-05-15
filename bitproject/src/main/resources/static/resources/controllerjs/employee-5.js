//browser onload
window.addEventListener('load', () => {

    // console.log('onload');

    userPrivilage = getServiceAjaxRequest('/privilage/bymodule/EMPLOYEE')

    // tooltip enable
    $('[data-bs-toggle="tooltip"]').tooltip();

    // call table refresh function
    refreshEmployeeTable();

    refreshEmployeeForm();


})

const refreshEmployeeTable = () => {


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////step 2 Dynamic ADDING//////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    employees = [];

    //all jquary ajax function
    //$.ajax("URL,OPTION");
    $.ajax("/employee/alldata", {
        contentType: 'json',
        type: "GET",
        async: false,
        success: function(data) {
            console.log("Success " + data);
            employees = data;
        },

        error: function(resData) {
            console.log("Error" + resData);
            employees = [];
        }

    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////step 1 MANUALLY ADDING//////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // employees = [{
    //         id: 1,
    //         fullName: 'Hairtha Pramodha',
    //         nic: '920313523V',
    //         mobile: '0763704119',
    //         email: 'haritha@gmail.com',
    //         employeeStatus_id: { id: 1, name: 'Working' },
    //         designation_id: { id: 1, name: 'Manager' },
    //         hasUserAccount: true
    //     },
    //
    //     {
    //         id: 2,
    //         fullName: 'Nuwan Bandara',
    //         nic: '952313523V',
    //         mobile: '0752704119',
    //         email: 'Nuwan@gmail.com',
    //         employeeStatus_id: { id: 2, name: 'Resign' },
    //         designation_id: { id: 2, name: 'Cashier' },
    //         hasUserAccount: false
    //     },
    //
    //     {
    //         id: 3,
    //         fullName: 'Isuru Viraitha',
    //         nic: '931313523V',
    //         mobile: '0712704119',
    //         email: 'Isuru@gmail.com',
    //         employeeStatus_id: { id: 3, name: 'Delete' },
    //         designation_id: { id: 3, name: 'Store-Manager' },
    //         hasUserAccount: true
    //     },
    //
    //     {
    //         id: 4,
    //         fullName: 'Sashini Sithara',
    //         nic: '975313523V',
    //         mobile: '0713704119',
    //         email: 'Sashini@gmail.com',
    //         employeeStatus_id: { id: 1, name: 'Working' },
    //         designation_id: { id: 2, name: 'Cashier' },
    //         hasUserAccount: true
    //     }
    //

    //];

    // text-> number , string , date
    // function -> object , array , boolean
    const displayPropertyList = [
        { dataType: 'text', propertyName: 'fullname' },
        { dataType: 'text', propertyName: 'nic' },
        { dataType: 'text', propertyName: 'mobile' },
        { dataType: 'function', propertyName: getHasUserAccount },
        { dataType: 'text', propertyName: 'email' },
        { dataType: 'function', propertyName: getDesignation },
        { dataType: 'function', propertyName: getEmployeeStatus }
    ];

    // call filldatainto Table function
    // (tableid, dataArrayVariableName , displayPropertyList , refillFunction , deleteFunction, printFunction)
    // fillDataIntoTable1(tableEmployee, employees ,displayPropertyList, employeeFormRefill , deleteEmployee , printEmployee, false );

    fillDataIntoTable5(tableEmployee, employees, displayPropertyList, employeeFormRefill, divModifyButton);

    $('#tableEmployee').dataTable();

    divModifyButton.className = 'd-none';


}

//add button
const refreshEmployeeForm = () => {
    //define new object
    employee = new Object();

    //

    //employeeStatuses = [{ id: 1, name: 'Working' }, { id: 2, name: 'Resign' }, { id: 3, name: 'Delete' }];
    employeeStatuses = getServiceAjaxRequest("/employeestatus/alldata");


    /*  const selectStatusElement = document.querySelector('#selectStatus');
     selectStatusElement.innerHTML = '';

     const optionMsg = document.createElement('option');
     optionMsg.innerText = 'Select Status';
     optionMsg.disabled = 'disabled';
     optionMsg.selected = 'selected';
     selectStatusElement.appendChild(optionMsg);

     employeeStatuses.forEach(element => {
         const option = document.createElement('option');
         option.innerText = element.name;
         option.value = element;
         selectStatusElement.appendChild(option);
     }); */


    fillDataIntoSelect(selectStatus, 'Plz Select', employeeStatuses, 'name')


    //designations = [{ id: 1, name: 'Manager' }, { id: 2, name: 'Cashier' }, { id: 3, name: 'Store-Manager' }];
    designations = getServiceAjaxRequest("/designation/alldata");



    //call function filldatantoselectelement
    fillDataIntoSelect(selectDesignation, 'Select Designation', designations, 'name');

    selectStatus.classList.remove('is-valid')
    selectDesignation.classList.remove('is-valid')
    textFullName.style.border = '1px solid #ced4da'
    textCallingName.style.border = '1px solid #ced4da'
    textFullName.style.border = '1px solid #ced4da'
    textEmail.style.border = '1px solid #ced4da'

    updateBtn.disabled = "disabled";
    updateBtn.style.cursor = "not-allowed";
    submitBtn.disabled = "";
    updateBtn.style.cursor = "pointer";


}

// create function get status name
const getEmployeeStatus = (ob) => {
    // return 'ss';
    // return ob.employeeStatus_id.name;
    if (ob.employeestatus_id.name == 'Working') {
        return '<p class="status-working">' + ob.employeestatus_id.name + '</p>'
    }

    if (ob.employeestatus_id.name == 'Resign') {
        return '<p  class="status-resign">' + ob.employeestatus_id.name + '</p>'
    }

    if (ob.employeestatus_id.name == 'Delete') {
        return '<p  class="status-delete">' + ob.employeestatus_id.name + '</p>'
    } else {
        return '<p  class="status-other">' + ob.employeestatus_id.name + '</p>'
    }


}

// create function get designation name
const getDesignation = (ob) => {
    return ob.designation_id.name;
}

// create function get has user account
const getHasUserAccount = (ob) => {
    if (ob.hasUserAccount) {
        // return ' Has Account';
        return '<i class="fa-solid fa-circle-check  fa-2x text-success"></i>' + ' Has Account';
    } else {
        //return 'Have not Account';
        return '<i class="fa-solid fa-circle-xmark fa-2x text-danger"></i>' + ' Have not Account';
    }

}

//employee print function
const printEmployee = (ob, rowIndex) => {}

// employee form refill
const employeeFormRefill = (ob, rowIndex) => {
    //open modal
    $('#employeeAddModal').modal('show');

    employee = JSON.parse(JSON.stringify(ob));
    oldemployee = JSON.parse(JSON.stringify(ob)) //for checking Update

    // need to get full object


    textFullName.value = ob.fullname; // data bind ob.property --> input feild
    textCallingName.value = ob.callingname;
    textNIC.value = ob.nic;
    textEmail.value = ob.email;
    textAddress.value = ob.address;
    textMobileNo.value = ob.mobile;
    dateDateOfBirth.value = ob.dob;
    selectCivilStatus.value = ob.civilstatus;

    if (ob.note != null) textNote.value = ob.note;
    if (ob.lanno != null) textLandNo.value = ob.landno;

    if (ob.gender == "Male") {
        radioMale.checked = true;
    } else {
        radioFemale.checked = true;
    }

    employeeStatuses = [{ id: 1, name: 'Working' }, { id: 2, name: 'Resign' }, { id: 3, name: 'Deleted' }];
    fillDataIntoSelect(selectStatus, 'Select ', employeeStatuses, 'name', ob.employeestatus_id.name);


    designations = [{ id: 1, name: 'Manager' }, { id: 2, name: 'Cashier' }, { id: 3, name: 'Store-Manager' }];
    fillDataIntoSelect(selectDesignation, 'Plz Select', designations, 'name', ob.designation_id.name)



    submitBtn.disabled = "disabled";
    updateBtn.style.cursor = "not-allowed";

    if (userPrivilage.insprev) {
        updateBtn.disabled = "";
        updateBtn.style.cursor = "pointer";
    } else {
        submitBtn.disabled = "disabled";
        updateBtn.style.cursor = "not-allowed";
    }


}

// employee delete function
const deleteEmployee = (ob, rowIndex) => {

    //user vonformation
    let userConform = confirm('Are you sure to delete following employee \n' +
        ob.fullname);

    if (userConform) {
        let deleteServieResponse;

        $.ajax("/employee", {
            type: "DELETE",
            contentType: "application/json",
            data: JSON.stringify(ob),
            async: false,

            success: function(data) {
                deleteServieResponse = data;
            },

            error: function(errorData) {
                deleteServieResponse = errorData;
            }
        })

        if (deleteServieResponse == "OK") {
            alert("Delete Successfully");
            $('#employeeAddModal').modal('hide');
            refreshEmployeeTable();
        }
    }
}


//create function for validate full name name generate callingname data list
const textFullNameValidator = (feildId) => {
    const fullNameValue = feildId.value;
    const regPettern = new RegExp('^([A-Z][a-z]{2,20}[\\s])+([A-Z][a-z]{2,20})$');

    if (fullNameValue != '') {
        if (regPettern.test(fullNameValue)) {
            //valid value 
            feildId.style.border = '2px solid green';
            employee.fullname = fullNameValue;

            // generate callingname list
            dlFullNameParts.innerHTML = '';
            callingnameList = fullNameValue.split(' ');
            callingnameList.forEach(element => {
                const option = document.createElement('option');
                option.value = element;
                dlFullNameParts.appendChild(option);
            });

        } else {
            dlFullNameParts.innerHTML = '';
            employee.fullname = '';
            employee.callingname = null;

            feildId.style.border = '2px solid red';
        }
    } else {
        dlFullNameParts.innerHTML = '';
        employee.fullname = '';
        employee.callingname = null;
        feildId.style.border = '2px solid red';
    }
}


//define function for close modal
const buttonModalClose = () => {

    const closeResponse = confirm('Are you sure to close the modal...? \n ');
    if (closeResponse) {
        // close modal
        $('#employeeAddModal').modal('hide');
        formEmployee.reset();
    }
}

const checkEmployeeInputError = () => {
    let errors = '';
    if (employee.fullname == null) {
        //errors = errors + 'Full Name can not be null..! \n';
        textFullName.style.border = '2px solid Red'
    }
    if (employee.callingname == null) {
        //errors = errors + 'Please enter calling name..! \n';
        textCallingName.classList.add('is-invalid')
    }
    if (employee.designation_id == null) {
        errors = errors + 'designation can not be null..! \n';
    }
    if (employee.employeestatus_id == null) {
        errors = errors + 'please select employee status..! \n';
    }
    if (employee.mobile == null) {
        errors = errors + 'please enter mobile number..! \n';
    }
    if (employee.email == null) {
        errors = errors + 'please enter your email..! \n';
    }
    if (employee.address == null) {
        errors = errors + 'please enter your Address..! \n';
    }
    if (employee.dob == null) {
        errors = errors + 'please enter your Date of Bikrth..! \n';
    }
    if (employee.civilstatus == null) {
        errors = errors + 'please enter your civil status..! \n';
    }

    return errors;
}


//define function employee submit
const buttonEmployeeSubmit = () => {
    //console.log('on submit');
    console.log(employee);
    //need to check errors -- required field value valid or not

    //can check optional field
    const errors = checkEmployeeInputError();
    if (errors == '') {
        //not ext need to get user confirmation
        //call post servise
        //check post service responce
        const userSubmitResponse = confirm('Are you sure to submit...?\n');


        if (userSubmitResponse) {
            //call post service

            let postServiceResponce;

            $.ajax("/employee", {
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(employee),
                async: false,

                success: function(data) {
                    console.log("success", data);
                    postServiceResponce = data;
                },

                error: function(resData) {
                    console.log("Fail", resData);
                    postServiceResponce = resData;
                }

            });

            if (postServiceResponce == "OK") {
                alert("Save successfully...!");
                $('#employeeAddModal').modal('hide');
                refreshEmployeeForm();
                formEmployee.reset();
                refreshEmployeeTable();
            } else {
                alert("Fail to submit employee form \n" + postServiceResponce);
            }

        }
    } else {
        //if error ext then set alert
        alert('form has following error...\n' + errors);
    }
}

const checkEmployeeFormUpdates = () => {
    let updates = "";

    if (employee.fullname != oldemployee.fullname) {
        updates = updates + " Employee Fullname is Changed \n";
    }

    if (employee.callingname != oldemployee.callingname) {
        updates = updates + " Employee callingname is Changed \n";
    }

    if (employee.dob != oldemployee.dob) {
        updates = updates + " Employee Date of Birth is Changed \n";
    }

    if (employee.address != oldemployee.address) {
        updates = updates + " Employee Address is Changed \n";
    }

    if (employee.email != oldemployee.email) {
        updates = updates + " Employee Email is Changed \n";
    }


    if (employee.nic != oldemployee.nic) {
        updates = updates + " Employee nic is Changed \n";
    }

    if (employee.gender != oldemployee.gender) {
        updates = updates + " Employee gender is Changed \n";
    }

    if (employee.mobile != oldemployee.mobile) {
        updates = updates + " Employee mobile is Changed \n";
    }

    if (employee.landno != oldemployee.landno) {
        updates = updates + " Employee Land No is Changed \n";
    }




    return updates;



}

const buttonEmployeeUpdate = () => {
    console.log("update button clicked")

    //check form error
    let errors = checkEmployeeInputError();

    if (errors == "") {

        //check form update

        let updates = checkEmployeeFormUpdates();

        if (updates == "") {
            alert("Nothing Updates")
        } else {

            let userConfirm = confirm("Are You Sure to Update this Changes? \n" + updates);

            if (userConfirm) {
                //call put service requestd
                let putServiceResponse;

                $.ajax("/employee", {
                    type: "PUT",
                    async: false,
                    contentType: "application/json",
                    data: JSON.stringify(employee),


                    success: function(successResponseOb) {
                        putServiceResponse = successResponseOb;
                    },

                    error: function(failedResponseOb) {
                        putServiceResponse = failedResponseOb;
                    }

                });
                //check put service response
                if (putServiceResponse == "OK") {
                    alert("Updated Successfully");

                    $('#employeeAddModal').modal('hide');
                    refreshEmployeeTable();
                    formEmployee.reset();
                    refreshEmployeeForm();
                } else {
                    alert("Update not Completed :\n" + putServiceResponse)
                }
            }
        }
    } else {
        alert("Employee Form  has Following Errors..\n" + errors)
    }


}

//define function callingname validation
const textCallingNameValidator = (field) => {
    const fieldValue = field.value;

    const index = callingnameList.map(element => element).indexOf(fieldValue);
    if (index != -1) {
        //valid
        field.style.border = '2px solid green'
        employee.callingname = fieldValue;
    } else {
        //invalid
        field.style.border = '2px solid red';
        employee.callingname = null;
    }
}