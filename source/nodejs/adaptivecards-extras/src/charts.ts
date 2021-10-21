// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { CardElement } from "adaptivecards";
import Chart from 'chart.js/auto';

export abstract class ChartBase extends CardElement {
    private _resizeObserver: ResizeObserver;
    private _chart?: Chart;

    protected abstract internalCreateChart(ctx: CanvasRenderingContext2D): Chart;

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

    protected internalCreateChart(ctx: CanvasRenderingContext2D): Chart {
        return new Chart(
            ctx,
            {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'More 1' ],
                    datasets: [
                        {
                            label: '# of Votes',
                            data: [12, 19, 3, 5, 2, 3, 8, 9, 15],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)'
                            ],
                            borderWidth: 1
                        },
                        {
                            label: 'Other',
                            data: [4, 8, 2, 23, 6, 8, 12, 18 ],
                            backgroundColor: [
                                'rgba(255, 128, 132, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 128, 132, 1)'
                            ],
                            borderWidth: 1
                        }
                    ]
                }
            }
        );
    }

    getJsonTypeName(): string {
        return BarChart.JsonTypeName;
    }
}