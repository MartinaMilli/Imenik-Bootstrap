import {elements, form, asignValues} from './base.js';

const displayDetails = contact => {
    // clear the previously rendered form
    document.querySelector('#details-form-content').innerHTML = "";

    // show the display page
    if (elements.detailsPage.classList.contains('hidden')) {
        elements.detailsPage.classList.remove('hidden');
    }

    // insert the general form markup
    document.querySelector('#details-form-content').insertAdjacentHTML('afterbegin', form);

    // get input fields on the screen
    const inputs = document.querySelectorAll('#details-form-content .js-input');

    // asign contact data to input fields
    asignValues(inputs, contact);
    document.querySelector("#details-form-content .row").setAttribute('data-itemid', contact.id);
    

    // set the input fields to be readonly/disabled for the dropdown
    inputs.forEach(input => {
        input.setAttribute('readonly', 'readonly');
    });
    document.querySelector("#details-form-content #phonePrefix").setAttribute('disabled', 'disabled');
}


export const displayDetailsPage = (contactList, contactID) => {
    
    // 1. get the contact data via the given id 
    let curContact = {};
    contactList.forEach(contact => { 
        if(contact.id === contactID) {
            curContact = contact;
        }
    });

    // 2. display the details page
    displayDetails(curContact);
    return curContact;
}