class User {
  #id;
  #first_name = "";
  #last_name = "";
  #birthdate = "";
  #email = "";
  #password = "";
  #address = "";
  #username = "";

  //getters
  get id() {
    return this.#id;
  }

  get first_name() {
    return this.#first_name;
  }

  get last_name() {
    return this.#last_name;
  }

  get birthdate() {
    return this.#birthdate;
  }

  get email() {
    return this.#email;
  }

  get password() {
    return this.#password;
  }

  get address() {
    return this.#address;
  }

  get username() {
    return this.#username;
  }

  toJSON() {
    return {
      id: this.#id,
      first_name: this.#first_name,
      last_name: this.#last_name,
      birthdate: this.#birthdate,
      email: this.#email,
      address: this.#address,
      username: this.#username,
    };
  }

  getColumns() {
    return [
      "first_name",
      "last_name",
      "birthdate",
      "email",
      "address",
      "username",
      "password",
    ];
  }

  //setters
  set id(id) {
    this.#id = id;
  }

  set first_name(first_name) {
    if (first_name === "") {
      throw new Error(`first_name field of User cannot be empty`);
    }
    this.#first_name = first_name;
  }

  set last_name(last_name) {
    this.#last_name = last_name;
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
