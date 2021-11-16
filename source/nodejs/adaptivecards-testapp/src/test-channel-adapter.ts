// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as Adaptive from "adaptivecards";
import { DataQuery, ExecuteAction } from "adaptivecards";

export class TestChannelAdapter extends Adaptive.ChannelAdapter {
    constructor(readonly url: string) {
        super();
    }

    async sendRequestAsync(request: Adaptive.IActivityRequest): Promise<Adaptive.ActivityResponse> {
        let action: object | undefined = undefined;
        
        if (request.action instanceof ExecuteAction) {
            action = {
                type: "Action.Execute",
                id: request.action.id,
                verb: request.action.verb,
                data: request.action.data
            };
        }

        if (request.action instanceof DataQuery) {
            action = {
                type: "Data.Query",
                id: request.action.id,
                dataset: request.action.dataset,
                filter: request.action.filter
            };
        }

        if (action !== undefined) {
            let activity = {
                type: "invoke",
                name: "adaptiveCard/action",
                localTimezone: "",
                localTimestamp: "",
                value: {
                    action: action,
                    trigger: request.trigger,
                    environment: request["environment"]
                }
            };

            console.log("Sending request: " + JSON.stringify(activity));

            let response = await fetch(
                this.url + "invoke",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(activity)
                }
            )

            if (response.status === 200) {
                return new Adaptive.SuccessResponse(request, await response.text());
            }
            else {
                return new Adaptive.ErrorResponse(request, new Adaptive.ActivityRequestError(undefined, response.statusText));
            }
        }
        else {
            throw new Error("Unsupported action type: " + request.action.getJsonTypeName());
        }
    }
}