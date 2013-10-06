
var Chain = require("../achain.js");
var assert = require("assert");

suite("acchain.js", function()
{
  test("Test empty chain", function(done)
  {
    var chain = new Chain();
    
    chain.final(done);

    chain.run();
  });

  test("Test empty chain with options", function(done)
  {
    var chain = new Chain();
    
    chain.final(done);

    chain.run({});
  });

  test("Test empty chain with options and run", function(done)
  {
    var chain = new Chain();
    
    chain.run({}, done);
  });

  test("Test empty chain with run", function(done)
  {
    var chain = new Chain();
    
    chain.run(done);
  });

  test("Simple one function chain", function(done)
  {
    var chain = new Chain();

    chain.add("Hello World", function(args, options, callback)
    {
      options.text = args;
      callback();
    });
    
    chain.final(function(error, options)
    {
      if (error)
      {
        done(error);
        return;
      }

      assert.equal("Hello World", options.text);
      done();
    });

    chain.run();
  });

  test("Many functions and start value", function(done)
  {
    var args_list = [ 1, 2, 3, 4, 5, 6, 7 ];
    var chain = new Chain();
    
    function inc(args, options, callback)
    {
      options.value++;
      options.args_list = options.args_list || [];
      options.args_list.push(args);
      callback();
    }

    chain.addMany(args_list, inc);

    chain.final(function(error, options)
    {
      if (error)
      {
        done(error);
        return;
      }

      assert.equal(args_list.length, options.value);
      assert.deepEqual(args_list, options.args_list);
      done();
    });

    chain.run({ value: 0 });
  });

  test("Check that errors are propagated, chain aborted and run/final combination call", function(done)
  {
    var chain = new Chain();

    function error(args, options, callback)
    {
      options.value = options.value || 0;
      options.value++;
      callback("This is an error!");
    }

    chain.add(null, error);
    chain.add(null, error);

    chain.run(function(error, options)
    {
      assert.equal("This is an error!", error);
      assert.equal(options.value, 1);
      done();
    });
  });
});
