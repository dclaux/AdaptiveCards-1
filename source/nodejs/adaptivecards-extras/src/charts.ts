// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { BaseSerializationContext, CardElement, property, PropertyBag, PropertyDefinition, SerializableObject, SerializableObjectCollectionProperty, SerializableObjectProperty, StringArrayProperty, StringProperty, ValidationEvent, Version, Versions } from "adaptivecards";
import Chart from "chart.js/auto";

const BackgroundColors = [
    "#464775",
    "#6264A7",
    "#8B8CC7",
    "#BDBDE6"
];

export class NumberArrayProperty extends PropertyDefinition {
    parse(sender: SerializableObject, source: PropertyBag, context: BaseSerializationContext): number[] | undefined {
        let sourceValue = source[this.name];

        if (sourceValue === undefined || !Array.isArray(sourceValue)) {
            return this.defaultValue;
        }

        let result: number[] = [];

        for (let value of sourceValue) {
            if (typeof value === "number") {
                result.push(value);
            }
            else {
                context.logParseEvent(
                    sender,
                    ValidationEvent.InvalidPropertyValue,
                    `Invalid array value "${value}" of type "${typeof value}" ignored for "${this.name}".`);
            }
        }

        return result;
    }

    toJSON(sender: SerializableObject, target: PropertyBag, value: number[] | undefined, context: BaseSerializationContext) {
        context.serializeArray(target, this.name, value);
    }

    constructor(
        readonly targetVersion: Version,
        readonly name: string,
        readonly defaultValue?: number[],
        readonly onGetInitialValue?: (sender: SerializableObject) => number[] | undefined) {
        super(targetVersion, name, defaultValue, onGetInitialValue);
    }
}

export class Dataset extends SerializableObject {
    //#region Schema

    static readonly labelProperty = new StringProperty(Versions.v1_0, "label");
    static readonly dataProperty = new NumberArrayProperty(Versions.v1_0, "data");

    @property(Dataset.labelProperty)
    label?: string;

    @property(Dataset.dataProperty)
    data?: number[];

    protected getSchemaKey(): string {
        return "ChartData";
    }

    //#endregion
}

export abstract class ChartBase extends CardElement {
    //#region Schema

    static readonly labelsProperty = new StringArrayProperty(Versions.v1_0, "labels");
    static readonly datasetsProperty = new SerializableObjectCollectionProperty(Versions.v1_0, "datasets", Dataset);

    @property(ChartBase.labelsProperty)
    labels: string[];

    @property(ChartBase.datasetsProperty)
    datasets?: Dataset[];

    //#endregion

    private _resizeObserver: ResizeObserver;
    private _chart?: Chart;

    protected abstract internalCreateChart(ctx: CanvasRenderingContext2D): Chart | undefined;

    protected createChartConfiguration(): any {
        if (this.datasets !== undefined) {
            let datasets: any[] = [];

            for (let dataset of this.datasets) {
                let datasetConfiguration = dataset.data === undefined ? undefined :
                    {
                        label: dataset.label,
                        data: dataset.data,
                        backgroundColor: BackgroundColors
                    };

                if (datasetConfiguration !== undefined) {
                    datasets.push(datasetConfiguration);
                }
            }

            let result = {
                labels: this.labels,
                datasets: datasets
            };

            return result;
        }

        return undefined;
    }

    protected internalRender(): HTMLElement | undefined {
        let element = document.createElement("div");

        this._resizeObserver = new ResizeObserver(
            entries => {
                if (this.renderedElement && !this._chart) {
                    let canvas = document.createElement("canvas");

                    this.renderedElement.appendChild(canvas);
                
                    let ctx = canvas.getContext('2d');
        
                    if (ctx !== null) {
                        this._chart = this.internalCreateChart(ctx);
                    }
                }
            });

        this._resizeObserver.observe(element);

        return element;
    }
}

export class BarChart extends ChartBase {
    static readonly JsonTypeName = "Extras.BarChart";

    protected internalCreateChart(ctx: CanvasRenderingContext2D): Chart | undefined {
        let configuration = this.createChartConfiguration();

        return !configuration ? undefined : new Chart(
            ctx,
            {
                type: "bar",
                data: configuration,
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            }
        );
    }

    getJsonTypeName(): string {
        return BarChart.JsonTypeName;
    }
}

export class PieChart extends ChartBase {
    static readonly JsonTypeName = "Extras.PieChart";

    protected internalCreateChart(ctx: CanvasRenderingContext2D): Chart | undefined {
        let configuration = this.createChartConfiguration();

        return !configuration ? undefined : new Chart(
            ctx,
            {
                type: "pie",
                data: configuration,
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            }
        );
    }

    getJsonTypeName(): string {
        return BarChart.JsonTypeName;
    }
}

export class DoughnutChart extends ChartBase {
    static readonly JsonTypeName = "Extras.DoughnutChart";

    protected internalCreateChart(ctx: CanvasRenderingContext2D): Chart | undefined {
        let configuration = this.createChartConfiguration();

        return !configuration ? undefined : new Chart(
            ctx,
            {
                type: "doughnut",
                data: configuration,
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            }
        );
    }

    getJsonTypeName(): string {
        return BarChart.JsonTypeName;
    }
}