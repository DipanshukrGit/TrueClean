import {
  Poppins,
  Work_Sans,
  Source_Serif_4,
  Libre_Baskerville,
} from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/contexts/LoadingContext";
import LoadingScreen from "@/Components/LoadingScreen";
import { ThemeProvider } from "@/contexts/ThemeContext";

const initialThemeScript = `
(function () {
  try {
    var storageKey = "true-clean-theme";
    var storedTheme = localStorage.getItem(storageKey);
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = storedTheme || (prefersDark ? "dark" : "light");
    var root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme === "dark" ? "dark" : "light");
    root.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
  } catch (error) {
    console.warn("Theme initialization failed", error);
  }
})();`;

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif-4",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "True Clean",
  description: "A clean and modern website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initialThemeScript }} />
      </head>
      <body
        className={`${poppins.variable} ${workSans.variable} ${sourceSerif4.variable} ${libreBaskerville.variable} antialiased`}
      >
        <ThemeProvider>
          <LoadingProvider>
            {/* <LoadingScreen /> */}
            {children}
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
