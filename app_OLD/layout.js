
import Provider from "./provider";

export default function RootLayout({ children }) {
    return (
        <html>
        <head />
        <body>
        <div>Root Layout</div>
        <div>
            {children}
        </div>

        </body>
        </html>
    );
}