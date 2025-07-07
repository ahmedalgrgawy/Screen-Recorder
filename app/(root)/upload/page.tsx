"use client"
import FileInput from "@/components/FileInput"
import FormField from "@/components/FormField"
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { ChangeEvent, useState } from "react";

const Page = () => {

    const [err, setErr] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        visibility: "public",
    })

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const video = useFileInput(MAX_VIDEO_SIZE)
    const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

    return (
        <div className="wrapper-md upload-page">
            <h1>
                Upload A Video
            </h1>

            {err && <div className="error-field">{err}</div>}

            <form className="rounded-20 shadow-10 gap-6 flex flex-col px-5 py-7.5 w-full" action="">
                <FormField
                    id="title"
                    label="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter title"
                />
                <FormField
                    id="description"
                    label="Description"
                    value={formData.description}
                    as="textarea"
                    onChange={handleChange}
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
                    onChange={handleChange}
                    placeholder="Enter Visibility"
                />

            </form>

        </div>
    )
}

export default Page