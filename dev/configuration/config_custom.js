/*
 * Licensed to the Sakai Foundation (SF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The SF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
define(["config/config"], function(config) {

    // Custom CSS Files to load in
    // config.skinCSS = ["/dev/skins/default/skin.css"];

    /**
     * Kaltura Settings
     */
    config.kaltura = {
        enabled: false, // Enable/disable Kaltura player
        serverURL:  "http://www.kaltura.com", //INSERT_KALTURA_INSTALLATION_URL_HERE
        partnerId:  100, //INSERT_YOUR_PARTNER_ID_HERE
        playerId: 100 //INSERT_YOUR_PLAYER_ID_HERE
    };

    // Hybrid
    config.showSakai2 = true;
    config.useLiveSakai2Feeds = true;

    // CAS
    config.Authentication.allowInternalAccountCreation = false;
    config.Authentication.internal = false;
    config.allowPasswordChange = false;
    config.Authentication.external = [{
        label: "Log in with your GT Account",
        url: "/system/sling/cas/login?resource=/me",
        login_btn: "LOGIN_BTN"
    }];
    config.followLogoutRedirects = true;

		config.hybridCasHost="s-square.gatech.edu";

    // Profile
    //config.Profile.configuration.defaultConfig.basic.elements.firstname["editable"] = false;
    //config.Profile.configuration.defaultConfig.basic.elements.lastname.editable = false;
    //config.Profile.configuration.defaultConfig.basic.elements.email.editable = false;
    delete config.Profile.configuration.defaultConfig.basic.elements.email;
    config.Profile.configuration.defaultConfig.contact = {
        "label": "Contact information",
        "required": true,
        "display": true,
        "access": "everybody",
        "modifyacl": true,
        "permission": "everyone",
        "order": 1,
        "elements": {
            "email": {
                "label": "__MSG__PROFILE_BASIC_EMAIL_LABEL__",
                "errorMessage": "__MSG__PROFILE_BASIC_EMAIL_ERROR__",
                "required": true,
                "display": true,
                "validation": "email"
            }
        }
    };

    return config;
});
