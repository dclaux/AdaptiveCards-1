// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { DataQuery, CardElement, NumProperty, property, PropertyDefinition, SerializableObject, SerializableObjectCollectionProperty, SerializableObjectProperty, SerializationContext, Versions, BaseSerializationContext, SignalableObject, StringProperty, TextBlock, Input } from "adaptivecards";
import { Template } from "adaptivecards-templating";

export class ItemTemplate extends SerializableObject {
    //#region Schema

    static readonly widthThresholdProperty = new NumProperty(Versions.v1_0, "widthThreshold");
    static readonly templateProperty = new PropertyDefinition(Versions.v1_0, "template");

    @property(ItemTemplate.widthThresholdProperty)
    widthThreshold?: number;

    @property(ItemTemplate.templateProperty)
    template: any;

    protected getSchemaKey(): string {
        return "ItemTemplate";
    }

    //#endregion

    private _preparedTemplate?: Template;

    generateCardElement(parent: CardElement, item: any): CardElement | undefined {
        if (item !== undefined) {
            if (this._preparedTemplate === undefined) {
                this._preparedTemplate = new Template(this.template);
            }

            let expandedTemplate = this._preparedTemplate.expand({ $root: item });

            let serializationContext = new SerializationContext(Versions.latest);

            return serializationContext.parseElement(parent, expandedTemplate, true);
        }

        return undefined;
    }
}

export class ListItem {
    private clicked() {
        if (this.onClick) {
            this.onClick(this);
        }
    }

    private _isSelected: boolean = false;

    onClick: (sender: ListItem) => void;

    constructor(private readonly owner: List, private readonly data: any, readonly renderedElement: HTMLElement) {
        renderedElement.onclick = () => {
            this.clicked();
        }
    }

    get title(): string | undefined {
        return typeof this.data === "object" && this.data.hasOwnProperty("title") ? this.data["title"] : undefined;
    }

    get value(): string | undefined {
        return typeof this.data === "object" && this.data.hasOwnProperty("value") ? this.data["value"] : undefined;
    }

    get isSelected(): boolean {
        return this._isSelected;
    }

    set isSelected(value: boolean) {
        if (value !== this._isSelected) {
            this._isSelected = value;

            if (this._isSelected) {
                this.renderedElement.classList.add("selected");
            }
            else {
                this.renderedElement.classList.remove("selected");
            }
        }
    }
}

export class List extends Input {
    static readonly JsonTypeName = "Extras.List";

    //#region Schema

    static readonly itemsProperty = new PropertyDefinition(Versions.v1_0, "items");
    static readonly itemsSourceProperty = new SerializableObjectProperty(Versions.v1_0, "itemsSource", DataQuery, true);
    static readonly itemTemplatesProperty = new SerializableObjectCollectionProperty(Versions.v1_0, "itemTemplates", ItemTemplate);
    static readonly maxHeightProperty = new NumProperty(Versions.v1_0, "maxHeight");
    static readonly searchFilterProperty = new StringProperty(Versions.v1_0, "searchFilter", true);

    @property(List.itemsProperty)
    items: any;

    @property(List.itemsSourceProperty)
    itemsSource?: DataQuery;

    @property(List.itemTemplatesProperty)
    itemTemplates: ItemTemplate[];

    @property(List.maxHeightProperty)
    maxHeight?: number;

    @property(List.searchFilterProperty)
    searchFilter?: string;

    //#endregion

    private _currentTemplate?: ItemTemplate;
    private _resizeObserver: ResizeObserver;
    private _fetchedItems?: any;
    private _renderedItems: ListItem[];
    private _selectedItem?: ListItem;

    private renderEmptyContentMessage(message: string) {
        if (this.renderedInputControlElement) {
            this.renderedInputControlElement.innerHTML = "";

            let textBlock = new TextBlock();
            textBlock.text = message;
            textBlock.render();

            if (textBlock.renderedElement) {
                this.renderedInputControlElement.appendChild(textBlock.renderedElement);
            }
        }
    }

