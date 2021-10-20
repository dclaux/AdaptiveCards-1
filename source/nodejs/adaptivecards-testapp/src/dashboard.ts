import { SerializableObject, StringProperty, Versions, property, NumProperty, SerializableObjectCollectionProperty, SerializableObjectProperty, AdaptiveCard } from "adaptivecards";

const GridGap = "15px";

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
    static readonly cardProperty = new SerializableObjectProperty(Versions.v1_0, "card", AdaptiveCard);

    @property(WidgetPage.titleProperty)
    title?: string;

    @property(WidgetPage.cardProperty)
    card?: AdaptiveCard;

    //#endregion

    protected internalRender(): HTMLElement | undefined {
        let element = document.createElement("div");
        element.style.border = "1px solid #BBBBBB";
        element.style.borderRadius = "3px";
        element.style.overflow = "hidden";
        element.style.boxShadow = "0px 5px 10px #cccccc";

        if (this.card) {
            this.card.render();

            if (this.card.renderedElement !== undefined) {
                this.card.renderedElement.style.minWidth = "0";

                element.appendChild(this.card.renderedElement);
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
        element.style.gridGap = GridGap;

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
        element.style.backgroundColor = "#F0F0F0";
        element.style.padding = "10px";
        element.style.display = "grid";
        element.style.gridGap = GridGap;

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
                    row.htmlElement.style.gridGap = GridGap;

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