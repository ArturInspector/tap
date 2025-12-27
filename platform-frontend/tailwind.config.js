/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#0F6CBD',
          700: '#2B579A',
          800: '#002050',
        },
        neutral: {
          50: '#F5F7FA',
          100: '#E5E7EB',
          600: '#4A5568',
          700: '#374151',
          900: '#1F2937',
        },
        success: {
          600: '#10B981',
          700: '#059669',
        },
        warning: {
          600: '#F59E0B',
          700: '#D97706',
        },
        error: {
          600: '#EF4444',
          700: '#DC2626',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif']
      }
    }
  },
  plugins: []
}