    private renderItems() {
        this._renderedItems = [];

        let itemsArray: any[] = Array.isArray(this._fetchedItems) ? this._fetchedItems : [ this._fetchedItems ];

        if (itemsArray.length === 0) {
            this.renderEmptyContentMessage("The list is empty.");

            return;
        }

        if (this._currentTemplate === undefined) {
            this.renderEmptyContentMessage("Items can't be displayed because no display template is defined.");

            return;
        }
        
        if (this.renderedInputControlElement) {
            this.renderedInputControlElement.innerHTML = "";

            let isFirstItem = true;

            for (let item of itemsArray) {
                let cardElement = this._currentTemplate.generateCardElement(this, item);

                if (cardElement) {
                    cardElement.setParent(this);
                    
                    let renderedItem = cardElement.render();

                    if (renderedItem !== undefined) {
                        let itemHost = document.createElement("div");
                        itemHost.className = "ac-extras-list-itemHost";

                        if (!isFirstItem) {
                            itemHost.style.marginTop = "6px";
                        }

                        itemHost.appendChild(renderedItem);

                        this.renderedInputControlElement.appendChild(itemHost);

                        let listItem = new ListItem(this, item, itemHost);
                        listItem.onClick = (sender: ListItem) => {
                            for (let clickedItem of this._renderedItems) {
                                clickedItem.isSelected = clickedItem === sender;
                            }

                            this._selectedItem = sender;

                            this.valueChanged();
                        }

                        this._renderedItems.push(listItem);

                        isFirstItem = false;
                    }
                }
            }
        }
    }

    private fetchAndRenderItems(forceReFetch: boolean = false) {
        let fetching = false;

        if (!this._fetchedItems || forceReFetch) {
            if (this.itemsSource) {
                fetching = true;

                this.itemsSource.filter = this.searchFilter;
                this.itemsSource.signal(
                    this,
                    (isError: boolean, result: any) => {
                        console.log("Callback received");
    
                        if (!isError) {
                            this._fetchedItems = result;

                            console.log("Fetched items: " + JSON.stringify(this._fetchedItems));

                            this.renderItems();
                        }
                    }
                )
            }
            else {
                this._fetchedItems = this.items;
            }
        }

        if (!fetching) {
            this.renderItems();
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
            else if (itemTemplate.widthThreshold >= availableWidth && (result === undefined || result.widthThreshold === undefined || result.widthThreshold > itemTemplate.widthThreshold)) {
                result = itemTemplate;
            }
        }

        return result;
    }

    protected internalRender(): HTMLElement | undefined {
        let element = document.createElement("div");
        element.className = "ac-extras-list-root";
        element.style.overflowY = "auto";
        element.style.width = "100%";

        if (this.maxHeight !== undefined && this.maxHeight > 0) {
            element.style.maxHeight = this.maxHeight + "px";
        }

        return element;
    }

    protected overrideInternalRender(): HTMLElement | undefined {
        let renderedElement = super.overrideInternalRender();

        if (renderedElement !== undefined) {
            this._resizeObserver = new ResizeObserver(
                entries => {
                    if (entries.length > 0) {
                        let template = this.selectTemplate(entries[0].contentRect.width);

                        if (template !== this._currentTemplate) {
                            this._currentTemplate = template;

                            this.fetchAndRenderItems();
                        }
                    }
                });

            this._resizeObserver.observe(renderedElement);
        }

        return renderedElement;
    }

    protected propertyChanged(property: PropertyDefinition) {
        super.propertyChanged(property);

        if (property === List.searchFilterProperty) {
            this.fetchAndRenderItems(true);
        }
    }

    getJsonTypeName(): string {
        return List.JsonTypeName;
    }

    isSet(): boolean {
        return this.value !== undefined;
    }

    get selectedItem(): ListItem | undefined {
        return this._selectedItem ;
    }

    get value(): string | undefined {
        return this._selectedItem !== undefined ? this._selectedItem.value : undefined;
    }
}
