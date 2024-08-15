import Link from "next/link";
import { ReactElement } from "react";

export default function NotFound(): ReactElement {
    return (
        <div className="h-screen flex flex-col justify-center items-center text-center font-[sans serif]">
            <h1>
                <i>404 Error - Page Not Found
                </i>
                <br />
                <b> <Link href="/">Go to Homepage</Link></b>
            </h1>
        </div>
    );
}
