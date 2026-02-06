/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./public/**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                boss: {
                    red: '#C40000',
                    darkRed: '#8a0000',
                    gold: '#D4AF37', // Gold base
                    goldLight: '#F3E5AB', // Highlight
                    goldDark: '#aa771c', // Shadow
                    white: '#FFFFFF',
                    black: '#0a0a0a', // Deeper black
                    gray: '#1a1a1a'
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Montserrat"', 'sans-serif'],
            },
            backgroundImage: {
                'hero-pattern': "linear-gradient(to bottom, rgba(10, 10, 10, 0.85), rgba(196, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
                'gold-gradient': 'linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)',
            },
            animation: {
                'shimmer': 'shimmer 2.5s infinite linear',
                'float': 'float 6s ease-in-out infinite',
                'scroll': 'scroll 180s linear infinite',
            },
            keyframes: {
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        }
    },
    plugins: [],
}
