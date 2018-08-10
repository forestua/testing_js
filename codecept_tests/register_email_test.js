
Feature('Register email');

Scenario("Put 300 symbols", (I) => {
    I.amOnPage('/register');
    /*I.executeScript(function() {
        document.getElementById('email').type = 'text';
    });*/
    I.fillField('#name', randomstring.generate(10));
    I.fillField('#email', randomstring.generate(300));
    I.fillField('#password', '12341234');
    I.fillField('#password-confirm', '12341234');
    I.click('#submit');
    I.dontSee('You are logged in!');
});

Scenario("Leave empty", (I) => {
    I.amOnPage('/register');
    /*I.executeScript(function() {
        document.getElementById('email').type = 'text';
        document.getElementById('email').removeAttribute('required');
    });*/
    I.fillField('#name', randomstring.generate(10));
    I.fillField('#email', "");
    I.fillField('#password', '12341234');
    I.fillField('#password-confirm', '12341234');
    I.click('#submit');
    I.dontSee('You are logged in!');
});

Scenario("Put special charts", (I) => {
    I.amOnPage('/register');
    /*I.executeScript(function() {
        document.getElementById('email').type = 'text';
    });*/
    I.fillField('#name', randomstring.generate(10));
    I.fillField('#email', "{G}f}}{\\..// / \ ");
    I.fillField('#password', '12341234');
    I.fillField('#password-confirm', '12341234');
    I.click('#submit');
    I.dontSee('You are logged in!');
});

Scenario("Put SQL query", (I) => {
    I.amOnPage('/register');
    /*I.executeScript(function() {
        document.getElementById('email').type = 'text';
    });*/
    I.fillField('#name', randomstring.generate(10));
    I.fillField('#email', "DROP DATABASE forge");
    I.fillField('#password', '12341234');
    I.fillField('#password-confirm', '12341234');
    I.click('#submit');
    I.dontSee('You are logged in!');
});

Scenario("Put SQL query", (I) => {
    I.amOnPage('/register');
    I.executeScript(function() {
        document.getElementById('email').type = 'text';
    });
    I.fillField('#name', randomstring.generate(10));
    I.fillField('#email', "DROP DATABASE forge");
    I.fillField('#password', '12341234');
    I.fillField('#password-confirm', '12341234');
    I.click('#submit');
    I.dontSee('You are logged in!');
});