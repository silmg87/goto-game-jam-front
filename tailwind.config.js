import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */

  export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./index.html",
    ],
    theme: {
        extend: {
            gridTemplateRows: {
                layout: '70px 1fr 60px',
              },
        },
        
    },
    plugins: [nextui()],
}