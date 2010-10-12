var results = {};

var timestamp = function(ev, code) {
  var now = new Date().getTime();
  if (results[ev] === undefined) {
    results[ev] = [];
  }
  obj={};
  obj[code]=now;
  results[ev].push(obj);
};

$.each(profilerEvents, function(index, eventName) {
  $(window).bind(eventName + "Start", timestamp(eventName, "start"));
  //$(window).bind(eventName + "Checkpoint", timestamp(eventName, "checkpoint"));
  $(window).bind(eventName + "End", timestamp(eventName, "end"));
});
