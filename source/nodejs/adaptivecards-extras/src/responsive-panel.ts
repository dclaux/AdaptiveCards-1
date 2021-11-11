// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { CardElement, NumProperty, property, PropertyDefinition, SerializableObject, SerializableObjectCollectionProperty, SerializationContext, TextBlock, Versions } from "adaptivecards";
import { Template } from "adaptivecards-templating";

export class Layout extends SerializableObject {
    //#region Schema

    static readonly widthThresholdProperty = new NumProperty(Versions.v1_0, "widthThreshold");
    static readonly templateProperty = new PropertyDefinition(Versions.v1_0, "template");

    @property(Layout.widthThresholdProperty)
    widthThreshold?: number;

    @property(Layout.templateProperty)
    template: any;

    protected getSchemaKey(): string {
        return "Layout";
    }

    //#endregion

    private _preparedTemplate?: Template;

    generateCardElement(parent: CardElement, data: any): CardElement | undefined {
        if (data !== undefined) {
            if (this._preparedTemplate === undefined) {
                this._preparedTemplate = new Template(this.template);
            }

            let expandedTemplate = this._preparedTemplate.expand({ $root: data });

            let serializationContext = new SerializationContext(Versions.latest);

            return serializationContext.parseElement(parent, expandedTemplate, true);
        }

        return undefined;
    }
}

export class ResponsivePanel extends CardElement {
    static readonly JsonTypeName = "Extras.ResponsivePanel";

    //#region Schema

    static readonly dataProperty = new PropertyDefinition(Versions.v1_0, "data");
    static readonly layoutsProperty = new SerializableObjectCollectionProperty(Versions.v1_0, "layouts", Layout);

    @property(ResponsivePanel.dataProperty)
    data: any;

    @property(ResponsivePanel.layoutsProperty)
    layouts: Layout[];

    //#endregion

    private _currentLayout?: Layout;
    private _resizeObserver: ResizeObserver;

    private renderEmptyContentMessage(message: string) {
        if (this.renderedElement) {
            this.renderedElement.innerHTML = "";

            let textBlock = new TextBlock();
            textBlock.text = message;
            textBlock.render();

            if (textBlock.renderedElement) {
                this.renderedElement.appendChild(textBlock.renderedElement);
            }
        }
    }

    private renderContent() {
        if (this._currentLayout === undefined) {
            this.renderEmptyContentMessage("Items can't be displayed because no layout is defined.");

            return;
        }
        
        if (this.renderedElement) {
            this.renderedElement.innerHTML = "";

            let content = this._currentLayout.generateCardElement(this, this.data);

            if (content !== undefined) {
                let renderedContent = content.render();

                if (renderedContent !== undefined) {
                    this.renderedElement.appendChild(renderedContent);
                }
            }
        }
    }

    private selectLayout(availableWidth: number): Layout | undefined {
        let result: Layout | undefined = undefined;

        for (let layout of this.layouts) {
            if (layout.widthThreshold === undefined) {
                if (result === undefined || result.widthThreshold === undefined) {
                    result = layout
                }
            }
            else if (layout.widthThreshold >= availableWidth && (result === undefined || result.widthThreshold === undefined || result.widthThreshold > layout.widthThreshold)) {
                result = layout;
            }
        }

        return result;
    }

    protected internalRender(): HTMLElement | undefined {
        let element = document.createElement("div");
        element.className = "ac-extras-responsivePanel-root";
        element.style.overflowY = "auto";

        this._resizeObserver = new ResizeObserver(
            entries => {
                if (entries.length > 0) {
                    let template = this.selectLayout(entries[0].contentRect.width);

                    if (template !== this._currentLayout) {
                        this._currentLayout = template;

                        this.renderContent();
                    }
                }
            });

        this._resizeObserver.observe(element);

        return element;
    }

    getJsonTypeName(): string {
        return ResponsivePanel.JsonTypeName;
    }
}