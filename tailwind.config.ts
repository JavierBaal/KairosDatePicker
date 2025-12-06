import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#ffffff",
                foreground: "#020817", // Slate 950
                primary: {
                    DEFAULT: "#0f172a", // Slate 900
                    foreground: "#f8fafc", // Slate 50
                },
                muted: {
                    DEFAULT: "#f1f5f9", // Slate 100
                    foreground: "#64748b", // Slate 500
                },
                accent: {
                    DEFAULT: "#f1f5f9", // Slate 100
                    foreground: "#0f172a", // Slate 900
                },
                border: "#e2e8f0", // Slate 200
                input: "#e2e8f0", // Slate 200
            },
            borderRadius: {
                lg: "0.5rem",
                md: "calc(0.5rem - 2px)",
                sm: "calc(0.5rem - 4px)",
            },
        },
    },
    plugins: [],
};
export default config;
