function AJAXStorage() {
  var hash = {};
  var Link = 'https://fe.it-academy.by/AjaxStringStorage2.php';
  var updatePassword;
  var user = 'Serhio_2048';

  $.ajax(Link, {
    type: 'POST',
    cache: false,
    dataType: 'json',
    data: {
      f: 'READ',
      n: user
    },
    success: readResult,
    error: errorHandler
  });

  function readResult(callResult) {
    if (callResult !== ' ') {
      hash = JSON.parse(callResult.result);
      console.log('readResult: ' + callResult.result);
    } else if (callResult === ' ') {
      $.ajax(Link, {
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: {
          f: 'INSERT',
          n: user,
          v: JSON.stringify(hash)
        },
        success: callResultInsert,
        error: errorHandler
      });

      function callResultInsert(callResult) {
        console.log('callResultInsert: ' + callResult.result);
      }
    }
  }

  function storeInfo(hash) {
    updatePassword = Math.random();

    $.ajax(Link, {
      type: 'POST',
      cache: false,
      dataType: 'json',
      data: {
        f: 'LOCKGET',
        n: user,
        p: updatePassword
      },
      success: lockGetReady,
      error: errorHandler
    });

    function lockGetReady(callResult) {
      console.log('lockGetReady: ' + callResult.result);

      $.ajax(Link, {
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: {
          f: 'UPDATE',
          n: user,
          v: JSON.stringify(hash),
          p: updatePassword
        },
        success: updateReady,
        error: errorHandler
      });

      function updateReady(callResult) {
        console.log('updateReady: ' + callResult.result);
      }
    }
  }

  function errorHandler(jqXHR, statusStr, errorStr) {
    alert(statusStr + ' ' + errorStr);
  }

  var self = this;

  self.addValue = function (key, value) {
    hash[key] = value;
    storeInfo(hash);
  };

  self.getKeys = function () {
    return hash;
  };
}