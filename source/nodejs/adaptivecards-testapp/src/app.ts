// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// import { CardElement, CardObjectRegistry, SerializationContext, Version } from "adaptivecards";
// import "adaptivecards/dist/adaptivecards.css";
import * as Dashboard from "./dashboard";
import * as Shared from "./shared";

window.onload = function() {
    let btn = document.getElementById("serializeDashboard");

    if (btn) {
        btn.onclick = () => {
            let serialized = JSON.stringify(Shared.testPayload, undefined, 4);

            let textArea = document.getElementById("serializedDashboard");

            if (textArea) {
                textArea.textContent = serialized;
            }
        }
    }

    fetch("https://veryfakebot.azurewebsites.net/botapi/dashboard").then(
        async (value: Response) => {
            let dashboardPayload = await value.json();

            let dashboard = new Dashboard.AdaptiveDashboard();
            dashboard.parse(dashboardPayload);
        
            let dashboardHost = document.getElementById("dashboardHost");
        
            if (dashboardHost !== null) {
                let element = dashboard.render();
        
                if (element !== undefined) {
                    dashboardHost.appendChild(element);
                }
            }
        }
    )
}
