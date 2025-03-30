import Link from "next/link"
import { Button } from "./ui/button"
import { account } from "@/lib/appwrite"
import { useEffect, useState } from "react"

export function Navbar() {
    const [isGuest, setIsGuest] = useState(false);
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await account.getSession('current');
                setIsGuest(session.userId.includes('anonymous'));
                const user = await account.get();
                setUserName(user.name || 'Guest User');
            } catch (error) {
                setIsGuest(false);
                setUserName("");
            }
        };

        checkSession();
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="font-semibold">
                        Your App Name
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                            About
                        </Link>
                        <Link href="/features" className="text-sm font-medium transition-colors hover:text-primary">
                            Features
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {userName ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm">
                                {isGuest ? "👤 Guest User" : `Welcome, ${userName}`}
                            </span>
                            <Link href="/dashboard">
                                <Button variant="outline" size="sm">
                                    Dashboard
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/auth/login">
                                <Button variant="ghost" size="sm">
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/auth/login?guest=true">
                                <Button variant="default" size="sm">
                                    Try as Guest
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
} 