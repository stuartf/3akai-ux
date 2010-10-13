$(function() {
  sakai = sakai || {};
  sakai.performance = {};
  sakai.performance.results = {};

  sakai.performance.timestamp = function(ev, code) {
    var now = new Date().getTime();
    if (sakai.performance.results[ev] === undefined) {
      sakai.performance.results[ev] = [];
    }
    var obj={};
    obj[code]=now;
    sakai.performance.results[ev].push(obj);
  };

  $(window).bind("sakai-profiler", function(i, data) {
      sakai.performance.timestamp(data['module'], data['code']);
  });
});
