'use strict';

describe('MyModel', function() {
  var server,
    model;

  beforeEach(function() {
    Backbone.$ = $;
    server = sinon.fakeServer.create();
    model = new window.MyModel({ id: 'axelhodler' });
  });

  it('uses the stubbed response', function() {
    var testData = { foo: 'bar' };
    server.respondWith('GET', 'https://api.github.com/users/axelhodler', [200, { 'Content-Type': 'application/json' }, JSON.stringify(testData)]);

    model.fetch();
    server.respond();

    expect(model.get('foo')).to.equal('bar');
  });

  it('makes the correct requests', function() {
    var xhr = sinon.useFakeXMLHttpRequest();
    var requests = [];
    xhr.onCreate = $.proxy(function(xhr) {
      requests.push(xhr);
    });

    model.save();

    var request = requests[0];
    expect(request.method).to.equal('PUT');
    expect(request.url).to.equal('https://api.github.com/users/axelhodler');
  });  
});
