const Nightmare = require('nightmare')
const chai = require('chai')
const expect = chai.expect

describe('test localhost input results', () => {
  it('should find the nightmare github link first', function(done) {
    this.timeout('20s')

    const nightmare = Nightmare()
    nightmare
      .goto('http://127.0.0.1/register')
      .wait('body')
      .type('[name=name]', '')
      .type('[name=email]', 'developer@test.com.in')
      .type('[name=password]', 'developer@test.com.in')
      .type('[name=password_confirmation]', 'developer@test.com.in')
      .click('#submit')
      .screenshot('./debug.png')
      .evaluate((...args) => {
        return document.querySelector('#links .result__a').href
      })
      .end()
      .then(link => {
        expect(link).to.equal('https://github.com/segmentio/nightmare')
        done()
      })
  })
})