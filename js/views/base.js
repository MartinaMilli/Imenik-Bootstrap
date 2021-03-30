export const elements = {
    // header elements
    header: document.querySelector('.header'),

    //delete dialog elements
    deleteOverlay: document.querySelector(".delete-overlay"),
    deleteDialogBtns: document.querySelector(".dialog__btns"),
    deleteDialogMsg: document.querySelector(".contact-name"),

    //forms
    newContactForm: document.querySelector("#new-contact form"),
    newContactTitle: document.querySelector(".new-contact__form h3"),
    detailsForm: document.querySelector('#contact-details form'),
    editForm: document.querySelector('#edit-contact form'), 
    
    // table elements
    myContactsTable: document.querySelector("#my-contacts table"),
    myContactsTableBody: document.querySelector("#my-contacts tbody"),
    pagination: document.querySelector('.table-pagination'),
    
    //pages
    pages: document.querySelectorAll('section'),
    homePage: document.querySelector('#homepage'),
    newContactPage: document.querySelector('#new-contact'),
    myContactsPage: document.querySelector('#my-contacts'),
    detailsPage: document.querySelector('#contact-details'),
    editPage: document.querySelector('#edit-contact'),

}

// basic form markup
export const form = `
<div class="row">
    <div class="form-group col-md-6 mb-2">
        <label for="firstName">Ime</label>
        <input type="text" class="js-input form-control" id="firstName" placeholder="Ime" required>
    </div>
    <div class="form-group mb-2 col-md-6">
        <label for="lastName">Prezime</label>
        <input type="text" class="js-input form-control" id="lastName" placeholder="Prezime" required>
    </div>
</div>
<div class="row">
    <div class="form-group mb-2 col-md-6">
        <label for="email">E-mail adresa</label>
        <input type="email" class="js-input form-control" id="email" placeholder="E-mail adresa" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="primjer@gmail.com" required>
        <small id="emailHelp" class="form-text text-muted">npr: primjer@gmail.com</small>
    </div>
</div>
<div class="form-group mb-2 row">
    <label for="phonePrefix">Broj telefona</label>
        <div class="col-3 col-xl-2">
            <select class="js-input custom-select custom-select-lg" id="phonePrefix">
                <option selected disabled></option>
                <option>091</option>
                <option>092</option>
                <option>095</option>
                <option>097</option>
                <option>098</option>
                <option>099</option>
            </select>
        </div>
        <div class="col col-md-6 ">
            <input type="tel" class="js-input form-control" id="phoneNum" placeholder="Broj telefona" pattern="[0-9]{7}" title="Broj se može sastojati od prefiksa i najviše 7 znamenki npr: 091 1234567" required>
        </div>
</div>
<div class="row">
    <div class="form-group mb-2 col-md-6">
        <label for="address">Adresa</label>
        <input type="text" class="js-input form-control" id="address" placeholder="Ulica i kućni broj" required>
    </div>
</div>
<div class="row">
    <div class="form-group mb-2 col-md-5">
        <label for="zipCode">Poštanski broj</label>
        <input type="text" class="js-input form-control" id="zipCode" placeholder="Poštanski broj" pattern="[0-9]{5}" title="Poštanski broj sastoji se od 5 znamenki"required>
    </div>
    <div class="form-group mb-2 col col-md-6">
        <label for="city">Grad</label>
        <input type="text" class="js-input form-control" id="city" placeholder="Grad" required>
    </div>
    </div>
<div class="form-group mb-4 row">
    <div class="col-md-6">
        <label for="birthDate">Datum rođenja</label>
        <input type="date" class="js-input form-control" id="birthDate" required>
    </div>
</div>
`;


// clear UI by adding class hidden to those elements that do not have it
// class hidden applies the display: none style on the element 
export const clearUI = () => {
        elements.pages.forEach(page => {
        if (!(page.classList.contains('hidden'))) {
            page.classList.add('hidden')
        }
    });
}

// prevents the user to set the date in the future
export const maxDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 

    today = yyyy+'-'+mm+'-'+dd;
    document.querySelector("[type='date']").setAttribute("max", today);
}

// asign contact data to input fields 
export const asignValues = (inputFields, contact) => {
    const values = [contact.firstName, contact.lastName, contact.email, contact.phonePrefix, contact.phoneNum, contact.street, contact.zip, contact.city, contact.birthDate];
    let i = 0;
    inputFields.forEach(input => {
        input.value = values[i];
        i++;
    })
}

// bootstrap alert
export const showAlert = (message, className, page) => {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(`#${page}`);

    const h3 = container.querySelector("h3");
    h3.insertAdjacentElement('afterend', div)
  
    
    // vanish in 1.5 sec
    setTimeout(() => document.querySelector(".alert").remove(), 1500)
}