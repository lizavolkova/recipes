"use client"
import React from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation'
import { signOut, useSession,  } from 'next-auth/react';

const Header  = () => {
    const pathname = usePathname()
    const leftClass = '';
    const rightClass = '';


    const isActive = (pathnameTest) => pathname === pathnameTest;

    const { data: session, status } = useSession();

    let left = (
        <div className={leftClass}>
            <Link href="/" legacyBehavior>
                <a className="bold" data-active={isActive('/')}>
                    Feed
                </a>
            </Link>
        </div>
    );

    let right = null;

    if (status === 'loading') {
        left = (
            <div className={leftClass}>
                <Link href="/" legacyBehavior>
                    <a className="bold" data-active={isActive('/')}>
                        Feed
                    </a>
                </Link>
            </div>
        );
        right = (
            <div className={rightClass}>
                <p>Validating session ...</p>
                <style>{`
          .right {
            margin-left: auto;
          }
        `}</style>
            </div>
        );
    }

    if (!session) {
        right = (
            <div className={rightClass}>
                <Link href="/api/auth/signin" legacyBehavior>
                    <a data-active={isActive('/signup')}>Log in</a>
                </Link>
            </div>
        );
    }

    if (session) {
        left = (
            <div className={leftClass}>
                <Link href="/" legacyBehavior>
                    <a className="bold" data-active={isActive('/')}>
                        Feed
                    </a>
                </Link>
                <Link href="/drafts" legacyBehavior>
                    <a data-active={isActive('/drafts')}>My drafts</a>
                </Link>
            </div>
        );
        right = (
            <div className={rightClass}>
                <p>
                    {session.user.name} ({session.user.email})
                </p>
                <Link href="/create" legacyBehavior>
                    <button>
                        <a>New post</a>
                    </button>
                </Link>
                <button onClick={() => signOut()}>
                    <a>Log out</a>
                </button>
            </div>
        );
    }

    return (
        <nav className="flex justify-between p-8">
            {left}
            {right}
        </nav>
    );
};

export default Header;