import { ChangeEvent, ChangeEvent, useRef, useState } from "react";

export const useFileInput = (maxSize: number) => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [duration, setDuration] = useState(0);
    const input = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent) => {

        if (e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.size > maxSize) {
                alert(`File size exceeds the limit of ${maxSize / 1024 / 1024} MB`);
                return;
            }

            if (previewUrl) {
                URL.revokeObjectURL(previewUrl); // Clean up previous preview URL
            }

            setFile(selectedFile);

            const objUrl = URL.createObjectURL(selectedFile)

            setPreviewUrl(objUrl)

            if (selectedFile.type.startsWith("video")) {
                const videoElement = document.createElement("video");

                videoElement.preload = "metadata"

                videoElement.onloadedmetadata = () => {
                    if (isFinite(videoElement.duration) && videoElement.duration > 0) {
                        setDuration(Math.round(videoElement.duration))
                    } else {
                        setDuration(0)
                    }

                    URL.revokeObjectURL(videoElement.src)
                }

                videoElement.src = objUrl

            }
        }
    }

    const resetFile = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
        }

        setFile(null)
        setPreviewUrl("")
        setDuration(0)

        if (input.current) {
            input.current.value = "";
        }
    }

    return {
        file,
        previewUrl,
        duration,
        inputRef: input,
        handleFileChange,
        resetFile
    }
}