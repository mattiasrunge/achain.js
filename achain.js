
var stewardess = require("stewardess");

module.exports = function()
{
  var self = this;

  self.chain = stewardess();

  self.addMany = function(args_list, action)
  {
    for (var n = 0; n < args_list.length; n++)
    {
      self.add(args_list[n], action);
    }

    return self;
  };

  self.add = function(args, action)
  {
    self.chain.add(function(options, next)
    {
      action(args, options, function(error)
      {
        if (error)
        {
          options.error = error;
          next("break");
          return;
        }
          
        next();
      });
    });

    return self;
  };

  self.final = function(action)
  {
    self.chain.final(function(options)
    {
      var error = options.error;
      delete options.error;

      action(error, options);
    });

    return self;
  };

  self.run = function(options, callback)
  {
    options = options || {};

    if (typeof options === "function")
    {
      self.final(options);
      options = {};
    }

    self.chain.run(options);

    return self;
  };
};
