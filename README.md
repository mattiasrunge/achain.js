# achain.js

A wrapper on top of [Stewardess][1] to expose a very simple API for simpler use cases. Please look at the code or the test code for more examples.


## Usage

    $  var Chain = require("achain.js");
    $
    $  var args_list = [ 1, 2, 3, 4, 5, 6, 7 ];
    $  var chain = new Chain();
    $     
    $  function inc(args, options, callback)
    $  {
    $    options.value++;
    $    options.args_list = options.args_list || [];
    $    options.args_list.push(args);
    $    callback();
    $  };
    $ 
    $  chain.addMany(args_list, inc);
    $  chain.add(8, inc);
    $ 
    $  chain.final(function(error, options)
    $  {
    $    if (error)
    $    {
    $      console.log(error);
    $      return;
    $    }
    $ 
    $    console.log(options.value); // 8
    $    console.log(options.args_list); // [ 1, 2, 3, 4, 5, 6, 7, 8 ];
    $  });
    $
    $  chain.run();


[1]: https://github.com/ifit/stewardess

