"use client"
import { authClient } from '@/lib/auth-client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Auth = () => {
    return (
        <main className='sign-in'>
            <aside className="testimonial">
                <Link href="/">
                    <h1>
                        Green-Screen
                    </h1>
                </Link>
                <div className="description">
                    <section>
                        <figure>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Image
                                    key={index}
                                    src={`/assets/icons/star.svg`}
                                    alt={`User ${index + 1}`}
                                    width={20}
                                    height={20}
                                />
                            ))}
                        </figure>
                        <p>
                            This is the best screen record app I have ever used! The quality is amazing and the interface is so user-friendly. Highly recommend!
                        </p>

                        <article>
                            <Image className='rounded-full' src="/assets/images/jason.png" alt="User Avatar" width={64} height={64} />
                            <div>
                                <h2>Jason Name </h2>
                                <p>Product Designer</p>
                            </div>
                        </article>

                    </section>
                </div>
                <p>
                    Green-Screen {(new Date()).getFullYear()} - All rights reserved
                </p>
            </aside>

            <aside className='google-sign-in'>
                <section>
                    <Link href="/">
                        <h1>
                            Green-Screen
                        </h1>
                    </Link>
                    <p>
                        Create 7 Share your first video with <span>Green-Screen</span>
                    </p>
                    <button onClick={async () => {
                        return await authClient.signIn.social({
                            provider: "google",
                        });
                    }}>
                        <Image src="/assets/icons/google.svg" alt="Google Logo" width={22} height={22} />
                        <span>
                            Sign in with Google
                        </span>
                    </button>
                </section>
            </aside>
            <div className='overlay' />
        </main>
    )
}

export default Auth