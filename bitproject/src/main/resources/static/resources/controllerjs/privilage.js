const roles = [
    { id: 2, name: 'Manager' },
    { id: 3, name: 'Cashier' },
    { id: 4, name: 'Store-Manager' }
]

const module = [
    { id: 1, name: 'EMPLOYEE' },
    { id: 2, name: 'PRIVILEGE' },
    { id: 3, name: 'USER' }
]




const selectRole = document.getElementById('role');
const selectModule = document.getElementById('module');

roles.forEach((i) => {
    const option = document.createElement('option');
    option.value = i.id;
    option.textContent = i.name
    selectRole.appendChild(option);
});

module.forEach((i) => {
    const option = document.createElement('option');
    option.value = i.id;
    option.textContent = i.name
    selectModule.appendChild(option);
});


const selectHandler = () => {
    const checkSelect = document.getElementById('select').checked
    const selectText = document.getElementById('selectText');
    selectText.textContent = (checkSelect === true) ? 'Select privilage Granted' : 'Select privilage not Granted';

}

const insertHandler = () => {
    const insertSelect = document.getElementById('insert').checked
    const insertText = document.getElementById('insertText');
    insertText.textContent = (insertSelect === true) ? 'Insert privilage Granted' : 'Insert privilage not Granted';

}

const updateHandler = () => {
    const checkUpdate = document.getElementById('update').checked
    const updateText = document.getElementById('updateText');
    updateText.textContent = (checkUpdate === true) ? 'Update privilage Granted' : 'Update privilage not Granted';
}

const deleteHandler = () => {
    const checkDelete = document.getElementById('delete').checked
    const deleteText = document.getElementById('deleteText');
    deleteText.textContent = (checkDelete === true) ? 'Delete privilage Granted' : 'Delete privilage not Granted';
}

const privilages = [
    { id: 1, role_id: { id: 2, name: 'Manager' }, module_id: { id: 1, name: 'EMPLOYEE' }, sel: true, inst: true, upd: true, del: true },
    { id: 2, role_id: { id: 3, name: 'Cashier' }, module_id: { id: 1, name: 'EMPLOYEE' }, sel: false, inst: false, upd: false, del: false },
    { id: 3, role_id: { id: 4, name: 'Store-Manager' }, module_id: { id: 1, name: 'EMPLOYEE' }, sel: false, inst: false, upd: false, del: false },
    { id: 4, role_id: { id: 2, name: 'Manager' }, module_id: { id: 2, name: 'PRIVILEGE' }, sel: true, inst: true, upd: true, del: true },
    { id: 5, role_id: { id: 3, name: 'Cashier' }, module_id: { id: 2, name: 'PRIVILEGE' }, sel: true, inst: true, upd: true, del: true },
    { id: 6, role_id: { id: 4, name: 'Store-Manager' }, module_id: { id: 2, name: 'PRIVILEGE' }, sel: true, inst: true, upd: true, del: true },
]



const tableBody = document.getElementById("table").children[1];
tableBody.innerHTML = "";

