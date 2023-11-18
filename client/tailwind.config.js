module.exports = {
    purge: {
        enabled: false,
        content: ['./src/**/*.{html,ts}'],
    },
    // // purge: [],
    // content: ['./src/**/*.{html,ts}'],
    // // content: ['./src/**/*.{html,ts}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        screens: {
            xsm: { max: '576px' },
            // => @media (max-width: 576px) { ... }

            sm: { max: '768px' },
            // => @media (max-width: 768px) { ... }

            md: { max: '992px' },
            // => @media (max-width: 992px) { ... }

            lg: { max: '1200px' },
            // => @media (max-width: 1200px) { ... }

            xl: { max: '1400px' },
            // => @media (max-width: 1400px) { ... }
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
