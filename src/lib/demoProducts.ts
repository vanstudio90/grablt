import type { Listing } from "./data";

// ═══════════════════════════════════════
// CITIES: Major US cities (all 50 states) + Canadian cities
// ═══════════════════════════════════════
const cities = [
  // US - Major cities by state
  "Birmingham, AL","Anchorage, AK","Phoenix, AZ","Little Rock, AR","Los Angeles, CA","San Francisco, CA","San Diego, CA",
  "Denver, CO","Hartford, CT","Wilmington, DE","Miami, FL","Tampa, FL","Orlando, FL","Jacksonville, FL",
  "Atlanta, GA","Honolulu, HI","Boise, ID","Chicago, IL","Indianapolis, IN","Des Moines, IA",
  "Wichita, KS","Louisville, KY","New Orleans, LA","Portland, ME","Baltimore, MD",
  "Boston, MA","Detroit, MI","Minneapolis, MN","Jackson, MS","Kansas City, MO","St. Louis, MO",
  "Billings, MT","Omaha, NE","Las Vegas, NV","Manchester, NH","Newark, NJ",
  "Albuquerque, NM","New York, NY","Brooklyn, NY","Charlotte, NC","Raleigh, NC","Fargo, ND",
  "Columbus, OH","Cleveland, OH","Oklahoma City, OK","Portland, OR","Philadelphia, PA","Pittsburgh, PA",
  "Providence, RI","Charleston, SC","Sioux Falls, SD","Nashville, TN","Memphis, TN",
  "Houston, TX","Dallas, TX","Austin, TX","San Antonio, TX","Salt Lake City, UT",
  "Burlington, VT","Richmond, VA","Seattle, WA","Charleston, WV","Milwaukee, WI","Cheyenne, WY",
  "Washington, DC",
  // Canada
  "Toronto, ON","Vancouver, BC","Montreal, QC","Calgary, AB","Edmonton, AB","Ottawa, ON",
  "Winnipeg, MB","Halifax, NS","Victoria, BC","Saskatoon, SK","Regina, SK","St. John's, NL",
  "Fredericton, NB","Charlottetown, PE","Whitehorse, YT","Yellowknife, NT",
];

// ═══════════════════════════════════════
// CATEGORIES (FB Marketplace + extras)
// ═══════════════════════════════════════
export const allCategories = [
  "Vehicles","Property Rentals","Apparel","Electronics","Entertainment",
  "Family","Free Stuff","Garden & Outdoor","Hobbies","Home Goods",
  "Home Improvement Supplies","Home Sales","Musical Instruments","Office Supplies",
  "Pet Supplies","Sporting Goods","Toys & Games","Jewelry & Accessories",
  "Health & Beauty","Books & Movies","Collectibles","Furniture",
  "Classifieds","Buy and sell groups",
];

// ═══════════════════════════════════════
// PRODUCT TEMPLATES per category (with real Unsplash images)
// ═══════════════════════════════════════
interface ProductTemplate {
  titles: string[];
  images: string[];
  prices: number[];
  conditions: string[];
  descriptions: string[];
  shippable: boolean;
}

