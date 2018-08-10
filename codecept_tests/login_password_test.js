
Feature('Login password');

Scenario("Leave empty", (I) => {
    I.amOnPage('/register');
    /*I.executeScript(function() {
        document.getElementById('password').type = 'text';
    });*/
    I.fillField('#name', randomstring.generate(10));
    I.fillField('#email', randomstring.generate(300));
    I.fillField('#password', '12341234');
    I.fillField('#password-confirm', '12341234');
    I.click('#submit');
    I.dontSee('You are logged in!');
});