
Feature('Register password_comfirm');

Scenario("Leave empty", (I) => {
    I.amOnPage('/register');
    /*I.executeScript(function() {
        document.getElementById('password').type = 'text';
    });*/
    I.fillField('#name', randomstring.generate(10));
    I.fillField('#email', randomstring.generate(10));
    I.fillField('#password', "");
    I.fillField('#password-confirm', "12341234");
    I.click('#submit');
    I.dontSee('You are logged in!');
});
