// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
export const localExtensionCatalog = {
    entries: [
        {
            pattern: "^Extras.",
            jsPath: "../../adaptivecards-extras/dist/adaptivecards-extras.js",
            lightCssPath: "../../adaptivecards-extras/dist/adaptivecards-extras.css",
            darkCssPath: "../../adaptivecards-extras/dist/adaptivecards-extras.css",
            root: "ACExtras"
        }
    ]
}

export const ssoSuccessCard = {
    type: "AdaptiveCard",
    body: [
        {
            type: "TextBlock",
            text: "Successfully authenticated with SSO!",
            size: "ExtraLarge",
            wrap: true
        }
    ],
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.0"
};


export const oauthSuccessCard = {
    type: "AdaptiveCard",
    body: [
        {
            type: "TextBlock",
            text: "Successfully authenticated with OAuth!",
            size: "ExtraLarge",
            wrap: true
        }
    ],
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.0"
};

export const hostConfig = {
    "preExpandSingleShowCardAction": true,
    "supportsInteractivity": true,
    "spacing": {
        "small": 10,
        "default": 20,
        "medium": 30,
        "large": 40,
        "extraLarge": 50,
        "padding": 20
    },
    "separator": {
        "lineThickness": 1,
        "lineColor": "#EEEEEE"
    },
    "imageSizes": {
        "small": 40,
        "medium": 80,
        "large": 160
    },
    "fontTypes": {
        "default": {
            "fontFamily": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            "fontSizes": {
                "small": 12,
                "default": 14,
                "medium": 17,
                "large": 21,
                "extraLarge": 26
            },
            "fontWeights": {
                "lighter": 200,
                "default": 400,
                "bolder": 600
            }
        },
        "monospace": {
            "fontFamily": "'Courier New', Courier, monospace",
            "fontSizes": {
                "small": 12,
                "default": 14,
                "medium": 17,
                "large": 21,
                "extraLarge": 26
            },
            "fontWeights": {
                "lighter": 200,
                "default": 400,
                "bolder": 600
            }
        }
    },
    "textStyles": {
        "heading": {
            "fontType": "default",
            "size": "large",
            "weight": "bolder",
            "color": "default",
            "isSubtle": false
        }
    },
    "textBlock": {
        "headingLevel": 2
    },
    "containerStyles": {
        "default": {
            "borderColor": "#CCCCCC",
            "backgroundColor": "#FFFFFF",
            "foregroundColors": {
                "default": {
                    "default": "#333333",
                    "subtle": "#EE333333"
                },
                "dark": {
                    "default": "#000000",
                    "subtle": "#66000000"
                },
                "light": {
                    "default": "#FFFFFF",
                    "subtle": "#33000000"
                },
                "accent": {
                    "default": "#2E89FC",
                    "subtle": "#882E89FC"
                },
                "attention": {
                    "default": "#cc3300",
                    "subtle": "#DDcc3300"
                },
                "good": {
                    "default": "#028A02",
                    "subtle": "#DD027502"
                },
                "warning": {
                    "default": "#e69500",
                    "subtle": "#DDe69500"
                }
            }
        },
        "emphasis": {
            "borderColor": "#666666",
            "backgroundColor": "#08000000",
            "foregroundColors": {
                "default": {
                    "default": "#333333",
                    "subtle": "#EE333333"
                },
                "dark": {
                    "default": "#000000",
                    "subtle": "#66000000"
                },
                "light": {
                    "default": "#FFFFFF",
                    "subtle": "#33000000"
                },
                "accent": {
                    "default": "#2E89FC",
                    "subtle": "#882E89FC"
                },
                "attention": {
                    "default": "#cc3300",
                    "subtle": "#DDcc3300"
                },
                "good": {
                    "default": "#028A02",
                    "subtle": "#DD027502"
                },
                "warning": {
                    "default": "#e69500",
                    "subtle": "#DDe69500"
                }
            }
        },
        "accent": {
            "borderColor": "#62A8F7",
            "backgroundColor": "#C7DEF9",
            "foregroundColors": {
                "default": {
                    "default": "#333333",
                    "subtle": "#EE333333"
                },
                "dark": {
                    "default": "#000000",
                    "subtle": "#66000000"
                },
                "light": {
                    "default": "#FFFFFF",
                    "subtle": "#33000000"
                },
                "accent": {
                    "default": "#2E89FC",
                    "subtle": "#882E89FC"
                },
                "attention": {
                    "default": "#cc3300",
                    "subtle": "#DDcc3300"
                },
                "good": {
                    "default": "#028A02",
                    "subtle": "#DD027502"
                },
                "warning": {
                    "default": "#e69500",
                    "subtle": "#DDe69500"
                }
            }
        },
        "good": {
            "borderColor": "#69E569",
            "backgroundColor": "#CCFFCC",
            "foregroundColors": {
                "default": {
                    "default": "#333333",
                    "subtle": "#EE333333"
                },
                "dark": {
                    "default": "#000000",
                    "subtle": "#66000000"
                },
                "light": {
                    "default": "#FFFFFF",
                    "subtle": "#33000000"
                },
                "accent": {
                    "default": "#2E89FC",
                    "subtle": "#882E89FC"
                },
                "attention": {
                    "default": "#cc3300",
                    "subtle": "#DDcc3300"
                },
                "good": {
                    "default": "#028A02",
                    "subtle": "#DD027502"
                },
                "warning": {
                    "default": "#e69500",
                    "subtle": "#DDe69500"
                }
            }
        },
        "attention": {
            "borderColor": "#FF764C",
            "backgroundColor": "#FFC5B2",
            "foregroundColors": {
                "default": {
                    "default": "#333333",
                    "subtle": "#EE333333"
                },
                "dark": {
                    "default": "#000000",
                    "subtle": "#66000000"
                },
                "light": {
                    "default": "#FFFFFF",
                    "subtle": "#33000000"
                },
                "accent": {
                    "default": "#2E89FC",
                    "subtle": "#882E89FC"
                },
                "attention": {
                    "default": "#cc3300",
                    "subtle": "#DDcc3300"
                },
                "good": {
                    "default": "#028A02",
                    "subtle": "#DD027502"
                },
                "warning": {
                    "default": "#e69500",
                    "subtle": "#DDe69500"
                }
            }
        },
        "warning": {
            "borderColor": "#FFBC51",
            "backgroundColor": "#FFE2B2",
            "foregroundColors": {
                "default": {
                    "default": "#333333",
                    "subtle": "#EE333333"
                },
                "dark": {
                    "default": "#000000",
                    "subtle": "#66000000"
                },
                "light": {
                    "default": "#FFFFFF",
                    "subtle": "#33000000"
                },
                "accent": {
                    "default": "#2E89FC",
                    "subtle": "#882E89FC"
                },
                "attention": {
                    "default": "#cc3300",
                    "subtle": "#DDcc3300"
                },
                "good": {
                    "default": "#028A02",
                    "subtle": "#DD027502"
                },
                "warning": {
                    "default": "#e69500",
                    "subtle": "#DDe69500"
                }
            }
        }
    },
    "actions": {
        "maxActions": 5,
        "spacing": "default",
        "buttonSpacing": 10,
        "showCard": {
            "actionMode": "inline",
            "inlineTopMargin": 16
        },
        "actionsOrientation": "horizontal",
        "actionAlignment": "left"
    },
    "adaptiveCard": {
        "allowCustomStyle": true
    },
    "imageSet": {
        "imageSize": "medium",
        "maxImageHeight": 100
    },
    "factSet": {
        "title": {
            "color": "default",
            "size": "default",
            "isSubtle": false,
            "weight": "bolder",
            "wrap": true,
            "maxWidth": 150
        },
        "value": {
            "color": "default",
            "size": "default",
            "isSubtle": false,
            "weight": "default",
            "wrap": true
        },
        "spacing": 10
    }
}
