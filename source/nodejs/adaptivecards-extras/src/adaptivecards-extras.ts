// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as Adaptive from "adaptivecards";
import { ProgressBar } from "./progress-bar";
import { BarChart, DoughnutChart, PieChart } from "./charts";
import { List } from "./list";
import { ResponsivePanel } from "./responsive-panel";

export * from "./progress-bar";
export * from "./charts";
export * from "./list";
export * from "./responsive-panel";

export function registerAllFeatures(elementsRegistry?: Adaptive.CardObjectRegistry<Adaptive.CardElement>, actionsRegistry?: Adaptive.CardObjectRegistry<Adaptive.Action>) {
    let targetElementRegistry = elementsRegistry ? elementsRegistry : Adaptive.GlobalRegistry.elements;

    targetElementRegistry.register(ProgressBar.JsonTypeName, ProgressBar, Adaptive.Versions.v1_0);
    targetElementRegistry.register(BarChart.JsonTypeName, BarChart, Adaptive.Versions.v1_0);
    targetElementRegistry.register(PieChart.JsonTypeName, PieChart, Adaptive.Versions.v1_0);
    targetElementRegistry.register(DoughnutChart.JsonTypeName, DoughnutChart, Adaptive.Versions.v1_0);
    targetElementRegistry.register(List.JsonTypeName, List, Adaptive.Versions.v1_0);
    targetElementRegistry.register(ResponsivePanel.JsonTypeName, ResponsivePanel, Adaptive.Versions.v1_0);
}