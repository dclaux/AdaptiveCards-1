import { property, StringProperty, Versions, EnumProperty, BoolProperty, FontType, TextColor, TextSize, TextWeight, SerializableObject, AdaptiveCard, CardElement, SerializableObjectProperty, ContainerStyleProperty, SerializableObjectCollectionProperty, SerializationContext, CardObjectRegistry, PropertyBag } from "adaptivecards";

export abstract class WidgetComponent extends SerializableObject {
    //#region Schema

    static readonly typeNameProperty = new StringProperty(
        Versions.v1_0,
        "type",
        undefined,
        undefined,
        undefined,
        (sender: object) => {
            return (<WidgetComponent>sender).getJsonTypeName()
        });

    static readonly idProperty = new StringProperty(Versions.v1_0, "id");

    @property(WidgetComponent.idProperty)
    id?: string;

    protected getSchemaKey(): string {
        return this.getJsonTypeName();
    }

    //#endregion

    protected abstract getJsonTypeName(): string;
    protected abstract internalRender(): object | undefined;

    render(): object | undefined {
        return this.internalRender();
    }

}

export class TextComponent extends WidgetComponent {
    //#region Schema

    static readonly textProperty = new StringProperty(Versions.v1_0, "text", true);
    static readonly sizeProperty = new EnumProperty(Versions.v1_0, "size", TextSize);
    static readonly weightProperty = new EnumProperty(Versions.v1_0, "weight", TextWeight);
    static readonly colorProperty = new EnumProperty(Versions.v1_0, "color", TextColor);
    static readonly isSubtleProperty = new BoolProperty(Versions.v1_0, "isSubtle");
    static readonly fontTypeProperty = new EnumProperty(Versions.v1_0, "fontType", FontType);

    @property(TextComponent.sizeProperty)
    size?: TextSize;

    @property(TextComponent.weightProperty)
    weight?: TextWeight;

    @property(TextComponent.colorProperty)
    color?: TextColor;

    @property(TextComponent.fontTypeProperty)
    fontType?: FontType;

    @property(TextComponent.isSubtleProperty)
    isSubtle?: boolean;

    @property(TextComponent.textProperty)
    text?: string;

    //#endregion

    protected getJsonTypeName(): string {
        return "TextComponent";
    }

    protected internalRender(): object | undefined {
        return {
            type: "TextBlock",
            text: this.text,
            size: this.size,
            color: this.color,
            fontType: this.fontType,
            isSubtle: this.isSubtle
        }
    }
}

export class HeaderComponent extends WidgetComponent {
    //#region Schema

    static readonly textProperty = new SerializableObjectProperty(Versions.v1_0, "text", TextComponent);
    static readonly styleProperty = new ContainerStyleProperty(Versions.v1_0, "style");

    @property(HeaderComponent.textProperty)
    text?: TextComponent;

    @property(HeaderComponent.styleProperty)
    style?: string;

    //#endregion

    protected getJsonTypeName(): string {
        return "HeaderComponent";
    }

    protected internalRender(): object | undefined {
        return {
            type: "Container",
            bleed: true,
            style: this.style,
            items: [
                this.text?.render()
            ]
        }
    }
}

export abstract class WidgetComponentCollection extends WidgetComponent {
    private _items: WidgetComponent[] = [];

    protected abstract getItemsCollectionPropertyName(): string;
    protected abstract getAdaptiveCardContainerTypeName(): string;
    protected abstract getAdaptiveCardContainerItemsPropertyName(): string;

    protected internalParse(source: any, context: SerializationContext) {
        super.internalParse(source, context);

        this.clear();

        let rawItems = source[this.getItemsCollectionPropertyName()];

        if (Array.isArray(rawItems)) {
            for (let item of rawItems) {
                if (typeof item === "object" && item["type"] !== undefined) {
                    let instance = WidgetComponentRegistry.createInstance(item["type"], Versions.v1_0);

                    if (instance) {
                        instance.parse(item);

                        this._items.push(instance);
                    }
                }
            }
        }
    }

    protected internalToJSON(target: PropertyBag, context: SerializationContext) {
        super.internalToJSON(target, context);

        context.serializeArray(target, this.getItemsCollectionPropertyName(), this._items);
    }

    protected internalRender(): object | undefined {
        if (this._items === undefined) {
            return undefined;
        }

        let renderedItems = [];

        for (let item of this._items) {
            let renderedItem = item.render();

            if (renderedItem !== undefined) {
                renderedItems.push(renderedItem);
            }
        }

        if (renderedItems.length > 0) {
            return {
                type: this.getAdaptiveCardContainerTypeName(),
                [this.getAdaptiveCardContainerItemsPropertyName()]: renderedItems
            }
        }

        return undefined;
    }

    clear() {
        this._items = [];
    }
}

export class Widget extends WidgetComponentCollection {
    protected getJsonTypeName(): string {
        return "Widget";
    }

    protected getItemsCollectionPropertyName(): string {
        return "items";
    }

    protected getAdaptiveCardContainerTypeName(): string {
        return "AdaptiveCard";
    }

    protected getAdaptiveCardContainerItemsPropertyName(): string {
        return "body";
    }
}

export const WidgetComponentRegistry = new CardObjectRegistry<WidgetComponent>();
WidgetComponentRegistry.register("Text", TextComponent);
WidgetComponentRegistry.register("Header", HeaderComponent);