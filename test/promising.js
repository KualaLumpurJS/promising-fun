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

    it('if given an unresolved promise, waits for it to resolve first', (done) => {
      const unresolvedPromise = new Promise((resolve) => {
        setTimeout(() => { resolve(/* change me */) }, 1500);
      });
      const promise = Promise.resolve(unresolvedPromise);

      const start = Date.now();
      promise
        .then((val) => {
          assert.strictEqual(val, 'foo');
          assert(Date.now() - start > 1000, 'It waited for promise to resolve first');
        })
        .then(done)
        .catch(done);
    })
  });

  describe('Promise.reject', () => {
    it('returns a Promise rejected with a reason', (done) => {
      Promise.reject() // change me
        .then((val) => {
          done(new Error('Should not come here'));
        })
        .catch((reason) => {
          assert.strictEqual(reason, 'A reason');
          done();
        })
        .catch(done);
    });

    it('returns a Promise rejected with an error', (done) => {
      Promise.reject(new Error('An error message'))
        .then((val) => {
          done(new Error('Should not come here'));
        })
        .catch((err) => {
          assert.strictEqual(err.message, 'REPLACE ME');
          done();
        })
        .catch(done);
    })
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

    it('has fail fast behavior', function (done) {
      this.timeout(3000);

      const ary = [];

      var p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
          ary.push(1), resolve()
        }, 1000, "one");
      });
      var p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          ary.push(2), resolve()
        }, 1500, "two");
      });
      var p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
          ary.push(3), resolve()
        }, 2000, "three");
      });
      var p4 = new Promise((resolve, reject) => {
        setTimeout(() => {
          ary.push(4), resolve()
        }, 2500, "four");
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

  describe('Promise.race', () => {
    it('only passes one of the results to the handler', (done) => {
      Promise.race([
        new Promise(function(resolve) {
          setTimeout(() => resolve('foo'), 1000);
        }),
        new Promise(function(resolve) {
          setTimeout(() => resolve('bar'), 250); // change me
        }),
      ])
        .then((result) => {
          assert.strictEqual(result, 'foo');
          done();
        })
        .catch(done);
    });

    it('example: can be used to implement a timeout', (done) => {
      Promise.race([
        new Promise(function(resolve, reject) {
          setTimeout(() => resolve(true), 5000); // something that takes too long
        }),
        new Promise(function(resolve, reject) {
          setTimeout(() => reject(new Error('Request took too long')), /* change me to a smaller value */5000);
        })
      ])
        .then((result) => {
          done(new Error('Should not have come here'));
        })
        .catch((err) => {
          assert.strictEqual(err.message, 'Request took too long');
          done();
        });
    });
  });
});

describe('Promise instance methods', function () {
  describe('.then', function () {
    it('the second param to .then handles rejection', function (done) {
      new Promise(function (resolve, reject) {
        resolve(1); // change me
      }).then(function () {
        done(new Error('This promise should have been rejected'));
      }, function (reason) {
        assert.strictEqual(reason, 'REASON FOR ERROR');
      }).catch(done);
    });

    it('but .catch is the preferred way to handle rejection', function (done) {
      new Promise(function (resolve, reject) {
        resolve(1); // change me
      }).then(function () {
        done(new Error('This promise should have been rejected'));
      }).catch(function (reason) {
        console.log('FOOBAR');
        assert.strictEqual(reason, 'REASON FOR ERROR');
        done();
      }).catch(done)
    });

    it('can be chained to pass on computation results to another .then', function (done) {
      Promise.resolve()
        .then(() => {
          return 1; // change me
        })
        .then((result) => {
          assert.strictEqual(result, 2);

          // Returning a promise here will cause the next .then callback to only be called
          // when this promise is resolved.
          return new Promise((resolve) => {
            setTimeout(() => { /* change me */
            }, 1000);
          });
        })
        .then((result) => {
          assert.strictEqual(result, true);
          done();
        })
        .catch(done)
    });

    it('always resolves to the same value', function(done) {
      const p1 = Promise.resolve(1);
      const p2 = p1.then((result) => { return result + 1 });
      const p3 = p1.then((result) => { return result + 2 });
      const p4 = p1.then((result) => { return result + 3 });

      // A promise always resolves to the same value.
      // Chaining .then or .catch on promise creates a NEW PROMISE.
      Promise.all([p2, p3, p4])
        .then((result) => {
          assert.deepEqual(result, []); // FIX ME
          done();
        })
        .catch(done);
    });

    it('silently swallows errors if a then is not followed by a catch block', function () {
      // Nothing to change in this test. Just observe.
      assert.doesNotThrow(() => {
        Promise.resolve()
          .then(() => {
            throw new Error('Catch me!');
          })
          .catch((err) => {
            if (err) {
              console.log('Caught you');
            }
          })
          .then(() => {
            // Observe that the following error never appears anywhere in your console.
            throw new Error("You can't catch me!");
          })
      });
    });
  });

  describe('.catch', () => {
    it('throwing error within .catch is not picked up (errors are again silently swallowed)', (done) => {
      // Nothing to change in this test. Just observe.
      assert.doesNotThrow(() => {
        Promise.resolve()
          .then(() => {
            throw new Error();
          })
          .catch((err) => {
            throw err;
          })
          .catch((err) => {
            // Well you can print it, but the program will not fail.
            console.log(err);
            done();
          })
      })
    });
  });
});
