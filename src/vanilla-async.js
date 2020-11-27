var vanillaAsync = {};

vanillaAsync.version = '0.0.2';

vanillaAsync.parallel = function (functions, callback) {
  var results  = [];
  var finished = 0;

  for (let i = 0; i < functions.length; i++) {
    functions[i](function (result) {
      results[i] = result;
      finished += 1;
      if (finished === functions.length) callback(results);
    });
  }
};

vanillaAsync.series = function (functions, callback) {
  execute(functions, 0, callback);

  function execute(functions, i, sub_callback) {
    if (i < functions.length) {

      functions[i](function (error) {
        if (error) {
          sub_callback(error);
        } else {
          execute(functions, i + 1, sub_callback);
        }
      });

    } else {
      sub_callback(null);
    }
  }
};

vanillaAsync.seriesWithData = function (data, functions, callback) {
  execute(functions, 0, data, callback);

  function execute(functions, i, data, sub_callback) {
    if (i < functions.length) {

      functions[i](data, function (sub_data, error) {
        if (error) {
          sub_callback(error, sub_data);
        } else {
          execute(functions, i + 1, sub_data, sub_callback);
        }
      });

    } else {
      sub_callback(null, data);
    }
  }
};
