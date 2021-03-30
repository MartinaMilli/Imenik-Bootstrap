
export default class Contact {
    constructor (firstName, lastName, email, phonePrefix, phoneNum, street, city, zipCode, birthDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phonePrefix = phonePrefix;
        this.phoneNum = phoneNum;
        this.phoneNumber = this.phonePrefix + this.phoneNum;
        this.street = street;
        this.city = city;
        this.zip = zipCode;
        this.address = `${this.street}, ${this.zipCode}, ${this.city}`
        this.birthDate = birthDate;
        this.id = Date.now();
    }
};