function tableArr() {

    privilages.forEach((ob) => {
        var tr = document.createElement("tr");

        var tdId = document.createElement("td");
        tdId.textContent = ob.id;
        tr.appendChild(tdId);

        var tdRole = document.createElement("td");
        tdRole.textContent = ob.role_id.name;
        tr.appendChild(tdRole);

        var tdModule = document.createElement("td");
        tdModule.textContent = ob.module_id.name;
        tr.appendChild(tdModule);

        var tdSelect = document.createElement("td");
        tdSelect.textContent = (ob.sel == true) ? 'Granted' : 'Not-Granted';
        tr.appendChild(tdSelect);

        var tdInsert = document.createElement("td");
        tdInsert.textContent = (ob.inst == true) ? 'Granted' : 'Not-Granted';
        tr.appendChild(tdInsert);

        var tdUpdate = document.createElement("td");
        tdUpdate.textContent = (ob.upd == true) ? 'Granted' : 'Not-Granted';
        tr.appendChild(tdUpdate);

        var tdDelete = document.createElement("td");
        tdDelete.textContent = (ob.del == true) ? 'Granted' : 'Not-Granted';
        tr.appendChild(tdDelete);



        //add customized button

        const tdButton = document.createElement('td');
        const editButton = document.createElement('editBtn');
        editButton.className = 'btn bg-black text-white fw-bold ms-1 me-1';
        editButton.innerHTML = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn bg-black text-white fw-bold ms-1 me-1'
        deleteButton.innerHTML = 'Delete';

        const printButton = document.createElement('viewBtn');
        printButton.className = 'btn bg-black text-white fw-bold ms-1 me-1';
        printButton.innerText = 'Print';

        //tdButton.appendChild(editButton);
        //tdButton.appendChild(deleteButton);
        //tdButton.appendChild(printButton);
        //tr.appendChild(tdButton); //add button into column 




        deleteButton.onclick = function() {
            console.log(ob);

            confirm(`Are You sure to delete user ${ob.id} ${ob.role_id.name}?`)

        }


        editButton.onclick = function() {
            console.log(ob);

            confirm(`Are You sure to edit data of user  ${ob.id} ${ob.role_id.name}?`)
        }


        printButton.onclick = function() {
            console.log(ob);

            confirm(`Are You sure to print data of user  ${ob.id} ${ob.role_id.name}?`)
        }


        const inputRadio = document.createElement('input');
        inputRadio.type = 'radio';
        inputRadio.className = 'form-check-input mt-2';
        inputRadio.name = 'modify';




        const deleteBtn = document.getElementById('deleteBtn')

        deleteBtn.addEventListener('click', function() {

            deleteButton.onclick = function() {
                console.log(ob);

                confirm(`Are You sure to delete user ${ob.id} ${ob.role_id.name}?`)

            }
        })





        tdButton.appendChild(inputRadio);











        //const tdButton = document.createElement('td');
        /* 
                const dropDownDiv = document.createElement('div');
                dropDownDiv.className = 'dropdown';
                tdButton.appendChild(dropDownDiv);

                const dropDownI = document.createElement('i');
                dropDownI.className = 'fa-solid fa-ellipsis-vertical mt-2';
                dropDownI.setAttribute('data-bs-toggle', 'dropdown');
                dropDownI.setAttribute('area-expanded', 'false')
                dropDownDiv.appendChild(dropDownI)


                const dropdownUL = document.createElement('ul');
                dropdownUL.className = 'dropdown-menu'

                const dropdownListEdit = document.createElement('li');
                dropdownListEdit.className = 'dropdown-item ';
                //dropdownListEdit.innerText = 'edit';
                dropdownUL.appendChild(dropdownListEdit)
                dropdownListEdit.appendChild(editButton)

                const dropdownListUpdate = document.createElement('li');
                dropdownListUpdate.className = 'dropdown-item';
                //dropdownListUpdate.innerText = 'update';
                dropdownUL.appendChild(dropdownListUpdate)
                dropdownListUpdate.appendChild(deleteButton)


                const dropdownListDelete = document.createElement('li');
                dropdownListDelete.className = 'dropdown-item';
                //dropdownListDelete.innerText = 'delete';
                dropdownUL.appendChild(dropdownListDelete)
                dropdownListDelete.appendChild(printButton)


                dropDownDiv.appendChild(dropdownUL) */


        tr.appendChild(tdButton) //add td button to tr

        tableBody.appendChild(tr); //add tr to Table Body
    });
}

tableArr()



const submit = document.getElementById('submit');
submit.addEventListener("click", formHandler = (event) => {
    event.preventDefault();


    const roleId = selectRole.value;
    const moduleId = selectModule.value;
    if ((roleId == 3 || roleId == 2 || roleId == 1) && (moduleId == 3 || moduleId == 2 || moduleId == 1)) {


        const selectPrivilege = document.getElementById('select').checked;
        const insertPrivilege = document.getElementById('insert').checked;
        const updatePrivilege = document.getElementById('update').checked;
        const deletePrivilege = document.getElementById('delete').checked;

        const newPrivilege = {
            id: privilages.length + 1,
            role_id: { id: roleId, name: roles.find(role => role.id === parseInt(roleId)).name },
            module_id: { id: moduleId, name: module.find(module => module.id === parseInt(moduleId)).name },
            sel: selectPrivilege,
            inst: insertPrivilege,
            upd: updatePrivilege,
            del: deletePrivilege,
        };

        console.log(newPrivilege)
        privilages.push(newPrivilege);
        tableBody.innerHTML = ''
        tableArr();

        selectRole.value = '';
        selectModule.value = '';
        document.getElementById('select').checked = false;
        document.getElementById('insert').checked = false;
        document.getElementById('update').checked = false;
        document.getElementById('delete').checked = false;

    } else {
        alert('Privilage or role data field empty')
    }
})



//console.log(privilages)