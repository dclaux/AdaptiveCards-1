import { SerializableObject, StringProperty, Versions, property, NumProperty, SerializableObjectCollectionProperty, AdaptiveApplet, PropertyDefinition, SerializationContext,
    Action, InputAwareAction, DataQuery, SignalableObject, SignalCallback, CardElement, CardObjectRegistry, Version } from "adaptivecards";
import { CardElementStub } from "./card-element-stub";
// import * as Extras from "adaptivecards-extras";
import * as ACData from "adaptivecards-templating";

export class PropertyUpdate extends SerializableObject {
    //#region Schema

    static readonly targetElementIdProperty = new StringProperty(Versions.v1_0, "targetElementId");
    static readonly propertyNameProperty = new StringProperty(Versions.v1_0, "propertyName");
    static readonly propertyValueProperty = new StringProperty(Versions.v1_0, "propertyValue");

    @property(PropertyUpdate.targetElementIdProperty)
    targetElementId: string;

    @property(PropertyUpdate.propertyNameProperty)
    propertyName: string;

    @property(PropertyUpdate.propertyValueProperty)
    propertyValue: string;

    protected getSchemaKey(): string {
        return "PropertyUpdate";
    }

    //#endregion
}

export class UpdateElementsAction extends InputAwareAction {
    //#region Schema

    static readonly propertyUpdatesProperty = new SerializableObjectCollectionProperty(Versions.v1_0, "propertyUpdates", PropertyUpdate);

    @property(UpdateElementsAction.propertyUpdatesProperty)
    propertyUpdates: PropertyUpdate[];

    //#endregion

    // Note the "weird" way this field is declared is to work around a breaking
    // change introduced in TS 3.1 wrt d.ts generation. DO NOT CHANGE
    static readonly JsonTypeName: "Action.UpdateElements" = "Action.UpdateElements";

    getJsonTypeName(): string {
        return UpdateElementsAction.JsonTypeName;
    }

    execute() {
        super.execute();

        if (this.parent) {
            for (let update of this.propertyUpdates) {
                let targetElement = this.parent.getRootElement().getElementById(update.targetElementId);

                if (targetElement) {
                    let schema = targetElement.getSchema();
                    let propertyDefinition = schema.findProperty(update.propertyName);

                    if (propertyDefinition !== undefined) {
                        console.log("Evaluating " + update.propertyValue);

                        let expression = ACData.Template.parseInterpolatedString(update.propertyValue);

                        if (typeof expression === "string") {
                            targetElement.setValue(propertyDefinition, expression, true);
                        }
                        else {
                            let referencedInputs = this.getReferencedInputs();
                            let inputValueMap = {};

                            if (referencedInputs !== undefined) {
                                for (let key of Object.keys(referencedInputs)) {
                                    let input = referencedInputs[key];
                    
                                    if (input.id && input.isSet()) {
                                        inputValueMap[input.id] = typeof input.value === "string" ? input.value : input.value.toString();
                                    }
                                }
                            }
                
                            let context = {
                                $root: {
                                    $inputs: inputValueMap
                                }
                            };

                            console.log("Eval context: " + JSON.stringify(context));

                            let { value, error } = ACData.Template.tryEvaluateExpression(
                                expression,
                                context,
                                false);
                            
                            if (error === undefined) {
                                console.log("Evaluated value: " + value);

                                targetElement.setValue(propertyDefinition, value, true);
                            }
                            else {
                                console.log("Eval failed: " + error);
                            }
                        }                      
                    }
                }
            }
        }
    }
}

export abstract class TypedSerializableObject extends SerializableObject {
    //#region Schema

    static readonly typeNameProperty = new StringProperty(
        Versions.v1_0,
        "type",
        undefined,
        undefined,
        undefined,
        (sender: object) => {
            return (<TypedSerializableObject>sender).getJsonTypeName()
        });

    protected getSchemaKey(): string {
        return this.getJsonTypeName();
    }

    //#endregion

    abstract getJsonTypeName(): string;
}

export abstract class RenderableObject extends TypedSerializableObject {
    private _renderedElement?: HTMLElement;

    protected abstract internalRender(): HTMLElement | undefined;

    render(): HTMLElement | undefined {
        this._renderedElement = this.internalRender();

        return this._renderedElement;
    }

    get renderedElement(): HTMLElement | undefined {
        return this._renderedElement;
    }
}

export class WidgetPage extends RenderableObject {
    //#region Schema

    static readonly titleProperty = new StringProperty(Versions.v1_0, "title");
    static readonly cardProperty = new PropertyDefinition(Versions.v1_0, "card");

