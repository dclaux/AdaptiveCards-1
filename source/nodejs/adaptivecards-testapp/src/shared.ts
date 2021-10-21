export const testPayload = {
    type: "Dashboard",
    title: "This is a dashboard",
    sections: [
        {
            weight: 2,
            minColumnWidth: 500,
            widgets: [
                {
                    type: "Widget",
                    title: "First widget in first section",
                    pages: [
                        {
                            type: "Page",
                            title: "Page title 1",
                            card: {
                                "type": "AdaptiveCard",
                                "body": [
                                    {
                                        "type": "TextBlock",
                                        "size": "Medium",
                                        "weight": "Bolder",
                                        "text": "Publish Adaptive Card Schema"
                                    },
                                    {
                                        "type": "ColumnSet",
                                        "columns": [
                                            {
                                                "type": "Column",
                                                "items": [
                                                    {
                                                        "type": "Image",
                                                        "style": "Person",
                                                        "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                                                        "size": "Small"
                                                    }
                                                ],
                                                "width": "auto"
                                            },
                                            {
                                                "type": "Column",
                                                "items": [
                                                    {
                                                        "type": "TextBlock",
                                                        "weight": "Bolder",
                                                        "text": "Matt Hidinger",
                                                        "wrap": true
                                                    },
                                                    {
                                                        "type": "TextBlock",
                                                        "spacing": "None",
                                                        "text": "Created {{DATE(2017-02-14T06:08:39Z,SHORT)}}",
                                                        "isSubtle": true,
                                                        "wrap": true
                                                    }
                                                ],
                                                "width": "stretch"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "TextBlock",
                                        "text": "Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.",
                                        "wrap": true
                                    },
                                    {
                                        "type": "FactSet",
                                        "facts": [
                                            {
                                                "title": "Board:",
                                                "value": "Adaptive Cards"
                                            },
                                            {
                                                "title": "List:",
                                                "value": "Backlog"
                                            },
                                            {
                                                "title": "Assigned to:",
                                                "value": "Matt Hidinger"
                                            },
                                            {
                                                "title": "Due date:",
                                                "value": "Not set"
                                            }
                                        ]
                                    }
                                ],
                                "actions": [
                                    {
                                        "type": "Action.ShowCard",
                                        "title": "Set due date",
                                        "card": {
                                            "type": "AdaptiveCard",
                                            "body": [
                                                {
                                                    "type": "Input.Date",
                                                    "id": "dueDate"
                                                },
                                                {
                                                    "type": "Input.Text",
                                                    "id": "comment",
                                                    "placeholder": "Add a comment",
                                                    "isMultiline": true
                                                }
                                            ],
                                            "actions": [
                                                {
                                                    "type": "Action.Submit",
                                                    "title": "OK"
                                                }
                                            ],
                                            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
                                        }
                                    },
                                    {
                                        "type": "Action.OpenUrl",
                                        "title": "View",
                                        "url": "https://adaptivecards.io"
                                    }
                                ],
                                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                                "version": "1.3"
                            }
                        }
                    ]
                },
                {
                    type: "Widget",
                    title: "Second widget in first section",
                    pages: [
                        {
                            type: "Page",
                            title: "Page title 2",
                            card: {
                                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                                "type": "AdaptiveCard",
                                "version": "1.3",
                                "body": [
                                    {
                                        "type": "TextBlock",
                                        "text": "Your registration is almost complete",
                                        "size": "Medium",
                                        "weight": "Bolder",
                                        "wrap": true
                                    },
                                    {
                                        "type": "TextBlock",
                                        "text": "What type of food do you prefer?",
                                        "wrap": true
                                    },
                                    {
                                        "type": "ImageSet",
                                        "imageSize": "medium",
                                        "images": [
                                            {
                                                "type": "Image",
                                                "url": "https://contososcubademo.azurewebsites.net/assets/steak.jpg"
                                            },
                                            {
                                                "type": "Image",
                                                "url": "https://contososcubademo.azurewebsites.net/assets/chicken.jpg"
                                            },
                                            {
                                                "type": "Image",
                                                "url": "https://contososcubademo.azurewebsites.net/assets/tofu.jpg"
                                            }
                                        ]
                                    }
                                ],
                                "actions": [
                                    {
                                        "type": "Action.ShowCard",
                                        "title": "Steak",
                                        "card": {
                                            "type": "AdaptiveCard",
                                            "body": [
                                                {
                                                    "type": "TextBlock",
                                                    "text": "How would you like your steak prepared?",
                                                    "size": "Medium",
                                                    "wrap": true
                                                },
                                                {
                                                    "type": "Input.ChoiceSet",
                                                    "id": "SteakTemp",
                                                    "style": "expanded",
                                                    "choices": [
                                                        {
                                                            "title": "Rare",
                                                            "value": "rare"
                                                        },
                                                        {
                                                            "title": "Medium-Rare",
                                                            "value": "medium-rare"
                                                        },
                                                        {
                                                            "title": "Well-done",
                                                            "value": "well-done"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "type": "Input.Text",
                                                    "id": "SteakOther",
                                                    "isMultiline": true,
                                                    "placeholder": "Any other preparation requests?"
                                                }
                                            ],
                                            "actions": [
                                                {
                                                    "type": "Action.Submit",
                                                    "title": "OK",
                                                    "data": {
                                                        "FoodChoice": "Steak"
                                                    }
                                                }
                                            ],
                                            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
                                        }
                                    },
                                    {
                                        "type": "Action.ShowCard",
                                        "title": "Chicken",
                                        "card": {
                                            "type": "AdaptiveCard",
                                            "body": [
                                                {
                                                    "type": "TextBlock",
                                                    "text": "Do you have any allergies?",
                                                    "size": "Medium",
                                                    "wrap": true
                                                },
                                                {
                                                    "type": "Input.ChoiceSet",
                                                    "id": "ChickenAllergy",
                                                    "style": "expanded",
                                                    "isMultiSelect": true,
                                                    "choices": [
                                                        {
                                                            "title": "I'm allergic to peanuts",
                                                            "value": "peanut"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "type": "Input.Text",
                                                    "id": "ChickenOther",
                                                    "isMultiline": true,
                                                    "placeholder": "Any other preparation requests?"
                                                }
                                            ],
                                            "actions": [
                                                {
                                                    "type": "Action.Submit",
                                                    "title": "OK",
                                                    "data": {
                                                        "FoodChoice": "Chicken"
                                                    }
                                                }
                                            ],
                                            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
                                        }
                                    },
                                    {
                                        "type": "Action.ShowCard",
                                        "title": "Tofu",
                                        "card": {
                                            "type": "AdaptiveCard",
                                            "body": [
                                                {
                                                    "type": "TextBlock",
                                                    "text": "Would you like it prepared vegan?",
                                                    "size": "Medium",
                                                    "wrap": true
                                                },
                                                {
                                                    "type": "Input.Toggle",
                                                    "id": "Vegetarian",
                                                    "title": "Please prepare it vegan",
                                                    "valueOn": "vegan",
                                                    "valueOff": "notVegan"
                                                },
                                                {
                                                    "type": "Input.Text",
                                                    "id": "VegOther",
                                                    "isMultiline": true,
                                                    "placeholder": "Any other preparation requests?"
                                                }
                                            ],
                                            "actions": [
                                                {
                                                    "type": "Action.Submit",
                                                    "title": "OK",
                                                    "data": {
                                                        "FoodChoice": "Vegetarian"
                                                    }
                                                }
                                            ],
                                            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            weight: 1,
            minColumnWidth: 350,
            widgets: [
                {
                    type: "Widget",
                    title: "First widget in first section",
                    pages: [
                        {
                            type: "Page",
                            title: "Page title 1",
                            card: {
                                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                                "type": "AdaptiveCard",
                                "version": "1.3",
                                "body": [
                                    {
                                        "type": "TextBlock",
                                        "text": "There should be a chart below..."
                                    },
                                    {
                                        "type": "Extras.BarChart"
                                    },
                                    {
                                        "type": "Extras.List",
                                        "items": [
                                            {
                                                "firstName": "David",
                                                "lastName": "Claux"
                                            },
                                            {
                                                "firstName": "John",
                                                "lastName": "Doe"
                                            },
                                            {
                                                "firstName": "Mark",
                                                "lastName": "Knopfler"
                                            },
                                            {
                                                "firstName": "Dave",
                                                "lastName": "Grohl"
                                            }
                                        ],
                                        "itemTemplates": [
                                            {
                                                "template": {
                                                    "type": "TextBlock",
                                                    "text": "${firstName} **${lastName}**",
                                                    "size": "ExtraLarge"
                                                }
                                            },
                                            {
                                                "widthThreshold": 150,
                                                "template": {
                                                    "type": "TextBlock",
                                                    "text": "${firstName} **${lastName}** (small screen)"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Extras.ProgressBar",
                                        "title": "Hello world",
                                        "value": 50
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    type: "Widget",
                    title: "Second widget in first section",
                    pages: [
                        {
                            type: "Page",
                            title: "Page title 2",
                            card: {
                                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                                "type": "AdaptiveCard",
                                "version": "1.3",
                                "speak": "<s>Weather forecast for Tuesday is high of 50 and low of 32 degrees with a 31% chance of rain</s><s>Winds will be 4 mph from the SSE</s>",
                                "backgroundImage": {
                                    "url": "https://messagecardplayground.azurewebsites.net/assets/Mostly%20Cloudy-Background.jpg"
                                },
                                "body": [
                                    {
                                        "type": "ColumnSet",
                                        "columns": [
                                            {
                                                "type": "Column",
                                                "width": 35,
                                                "items": [
                                                    {
                                                        "type": "Image",
                                                        "url": "https://messagecardplayground.azurewebsites.net/assets/Mostly%20Cloudy-Square.png",
                                                        "size": "Stretch"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "Column",
                                                "width": 65,
                                                "items": [
                                                    {
                                                        "type": "TextBlock",
                                                        "text": "{{DATE(2019-11-05T07:00:51-08:00, SHORT)}}",
                                                        "weight": "Bolder",
                                                        "size": "Large",
                                                        "wrap": true
                                                    },
                                                    {
                                                        "type": "TextBlock",
                                                        "text": "32 / 50",
                                                        "size": "Medium",
                                                        "spacing": "None",
                                                        "wrap": true
                                                    },
                                                    {
                                                        "type": "TextBlock",
                                                        "text": "31% chance of rain",
                                                        "spacing": "None",
                                                        "wrap": true
                                                    },
                                                    {
                                                        "type": "TextBlock",
                                                        "text": "Winds 4.4 mph SSE",
                                                        "spacing": "None",
                                                        "wrap": true
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "ColumnSet",
                                        "columns": [
                                            {
                                                "type": "Column",
                                                "width": 20,
                                                "items": [
                                                    {
                                                        "type": "TextBlock",
                                                        "horizontalAlignment": "Center",
                                                        "text": "Wednesday",
                                                        "wrap": true
                                                    },
                                                    {
                                                        "type": "Image",
                                                        "size": "auto",
                                                        "url": "https://messagecardplayground.azurewebsites.net/assets/Drizzle-Square.png"
                                                    },
                                                    {
                                                        "type": "FactSet",
                                                        "horizontalAlignment": "Right",
                                                        "facts": [
                                                            {
                                                                "title": "High",
                                                                "value": "50"
                                                            },
                                                            {
                                                                "title": "Low",
                                                                "value": "32"
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "selectAction": {
                                                    "type": "Action.OpenUrl",
                                                    "title": "View Wednesday",
                                                    "url": "https://www.microsoft.com"
                                                }
                                            },
                                            {
                                                "type": "Column",
                                                "width": 20,
                                                "items": [
                                                    {
                                                        "type": "TextBlock",
                                                        "horizontalAlignment": "Center",
                                                        "text": "Thursday",
                                                        "wrap": true
                                                    },
                                                    {
                                                        "type": "Image",
                                                        "size": "auto",
                                                        "url": "https://messagecardplayground.azurewebsites.net/assets/Mostly%20Cloudy-Square.png"
                                                    },
                                                    {
                                                        "type": "FactSet",
                                                        "horizontalAlignment": "Right",
                                                        "facts": [
                                                            {
                                                                "title": "High",
                                                                "value": "50"
                                                            },
                                                            {
                                                                "title": "Low",
                                                                "value": "32"
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "selectAction": {
                                                    "type": "Action.OpenUrl",
                                                    "title": "View Thursday",
                                                    "url": "https://www.microsoft.com"
                                                }
                                            },
                                            {
                                                "type": "Column",
                                                "width": 20,
                                                "items": [
                                                    {
                                                        "type": "TextBlock",
                                                        "horizontalAlignment": "Center",
                                                        "text": "Friday",
                                                        "wrap": true
                                                    },
                                                    {
                                                        "type": "Image",
                                                        "size": "auto",
                                                        "url": "https://messagecardplayground.azurewebsites.net/assets/Mostly%20Cloudy-Square.png"
                                                    },
                                                    {
                                                        "type": "FactSet",
                                                        "horizontalAlignment": "Right",
                                                        "facts": [
                                                            {
                                                                "title": "High",
                                                                "value": "59"
                                                            },
                                                            {
                                                                "title": "Low",
                                                                "value": "32"
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "selectAction": {
                                                    "type": "Action.OpenUrl",
                                                    "title": "View Friday",
                                                    "url": "https://www.microsoft.com"
                                                }
                                            },
                                            {
                                                "type": "Column",
                                                "width": 20,
                                                "items": [
                                                    {
                                                        "type": "TextBlock",
                                                        "horizontalAlignment": "Center",
                                                        "text": "Saturday",
                                                        "wrap": true
                                                    },
                                                    {
                                                        "type": "Image",
                                                        "size": "auto",
                                                        "url": "https://messagecardplayground.azurewebsites.net/assets/Mostly%20Cloudy-Square.png"
                                                    },
                                                    {
                                                        "type": "FactSet",
                                                        "horizontalAlignment": "Right",
                                                        "facts": [
                                                            {
                                                                "title": "High",
                                                                "value": "50"
                                                            },
                                                            {
                                                                "title": "Low",
                                                                "value": "32"
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "selectAction": {
                                                    "type": "Action.OpenUrl",
                                                    "title": "View Saturday",
                                                    "url": "https://www.microsoft.com"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
}