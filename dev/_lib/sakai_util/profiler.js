$(function() {
    sakai = sakai || {};
    sakai.performance = sakai.performance || {};

    sakai.performance = function() {
        sakai.performance.results = sakai.performance.results || {};

        // show.html is the only one that doen't show itself in the window.location.pathname
        var page = window.location.pathname.split("/dev/").length > 1 ?
            window.location.pathname.split("/dev/")[1].split(".html")[0] :
            "show";

        sakai.performance.timestamp = function(ev, code) {
            var now = new Date().getTime();
            if (sakai.performance.results[ev] === undefined) {
                sakai.performance.results[ev] = {};
            }
            sakai.performance.results[ev][code] = now;
            if (checkDone()) {
                if (parent && $(parent.document).length) {
                    parent.$(parent.document).trigger("sakai-profiler-done", sakai.performance.results);
                }
            }
        };

        var checkDone = function() {
            for (var i=0, j=sakai.profiler.config[page].length; i<j; i++) {
                var key = sakai.profiler.config[page][i];
                if (!(sakai.performance.results[key]) ||
                    (sakai.performance.results[key] && sakai.performance.results[key]["end"] === undefined)) {
                    return false;
                }
            }
            return true;
        };

        $(window).bind("sakai-profiler", function(i, data) {
            sakai.performance.timestamp(data['module'], data['code']);
        });
    };
    sakai.performance();
});
