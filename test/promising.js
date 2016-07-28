import assert from 'assert';

describe('Promise class method', () => {
  describe('Promise.resolve', () => {
    it('returns a Promise resolved with a given value', (done) => {
      const promise = Promise.resolve(); // change me

      promise
        .then((val) => {
          assert.strictEqual(val, 'foo');
        })
        .then(done)
        .catch(done);
    });
  });

  describe('Promise.all', () => {
    it('returns a promise which resolves when all the promises resolve', (done) => {
      var p1 = Promise.resolve(3);
      var p2 = 1888;
      var p3 = new Promise((resolve) => {
        setTimeout(resolve, 1000, "foo");
      });
      const promise = Promise.all(); // change me

      promise
        .then((val) => {
          assert.deepEqual(val, [3, 1888, 'foo'])
        })
        .then(done)
        .catch(done);
    });

    it('has fail fast behavior', function(done) {
      this.timeout(3000);

      const ary = [];

      var p1 = new Promise((resolve, reject) => {
        setTimeout(() => { ary.push(1), resolve() }, 1000, "one");
      });
      var p2 = new Promise((resolve, reject) => {
        setTimeout(() => { ary.push(2), resolve() }, 1500, "two");
      });
      var p3 = new Promise((resolve, reject) => {
        setTimeout(() => { ary.push(3), resolve() }, 2000, "three");
      });
      var p4 = new Promise((resolve, reject) => {
        setTimeout(() => { ary.push(4), resolve() }, 2500, "four");
      });
      var p5 = new Promise((resolve, reject) => {
        reject(""); // CHANGE ME
      });

      Promise.all([p1, p2, p3, p4, p5])
        .then(value => {
          console.log(value);
          done();
        }, reason => {
          assert.deepEqual(ary, [], 'Promise.all fails fast');
          assert.strictEqual(reason, 'REASON');
        })
        .catch(done);
    });
  });
});
