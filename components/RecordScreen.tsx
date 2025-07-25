"use client"
import { ICONS } from '@/constants'
import { useScreenRecording } from '@/lib/hooks/useScreenRecording'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

const RecordScreen = () => {

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const { isRecording, recordedBlob, recordedVideoUrl, recordingDuration, resetRecording, startRecording, stopRecording } = useScreenRecording()

    const closeModal = () => {
        resetRecording()
        setIsOpen(false)
    }

    const handleStart = async () => {
        await startRecording()
    }

    const recordAgain = async () => {
        resetRecording()
        await startRecording()

        if (recordedVideoUrl && videoRef.current) {
            videoRef.current.src = recordedVideoUrl;
        }
    }

    const goToUpload = () => {
        if (!recordedBlob) return;
        const url = URL.createObjectURL(recordedBlob);
        sessionStorage.setItem(
            "recordedVideo",
            JSON.stringify({
                url,
                name: "screen-recording.webm",
                type: recordedBlob.type,
                size: recordedBlob.size,
                duration: recordingDuration || 0, // Store the duration with the video data
            })
        );
        router.push("/upload");
        closeModal();
    };

    return (
        <div className="record">
            <button className="primary-btn" onClick={() => setIsOpen(true)}>
                <Image src={ICONS.record} alt="record" width={16} height={16} />
                <span className='truncate'>Record</span>
            </button>

            {isOpen && (
                <section className='dialog'>
                    <div className='overlay-record' onClick={closeModal} />
                    <div className='dialog-content'>
                        <figure>
                            <h3>
                                Screen Recording
                            </h3>
                            <button onClick={closeModal}>
                                <Image src={ICONS.close} alt="close" width={20} height={20} />
                            </button>
                        </figure>

                        <section>
                            {isRecording ? (
                                <article>
                                    <div />
                                    <span>Recording...</span>
                                </article>
                            ) : recordedVideoUrl ? (
                                <video ref={videoRef} src={recordedVideoUrl} controls />
                            ) : (
                                <p>
                                    Click to Record
                                </p>
                            )}
                        </section>

                        <div className='record-box'>
                            {!isRecording && !recordedVideoUrl && (
                                <button onClick={handleStart} className='record-start'>
                                    <Image src={ICONS.record} alt="record" width={16} height={16} />
                                    Record
                                </button>
                            )}
                            {isRecording && (
                                <button onClick={stopRecording} className='record-stop'>
                                    <Image src={ICONS.record} alt="stop" width={16} height={16} />
                                    Stop Recording
                                </button>
                            )}

                            {recordedVideoUrl && (
                                <>
                                    <button onClick={recordAgain} className="record-again">
                                        Record Again
                                    </button>
                                    <button onClick={goToUpload} className="record-upload">
                                        <Image
                                            src={ICONS.upload}
                                            alt="Upload"
                                            width={16}
                                            height={16}
                                        />
                                        Continue to Upload
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            )
            }
        </div >
    )
}

export default RecordScreen