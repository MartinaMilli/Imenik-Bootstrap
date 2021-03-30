import { elements, clearUI, showAlert } from "./views/base.js";
import * as newContactView from "./views/newContactView.js";
import * as myContactsView from "./views/myContactsView.js";
import * as homepageView from "./views/homepageView.js";
import * as detailsView from "./views/detailsView.js";
import * as editView from "./views/editView.js";
import Contact from "./models/Contact.js";
import MyContacts from "./models/MyContacts.js";

/** GLOBAL STATE OF THE APP
 * contact object
 * contact list object
 */
const state = {};

window.state = state
// SWITCHING BETWEEN PAGES 
// Switching to the New contact page 
window.addEventListener('click', e => { //event listener on window because there is more than one new contact button 
    if (e.target.matches('.js__new-contact-link')) {
        clearUI();
        newContactView.displayNewContactPage();
    }}); 


// Switching to the My contacts page
window.addEventListener('click', e => { //event listener on window because there is more than one my contacts button 
    if (e.target.matches('.js__my-contacts-link')) {
        clearUI();
        elements.pagination.innerHTML = '';
        myContactsView.displayMyContactsPage();
        myContactsView.renderTable(state.contactList.myContactList);
    }});


// Switching to the homepage
window.addEventListener('click', e => { //event listener on window because there is more than one homepage button 
    if(e.target.matches('.js__homepage-link')) {
        clearUI();
        homepageView.displayHomepage();
    }
})

const getID = btn => {
    return parseInt(btn.closest('tr').getAttribute('data-itemid'));
}


// Switching to the details page 
elements.myContactsTableBody.addEventListener('click', e => { //event listener on table because there is more than one details link
    const detailsBtn = e.target.closest('.details-link');
    // get the ID of the contact where the link was clicked 
    if (detailsBtn) {
        const contactID = getID(detailsBtn);

        // clear the UI
        clearUI()
        // display details page
        detailsView.displayDetailsPage(state.contactList.myContactList, contactID)
    }
});

// Switching to the edit contact page from my contacts table
elements.myContactsTableBody.addEventListener('click', e => { //event listener on table because there is more than one edit icon
    const editIcon = e.target.closest('.table-edit');
    // get the ID of the contact where the icon was clicked 
    if (editIcon) {
        const contactID = getID(editIcon);
      
        // clear the UI
        clearUI()

        // display edit page 
 
        editView.displayEditPage(state.contactList.myContactList, contactID)
    }
});

// Switching to the edit contact page from the details page
document.querySelector('.edit-icon').addEventListener('click', () => {
  
    // 1. get the id of the currently displayed contact
    const contactID = parseInt(document.querySelector("#details-form-content .row").getAttribute('data-itemid'));
    
    // clear the UI
    clearUI()

    // 2. display the edit page for that contact
    editView.displayEditPage(state.contactList.myContactList, contactID)

});


// pagination events 
elements.pagination.addEventListener('click', e => {
    elements.pagination.innerHTML = '';
    const btn = e.target.closest('a');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);

        // clear table page
        elements.myContactsTableBody.innerHTML = '';

        // display another table page 
        myContactsView.renderTable(state.contactList.myContactList, goToPage);
    }
});



// NEW CONTACT CONTROLLER
const controlNewContact = () => {

    // 1. get input data
    const inputData = newContactView.getInput();
    
    // 2. create a new contact
    state.newContact = new Contact( 
        inputData.firstName, 
        inputData.lastName, 
        inputData.email,
        inputData.phonePrefix,
        inputData.phoneNum,
        inputData.street, 
        inputData.city, 
        inputData.zipCode, 
        inputData.birthDate);


    // 3. add the new contact to the list
    if(!state.contactList) {
        state.contactList = new MyContacts;
    }
    state.contactList.addContact(state.newContact);
     
    // 4. clear input fields and display success message
    newContactView.clearInputFields();
    showAlert("Kontakt uspješno spremljen!", "success", "new-contact")
    //displaySuccess('new');
}

elements.newContactForm.addEventListener('submit', e => {
    e.preventDefault();
    controlNewContact()
})


// EDIT CONTACT CONTROLLER
const controlEditContact = () => {
    // 1. get new input data (editView)
    const inputData = editView.getInput()
    console.log(inputData)
    // 2. update contact in the contact list (and local storage) 
    state.contactList.updateContact(inputData);

    showAlert("Promjene uspješno spremljene!", "success", "edit-contact")

    // 3. clear UI 
    // 4. display details page again (detailsView) and the success message
    setTimeout(() => {
        clearUI();
        detailsView.displayDetailsPage(state.contactList.myContactList, inputData.id);
    }, 1500);

     
}

document.querySelector('.btn-accept').addEventListener('click', () => {
    controlEditContact()
});
document.querySelector('.btn-decline').addEventListener('click', () => {
    const inputData = editView.getInput()
    clearUI();
    detailsView.displayDetailsPage(state.contactList.myContactList, inputData.id);
});


// DELETE CONTACT CONTROLLER
const controlDeleteContact = contactID => {

    // get the contact name for the dialog message
    let contactName = '';
    state.contactList.myContactList.forEach(contact => {
        if (contact.id === contactID) {
            contactName = `${contact.firstName} ${contact.lastName}`;
            return contactName;
        }
    })

    // show the confirmation dialog 
    myContactsView.showDeleteDialog(contactName);
    
    elements.deleteDialogBtns.addEventListener('click', e => {
        if (e.target.matches('.confirm')) {
            // 1. if user confirms hide the dialog
            myContactsView.hideDeleteDialog();

            // 2. delete contact from the contact list 
            state.contactList.deleteContact(contactID)
            
            // 3. display the new mycontact table and the success message
            elements.pagination.innerHTML = '';
            myContactsView.displayMyContactsPage();
            myContactsView.renderTable(state.contactList.myContactList);
            showAlert("Kontakt izbrisan!", "danger", "my-contacts")
        } else if (e.target.matches('.cancel')) {
            // 1. if user cancels hode the dialog
            myContactsView.hideDeleteDialog();
        }
    })
}

elements.myContactsTableBody.addEventListener('click', e => { //event listener on table because there is more than one delete icon
    const deleteIcon = e.target.closest('.table-delete'); 
    if (deleteIcon) {
        // get the id of the contact to be deleted 
        const contactID = getID(deleteIcon);
    
        // delete the contact from the list and local storage
        controlDeleteContact(contactID);
    }
});

// restore contacts after the page is reloaded 
window.addEventListener('load', () => {
   
    state.contactList = new MyContacts();
    
    // Restore contacts
    state.contactList.readStorage();

});

