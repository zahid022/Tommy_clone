/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        lg: '992px',
      },
    },
  },
  plugins: [],
  safelist: [
    'border-red-500',
    'border-gray-500',
    'border-orange-500',
    'border-yellow-500',
    'border-lime-500',
    'border-green-500',
    'border-sky-500',
    'border-blue-500',
    'border-violet-500',
    'border-purple-500',
    'border-fuchsia-500',
    'border-pink-500',
    'border-rose-500',
    'bg-red-500',
    'bg-gray-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-sky-500',
    'bg-blue-500',
    'bg-violet-500',
    'bg-purple-500',
    'bg-fuchsia-500',
    'bg-pink-500',
    'bg-rose-500',
  ],
}