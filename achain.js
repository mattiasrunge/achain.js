
module.exports = function()
{
  var self = this;

  self.list = [];
  self.done = function() {};

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
    args = args || {};

    if (typeof args === "function")
    {
      action = args;
      args = {};
    }

    self.list.push({ args: args, action: action });

    return self;
  };

  self.final = function(action)
  {
    self.done = action;

    return self;
  };

  self.run = function(options, callback)
  {
    options = options || {};

    if (typeof options === "function")
    {
      callback = options;
      options = {};
    }

    if (callback)
    {
      self.final(callback);
    }

    self._runRecursive(0, options, function(error)
    {
      self.done(error, options);
    });

    return self;
  };

  self._runRecursive = function(index, options, callback)
  {
    if (index >= self.list.length)
    {
      callback();
      return;
    }

    self.list[index].action(self.list[index].args, options, function(error)
    {
      if (error)
      {
        callback(error);
        return;
      }

      self._runRecursive(index + 1, options, callback);
    });
  };
};
