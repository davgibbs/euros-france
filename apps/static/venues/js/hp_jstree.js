"use strict";

function get_json_jstree_formatted(results){
    var json_jstree_formatted = [];

    var i = 0;
    for (i; i < results.length; i++){
        json_jstree_formatted.push({
            text: results[i].full_name,
            id: results[i].id
        });
    }

    return json_jstree_formatted;
}


var selected_character = {
    character_id: null,
};


$( document ).ready(function() {
    var graph_get = $.ajax({
         url: "../api/characters/",
         type: "GET",
    });

    graph_get.done(function( data ) {
        var json_jstree_formatted = get_json_jstree_formatted(data.results);

        var $jstree_header = $('<div><h3>Characters</h3></div>');

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

        listen_for_jstree_clicks();
    });
});

