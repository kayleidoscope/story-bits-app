export default {
    "stories": [
        {
            "id": "0",
            "title": "Anne of Green Gables",
            "description": "The story of Anne the orphan girl."
        },
        {
            "id": "1",
            "title": "Vampire Academy",
            "description": "Rose and Lissa struggle with life as vampire teens."
        }
    ],
    "characters": [
        {
            "id": "0-0-0",
            "name": "Anne Shirley",
            "story": {
                "id": "0",
                "name": "Anne of Green Gables"
            },
            "description": "An orphan girl with a penchant for large words and mischief",
            "gender": "female",
            "appearance": "Red hair, freckles, a pretty nose",
            "fashion": "Loves puff sleeves, but wears the plain clothes Marilla sews",
            "home": {
                "id": "0-0",
                "hame": "Green Gables"
            },
            "housemates": [
                {
                    "id": "0-0-1",
                    "name": "Marilla Cuthbert"
                },
                {
                    "id": "0-0-2",
                    "name": "Matthew Cuthbert"
                }
            ],
            "decor": "Keeps flowers she finds and decorates her room with them"
        },
        {
            "id": "0-0-1",
            "name": "Marilla Cuthbert",
            "story": {
                "id": "0",
                "name": "Anne of Green Gables"
            },
            "description": "A stern, practical woman who loves Anne deeply.",
            "gender": "female",
            "appearance": "Gray hair, wears glasses",
            "fashion": "Plain, practical clothes",
            "home": {
                "id": "0-0",
                "hame": "Green Gables"
            },
            "housemates": [
                {
                    "id": "0-0-0",
                    "name": "Anne Shirley"
                },
                {
                    "id": "0-0-2",
                    "name": "Matthew Cuthbert"
                }
            ],
            "decor": "Simple"
        }
    ],
    "settings": [
        {
            "id": "0-0",
            "name": "Green Gables",
            "description": "A small farm",
            "Occupants": [
                {
                    "id": "0-0-0",
                    "name": "Anne Shirley"
                },
                {
                    "id": "0-0-1",
                    "name": "Marilla Cuthbert"
                }
                {
                    "id": "0-0-2",
                    "name": "Matthew Cuthbert"
                }
            ],
            "decor": "A little worn but functional, except for Anne's room"
        }
    ]
}