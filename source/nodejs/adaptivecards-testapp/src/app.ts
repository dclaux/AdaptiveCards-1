// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as Adaptive from "adaptivecards";
import { AdaptiveCard, SerializationContext, Versions } from "adaptivecards";
import "adaptivecards/dist/adaptivecards.css";
import * as Dashboard from "./dashboard";
import * as Shared from "./shared";

window.onload = function() {
    let serializationContext = new SerializationContext();
    
    let extras = require("../../adaptivecards-extras/dist/adaptivecards-extras");

    extras.registerAllFeatures(serializationContext.elementRegistry, serializationContext.actionRegistry);

    let dashboard = new Dashboard.AdaptiveDashboard();
    dashboard.parse(Shared.testPayload, serializationContext);

    let dashboardHost = document.getElementById("dashboardHost");

    if (dashboardHost !== null) {
        let element = dashboard.render();

        if (element !== undefined) {
            dashboardHost.appendChild(element);
        }
    }
}
