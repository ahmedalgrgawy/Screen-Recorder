import { videos } from "@/drizzle/schema"
import Image from "next/image"

const FileInput = ({
    id,
    label,
    accept,
    file,
    previewUrl,
    onChange,
    onReset,
    inputRef,
    type
}: FileInputProps) => {
    return (
        <section className="file-input">
            <label htmlFor={id}>
                {label}
                <input
                    type="file"
                    id={id}
                    name={id}
                    accept={accept}
                    onChange={onChange}
                    ref={inputRef}
                    hidden
                />

                {!previewUrl ? (
                    <figure onClick={() => inputRef.current?.click()}>
                        <Image src="/assets/icons/upload.svg" alt="Upload Icon" width={100} height={100} />
                        <p>Click to upload Your {id}</p>
                    </figure>
                ) : (
                    <div>
                        {type === "video" ? (
                            <video src={previewUrl} controls />
                        ) : (
                            <Image src={previewUrl} alt="Preview" fill />
                        )}

                        <button type="button" onClick={onReset}>
                            <Image src="/assets/icons/close.svg" alt="Delete Icon" width={20} height={20} />
                        </button>

                        <p>
                            {file?.name}
                        </p>
                    </div>
                )}


            </label>
        </section>
    )
}

export default FileInput