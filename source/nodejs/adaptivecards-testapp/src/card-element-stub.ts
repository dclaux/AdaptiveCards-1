// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { CardElement, property, SerializableObject, SerializableObjectCollectionProperty, SerializationContext, StringProperty, Versions } from "adaptivecards";
import * as Shared from "./shared";

class LibraryInfo extends SerializableObject {
    //#region Schema

    static readonly patternProperty = new StringProperty(Versions.v1_0, "pattern");
    static readonly jsPathProperty = new StringProperty(Versions.v1_0, "jsPath");
    static readonly lighCssPathProperty = new StringProperty(Versions.v1_0, "lightCssPath");
    static readonly darkCssPathProperty = new StringProperty(Versions.v1_0, "darkCssPath");
    static readonly rootProperty = new StringProperty(Versions.v1_0, "root");

    @property(LibraryInfo.patternProperty)
    pattern: string;

    @property(LibraryInfo.jsPathProperty)
    jsPath: string;

    @property(LibraryInfo.lighCssPathProperty)
    lightCssPath?: string;

    @property(LibraryInfo.darkCssPathProperty)
    darkCssPath?: string;

    @property(LibraryInfo.rootProperty)
    root: string;

    protected getSchemaKey(): string {
        return "LibraryInfo";
    }

    //#endregion
}

class ExtensionCatalog extends SerializableObject {
    //#region Schema

    static readonly entriesProperty = new SerializableObjectCollectionProperty(Versions.v1_0, "entries", LibraryInfo);

    @property(ExtensionCatalog.entriesProperty)
    entries: LibraryInfo[];

    protected getSchemaKey(): string {
        return "ExtensionsCatalog";
    }

    //#endregion
}

type LibraryImportCompleteCallback = (isError: boolean, errorMessage?: string) => void;

class LibraryImporter {
    private _isComplete: boolean = false;
    private _isStarted: boolean = false;

    protected completed(isError: boolean, errorMessage?: string) {
        this._isComplete = true;

        for (let listener of this.listeners) {
            listener(isError, errorMessage);
        }
    }

    readonly listeners: LibraryImportCompleteCallback[] = [];

    constructor(readonly libraryInfo: LibraryInfo, readonly serializationContext: SerializationContext) { }

    async start() {
        if (!this._isStarted) {
            this._isStarted = true;

            let scriptTag = document.createElement("script");            
            scriptTag.src = this.libraryInfo.jsPath;
            scriptTag.onload = (ev) => {
                let root = window[this.libraryInfo.root];

                if (root !== undefined) {
                    root.registerAllFeatures(this.serializationContext.elementRegistry, this.serializationContext.actionRegistry);

                    this.completed(false);
                }
                else {
                    this.completed(true, "Unable to load external library " + this.libraryInfo.jsPath);
                }
            }

            document.head.appendChild(scriptTag);

            if (this.libraryInfo.lightCssPath) {
                let linkTag = document.createElement("link");
                linkTag.rel = "stylesheet";
                linkTag.href = this.libraryInfo.lightCssPath;

                document.head.appendChild(linkTag);
            }
        }
    }

    get isComplete(): boolean {
        return this._isComplete;
    }
}

class ExtensionManager {
    private static _catalog?: ExtensionCatalog;
    private static _imports: LibraryImporter[] = [];

    private static getLibraryInfo(typeName: string): LibraryInfo | undefined {
        if (ExtensionManager.catalog) {
            for (let entry of ExtensionManager.catalog.entries) {
                let regEx = new RegExp(entry.pattern);

                if (regEx.test(typeName)) {
                    return entry;
                }
            }
        }

        return undefined;
    }

    private static async loadCatalog() {
        if (ExtensionManager._catalog === undefined) {
            if (window.location.protocol.startsWith("file")) {
                ExtensionManager._catalog = new ExtensionCatalog();
                ExtensionManager._catalog.parse(Shared.localExtensionCatalog);
            }
            else {
                let response = await fetch("extensions-catalog.json");

                if (response.status === 200) {
                    let json = await response.json();

                    ExtensionManager._catalog = new ExtensionCatalog();
                    ExtensionManager._catalog.parse(json);
                }
                else {
                    throw new Error("Unable to load extensions catalog.");
                }
            }
        }
    }

    private static internalImportLibrary(typeName: string, serializationContext: SerializationContext, callback: LibraryImportCompleteCallback) {
        let libraryInfo = ExtensionManager.getLibraryInfo(typeName);

        if (libraryInfo) {
            let importer: LibraryImporter | undefined = undefined;

            for (let existingImporter of ExtensionManager._imports) {
                if (existingImporter.libraryInfo.jsPath === libraryInfo.jsPath) {
                    importer = existingImporter;

                    break;
                }
            }

            if (importer === undefined) {
                importer = new LibraryImporter(libraryInfo, serializationContext);
                this._imports.push(importer);
            }

            if (!importer.isComplete) {
                importer.listeners.push(callback);
                importer.start();
            }
            else {
                callback(false);
            }
        }
        else {
            callback(true, "No external library registered for type " + typeName);
        }
    }

    static importLibrary(typeName: string, serializationContext: SerializationContext, callback: LibraryImportCompleteCallback) {
        ExtensionManager.loadCatalog().then(() => ExtensionManager.internalImportLibrary(typeName, serializationContext, callback));
    }

    static get catalog(): ExtensionCatalog | undefined {
        return ExtensionManager._catalog;
    }
}

export class CardElementStub extends CardElement {
    private _serializationContext: SerializationContext;
    private _stubbedElementPayload: any;

    protected internalParse(source: any, context: SerializationContext) {
        super.internalParse(source, context);

        this._serializationContext = context;
        this._stubbedElementPayload = source;
    }

    protected internalRender(): HTMLElement | undefined {
        let element = document.createElement("div");
        element.style.height = "100px";
        element.style.backgroundColor = "yellow";
        element.innerText = this.typeName;

        return element;
    }

    protected internalMounted() {
        ExtensionManager.importLibrary(
            this.typeName,
            this._serializationContext,
            (isError: boolean, errorMessage?: string) => {
                if (isError) {
                    if (this.renderedElement && errorMessage) {
                        this.renderedElement.innerText = "Error: " + errorMessage;
                    }
                }
                else {
                    let cardElement = this._serializationContext.elementRegistry.createInstance(this.typeName, this._serializationContext.targetVersion);

                    if (cardElement !== undefined) {
                        console.log("Instance of " + this.typeName + " created.")

                        cardElement.parse(this._stubbedElementPayload, this._serializationContext);
            
                        this.getParentContainer()?.replaceItem(this, cardElement);
                    }
                    else {
                        console.log("Instance of " + this.typeName + " NOT created.")
                    }
                }
            });
    }

    constructor(readonly typeName: string) {
        super();
    }

    getJsonTypeName(): string {
        return "CardElementStub";
    }
}