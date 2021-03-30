import {elements, maxDate, form, asignValues} from './base.js';


const renderEdit = contact => {

    // clear the previously rendered form
    document.querySelector('#edit-form-content').innerHTML = "";

    // show the edit page
    if (elements.editPage.classList.contains('hidden')) {
        elements.editPage.classList.remove('hidden');
    }

    // insert the general form markup
    document.querySelector('#edit-form-content').insertAdjacentHTML('afterbegin', form);

    const inputs = document.querySelectorAll('#edit-form-content .js-input');

    // asign contact data to input fields
    asignValues(inputs, contact);
    document.querySelector("#edit-form-content .row").setAttribute('data-itemid', contact.id);

    // limit date value
    maxDate();
}

export const displayEditPage = (contactList, contactID) => {
     // 1. get the contact data via the given id 
     let curContact = {};
     contactList.forEach(contact => { 
        if(contact.id === contactID) {
            curContact = contact;
        }
    });

     // 2. render the edit page for that contact 
     renderEdit(curContact);

}


export const getInput = () => {

    // get new input data 
    return { 
        id: parseInt(document.querySelector("#edit-form-content .row").getAttribute('data-itemid')),
        firstName: elements.editForm.querySelector("#firstName").value,
        lastName: elements. editForm.querySelector("#lastName").value,
        email: elements. editForm.querySelector("#email").value,
        phonePrefix: elements. editForm.querySelector("#phonePrefix").value,
        phoneNum: elements. editForm.querySelector("#phoneNum").value,
        street: elements. editForm.querySelector("#address").value,
        city: elements. editForm.querySelector("#city").value,
        zipCode: elements. editForm.querySelector("#zipCode").value,
        birthDate: elements. editForm.querySelector("#birthDate").value,
    }
}