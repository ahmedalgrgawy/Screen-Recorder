"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const VideoCard = ({
    id,
    title,
    thumbnail,
    createdAt,
    userImg,
    username,
    views,
    visibility,
    duration
}: VideoCardProps) => {

    const [copied, setCopied] = useState(false)

    return (
        <Link href={`/video/${id}`} className="video-card">
            <Image
                src={thumbnail}
                alt={title}
                width={290}
                height={160}
                className="thumbnail"
            />

            <article>
                <div>
                    <figure>
                        <Image
                            src={userImg || "/assets/images/jason.jpg"}
                            alt={username}
                            width={34}
                            height={34}
                            className="rounded-full aspect-square"
                        />
                        <figcaption>
                            <h3>{username}</h3>
                            <p>
                                {visibility}
                            </p>
                        </figcaption>
                    </figure>

                    <aside>
                        <Image src="/assets/icons/eye.svg" alt="Views" width={16} height={16} />

                        <span>
                            {views}
                        </span>

                    </aside>

                </div>
                <h2>
                    {title} -{" "}
                    {createdAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </h2>
            </article>

            <button onClick={() => { }} className="copy-btn">
                <Image
                    src={
                        copied ? "/assets/icons/checkmark.svg" : "/assets/icons/link.svg"
                    }
                    alt="Copy Link"
                    width={18}
                    height={18}
                />
            </button>
            {duration && (
                <div className="duration">{Math.ceil(duration / 60)}min</div>
            )}

        </Link>
    )
}

export default VideoCard