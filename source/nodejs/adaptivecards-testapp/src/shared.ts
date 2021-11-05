export const testPayload = {
    type: "Dashboard",
    title: "This is a dashboard",
    sections: [
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
                                        "type": "Extras.BarChart",
                                        "labels": ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                                        "datasets": [
                                            {
                                                "label": '# of Votes',
                                                "data": [12, 19, 3, 5, 2, 3]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Extras.List",
                                        "maxHeight": 300,
                                        "items": [
                                            {
                                                "albumName": "Dire Straits",
                                                "releaseDate": "1978-10-07",
                                                "albumArt": "https://upload.wikimedia.org/wikipedia/en/1/15/DS_Dire_Straits.jpg",
                                                "titles": [
                                                    "Down To The Waterline",
                                                    "Water Of Love",
                                                    "Setting Me Up",
                                                    "Six Blade Knife",
                                                    "Southbound Again",
                                                    "Sultans Of Swing",
                                                    "In The Gallery",
                                                    "Wild West End"
                                                ]
                                            },
                                            {
                                                "albumName": "Communique",
                                                "releaseDate": "1979-06-15",
                                                "albumArt": "https://farm9.staticflickr.com/8478/8200366360_509f0beb46_b.jpg",
                                                "titles": [
                                                    "Once Upon a Time In The West",
                                                    "News",
                                                    "Where Do You Think You're Going?",
                                                    "Communique",
                                                    "Lady Writer",
                                                    "Angel Of Mercy",
                                                    "Portobello Belle",
                                                    "Single-Handed Sailor",
                                                    "Follow Me Home"
                                                ]
                                            },
                                            {
                                                "albumName": "Making Movies",
                                                "releaseDate": "1980-10-17",
                                                "albumArt": "https://farm4.staticflickr.com/3788/12592936173_e91cff395d_b.jpg",
                                                "titles": [
                                                    "Tunnel Of Love",
                                                    "Romeo And Juliet",
                                                    "Skateaway",
                                                    "Expresso Love",
                                                    "Hand In Hand",
                                                    "Solid Rock",
                                                    "Les Boys"
                                                ]
                                            },
                                            {
                                                "albumName": "Love Over Gold",
                                                "releaseDate": "1982-09-20",
                                                "albumArt": "https://i.pinimg.com/originals/87/bf/6e/87bf6e26d0f5254f25d57fbc407dd6d6.jpg",
                                                "titles": [
                                                    "Telegraph Road",
                                                    "Private Investigations",
                                                    "Industrial Disease",
                                                    "Love Over Gold",
                                                    "It Never Rains"
                                                ]
                                            },
                                            {
                                                "albumName": "Brothers In Arms",
                                                "releaseDate": "1985-05-13",
                                                "albumArt": "https://www.americansongwriter.com/wp-content/uploads/2015/06/BrothersDireStraits.png",
                                                "titles": [
                                                    "So Far Away",
                                                    "Money For Nothing",
                                                    "Walk Of Life",
                                                    "Why Worry",
                                                    "Ride Across The River",
                                                    "The Man's Too Strong",
                                                    "One World",
                                                    "Brothers In Arms"

                                                ]
                                            },
                                            {
                                                "albumName": "On Every Street",
                                                "releaseDate": "1991-09-09",
                                                "albumArt": "http://4.bp.blogspot.com/_g5B2l455lq0/TKYneHKwuwI/AAAAAAAAAYs/_BCFLNl-MH4/s1600/Cover2ON+EVERY+(1).jpg",
                                                "titles": [
                                                    "Calling Elvis",
                                                    "On Every Street",
                                                    "When It Comes To You",
                                                    "Fade To Black",
                                                    "The Bug",
                                                    "You And Your Friend",
                                                    "Heavy Fuel",
                                                    "Iron Hand",
                                                    "Ticket To Heaven",
                                                    "My Parties",
                                                    "Planet Of New Orleans",
                                                    "How Long"
                                                ]
                                            }
                                        ],
                                        "itemTemplates": [
                                            {
                                                "widthThreshold": 150,
                                                "template": {
                                                    "type": "Container",
                                                    "items": [
                                                        {
                                                            "type": "TextBlock",
                                                            "text": "${albumName}",
                                                            "weight": "Bolder"
                                                        },
                                                        {
                                                            "type": "TextBlock",
                                                            "text": "{{DATE(${releaseDate}T00:00:00Z,COMPACT)}}",
                                                            "spacing": "None"
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "widthThreshold": 250,
                                                "template": {
                                                    "type": "ColumnSet",
                                                    "columns": [
                                                        {
                                                            "type": "Column",
                                                            "width": "auto",
                                                            "items": [
                                                                {
                                                                    "type": "Image",
                                                                    "width": "40px",
                                                                    "height": "40px",
                                                                    "url": "${albumArt}"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "type": "Column",
                                                            "width": "stretch",
                                                            "items": [
                                                                {
                                                                    "type": "TextBlock",
                                                                    "text": "${albumName}",
                                                                    "weight": "Bolder"
                                                                },
                                                                {
                                                                    "type": "TextBlock",
                                                                    "text": "{{DATE(${releaseDate}T00:00:00Z,COMPACT)}}",
                                                                    "spacing": "None"
                                                                }
                                                            ],
                                                            "verticalContentAlignment": "Center"
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "widthThreshold": 400,
                                                "template": {
                                                    "type": "ColumnSet",
                                                    "columns": [
                                                        {
                                                            "type": "Column",
                                                            "width": "auto",
                                                            "items": [
                                                                {
                                                                    "type": "Image",
                                                                    "width": "60px",
                                                                    "height": "60px",
                                                                    "url": "${albumArt}"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "type": "Column",
                                                            "width": "stretch",
                                                            "items": [
                                                                {
                                                                    "type": "TextBlock",
                                                                    "text": "${albumName}",
                                                                    "size": "Large",
                                                                    "weight": "Bolder"
                                                                },
                                                                {
                                                                    "type": "TextBlock",
                                                                    "text": "{{DATE(${releaseDate}T00:00:00Z,SHORT)}}",
                                                                    "spacing": "None",
                                                                    "size": "Medium"
                                                                }
                                                            ],
                                                            "verticalContentAlignment": "Center"
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "template": {
                                                    "type": "ColumnSet",
                                                    "columns": [
                                                        {
                                                            "type": "Column",
                                                            "width": "auto",
                                                            "items": [
                                                                {
                                                                    "type": "Image",
                                                                    "width": "140px",
                                                                    "height": "140px",
                                                                    "url": "${albumArt}"
                                                                }
                                                            ],
                                                            "verticalContentAlignment": "Center"
                                                        },
                                                        {
                                                            "type": "Column",
                                                            "width": "stretch",
                                                            "items": [
                                                                {
                                                                    "type": "TextBlock",
                                                                    "text": "${albumName}",
                                                                    "size": "Large",
                                                                    "weight": "Bolder"
                                                                },
                                                                {
                                                                    "type": "TextBlock",
                                                                    "text": "{{DATE(${releaseDate}T00:00:00Z,LONG)}}",
                                                                    "spacing": "None",
                                                                    "size": "Medium"
                                                                },
                                                                {
                                                                    "type": "TextBlock",
                                                                    "wrap": true,
                                                                    "text": "${join(titles, ', ')}"
                                                                }
                                                            ],
                                                            "verticalContentAlignment": "Center"
                                                        }
                                                    ]
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
        },
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
                                                        "url": "http://icons.iconarchive.com/icons/iconicon/veggies/512/bananas-icon.png",
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
        }
    ]
}