const Nightmare = require('nightmare')
let randomstring = require('randomstring')
const chai = require('chai')
const expect = chai.expect

describe('Register name', () => {
  it('Put 300 symbols', function(done) {
    this.timeout('60000');

    const nightmare = Nightmare({
      typeInterval: 20
    })
    nightmare
      .goto('http://127.0.0.1/register')
      .wait('body')
      .type('input[name=name]', randomstring.generate(300))
      .type('input[name=email]', 'developer@test.com.in')
      .type('input[name=password]', 'developer@test.com.in')
      .type('input[name=password_confirmation]', 'developer@test.com.in')
      .click('button#submit')
      .wait('.invalid-feedback')
      .screenshot('./screenshots/debug.png')
      .evaluate((...args) => {
        return Array.prototype.slice.call(document.querySelector('.invalid-feedback').firstElementChild.textContent);   
      })
      .end()
      .then((text) => {
        expect(text.join("")).to.equal('The name may not be greater than 255 characters.');
        done();
      });
  })

  it('Leave empty', function(done) {
    this.timeout('60000');

    const nightmare = Nightmare({
      typeInterval: 20
    })
    nightmare
      .goto('http://127.0.0.1/register')
      .wait('body')
      .type('input[name=name]', '')
      .type('input[name=email]', 'developer@test.com.in')
      .type('input[name=password]', 'developer@test.com.in')
      .type('input[name=password_confirmation]', 'developer@test.com.in')
      .click('button#submit')
      .screenshot('./screenshots/debug.png')
      .evaluate((...args) => {
        return document.URL;   
      })
      .end()
      .then(link => {
        expect(link).to.equal('http://127.0.0.1/register')
        done()
      })
  })

  /*it('Put 1000 symbols', function(done) {
    this.timeout('60000');
    
    const nightmare = Nightmare({
      typeInterval: 20
    })
    nightmare
      .goto('http://127.0.0.1/register')
      .wait('body')
      .type('input[name=name]', randomstring.generate(1000))
      .type('input[name=email]', 'developer@test.com.in')
      .type('input[name=password]', 'developer@test.com.in')
      .type('input[name=password_confirmation]', 'developer@test.com.in')
      .click('button#submit')
      .wait('body')
      .screenshot('./screenshots/1000_symbols.png')
      .evaluate((...args) => {
        return Array.prototype.slice.call(document.);   
      })
      .end()
      .then((text) => {
        expect(text.join("")).to.equal('The name may not be greater than 255 characters.');
        done();
      });
  })*/

  it('Put SQL query', function(done) {
    this.timeout('60000');
    
    const nightmare = Nightmare({
      typeInterval: 20
    })
    nightmare
      .goto('http://127.0.0.1/register')
      .wait('body')
      .type('input[name=name]', 'DROP DATABASE forge')
      .type('input[name=email]', 'developer@test.com.in')
      .type('input[name=password]', 'developer@test.com.in')
      .type('input[name=password_confirmation]', 'developer@test.com.in')
      .click('button#submit')
      .wait('body')
      .screenshot('./screenshots/SQL_Query.png')
      .evaluate((...args) => {
        return document.URL;
      })
      .end()
      .then((link) => {
        expect(link).to.equal('http://127.0.0.1/home');
        done();
      });
  })

  it('Put special symbols', function(done) {
    this.timeout('60000');

    const nightmare = Nightmare({
      typeInterval: 20
    })
    nightmare
      .goto('http://127.0.0.1/register')
      .wait('body')
      .type('input[name=name]', '{}{"?/"/\\|\\/"d"asdfaasdf"')
      .type('input[name=email]', 'developer@test.com.in')
      .type('input[name=password]', 'developer@test.com.in')
      .type('input[name=password_confirmation]', 'developer@test.com.in')
      .click('button#submit')
      .screenshot('./screenshots/put_special_symbols.png')
      .evaluate((...args) => {
        return document.URL;   
      })
      .end()
      .then(link => {
        expect(link).to.equal('http://127.0.0.1/register')
        done()
      })
  })
})