$(function() {
  sakai = sakai || {};
  sakai.performance = {};
  sakai.performance.results = {};

  sakai.performance.timestamp = function(ev, code) {
    var now = new Date().getTime();
    if (sakai.performance.results[ev] === undefined) {
      sakai.performance.results[ev] = [];
    }
    obj={};
    obj[code]=now;
    sakai.performance.results[ev].push(obj);
  };

  $.each(sakai.profilerEvents, function(index, eventName) {
    $(window).bind(eventName, function(e, type) {
      sakai.performance.timestamp(eventName, type);
    });
  });
});
