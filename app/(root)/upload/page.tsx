"use client"
import FileInput from "@/components/FileInput"
import FormField from "@/components/FormField"
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import { getThumbnailUploadUrl, getVideoUploadUrl, saveVideoDetails } from "@/lib/actions/video";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const uploadFileToBunny = async (file: File, uploadUrl: string, accessKey: string): Promise<void> => {

    return fetch(uploadUrl, {
        method: "PUT",
        headers: {
            "AccessKey": accessKey,
            "Content-Type": file.type,
        },
        body: file
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`Failed to upload file: ${res.statusText}`);
        }
    })

}

const Page = () => {
    const router = useRouter();
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        visibility: "public",
    })
    const [videoDuration, setVideoDuration] = useState(0);

    const video = useFileInput(MAX_VIDEO_SIZE)
    const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

    useEffect(() => {
        if (video.duration !== null || 0) {
            setVideoDuration(video.duration)
        }
    }, [video.duration])

    useEffect(() => {
        const checkForRecordedVideo = async () => {
            try {
                const stored = sessionStorage.getItem("recordedVideo");
                if (!stored) return;

                const { url, name, type, duration } = JSON.parse(stored);
                const blob = await fetch(url).then((res) => res.blob());
                const file = new File([blob], name, { type, lastModified: Date.now() });

                if (video.inputRef.current) {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    video.inputRef.current.files = dataTransfer.files;

                    const event = new Event("change", { bubbles: true });
                    video.inputRef.current.dispatchEvent(event);

                    video.handleFileChange({
                        target: { files: dataTransfer.files },
                    } as ChangeEvent<HTMLInputElement>);
                }

                if (duration) setVideoDuration(duration);

                sessionStorage.removeItem("recordedVideo");
                URL.revokeObjectURL(url);
            } catch (err) {
                console.error("Error loading recorded video:", err);
            }
        };

        checkForRecordedVideo();
    }, [video]);


    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpload = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true)

        try {

            if (!video.file || !thumbnail.file) {
                setErr("Please upload both video and thumbnail files.");
                return;
            }

            if (!formData.title || !formData.description) {
                setErr("Please fill in all fields.");
                return;
            }

            // get upload URL for video
            const {
                videoId,
                uploadUrl: videoUploadUrl,
                accessKey: videoAccesskey
            } = await getVideoUploadUrl()
            if (!videoUploadUrl || !videoAccesskey) {
                throw new Error("Failed to get video upload URL.");
            }

            // upload video 
            await uploadFileToBunny(video.file, videoUploadUrl, videoAccesskey);

            // get upload URL for thumbnail
            const {
                uploadUrl: thumbnailUploadUrl,
                accessKey: thumbnailAccesskey,
                cdnUrl: thumbnailCdnUrl
            } = await getThumbnailUploadUrl(videoId)
            if (!thumbnailUploadUrl || !thumbnailAccesskey || !thumbnailCdnUrl) {
                throw new Error("Failed to get Thumbnail upload URL.");
            }

            // upload thumbnail
            await uploadFileToBunny(thumbnail.file, thumbnailUploadUrl, thumbnailAccesskey);

            // save video
            await saveVideoDetails({
                videoId,
                thumbnailUrl: thumbnailCdnUrl,
                ...formData,
                duration: videoDuration
            })

            router.push("/video/" + videoId);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="wrapper-md upload-page">
            <h1>
                Upload A Video
            </h1>

            {err && <div className="error-field">{err}</div>}

            <form onSubmit={handleUpload} className="rounded-20 shadow-10 gap-6 flex flex-col px-5 py-7.5 w-full" action="">
                <FormField
                    id="title"
                    label="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter title"
                />
                <FormField
                    id="description"
                    label="Description"
                    value={formData.description}
                    as="textarea"
                    onChange={handleInputChange}
                    placeholder="Enter Description"
                />

                <FileInput
                    id="video"
                    label="Video"
                    accept="video/*"
                    file={video.file}
                    previewUrl={video.previewUrl}
                    onChange={video.handleFileChange}
                    onReset={video.resetFile}
                    inputRef={video.inputRef}
                    type="video"
                />

                <FileInput
                    id="thumbnail"
                    label="Thumbnail"
                    accept="image/*"
                    file={thumbnail.file}
                    previewUrl={thumbnail.previewUrl}
                    onChange={thumbnail.handleFileChange}
                    onReset={thumbnail.resetFile}
                    inputRef={thumbnail.inputRef}
                    type="image"
                />

                <FormField
                    id="visibility"
                    label="visibility"
                    value={formData.visibility}
                    as="select"
                    options={[
                        { value: "public", label: "Public" },
                        { value: "private", label: "Private" },
                    ]}
                    onChange={handleInputChange}
                    placeholder="Enter Visibility"
                />

                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? "Uploading..." : "Upload Video"}
                </button>

            </form>

        </div>
    )
}

export default Page