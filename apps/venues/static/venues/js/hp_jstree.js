/* globals listen_for_jstree_clicks: true */
"use strict";

function get_json_jstree_formatted(results){
    var json_jstree_formatted = [];

    var i = 0;
    for (i; i < results.length; i++){
        json_jstree_formatted.push({
            text: results[i].name,
            id: results[i].id
        });
    }

    return json_jstree_formatted;
}


var selected_venue = {
    venue_id: null,
};


$( document ).ready(function() {
    var venue_id = url('?venue_id')
    var graph_get = $.ajax({
         url: "../api/venues/",
         type: "GET",
    });

    graph_get.done(function( data ) {
        var json_jstree_formatted = get_json_jstree_formatted(data.results);

        var $jstree_header = $('<div><h3>Venues</h3></div>');

        var $jstree_div = $('<div id="jstree_div"></div>');
        $jstree_div.jstree({
            "core" : {
                "data" : json_jstree_formatted,
                "multiple": false
            },
            "types" : {
              "default" : {
                "icon" : "glyphicon glyphicon-flash"
              },
            },
            "plugins" : [ "themes", "ui", "wholerow", "types" ]
        });

        $('#hp_jstree').append($jstree_header);
        $('#hp_jstree').append($jstree_div);

        $('#jstree_div').on("loaded.jstree", function (e, data) {
            if (venue_id !== undefined){
                selected_venue.venue_id = venue_id;
                // If there is a venue given, make the node as selected, which also populates the table
                $("#jstree_div").jstree("select_node", venue_id);
             }
        });

        listen_for_jstree_clicks();
    });
});

