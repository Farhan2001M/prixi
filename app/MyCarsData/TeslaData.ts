export interface Models {
    id: number;
    model: string;
    description?: string;
    launchPrice?: string;       // Making this optional
    vehicleType?: string;       // Making this optional
    seatingCapacity?: string;   // Making this optional
    engineType?: string;        // Making this optional
    colorsAvailable?: string[]; // Making this optional
    horsepower?: string;        // Making this optional
    torque?: string;            // Making this optional
    transmission?: string;      // Making this optional
    releaseDate?: string;       // Making this optional
    startingPrice?: string      // Making this optional
    variants?: string[];        // Making this optional
    img?: string[] ;            // Making this optional
  }
  
  export const data: Models[] = [
      {
        "id": 1,
        "model": "Tesla Model S",
        "launchPrice": "$94,990",
        "vehicleType": "Sedan",
        "seatingCapacity": "5",
        "engineType": "Electric dual motor",
        "colorsAvailable": [ "Pearl White Multi-Coat", "Solid Black", "Midnight Silver Metallic", "Deep Blue Metallic", "Red Multi-Coat" ],
        "horsepower": "Up to 1,020 hp (Plaid version)",
        "torque": "Up to 1,050 lb-ft (Plaid version)",
        "transmission": "Single-speed fixed gear",
        "releaseDate": "June 22, 2008",
        "startingPrice": "$94,990",
        "variants": [ "Long Range", "Plaid" ],
        "img": ["../../../images/Cars/Tesla/desktop-full-hd-tesla-model-s-background.png",]
      },
      {
        "id": 2,
        "model": "Tesla Model 3",
        "description": "A compact all-electric sedan offering a balance of performance, range, and affordability.",
        "launchPrice": "$39,990",
        "vehicleType": "Sedan",
        "seatingCapacity": "5",
        "engineType": "Electric dual motor (Performance model), Rear-wheel drive (Standard Range Plus)",
        "colorsAvailable": [ "Pearl White Multi-Coat", "Solid Black", "Midnight Silver Metallic", "Deep Blue Metallic", "Red Multi-Coat" ],
        "horsepower": "Up to 450 hp (Performance model)",
        "torque": "Up to 471 lb-ft (Performance model)",
        "transmission": "Single-speed fixed gear",
        "releaseDate": "July 7, 2017",
        "startingPrice": "$39,990",
        "variants": [ "Standard Range Plus", "Long Range", "Performance" ],
        "img": ["../../../images/Cars/Tesla/2017-tesla-roadster-deck-model-petersen-automotive-museum.png", "../../../images/Cars/Tesla/desktop-full-hd-tesla-model-s-background.png",]
      },
      {
        "id": 3,
        "model": "Tesla Model X",
        "description": "An all-electric SUV with distinctive falcon-wing doors, high performance, and spacious interior.",
        "launchPrice": "$104,990",
        "vehicleType": "SUV",
        "seatingCapacity": "5-7",
        "engineType": "Electric dual motor",
        "colorsAvailable": [ "Pearl White Multi-Coat", "Solid Black", "Midnight Silver Metallic", "Deep Blue Metallic", "Red Multi-Coat" ],
        "horsepower": "Up to 1,020 hp (Plaid version)",
        "torque": "Up to 1,020 lb-ft (Plaid version)",
        "transmission": "Single-speed fixed gear",
        "releaseDate": "September 29, 2015",
        "startingPrice": "$104,990",
        "variants": [ "Long Range", "Plaid" ],
        "img": ["../../../images/Cars/Tesla/2017-tesla-roadster-deck-model-petersen-automotive-museum.png", "../../../images/Cars/Tesla/desktop-full-hd-tesla-model-s-background.png",]
      },
      {
        "id": 4,
        "model": "Tesla Model Y",
        "description": "A compact all-electric SUV combining the performance of the Model 3 with increased cargo space and versatility.",
        "launchPrice": "$54,990",
        "vehicleType": "SUV",
        "seatingCapacity": "5-7",
        "engineType": "Electric dual motor (Performance model), Rear-wheel drive (Long Range)",
        "colorsAvailable": [ "Pearl White Multi-Coat", "Solid Black", "Midnight Silver Metallic", "Deep Blue Metallic", "Red Multi-Coat" ],
        "horsepower": "Up to 456 hp (Performance model)",
        "torque": "Up to 487 lb-ft (Performance model)",
        "transmission": "Single-speed fixed gear",
        "releaseDate": "March 13, 2020",
        "startingPrice": "$54,990",
        "variants": [ "Long Range", "Performance" ],
        "img": ["../../../images/Cars/Tesla/2017-tesla-roadster-deck-model-petersen-automotive-museum.png", "../../../images/Cars/Tesla/desktop-full-hd-tesla-model-s-background.png","../../../images/Cars/Tesla/teop.png", "../../../images/Cars/Tesla/toto.png", ]
      },
      {
        "id": 5,
        "model": "Tesla Cybertruck",
        "description": "A futuristic all-electric pickup truck with an angular design, built for durability and off-road capability.",
        "launchPrice": "$60,990",
        "vehicleType": "Pickup Truck",
        "seatingCapacity": "6",
        "engineType": "Electric dual motor (Dual Motor All-Wheel Drive), Tri Motor All-Wheel Drive",
        "colorsAvailable": [  "Silver Metallic", "Deep Blue Metallic", "Black", "White", "Stainless Steel" ],
        "horsepower": "Up to 800 hp (Tri Motor version)",
        "torque": "Up to 1,000 lb-ft (Tri Motor version)",
        "transmission": "Single-speed fixed gear",
        "releaseDate": "Expected late 2024",
        "startingPrice": "$60,990",
        "variants": [ "Single Motor RWD", "Dual Motor AWD", "Tri Motor AWD" ],
        "img": ["../../../images/Cars/Tesla/2017-tesla-roadster-deck-model-petersen-automotive-museum.png", "../../../images/Cars/Tesla/desktop-full-hd-tesla-model-s-background.png",]
      },
      {
        "id": 6,
        "model": "Tesla Semi",
        "description": "An all-electric Class 8 truck designed for long-haul freight transport, offering high performance and low operating costs.",
        "launchPrice": "$150,000",
        "vehicleType": "Semi Truck",
        "seatingCapacity": "2",
        "engineType": "Electric",
        "colorsAvailable": [ "Red", "White", "Black" ],
        "horsepower": "Up to 1,000 hp",
        "torque": "Not specified",
        "transmission": "Single-speed fixed gear",
        "releaseDate": "Expected late 2024",
        "startingPrice": "$150,000",
        "variants": [ "300-mile range", "500-mile range" ],
        "img": [ "../../../images/Cars/Tesla/desktop-full-hd-tesla-model-s-background.png","../../../images/Cars/Tesla/2017-tesla-roadster-deck-model-petersen-automotive-museum.png",]
      },
      {
        "id": 7,
        "model": "Tesla Roadster",
        "description": "A high-performance all-electric sports car designed to be the fastest production car in the world.",
        "launchPrice": "$200,000",
        "vehicleType": "Sports Car",
        "seatingCapacity": "2+2 (Optional)",
        "engineType": "Electric tri motor",
        "colorsAvailable": [ "Red", "White", "Black", "Silver", "Midnight Grey" ],
        "horsepower": "Up to 1,020 hp",
        "torque": "Not specified",
        "transmission": "Single-speed fixed gear",
        "releaseDate": "Expected late 2024",
        "startingPrice": "$200,000",
        "variants": [ "Founders Series", "Base" ],
        "img": ["../../../images/Cars/Tesla/2017-tesla-roadster-deck-model-petersen-automotive-museum.png", "../../../images/Cars/Tesla/desktop-full-hd-tesla-model-s-background.png",]
      }
  ] 