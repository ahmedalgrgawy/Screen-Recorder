import Header from "@/components/Header";

const page = async ({ params }: ParamsWithSearch) => {
    const { id } = await params;
    return (
        <div className="wrapper page">
            <Header subHeader="Video Details" title="Video Information" userImg="/assets/images/dummy.jpg" />

            <section className="video-details">
                <h2>Video ID: {id}</h2>
                <p>More video details will be displayed here...</p>
            </section>
        </div>
    )
}

export default page