'use strict';

describe('sth', function() {
  it('fails', function() {
    Backbone.$ = $;
    var testData = { foo: 'bar' };
    var server = sinon.fakeServer.create();
    server.respondWith('GET', 'https://api.github.com/users/axelhodler', [200, {}, JSON.stringify(testData)]);
    var model = new window.MyModel({ id: 'axelhodler' });

    model.fetch();
    server.respond();

    expect(model.get('foo')).to.equal('bar');
  })
});
