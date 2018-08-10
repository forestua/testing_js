var randomstring = require("randomstring");

Feature('Register');

/*Scenario('We come register', (I) => {
    I.amOnPage('/register');
    I.see('Register');
});*/

// name
Scenario("Put 300 symbols", (I) => {
    I.amOnPage('/register');
    I.fillField('#name', randomstring.generate(300));
    I.fillField('#email', 'testemail1@example.com');
    I.fillField('#password', '12341234');
    I.fillField('#password-confirm', '12341234');
    I.click('#submit');
    I.see('The name may not be greater than 255 characters.');
});

Scenario("Leave empty", (I) => {
    I.amOnPage('/register');
    I.executeScript(function() {
        document.getElementById('name').removeAttribute('required');
    });
    I.fillField('#name', '');
    I.fillField('#email', 'testemail2@example.com');
    I.fillField('#password', '12341234');
    I.fillField('#password-confirm', '12341234');
    I.click('#submit');
    I.see('The name field is required.');
});

Scenario("Put 1000 symbols", (I) => {
    I.amOnPage('/register');
    I.fillField('#name', randomstring.generate(1000));
    I.fillField('#email', 'testemail3@example.com');
    I.fillField('#password', '12341234');
    I.fillField('#password-confirm', '12341234');
    I.click('#submit');
    I.see('502 Bad Gateway');
});

Scenario("Put SQL query", (I) => {
    I.amOnPage('/register');
    I.fillField('#name', "DROP TABLE IF EXISTS users");
    I.fillField('#email', 'testemail41@example.com');
    I.fillField('#password', '12341234');
    I.fillField('#password-confirm', '12341234');
    I.click('#submit');
    I.see('You are logged in!');
});

Scenario("Put special symbols", (I) => {
    I.amOnPage('/register');
    I.fillField('#name', " 'qwer' '{'qwer'}' // \" qwe");
    I.fillField('#email', 'testemail5@example.com');
    I.fillField('#password', '12341234');
    I.fillField('#password-confirm', '12341234');
    I.click('#submit');
    I.see('You are logged in!');
});

Scenario("leave empty 2", (I) => {
    I.amOnPage('/register');
    I.fillField('#name', '');
    I.fillField('#email', 'testemail6@example.com');
    I.fillField('#password', '12341234');
    I.fillField('#password-confirm', '12341234');
    I.click('#submit');
    I.dontSeeCurrentUrlEquals('/home');
});