const templates: Record<string, ProductTemplate> = {
  Vehicles: {
    titles: [
      "2020 Toyota RAV4 XLE - Clean Title","2019 Honda Accord Sport - Low Miles","2018 Ford F-150 XLT - 4WD","2021 Tesla Model 3 SR+ - White",
      "2017 Jeep Wrangler Unlimited","2022 Hyundai Tucson SEL","Electric Scooter - Xiaomi Mi Pro 2","2019 BMW 3 Series 330i",
      "2020 Subaru Outback Premium","2016 Chevrolet Silverado 1500","Yamaha MT-07 Motorcycle 2020","2021 Mazda CX-5 Touring",
      "2018 Audi A4 Premium Plus","2020 Kia Telluride SX","2015 Toyota Tacoma TRD Off-Road",
    ],
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    ],
    prices: [24500,21000,28500,35000,26000,27500,450,32000,25000,22000,6500,28000,24000,38000,27000],
    conditions: ["Good","Like New","Good","Like New","Good"],
    descriptions: ["Clean title, single owner, well maintained. Regular service at dealer. All records available.","Low mileage, excellent condition. Garage kept, non-smoker. Includes winter tires.","4WD, towing package, bed liner. Ready for work or adventure. New brakes and tires."],
    shippable: false,
  },
  Electronics: {
    titles: [
      "iPhone 15 Pro 256GB - Natural Titanium","Samsung Galaxy S24 Ultra 512GB","MacBook Air M3 15\" - Midnight","iPad Pro 12.9\" M2 + Pencil",
      "Sony A7IV Mirrorless Camera Body","PS5 Slim Digital + 4 Games","Xbox Series X + 2 Controllers","Nintendo Switch OLED + Games",
      "Dell XPS 15 Laptop - i7/32GB","AirPods Pro 2nd Gen","Sony WH-1000XM5 Headphones","DJI Mini 4 Pro Drone",
      "Samsung 65\" 4K Smart TV","LG C3 55\" OLED TV","Bose QuietComfort Ultra Earbuds",
      "Canon EOS R6 II + 24-70mm","GoPro Hero 12 Black Bundle","Meta Quest 3 128GB","Apple Watch Ultra 2",
      "Sonos Beam Gen 2 Soundbar",
    ],
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800",
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800",
    ],
    prices: [899,950,1100,899,1800,380,420,320,1200,180,280,700,550,1100,220,2200,350,450,700,350],
    conditions: ["Like New","Like New","Good","Like New","Like New","Like New","Good"],
    descriptions: ["Excellent condition, always had case and screen protector. Original box and accessories included.","Barely used, works perfectly. Selling because I upgraded. Battery health excellent.","Comes with all original accessories. No scratches or dents. Like new condition."],
    shippable: true,
  },
  Apparel: {
    titles: [
      "Nike Air Jordan 1 High - Chicago Size 10","Vintage Levi's 501 Jeans - 32x32","Canada Goose Expedition Parka - M","Lululemon Align Leggings Bundle",
      "Ray-Ban Aviator Sunglasses - Gold","Dr. Martens 1460 Boots - Size 9","North Face Puffer Jacket - Women's L","Adidas Ultraboost 22 - Size 11",
      "Patagonia Better Sweater Fleece - XL","Designer Handbag - Coach Tabby","Vintage Band T-Shirt Collection (10)","Nike Dunk Low - Panda Size 9.5",
      "Carhartt WIP Hoodie - Black L","Supreme Box Logo Tee - Navy M","Birkenstock Arizona - Size 42",
    ],
    images: [
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    ],
    prices: [250,85,650,90,120,140,180,130,110,220,75,160,95,280,90],
    conditions: ["New","Good","Like New","Like New","New","Good"],
    descriptions: ["Authentic, purchased from authorized retailer. Comes with original box and tags.","Excellent condition, barely worn. No stains, tears, or fading. Pet and smoke free home."],
    shippable: true,
  },
  Furniture: {
    titles: [
      "Mid-Century Modern Sofa - Walnut Frame","Standing Desk - Electric 60x30","IKEA KALLAX Shelf Unit 4x4","West Elm Dining Table + 4 Chairs",
      "Herman Miller Aeron Chair - Size B","King Bed Frame - Solid Wood Platform","Leather Recliner - La-Z-Boy","CB2 Acacia Coffee Table",
      "Pottery Barn Bookshelf - White","Floating TV Console - Walnut 72\"","Outdoor Patio Set - 6 Piece","Nursery Crib + Changing Table",
      "Sectional Couch - L-Shaped Grey","Bar Stools Set of 3 - Counter Height","Vintage Writing Desk - Restored",
    ],
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800",
      "https://images.unsplash.com/photo-1589364231560-e0b3e75ab37a?w=800",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
    ],
    prices: [650,280,80,750,650,400,350,280,320,450,500,250,800,200,380],
    conditions: ["Good","Like New","Good","Like New","Good"],
    descriptions: ["Solid construction, no damage. Moving and need to sell. Pickup only due to size.","Excellent condition, barely used. No scratches or stains. Smoke-free home."],
    shippable: false,
  },
  "Property Rentals": {
    titles: [
      "1BR Apartment - Downtown - Modern","2BR Townhouse - Near Transit","Studio Loft - Arts District","Room for Rent - Shared House",
      "3BR House - Family Friendly","Furnished Studio - Month to Month","2BR Condo - Pool & Gym","Basement Suite - Private Entry",
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800",
    ],
    prices: [1800,2200,1500,950,2800,1400,2100,1100],
    conditions: ["Like New","Good","Like New","Good"],
    descriptions: ["Modern finishes, in-unit laundry, great location near shops and transit. Available immediately.","Spacious layout, updated kitchen and bath. Pet friendly. Utilities included."],
    shippable: false,
  },
  "Garden & Outdoor": {
    titles: [
      "Weber Spirit Gas Grill - 3 Burner","Patio Furniture Set - 6 Piece","Raised Garden Bed Kit - Cedar","Electric Lawn Mower - EGO 21\"",
      "Fire Pit - Steel Wood Burning","Outdoor String Lights - 48ft","Garden Tool Set - 12 Piece","Pressure Washer - 3100 PSI",
      "Hammock with Stand","Outdoor Storage Shed 8x6","Adirondack Chairs Set of 2","Bird Bath - Concrete Pedestal",
    ],
    images: [
      "https://images.unsplash.com/photo-1529543544089-28ab4e3ad822?w=800",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800",
    ],
    prices: [280,450,65,350,120,35,45,200,90,400,180,55],
    conditions: ["Good","Good","New","Like New","Good"],
    descriptions: ["Well maintained, works great. Selling because we're moving. You pick up."],
    shippable: false,
  },
  "Sporting Goods": {
    titles: [
      "Mountain Bike - Trek Marlin 7","Surfboard - 6'2\" Shortboard","Home Gym Dumbbells + Bench","Golf Club Set - Callaway Complete",
      "Kayak - 10ft Sit-On-Top","Snowboard + Bindings + Boots","Tennis Racket - Wilson Pro Staff","Basketball Hoop - Adjustable Portable",
      "Camping Tent - 4 Person","Fishing Rod & Reel Combo","Yoga Mat + Block Set","Boxing Heavy Bag + Gloves",
      "Skateboard - Complete Custom","Road Bike - Carbon Frame 56cm","Peloton Bike+ with Accessories",
    ],
    images: [
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800",
      "https://images.unsplash.com/photo-1502680390548-bdbac40e4a9f?w=800",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800",
    ],
    prices: [520,350,300,450,380,280,120,200,150,85,40,120,90,1200,1500],
    conditions: ["Good","Good","Like New","Good","Like New"],
    descriptions: ["Great condition, well maintained. Some normal wear from use. Everything functions perfectly."],
    shippable: false,
  },
  "Musical Instruments": {
    titles: [
      "Gibson Les Paul Standard - Gold Top","Yamaha P-125 Digital Piano + Stand","Fender Player Stratocaster","Roland TD-17 Electronic Drum Kit",
      "Martin D-28 Acoustic Guitar","Violin 4/4 - Student Outfit","Ukulele - Kala Concert Mahogany","DJ Controller - Pioneer DDJ-400",
      "Bass Guitar - Fender Jazz Bass","PA Speaker System - 2x 15\"","Studio Microphone - Audio-Technica","Guitar Amp - Fender Blues Jr",
    ],
    images: [
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800",
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800",
      "https://images.unsplash.com/photo-1550985616-10810253b84d?w=800",
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800",
    ],
    prices: [2200,420,550,800,1800,180,80,200,650,450,150,500],
    conditions: ["Like New","Like New","Good","Like New","Good"],
    descriptions: ["Excellent condition, plays and sounds great. Includes original case and accessories."],
    shippable: true,
  },
  "Toys & Games": {
    titles: [
      "LEGO Star Wars Millennium Falcon","Nintendo Switch OLED + 8 Games","Power Wheels Jeep - Pink","PS5 Console + 5 Games Bundle",
      "Nerf Gun Collection - 8 Blasters","Board Game Collection - 15 Games","Hot Wheels Track Set - Mega","Kids Bike - 16\" with Training Wheels",
      "Barbie Dream House - Complete","LEGO Technic Bugatti Chiron","RC Car - Traxxas Slash 4x4","Playmobil Castle Set",
    ],
    images: [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800",
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800",
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800",
      "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=800",
    ],
    prices: [650,320,120,450,80,120,60,75,150,280,350,90],
    conditions: ["Like New","Like New","Good","Like New","Good"],
    descriptions: ["Complete with all pieces and instructions. Excellent condition. Great gift idea."],
    shippable: true,
  },
  "Home Goods": {
    titles: [
      "Dyson V15 Cordless Vacuum","KitchenAid Stand Mixer - Red","Instant Pot Duo 8 Qt","Nespresso Vertuo Coffee Machine",
      "iRobot Roomba i7+ Self-Emptying","Le Creuset Dutch Oven 5.5 Qt","Vitamix Blender A3500","King Size Duvet + Sheet Set",
      "Cast Iron Skillet Set - 3 Piece","Air Purifier - Dyson Pure Cool","Keurig K-Supreme Plus","Cuisinart Food Processor 14-Cup",
    ],
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800",
    ],
    prices: [380,250,60,150,400,220,350,120,65,350,130,100],
    conditions: ["Like New","Good","New","Like New","Like New"],
    descriptions: ["Works perfectly, well maintained. Selling because we upgraded. All parts and manuals included."],
    shippable: true,
  },
  Family: {
    titles: [
      "UPPAbaby Vista V2 Stroller","Baby Clothes Bundle 0-12M - 50pc","Graco Pack N Play","Car Seat - Britax B-Safe 35",
      "High Chair - Stokke Tripp Trapp","Baby Monitor - Nanit Pro","Breast Pump - Spectra S1","Diaper Bag - Skip Hop Mainframe",
      "Kids Play Kitchen - KidKraft","Toddler Bed + Mattress","Baby Swing - 4moms MamaRoo","Crib Mattress - Newton Baby",
    ],
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800",
      "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800",
    ],
    prices: [450,60,75,120,200,180,150,80,100,130,200,160],
    conditions: ["Like New","Good","Like New","Good","Like New"],
    descriptions: ["Gently used, excellent condition. Pet and smoke free home. Baby outgrew it."],
    shippable: true,
  },
  "Pet Supplies": {
    titles: [
      "Large Dog Crate - 42\"","Cat Tree Tower - 72\"","Aquarium 55 Gallon + Full Setup","Dog Bed - Orthopedic XL",
      "Pet Carrier - Airline Approved","Automatic Pet Feeder","Dog Stroller - 3 Wheel","Fish Tank LED Light System",
      "Cat Litter Box - Self-Cleaning","Dog Agility Training Kit","Reptile Terrarium 40 Gallon","Pet GPS Tracker Collar",
    ],
    images: [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800",
      "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800",
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
    ],
    prices: [45,55,180,60,40,70,120,85,350,65,100,45],
    conditions: ["Good","Good","Good","Like New","New"],
    descriptions: ["Clean, well maintained. Pet outgrew it. Smoke-free home."],
    shippable: true,
  },
  "Office Supplies": {
    titles: [
      "Dual Monitor Setup - 2x Dell 27\"","Ergonomic Office Chair","Laser Printer - Brother Wireless","Standing Desk Converter",
      "Webcam - Logitech 4K Stream","Monitor Arm - Dual Mount","Desk Lamp - BenQ ScreenBar","Filing Cabinet - 3 Drawer Metal",
      "Whiteboard - 4x3 ft Magnetic","Desk Organizer Set","Ergonomic Keyboard - Logitech","USB-C Hub Dock Station",
    ],
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800",
      "https://images.unsplash.com/photo-1589364231560-e0b3e75ab37a?w=800",
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800",
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800",
    ],
    prices: [380,280,60,180,100,80,90,75,50,30,120,65],
    conditions: ["Good","Good","Good","Like New","New"],
    descriptions: ["Great for work from home setup. Everything works perfectly. Clean, non-smoking office."],
    shippable: true,
  },
  "Home Improvement Supplies": {
    titles: [
      "DeWalt Drill/Driver Kit 20V","Interior Paint 5 Gal - White","Tile Lot - 200 sqft Subway","Table Saw - DeWalt 10\"",
      "Bathroom Vanity 36\" - White","Hardwood Flooring - Oak 100sqft","Chandelier - Modern Crystal","Tool Box - Craftsman Rolling",
      "Fence Panels - Cedar 6x8 (5)","Kitchen Faucet - Moen Touchless","Door Hardware Set - Matte Black","Garage Door Opener - Chamberlain",
    ],
    images: [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800",
      "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800",
    ],
    prices: [85,120,150,350,280,300,180,200,250,160,45,220],
    conditions: ["Good","New","New","Good","New"],
    descriptions: ["Surplus from project. Brand new in box or lightly used. Great deal."],
    shippable: false,
  },
  Entertainment: {
    titles: [
      "Concert Tickets x2 - Floor Seats","Board Game Collection - 15 Games","Vinyl Record Collection - 50+ Classic","Home Projector - 4K Native",
      "Record Player - Audio-Technica LP120","Movie Poster Collection - Framed","Karaoke Machine - Professional","Poker Set - 500 Chip Case",
    ],
    images: [
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800",
      "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=800",
      "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=800",
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800",
    ],
    prices: [400,120,200,550,250,180,150,60],
    conditions: ["New","Good","Good","Like New","Like New"],
    descriptions: ["Great condition. See photos for details. Can meet locally or ship."],
    shippable: true,
  },
  "Free Stuff": {
    titles: [
      "FREE - Moving Out Kitchen Items","FREE - Queen Mattress","FREE - Moving Boxes & Supplies","FREE - Kids Toys & Books",
      "FREE - Office Chair - Needs Repair","FREE - Old TV - Still Works","FREE - Garden Pots & Soil","FREE - Firewood - You Haul",
    ],
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
    ],
    prices: [0,0,0,0,0,0,0,0],
    conditions: ["Fair","Good","Good","Fair","Fair"],
    descriptions: ["Free to a good home. Must pick up. Available this weekend. First come first served."],
    shippable: false,
  },
  Hobbies: {
    titles: [
      "Canon EOS R6 II + RF 24-105mm","Cricut Maker 3 + Materials","Oil Painting Supplies Complete","3D Printer - Bambu Lab A1 Mini",
      "Telescope - Celestron NexStar 8SE","Sewing Machine - Brother SE1900","Model Train Set - HO Scale","Drone - DJI Air 3",
      "Pottery Wheel - Electric","Stamp Collection - 500+ Vintage","Aquascape Kit - Complete","Metal Detector - Garrett Ace 400",
    ],
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800",
    ],
    prices: [2100,320,90,250,1200,350,280,1100,400,150,120,280],
    conditions: ["Like New","Like New","Good","New","Like New"],
    descriptions: ["Excellent condition, well cared for. All accessories and manuals included. Hobby upgrade."],
    shippable: true,
  },
  "Jewelry & Accessories": {
    titles: [
      "Diamond Engagement Ring 1ct - 14K","Apple Watch Ultra 2 - Titanium","Gold Chain Necklace 18\" - 10K","Designer Sunglasses - Gucci",
      "Pearl Earrings - Freshwater Set","Leather Watch - Fossil Chronograph","Silver Bracelet - Tiffany & Co","Vintage Brooch Collection",
    ],
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
      "https://images.unsplash.com/photo-1515562141589-67f0d569b6c4?w=800",
      "https://images.unsplash.com/photo-1509941943102-10c232535736?w=800",
    ],
    prices: [3500,700,450,280,120,130,250,180],
    conditions: ["Like New","Like New","Good","New","Like New"],
    descriptions: ["Authentic, comes with certificate/box. Beautiful condition. In-person verification welcome."],
    shippable: true,
  },
  "Health & Beauty": {
    titles: [
      "Theragun Elite Massage Gun","NuFace Trinity Facial Device","Dyson Airwrap Complete","Peloton Guide + Accessories",
      "Vitamix Blender - Smoothie Maker","Essential Oil Diffuser + 12 Oils","Rowing Machine - Concept2","Red Light Therapy Panel",
    ],
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800",
    ],
    prices: [280,350,450,200,300,50,800,250],
    conditions: ["Like New","Like New","Like New","Good","New"],
    descriptions: ["Gently used, sanitized and ready. All attachments included. Works perfectly."],
    shippable: true,
  },
  "Books & Movies": {
    titles: [
      "Complete Harry Potter Box Set","Blu-Ray Collection - 50+ Movies","College Textbooks - Engineering","Kindle Paperwhite + 200 Books",
      "Manga Collection - One Piece 1-100","Cookbook Collection - 20 Books","Vinyl Records - Jazz Collection","Board Book Bundle - Baby/Toddler 30pc",
    ],
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
      "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800",
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800",
    ],
    prices: [45,80,150,100,350,60,200,25],
    conditions: ["Good","Like New","Good","Like New","Good"],
    descriptions: ["Good to excellent condition. No markings or damage. Pet and smoke free home."],
    shippable: true,
  },
  Collectibles: {
    titles: [
      "Pokémon Card Collection - 500+ Cards","Funko Pop Lot - 25 Figures","Coin Collection - US Silver Dollars","Sports Memorabilia - Signed Jersey",
      "Vintage Comic Books - Marvel Lot","Hot Wheels Collection - 100 Cars","Star Wars Collectibles Lot","Antique Clock - Working Condition",
    ],
    images: [
      "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800",
      "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=800",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800",
    ],
    prices: [200,180,500,350,300,150,250,400],
    conditions: ["Like New","New","Good","Like New","Good"],
    descriptions: ["Authentic items from personal collection. Photos show actual items. Will verify in person."],
    shippable: true,
  },
  "Home Sales": {
    titles: [
      "2BR Condo - Open House Sunday","3BR Townhouse - Just Listed","4BR Family Home - Renovated","Studio Condo - Investment Property",
    ],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    ],
    prices: [350000,485000,650000,225000],
    conditions: ["Good","Like New","Like New","Good"],
    descriptions: ["Great location, updated finishes. Contact for showing. Pre-approved buyers preferred."],
    shippable: false,
  },
  Classifieds: {
    titles: [
      "Handyman Services - Licensed","Math & Science Tutor - All Levels","Moving Help - 2 Guys + Truck","Dog Walker / Pet Sitter Available",
      "House Cleaning Service - Weekly","Personal Trainer - Certified","Photography Services - Events","Lawn Care & Landscaping",
    ],
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
    ],
    prices: [50,40,80,25,100,60,150,45],
    conditions: ["New","New","New","New","New"],
    descriptions: ["Professional, reliable, experienced. References available. Serving the local area."],
    shippable: false,
  },
  "Buy and sell groups": {
    titles: [
      "Sneakerheads - Jordan 4 Military Black","Car Parts - OEM Headlights","Plant Swap - Monstera Cutting","Vintage Clothing - 80s Denim Jacket",
      "Tech Deals - Refurb iPad Air","Sneaker Trade - Yeezy Slides","DIY Materials - Reclaimed Wood","Local Produce - Farm Fresh Eggs",
    ],
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800",
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    ],
    prices: [220,150,15,85,350,120,60,8],
    conditions: ["New","Like New","New","Good","Like New"],
    descriptions: ["Authentic item from group member. Meet at safe location. Cash or card accepted."],
    shippable: true,
  },
};

