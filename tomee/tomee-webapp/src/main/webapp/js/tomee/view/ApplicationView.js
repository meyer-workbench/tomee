/**
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

TOMEE.ApplicationView = function (cfg) {
    "use strict";

    var channel = cfg.channel;
    var groups = cfg.groups;

    var toolbar = TOMEE.ApplicationToolbar({
        channel:channel
    });

    var currentTab = 'home';
    channel.bind('toolbar.click', function (params) {
        if (currentTab === params.tab) {
            return;
        }
        currentTab = params.tab;
        showTab(currentTab);
    });

    $('body').append(toolbar.getEl());

    var elMapContent = TOMEE.el.getElMap({
        elName:'main',
        tag:'div'
    });

    $('body').append(elMapContent.main);

    var elMapFooter = TOMEE.el.getElMap({
        elName:'main',
        tag:'div',
        attributes:{
            style:'clear: both;'
        },
        children:[
            {
                tag:'hr',
                attributes:{
                    style:'margin-top: 0px; margin-bottom: 0px;'
                },
                children:[
                    {
                        tag:'footer',
                        html:'<p style="text-align: center">' + TOMEE.I18N.get('application.footer') + '</p>'
                    }
                ]
            }
        ]
    });
    $('body').append(elMapFooter.main);

    var showTab = function(tab) {
        elMapContent.main.empty();
        elMapContent.main.append(groups[tab].getEl());
    };

    showTab(currentTab);

    return {
        setLoggedUser:function (name) {
            toolbar.setLoggedUser(name);
        }
    };
};