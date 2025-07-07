// backend/locations.js

// A list of major Walmart Distribution Centers across the USA
const WALMART_ASSETS = [
    // Southeast
    { name: 'Walmart DC, Bentonville, AR', lat: 36.37, lon: -94.20, aliases: ['bentonville', 'arkansas'] },
    { name: 'Walmart DC, Hope Mills, NC', lat: 34.96, lon: -78.95, aliases: ['hope mills', 'north carolina'] },
    { name: 'Walmart DC, Macon, GA', lat: 32.84, lon: -83.63, aliases: ['macon', 'georgia'] },
    { name: 'Walmart DC, Alachua, FL', lat: 29.79, lon: -82.48, aliases: ['alachua', 'florida'] },
    { name: 'Walmart DC, Brookhaven, MS', lat: 31.57, lon: -90.44, aliases: ['brookhaven', 'mississippi'] },
    { name: 'Walmart DC, Laurens, SC', lat: 34.50, lon: -82.01, aliases: ['laurens', 'south carolina'] },
    { name: 'Walmart DC, Shelbyville, TN', lat: 35.48, lon: -86.46, aliases: ['shelbyville', 'tennessee'] },

    // Northeast
    { name: 'Walmart DC, Tobyhanna, PA', lat: 41.18, lon: -75.42, aliases: ['tobyhanna', 'pennsylvania'] },
    { name: 'Walmart DC, Smyrna, DE', lat: 39.30, lon: -75.60, aliases: ['smyrna', 'delaware'] },
    { name: 'Walmart DC, Raymond, NH', lat: 43.03, lon: -71.18, aliases: ['raymond', 'new hampshire'] },
    { name: 'Walmart DC, Marcy, NY', lat: 43.14, lon: -75.32, aliases: ['marcy', 'new york'] },

    // Midwest
    { name: 'Walmart DC, Menomonie, WI', lat: 44.88, lon: -91.92, aliases: ['menomonie', 'wisconsin'] },
    { name: 'Walmart DC, Gas City, IN', lat: 40.48, lon: -85.61, aliases: ['gas city', 'indiana'] },
    { name: 'Walmart DC, St. James, MO', lat: 38.00, lon: -91.61, aliases: ['st. james', 'missouri'] },
    { name: 'Walmart DC, Ottawa, KS', lat: 38.61, lon: -95.26, aliases: ['ottawa', 'kansas'] },
    { name: 'Walmart DC, Mount Pleasant, IA', lat: 40.96, lon: -91.55, aliases: ['mount pleasant', 'iowa'] },

    // West & Southwest
    { name: 'Walmart DC, Buckeye, AZ', lat: 33.37, lon: -112.58, aliases: ['buckeye', 'arizona'] },
    { name: 'Walmart DC, Grantsville, UT', lat: 40.60, lon: -112.46, aliases: ['grantsville', 'utah'] },
    { name: 'Walmart DC, Cheyenne, WY', lat: 41.14, lon: -104.82, aliases: ['cheyenne', 'wyoming'] },
    { name: 'Walmart DC, New Braunfels, TX', lat: 29.70, lon: -98.12, aliases: ['new braunfels', 'texas'] },
    { name: 'Walmart DC, Sanger, TX', lat: 33.36, lon: -97.17, aliases: ['sanger', 'texas'] },
    { name: 'Walmart DC, Apple Valley, CA', lat: 34.54, lon: -117.21, aliases: ['apple valley', 'california'] },
    { name: 'Walmart DC, Shafter, CA', lat: 35.50, lon: -119.27, aliases: ['shafter', 'california'] },
    { name: 'Walmart DC, Hermiston, OR', lat: 45.84, lon: -119.29, aliases: ['hermiston', 'oregon'] },
    { name: 'Walmart DC, Grandview, WA', lat: 46.25, lon: -119.90, aliases: ['grandview', 'washington'] },
];

// Our reliable fallback data for the demo, updated for US Distribution Centers
const DEMO_RISKS = [
    {
        id: 'demo-risk-1',
        title: '(DEMO) Tornado warning in Gas City, IN, potentially impacting DC operations.',
        sourceName: 'Midwest Weather Service',
        sourceUrl: '#',
        riskLevel: 'high',
        locationName: 'Walmart DC, Gas City, IN',
        lat: 40.48, lon: -85.61
    },
    {
        id: 'demo-risk-2',
        title: '(DEMO) Wildfire threat near Shafter, CA DC causes road closures and logistics delays.',
        sourceName: 'California State Fire Dept.',
        sourceUrl: '#',
        riskLevel: 'medium',
        locationName: 'Walmart DC, Shafter, CA',
        lat: 35.50, lon: -119.27
    },
    {
        id: 'demo-risk-3',
        title: '(DEMO) Major winter storm forecast for Tobyhanna, PA, disrupting supply routes.',
        sourceName: 'Northeast Weather Watch',
        sourceUrl: '#',
        riskLevel: 'high',
        locationName: 'Walmart DC, Tobyhanna, PA',
        lat: 41.18, lon: -75.42
    }
];

// Export the data so server.js can use it
module.exports = {
    WALMART_ASSETS,
    DEMO_RISKS
};