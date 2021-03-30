import {elements} from './base.js';

// display the My contacts  page
export const displayMyContactsPage = () => {
    if (elements.myContactsPage.classList.contains('hidden')) {
        elements.myContactsPage.classList.remove('hidden');
    }
}

const renderContact = contact => {
    const markup = `
    <tr data-itemid = ${contact.id}>
    <td>${contact.firstName} ${contact.lastName}</td>
    <td class="d-none d-md-block">${contact.email}</td>
    <td><a href="#" class="details-link">Više...</a></td>
    <td class="text-center"><a href="#"><i class="table-edit fas fa-edit"></i></a></td>
    <td class="text-center"><i class="table-delete fas fa-trash-alt"></i></td>
  </tr>`;
    elements.myContactsTableBody.insertAdjacentHTML('beforeend', markup);
}


// type: 'prev' or 'next'
const createButton = (page, type) => `
<a href="#" class=" results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>Stranica ${type === 'prev' ? page - 1 : page + 1}</a>
`;

const renderPagination = (page, numResults, resPerPage) => {
    
    if (numResults <= 7) {
        elements.pagination.innerHTML = "";
    } else {
        const pages = Math.ceil(numResults / resPerPage);

        let button;
        if (page === 1 && pages > 1) {
            // Only button to go to next page
            button = createButton(page, 'next');
        } else if (page < pages) {
            // Both buttons
            button = `
                ${createButton(page, 'prev')}
                ${createButton(page, 'next')}
            `;
        } else if (page === pages && pages > 1) {
            // Only button to go to prev page
            button = createButton(page, 'prev');
        }
        elements.pagination.insertAdjacentHTML('afterbegin', button);
    }
    
};

export const renderTable = (contacts, page = 1, resPerPage = 7) => {
    // delete previously rendered table
    elements.myContactsTableBody.innerHTML = '';

    // style the pagination section depending on the current page
    if (contacts.length > 0) {
        

        if (page === 1) {
            elements.pagination.style.flexDirection = "row-reverse"
        } else {
            elements.pagination.style.flexDirection = "row"
        }
    
        // render results of current page
        const start = (page - 1) * resPerPage;
        const end = page * resPerPage;
    
        contacts.slice(start, end).forEach(renderContact);
        
        // render pagination btns
        renderPagination(page, contacts.length, resPerPage);
    } else {
        // display message if there is no saved contacts
        console.log(contacts)
        elements.myContactsTableBody.innerHTML = '<div class="no-contacts-message">Trenutno nemate spremljenih kontakata</div>';
    }
}

export const showDeleteDialog = contactName => {
    elements.deleteDialogMsg.innerText = contactName;
    elements.deleteOverlay.classList.add('fade-in');
}
export const hideDeleteDialog = () => {
    elements.deleteOverlay.classList.remove('fade-in');
}