    @property(WidgetPage.titleProperty)
    title?: string;

    @property(WidgetPage.cardProperty)
    card: any;

    //#endregion

    private static _serializationContext?: SerializationContext;

    static get serializationContext(): SerializationContext {
        if (!WidgetPage._serializationContext) {
            WidgetPage._serializationContext = new SerializationContext();

            // No dynamic loading for now... I just can't make it work.

            WidgetPage._serializationContext.elementRegistry.onCreateInstance = (sender: CardObjectRegistry<CardElement>, typeName: string, targetVersion: Version) => {
                return new CardElementStub(typeName);
            }

            // Extras.registerAllFeatures(WidgetPage._serializationContext.elementRegistry, WidgetPage._serializationContext.actionRegistry);

            WidgetPage._serializationContext.actionRegistry.register(UpdateElementsAction.JsonTypeName, UpdateElementsAction);
        }

        return WidgetPage._serializationContext;
    }
    
    private _applet?: AdaptiveApplet;

    protected internalRender(): HTMLElement | undefined {
        let element = document.createElement("div");
        element.style.border = "1px solid #dddddd";
        element.style.borderRadius = "4px";
        element.style.overflow = "hidden";
        element.style.boxShadow = "0px 5px 10px #cccccc";

        if (!this._applet && this.card) {
            this._applet = new AdaptiveApplet();
            this._applet.onCreateSerializationContext = (sender: AdaptiveApplet) => {
                return WidgetPage.serializationContext;
            }
            this._applet.onSignal = (sender: AdaptiveApplet, signalableObject: SignalableObject, callback?: SignalCallback) => {
                console.log(JSON.stringify(signalableObject.toJSON(WidgetPage.serializationContext), undefined, 4));

                if (signalableObject instanceof DataQuery) {
                    let url = "https://veryfakebot.azurewebsites.net/botapi/data/" + signalableObject.dataset;

                    if (signalableObject.filter) {
                        url += "?searchFilter=" + signalableObject.filter;
                    }

                    console.log("Fetching from " + url);

                    fetch(url).then(
                        async (value: Response) => {
                            console.log("Fetching succeeded. Retrieving JSON.");

                            let dataPayload = await value.json();

                            console.log("JSON retrieved: " + JSON.stringify(dataPayload));

                            if (callback) {
                                console.log("Invoking callback");

                                callback(false, dataPayload);
                            }
                            else {
                                console.log("No callback provided");
                            }
                        },
                        (reason: any) => {
                            console.log("Fetching " + signalableObject.dataset + " failed: " + reason);
                        }
                    );
                }
            }
            this._applet.setCard(this.card);

            if (this._applet.renderedElement !== undefined) {
                this._applet.renderedElement.style.minWidth = "0";

                element.appendChild(this._applet.renderedElement);
            }
        }

        return element;
    }

    getJsonTypeName(): string {
        return "Page";
    }
}

export class DashboardWidget extends RenderableObject {
    //#region Schema

    static readonly idProperty = new StringProperty(Versions.v1_0, "id");
    static readonly pagesProperty = new SerializableObjectCollectionProperty(Versions.v1_0, "pages", WidgetPage);

    @property(DashboardWidget.idProperty)
    id?: string;

    @property(DashboardWidget.pagesProperty)
    pages: WidgetPage[];

    //#endregion

    protected internalRender(): HTMLElement | undefined {
        let element = document.createElement("div");
        element.style.minWidth = "0";

        for (let page of this.pages) {
            page.render();

            if (page.renderedElement) {
                element.appendChild(page.renderedElement);
            }
        }

        return element;
    }

    getJsonTypeName(): string {
        return "Widget";
    }
}

export class DashboardSection extends RenderableObject {
    //#region Schema

    static readonly weightProperty = new NumProperty(Versions.v1_0, "weight", 1);
    static readonly minColumnWidthProperty = new NumProperty(Versions.v1_0, "minColumnWidth", 0);
    static readonly widgetsProperty = new SerializableObjectCollectionProperty(Versions.v1_0, "widgets", DashboardWidget);

    @property(DashboardSection.weightProperty)
    weight: number;

    @property(DashboardSection.minColumnWidthProperty)
    minColumnWidth: number = 0;

    @property(DashboardSection.widgetsProperty)
    widgets: DashboardWidget[];

    //#endregion

    protected internalRender(): HTMLElement | undefined {
        let element = document.createElement("div");
        element.style.display = "grid";
        element.style.gridTemplateRows = "max-content";
        element.style.gridGap = AdaptiveDashboard.GridGap;

        for (let widget of this.widgets) {
            let renderedWidget = widget.render();

            if (renderedWidget !== undefined) {
                element.appendChild(renderedWidget);
            }
        }

        return element;
    }

