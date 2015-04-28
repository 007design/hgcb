describe('User', function () {

  var User;
  beforeEach(module('app'));
  beforeEach(inject(function (_User_) {
    User = _User_;
  }));

  describe('Constructor', function () {

    it('assigns a name', function () {
      expect(new User({name:'Dan'})).to.have.property('name', 'Dan');
    });

  });

});