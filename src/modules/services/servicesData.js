import React from 'react';

let data = [
    {
        icon: 'define-icon.png',
        heading: <span> Define your<br></br> wedding style</span>,
        options: ['Design & Decor', 'Photoshoot', 'Digital Services', 'Little Extras'],
        optionDetail: [
            {
                coverImage: 'design-decor.jpg',
                listItems: [
                    'Decor ideas and designs',
                    'Color combinations, flower selection, props and accessories',
                    'Floorplans and table arrangements',
                    'Bride/Groom entrance ideas'
                ]
            },
            {
                coverImage: 'services-photoshoot.jpg',
                listItems: [
                    'Photoshoot themes',
                    'Photoshoot locations'
                ]
            },
            {
                coverImage: 'digital-services.jpg',
                listItems: [
                    'Social media posts & hashtags',
                    'E-vites',
                    'Wedding website',
                    'Snapchats'
                ]
            },
            {
                coverImage: 'little-extras.jpg',
                listItems: [
                    'Mehendi designs',
                    'Makeup styles',
                    'Wedding Accessories',
                    'Return gifts/Goodie hampers',
                    'Wedding invitations designs',
                    'Spa services',
                    'Fitness programs'
                ]
            }
        ]
    },

    {
        icon: 'shortlist-icon.png',
        heading: <span> Select your<br></br> dream vendors</span>,
        options: ['Vendor Selection', 'Vendor Coordination'],
        optionDetail: [
            {
                coverImage: 'vendor-selection.jpg',
                listItems: [
                    'Venues, site visits',
                    'Caterers, food tasting',
                    'Decorators',
                    'Makeup & Mehendi',
                    'DJ, Choreographer, MC',
                    'Band & Baraat'
                ]
            },
            {
                coverImage: 'vendor-coordination.jpg',
                listItems: [
                    'Makeup Trials',
                    'Sangeet Practice Sessions',
                    'Collaboration on decor/menu ideas'
                ]
            }
        ]
    },
     
    {
        icon: 'detail-icon.png',
        heading: <span>Finalize the<br></br> details</span>,
        options: ['Vendor Management', 'Ceremony Details'],
        optionDetail: [
            {
                coverImage: 'vendor-management.jpg',
                listItems: [
                    'Negotiation',
                    'Vendor bookings',
                ]
            },
            {
                coverImage: 'ceremony-details.jpg',
                listItems: [
                    'Menu selection',
                    'Design & decor',
                    'Day of ceremony schedules',
                    'Arrangements logistics'
                ]
            },
        ]
    },
    
    {
        icon: 'd-day-icon.png',
        heading: <span>Big day<br></br> arrangements</span>,
        options: ['Day of ceremony', 'Take no stress'],
        optionDetail: [
            {
                coverImage: 'day-of-ceremony.jpg',
                listItems: [
                    'Vendor coordination',
                    'Floor arrangements',
                    'Bride & Groom shadowing',
                    'Schedule management'
                ]
            },
            {
                coverImage: 'take-no-stress.jpg',
                listItems: [
                    'Vendor payment distribution',
                    'Cancellation resolution and vendor replacements'
                ]
            }
        ]
    },
];

export default data;
