import Header from "@/components/Header";

const Page = async ({ params }: ParamsWithSearch) => {

    const { id } = await params;

    return (
        <div className="wrapper page">
            <Header subHeader="Profile" title="User Profile" userImg="/assets/images/dummy.jpg" />
            {id}
        </div>
    )
}

export default Page;