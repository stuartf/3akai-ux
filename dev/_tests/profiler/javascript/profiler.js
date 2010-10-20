$(function(){
    var url = "";
    var times = 10;
    var count = 1;
    var results = {};

    var profile = function(){
        results = {};
        count = 1;
        url = $("#url").val();
        times = $("#times").val();
        $("#results").html('<img alt="loading" src="/dev/_images/ajax-loader-gray.gif" />');
        $("#csv").val("");
        $("#pframe").attr("src", url);
        return false;
    };

    $(document).ready(function() {
        var qs = new Querystring();
        url = qs.get("url", "");
        times = qs.get("times", 10);
        $("#url").val(url);
        $("#times").val(times);
        $("#pbutton").click(function() { profile(); });
        $("#results").html("");
        $("#pframe").attr("src", url);
        $("#csv").val("");
    });

    var showResults = function() {
        $("#results").html("");
        $("#csv").val("");
        var csv = "";
        $.each(results, function(index, timings) {
          var total = 0;
          csv += index;
          $.each(timings, function(n, time){
              total = total + time;
              csv += ", " + time;
          });
          csv += "\n";
          $("#results").append(index + ": " + (total/timings.length).toFixed() + "ms<br />");
        });
        showCsvWithDebugText(csv);
    };

    var showCsvWithDebugText = function(csv) {
        csv += "\n" + new Date() + ", " + navigator.userAgent;
        $.ajax({
            url: "/var/scm-version.json",
            type: "GET",
            cache: false,
            dataType: "json",
            success: function(data){
                csv += ", Nakamura Version: " + data["sakai:nakamura-version"];
                csv += ", UX Code Timestamp: " + data["jcr:created"];
            },
            complete: function(){ $("#csv").val(csv); }
        });
    };

    $(document).bind("sakai-profiler-done", function(e, data) {
        $.each(data, function(index, timing) {
            var elapsed = timing.end - timing.start;
            if (results[index] === undefined) {
              results[index] = [];
            }
            results[index].push(elapsed);
        });
        $(window).trigger("profilerPassComplete");
    });

    $(window).bind("profilerPassComplete", function() {
        if (count < times) {
            count += 1;
            $("#pframe").attr("src", "");
            $("#pframe").attr("src", url);
        } else {
            showResults();
        }
    });
});
