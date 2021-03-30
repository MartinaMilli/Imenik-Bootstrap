export default class MyContacts {
    constructor () {
        this.myContactList = [];
    }

    addContact(newContact) {
        this.myContactList.push(newContact);

        // Perist data in localStorage
        this.persistData();
    }

    updateContact(newData) {
        this.myContactList.forEach(contact => {
            if(contact.id === newData.id) {
                contact.firstName = newData.firstName;
                contact.lastName = newData.lastName;
                contact.email = newData.email;
                contact.phonePrefix = newData.phonePrefix;
                contact.phoneNum = newData.phoneNum;
                contact.street = newData.street;
                contact.city = newData.city;
                contact.zipCode = newData.zipCode;
                contact.birthDate = newData.birthDate;
            }
            return contact;
        })

        // Perist data in localStorage
        this.persistData();

    }

    deleteContact(contactID) {
        this.myContactList.forEach(contact => {
            if(contact.id === contactID) {
                const index = this.myContactList.indexOf(contact);
                this.myContactList.splice(index, 1);
            }
        })
        // Perist data in localStorage
        this.persistData();
    }



    persistData() {
        localStorage.setItem('contacts', JSON.stringify(this.myContactList));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('contacts'));
        
        // Restoring likes from the localStorage
        if (storage) this.myContactList = storage;
    }
}
