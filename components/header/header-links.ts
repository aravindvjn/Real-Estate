export type HeaderLinkType = {
    name: string;
    list:
    {
        text: string;
        href: string;
    }[];
};


export const headerLinks: HeaderLinkType[] = [
    {
        name: 'Home',
        list: [
            { text: 'Home', href: '/' },
            { text: 'Why Work With Us', href: '/#whyshouldworkwithus' },
            { text: 'Featured Homes', href: '/#featured-homes' },
            { text: 'Cities We Serve', href: '/#cities' },
        ]
    },
    {
        name: 'Listings',
        list: [
            { text: 'All Properties', href: '/properties' },
            { text: 'For Sale', href: '/properties?type=sale' },
            { text: 'For Rent', href: '/properties?type=rent' },
            { text: 'Luxury Homes', href: '/properties?category=luxury' },
            { text: 'New Developments', href: '/properties?category=new' },
        ]
    },
    {
        name: 'Members',
        list: [
            { text: 'Public Agents', href: '/agents?type=public' },
            { text: 'Our Agents', href: '/agents' },
            { text: 'Join Our Team', href: '/join' },
        ]
    },
    {
        name: 'Blog',
        list: [
            { text: 'Latest Articles', href: '/blog' },
            { text: 'Buying Guide', href: '/blog/buying-guide' },
            { text: 'Selling Guide', href: '/blog/selling-guide' },
            { text: 'Investment Tips', href: '/blog/investment' },
        ]
    },
    {
        name: 'Pages',
        list: [
            { text: 'About Us', href: '/about' },
            { text: 'Testimonials', href: '/testimonials' },
            { text: 'FAQs', href: '/faq' },
        ]
    },
    {
        name: 'Contact',
        list: [
            { text: 'Instagram', href: 'https://instagram.com/6windh' },
            { text: 'GitHub', href: 'https://github.com/aravindvjn' },
            { text: 'LinkedIn', href: '/' },
            { text: 'Mail', href: 'mailto:aravind284479@gmail.com' },

        ]
    },
]