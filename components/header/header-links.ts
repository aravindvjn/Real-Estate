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
            { text: 'Places We Serve', href: '/#cities' },
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
            { text: 'Public Agents', href: '/members/agents?type=public' },
            { text: 'Our Agents', href: '/members/agents' },
            { text: 'Join Our Team', href: '/members/join' },
        ]
    },
    {
        name: 'Blog',
        list: [
            { text: 'Latest Articles', href: '/blog' },
            { text: 'Buying Guide', href: '/blog/guide' },
            { text: 'Selling Guide', href: '/blog/guide#selling_guide' },
            { text: 'Investment Tips', href: '/blog/guide#investment_tips' },
        ]
    },
    {
        name: 'Pages',
        list: [
            { text: 'About Us', href: '/pages/about' },
            { text: 'Testimonials', href: '/pages/testimonials' },
            { text: 'FAQs', href: '/pages/faq' },
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