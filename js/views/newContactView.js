import {elements, maxDate, form, showAlert} from './base.js';


export const clearInputFields = () => {
    // 1. scroll to top of the window
    window.scrollTo(0, 0);
    
    // 2. set focus on the first input field
    setTimeout(() => document.querySelector('#new-contact input').focus(), 1500)
    
    
    // 3. remove values from input fields
    document.querySelectorAll("#new-contact input").forEach(field => {
        field.value = "";
    })     
    document.querySelector("#new-contact #phonePrefix").selectedIndex = 1;
};

// display the New contact page
export const displayNewContactPage = () => {
    
    document.querySelector('#new-form-content').innerHTML = "";

    if (elements.newContactPage.classList.contains('hidden')) {
        elements.newContactPage.classList.remove('hidden');
    }
    document.querySelector('#new-form-content').insertAdjacentHTML('afterbegin', form);
    maxDate();
}

export const getInput = () => {
        return {
            firstName: elements.newContactForm.querySelector("#firstName").value,
            lastName: elements.newContactForm.querySelector("#lastName").value,
            email: elements.newContactForm.querySelector("#email").value,
            phonePrefix: elements.newContactForm.querySelector("#phonePrefix").value,
            phoneNum: elements.newContactForm.querySelector("#phoneNum").value,
            street: elements.newContactForm.querySelector("#address").value,
            city: elements.newContactForm.querySelector("#city").value,
            zipCode: elements.newContactForm.querySelector("#zipCode").value,
            birthDate: elements.newContactForm.querySelector("#birthDate").value,
        }
}