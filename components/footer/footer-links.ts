export const footerContent: {
    heading: string;
    links: { label: string; href?: string; }[];
}[] = [
        {
            heading: 'Discover',
            links: [
                { label: 'Kollam', href: '/properties?location=kollam' },
                { label: 'Ernakulam', href: '/properties?location=ernakulam' },
                { label: 'Thrissur', href: '/properties?location=thrissur' },
                { label: 'Palakkad', href: '/properties?location=palakkad' },
                { label: 'Kottayam', href: '/properties?location=kottayam' },
            ]
        },
        {
            heading: 'Quick Links',
            links: [
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: "FAQ's", href: '/faq' },
                { label: 'Blog', href: '/blog' },
                { label: 'Pricing Plans', href: '/pricing-plans' },
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms & Conditions', href: '/terms-and-conditions' },
            ]
        },
        {
            heading: 'Contact Us',
            links: [
                { label: 'email' },
                { label: 'phone-number' },
            ]
        },
        {
            heading: 'Our Address',
            links: [
                { label: 'unknown house, unknown street' },

            ]
        },
    ]