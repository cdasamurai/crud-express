class User {
    #id;
    #firstName = "";
    #lastName = "";
    #birthdate = "";
    #email = "";
    #password = "";
    #address = "";
    #username = "";


    //getters
    get id() {
        return this.#id;
    }

    //setters
    set id(id) {
        this.#id = id;
    }

    set firstName(firstName) {
        if (firstName === '') {
            throw new Error(`firstName field of User cannot be empty`);
        }
        this.#firstName = firstName;
    }

    set lastName(lastName) {
        this.#lastName = lastName;
    }

    set birthdate(birthdate) {
        this.#birthdate = birthdate;
    }

    set email(email) {
        this.#email = email;
    }

    set password(password) {
        this.#password = password;
    }

    set address(address) {
        this.#address = address;
    }

    set username(username) {
        this.#username = username;
    }


}

module.exports = User;