    getJsonTypeName(): string {
        return "Section";
    }
}

class Row {
    constructor(public sections: DashboardSection[] = []) {}

    htmlElement?: HTMLElement;
}

export class AdaptiveDashboard extends RenderableObject {
    static GridGap = "15px";

    //#region Schema

    static readonly titleProperty = new StringProperty(Versions.v1_0, "title");
    static readonly sectionsProperty = new SerializableObjectCollectionProperty(Versions.v1_0, "sections", DashboardSection);

    @property(WidgetPage.titleProperty)
    title?: string;

    @property(AdaptiveDashboard.sectionsProperty)
    sections: DashboardSection[];

    //#endregion

    private _resizeObserver: ResizeObserver;
    private _rows?: Row[];

    protected internalRender(): HTMLElement | undefined {
        let element = document.createElement("div");
        element.style.backgroundColor = "#f4f4f4";
        element.style.padding = "20px";
        element.style.display = "grid";
        element.style.gridGap = AdaptiveDashboard.GridGap;

        let colorIndex = 0;

        for (let section of this.sections) {
            let renderedSection = section.render();

            if (renderedSection !== undefined) {
                element.appendChild(renderedSection);
            }

            colorIndex++;
        }

        return element;
    }

    protected updateLayout(availableWidth: number) {
        if (this.renderedElement !== undefined) {
            let totalWeight = 0;

            for (let section of this.sections) {
                totalWeight += section.weight;
            }

            let rows: Row[] = [];
            let currentRow = new Row();

            for (let section of this.sections) {
                let sectionWidth = section.weight / totalWeight * availableWidth;

                if (sectionWidth >= section.minColumnWidth) {
                    currentRow.sections.push(section);
                }
                else {
                    let rowWasEmpty = currentRow.sections.length === 0;

                    if (rowWasEmpty) {
                        currentRow.sections.push(section);
                    }

                    rows.push(currentRow);

                    currentRow = new Row(rowWasEmpty ? [] : [ section ]);
                }
            }

            if (currentRow.sections.length > 0) {
                rows.push(currentRow);
            }

            let reRenderRows = false;

            if (this._rows === undefined) {
                reRenderRows = true;
            }
            else if (this._rows.length !== rows.length) {
                reRenderRows = true;
            }
            else {
                for (let i = 0; i < this._rows.length; i++) {
                    if (this._rows[i].sections.length !== rows[i].sections.length) {
                        reRenderRows = true;

                        break;
                    }
                }
            }

            if (reRenderRows) {
                this.renderedElement.innerHTML = "";

                let rowIndex = 1;

                for (let row of rows) {
                    let columnIndex = 1;

                    row.htmlElement = document.createElement("div");
                    row.htmlElement.style.display = "grid";
                    row.htmlElement.style.gridGap = AdaptiveDashboard.GridGap;

                    let templateColumns = "";

                    for (let section of row.sections) {
                        if (section.renderedElement) {
                            templateColumns += section.weight + "fr ";

                            row.htmlElement.appendChild(section.renderedElement);
                        }

                        columnIndex++;
                    }

                    row.htmlElement.style.gridTemplateColumns = templateColumns;
                        
                    this.renderedElement.appendChild(row.htmlElement);

                    rowIndex++;
                }

                this._rows = rows;
            }

            if (this._rows !== undefined) {
                for (let row of this._rows) {
                    for (let section of row.sections) {
                        if (section.renderedElement !== undefined) {
                            if (row.sections.length > 1) {
                                section.renderedElement.style.removeProperty("grid-template-columns");
                            }
                            else {
                                let perWidgetWidth = availableWidth / row.sections[0].widgets.length;

                                if (perWidgetWidth >= section.minColumnWidth) {
                                    let templateColumns = "";

                                    for (let widget of section.widgets) {
                                        templateColumns += "1fr ";
                                    }

                                    section.renderedElement.style.gridTemplateColumns = templateColumns;
                                }
                                else {
                                    section.renderedElement.style.removeProperty("grid-template-columns");
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    getJsonTypeName(): string {
        return "Dashboard";
    }

    render(): HTMLElement | undefined {
        let renderedElement = super.render();

        if (renderedElement !== undefined) {
            this._resizeObserver = new ResizeObserver(
                entries => {
                    for (let entry of entries) {
                        this.updateLayout(entry.contentRect.width);
                    }
                });

            this._resizeObserver.observe(renderedElement);
        }

        return renderedElement;
    }
}