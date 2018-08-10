
Feature('Login email');

Scenario("Put random email", (I) => {
    I.amOnPage('/login');
    /*I.executeScript(function() {
        document.getElementById('email').type = 'text';
    });*/
    I.fillField('#name', randomstring.generate(10));
    I.fillField('#email', randomstring.generate(10)+'@example.com');
    I.fillField('#password', '12341234');
    I.fillField('#password-confirm', '12341234');
    I.click('#submit');
    I.dontSee('You are logged in!');
});

Scenario("Leave empty", (I) => {
    I.amOnPage('/login');
    /*I.executeScript(function() {
        document.getElementById('email').type = 'text';
    });*/
    I.fillField('#name', randomstring.generate(10));
    I.fillField('#email', randomstring.generate(10)+'@example.com');
    I.fillField('#password', '12341234');
    I.fillField('#password-confirm', '12341234');
    I.click('#submit');
    I.dontSee('You are logged in!');
});