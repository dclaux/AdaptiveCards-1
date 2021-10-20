// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as Adaptive from "adaptivecards";
import { ProgressBar } from "./progress-bar";
import { BarChart } from "./charts";

export * from "./progress-bar";
export * from "./charts";

export function registerAllFeatures(elementsRegistry?: Adaptive.CardObjectRegistry<Adaptive.CardElement>, actionsRegistry?: Adaptive.CardObjectRegistry<Adaptive.Action>) {
    let targetElementRegistry = elementsRegistry ? elementsRegistry : Adaptive.GlobalRegistry.elements;

    targetElementRegistry.register(ProgressBar.JsonTypeName, ProgressBar, Adaptive.Versions.v1_0);
    targetElementRegistry.register(BarChart.JsonTypeName, BarChart, Adaptive.Versions.v1_0);
}