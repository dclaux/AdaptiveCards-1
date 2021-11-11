// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as Adaptive from "adaptivecards";

interface ILibraryInfo {
    jsPath: string;
    cssPath?: string;
    root: string;
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

    constructor(readonly libraryInfo: ILibraryInfo, readonly serializationContext: Adaptive.SerializationContext) { }

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

            if (this.libraryInfo.cssPath) {
                let linkTag = document.createElement("link");
                linkTag.rel = "stylesheet";
                linkTag.href = this.libraryInfo.cssPath;

                document.head.appendChild(linkTag);
            }
        }
    }

    get isComplete(): boolean {
        return this._isComplete;
    }
}

class ExternalLibraryManager {
    private static _instance = new ExternalLibraryManager();

    static importLibrary(typeName: string, serializationContext: Adaptive.SerializationContext, callback: LibraryImportCompleteCallback) {
        ExternalLibraryManager._instance.internalImportLibraryAsync(typeName, serializationContext, callback);
    }

    private _imports: LibraryImporter[] = [];

    private getLibraryInfo(typeName: string): ILibraryInfo | undefined {
        // TODO: Need a real registry
        if (typeName.startsWith("Extras.")) {
            return {
                jsPath: "../../adaptivecards-extras/dist/adaptivecards-extras.js",
                cssPath: "../../adaptivecards-extras/src/adaptivecards-extras.css",
                root: "ACExtras"
            }
        }

        return undefined;
    }

    private internalImportLibraryAsync(typeName: string, serializationContext: Adaptive.SerializationContext, callback: LibraryImportCompleteCallback) {
        let libraryInfo = this.getLibraryInfo(typeName);

        if (libraryInfo) {
            let importer: LibraryImporter | undefined = undefined;

            for (let existingImporter of this._imports) {
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
}

export class CardElementStub extends Adaptive.CardElement {
    private _serializationContext: Adaptive.SerializationContext;
    private _stubbedElementPayload: any;

    protected internalParse(source: any, context: Adaptive.SerializationContext) {
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
        ExternalLibraryManager.importLibrary(
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