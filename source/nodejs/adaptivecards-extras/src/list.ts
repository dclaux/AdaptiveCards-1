// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { CardElement, NumProperty, property, PropertyDefinition, SerializableObject, SerializableObjectCollectionProperty, SerializationContext, Versions } from "adaptivecards";
import { Template } from "adaptivecards-templating";

export class ItemTemplate extends SerializableObject {
    //#region Schema

    static readonly widthThresholdProperty = new NumProperty(Versions.v1_0, "widthThreshold");
    static readonly templateProperty = new PropertyDefinition(Versions.v1_0, "templateProperty");

    @property(ItemTemplate.widthThresholdProperty)
    widthThreshold?: number;

    @property(ItemTemplate.templateProperty)
    template: any;

    protected getSchemaKey(): string {
        return "ItemTemplate";
    }

    //#endregion

    private _preparedTemplate?: Template;

    renderItem(parent: CardElement, item: any): HTMLElement | undefined {
        if (item !== undefined) {
            if (this._preparedTemplate === undefined) {
                this._preparedTemplate = new Template(this.template);
            }

            this._preparedTemplate.expand({ $root: item });

            let serializationContext = new SerializationContext(Versions.v1_0);
            let parsedElement = serializationContext.parseElement(parent, item, true);

            if (parsedElement !== undefined) {
                return parsedElement.render();
            }
        }

        return undefined;
    }
}

export class List extends CardElement {
    static readonly JsonTypeName = "Extras.List";

    //#region Schema

    static readonly itemsProperty = new PropertyDefinition(Versions.v1_0, "items");
    static readonly itemTemplatesProperty = new SerializableObjectCollectionProperty(Versions.v1_0, "itemTemplates", ItemTemplate);
    static readonly maxHeightProperty = new NumProperty(Versions.v1_0, "maxHeight");

    @property(List.itemsProperty)
    items: any;

    @property(List.itemTemplatesProperty)
    itemTemplates: ItemTemplate[];

    @property(List.maxHeightProperty)
    maxHeight?: number;

    //#endregion

    private _currentTemplate?: ItemTemplate;
    private _resizeObserver: ResizeObserver;

    private renderItems() {
        if (this.renderedElement && this.items !== undefined && this._currentTemplate !== undefined) {
            let itemsArray: any[] = Array.isArray(this.items) ? this.items : [ this.items ];

            this.renderedElement.innerHTML = "";

            for (let item of itemsArray) {
                let renderedItem = this._currentTemplate.renderItem(this, item);

                if (renderedItem !== undefined) {
                    this.renderedElement.appendChild(renderedItem);
                }
            }
        }
    }

    private selectTemplate(availableWidth: number): ItemTemplate | undefined {
        let result: ItemTemplate | undefined = undefined;

        for (let itemTemplate of this.itemTemplates) {
            if (itemTemplate.widthThreshold === undefined) {
                if (result === undefined || result.widthThreshold === undefined) {
                    result = itemTemplate
                }
            }
            else if (itemTemplate.widthThreshold >= availableWidth) {
                result = itemTemplate;
            }
        }

        return result;
    }

    protected internalRender(): HTMLElement | undefined {
        let element = document.createElement("div");
        element.style.overflowY = "scroll";

        if (this.maxHeight !== undefined && this.maxHeight > 0) {
            element.style.maxHeight = this.maxHeight + "px";
        }

        this._resizeObserver = new ResizeObserver(
            entries => {
                for (let entry of entries) {
                    let template = this.selectTemplate(entry.contentRect.width);

                    if (template !== this._currentTemplate) {
                        this._currentTemplate = template;

                        this.renderItems();
                    }
                }
            });

        this._resizeObserver.observe(element);

        return element;
    }

    getJsonTypeName(): string {
        return List.JsonTypeName;
    }
}
