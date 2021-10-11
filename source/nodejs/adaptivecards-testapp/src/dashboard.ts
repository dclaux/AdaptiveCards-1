import * as Adaptive from "adaptivecards";

export class DashboardColumn extends Adaptive.SerializableObject {
    static readonly weightProperty = new Adaptive.NumProperty(Adaptive.Versions.v1_0, "weight", 1);

    @Adaptive.property(DashboardColumn.weightProperty)
    weight: number;

    getSchemaKey(): string {
        return "DashboardColumn";
    }
}

export class DashboardWidget extends Adaptive.SerializableObject {
    //#region Schema

    static readonly idProperty = new Adaptive.StringProperty(Adaptive.Versions.v1_0, "id");
    static readonly columnIndexProperty = new Adaptive.NumProperty(Adaptive.Versions.v1_0, "columnIndex", 0);
    static readonly columnSpanProperty = new Adaptive.NumProperty(Adaptive.Versions.v1_0, "columnSpan", 1);

    @Adaptive.property(DashboardWidget.idProperty)
    id?: string;

    @Adaptive.property(DashboardWidget.columnIndexProperty)
    columnIndex: number;

    @Adaptive.property(DashboardWidget.columnSpanProperty)
    columnSpan: number;

    getSchemaKey(): string {
        return "DashboardWidget";
    }

    //#endregion
}

export class AdaptiveDashboard extends Adaptive.SerializableObject {
    static readonly columnsProperty = new Adaptive.SerializableObjectCollectionProperty(Adaptive.Versions.v1_0, "columns", DashboardColumn);
    static readonly widgetsProperty = new Adaptive.SerializableObjectCollectionProperty(Adaptive.Versions.v1_0, "widgets", DashboardColumn);

    @Adaptive.property(AdaptiveDashboard.columnsProperty)
    columns: DashboardColumn[];

    @Adaptive.property(AdaptiveDashboard.widgetsProperty)
    widgets: DashboardColumn[];

    getSchemaKey(): string {
        return "AdaptiveDashboard";
    }
}