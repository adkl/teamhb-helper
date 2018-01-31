// ==UserScript==
// @name         TeamHB helper
// @namespace    https://www.teamhb.org/
// @version      0.1
// @description  My contribution to the TeamHB community
// @author       Adnan Alibegovic
// @match        https://www.teamhb.org/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
    var __LIB__ = function() {
        return {
            constants: {
                PLAYER_DETAILS: "player_details"
            },
            get_subpage: function() {
                // TODO better strategy for return current page in future
                let queryparams = window.location.search.split("&");
                for(let i = 0; i < queryparams.length; i++) {
                    if(queryparams[i].indexOf("pldetails")) {
                        return this.constants.PLAYER_DETAILS;
                    }
                }
            },
            get_player_id: function() {
                let queryparams = window.location.search.split("&");
                let player_id_param = queryparams.find(x => x.indexOf("playerid") != -1);
                return player_id_param.split("=")[1];
            },
            build_player_description_view: function(player_id) {
                // extract logic to separate functions

                let text = localStorage.getItem('TEAMHB_PLAYER_' + player_id + '_INFO') || "";
                let textarea = document.createElement('textarea');
                textarea.rows = 5;
                textarea.value = text;
                textarea.style.width = "590px";
                textarea.style.resize = "none";
                textarea.style.overflow = "auto";
                textarea.addEventListener('input', function(e) {
                    localStorage.setItem('TEAMHB_PLAYER_' + player_id + '_INFO', this.value);
                });

                let td = document.createElement('td');
                td.colSpan = 6;
                td.style.backgroundColor = "#edeae1";
                td.style.padding = "2px";
                td.style.fontFamily = "verdana, arial, sans-serif";
                td.style.fontSize = "12px";
                td.valign = "middle";
                td.align = "left";
                td.appendChild(textarea);

                let tr = document.createElement('tr');
                tr.appendChild(td);

                let place_to_append = document.querySelector('#profile > table > tbody > tr:nth-child(14)');
                place_to_append.parentNode.insertBefore(tr, place_to_append.nextSibling);
            }
        };
    };
    var LIB = new __LIB__();
    let page = LIB.get_subpage();
    switch(page) {
        case LIB.constants.PLAYER_DETAILS:
            let player_id = LIB.get_player_id();
            LIB.build_player_description_view(player_id);
            break;

    }
})();
