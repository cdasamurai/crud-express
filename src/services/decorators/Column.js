function Column(target, object) {
    console.log(target)
    return function decorator (target, ll, u) {
        //console.log(value, ll, target)

        let columnNames = [];

        // Ajouter le nom du champ au tableau des noms de colonnes
        //columnNames.push(columnName);
    };
}

function ClassDecorator(PersonClass) {
    /*PersonClass = class User {
        constructor(name, gender) {
            this.name = name;
            this.gender = gender;
        }
    }
    return PersonClass;*/
}

module.exports = {Column, ClassDecorator};