// ═══════════════════════════════════════
// SELLER AVATARS
// ═══════════════════════════════════════
const avatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=200",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
];

const firstNames = ["James","Maria","David","Sarah","Chris","Emma","Alex","Nina","Jordan","Tyler","Lisa","Ryan","Mike","Ashley","Jake","Sophia","Carlos","Priya","Wei","Omar"];
const lastNames = ["Smith","Johnson","Park","Chen","Martinez","Thompson","Williams","Patel","Rivera","Brown","Kim","O'Brien","Wilson","Santos","Lee","Garcia","Nguyen","Singh","Miller","Davis"];
const timeOptions = ["2 min ago","15 min ago","1 hour ago","3 hours ago","6 hours ago","12 hours ago","1 day ago","2 days ago","3 days ago"];

// ═══════════════════════════════════════
// GENERATOR
// ═══════════════════════════════════════
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

export function generateDemoListings(): Listing[] {
  const result: Listing[] = [];
  let id = 1000;

  for (const city of cities) {
    // Each city gets products from a random subset of categories
    const rand = seededRandom(city.length * 31 + city.charCodeAt(0));
    const categoryKeys = Object.keys(templates);

    // Pick ~8-12 categories per city
    const numCategories = Math.floor(rand() * 5) + 8;
    const shuffled = [...categoryKeys].sort(() => rand() - 0.5);
    const selectedCategories = shuffled.slice(0, numCategories);

    for (const cat of selectedCategories) {
      const t = templates[cat];
      // 2-4 products per category per city
      const numProducts = Math.floor(rand() * 3) + 2;

      for (let p = 0; p < numProducts && p < t.titles.length; p++) {
        const titleIdx = Math.floor(rand() * t.titles.length);
        const priceIdx = titleIdx % t.prices.length;
        const imgIdx = titleIdx % t.images.length;
        const condIdx = titleIdx % t.conditions.length;
        const descIdx = titleIdx % t.descriptions.length;
        const avatarIdx = (id + titleIdx) % avatars.length;
        const fnIdx = (id * 3) % firstNames.length;
        const lnIdx = (id * 7) % lastNames.length;
        const timeIdx = (id * 2) % timeOptions.length;

        const price = t.prices[priceIdx];
        const deposit = price > 0 ? Math.max(5, Math.round(price * 0.1)) : 0;

        result.push({
          id: `demo-${id}`,
          title: t.titles[titleIdx],
          price,
          images: [t.images[imgIdx]],
          category: cat,
          condition: t.conditions[condIdx],
          description: t.descriptions[descIdx],
          location: city,
          distance: `${Math.floor(rand() * 20) + 1} mi`,
          postedAt: timeOptions[timeIdx],
          seller: {
            id: `seller-${id}`,
            name: `${firstNames[fnIdx]} ${lastNames[lnIdx]}`,
            avatar: avatars[avatarIdx],
            rating: Number((4 + rand()).toFixed(1)),
            reviews: Math.floor(rand() * 50) + 1,
            joined: "2024",
            responseTime: "Usually responds quickly",
          },
          saved: false,
          depositAmount: deposit,
          status: "available",
          shippingAvailable: t.shippable,
          shippingPrice: t.shippable ? 15 : 0,
          deliveryOptions: t.shippable ? ["pickup", "shipping"] : ["pickup"],
        });

        id++;
      }
    }
  }

  return result;
}
