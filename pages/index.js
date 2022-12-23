import AppLayout from "../components/AppLayout";

const Home = () => {
    //AppLayout 안에 있는 div가 children이 된다.
    return (
        <AppLayout>
            <div>Hello, Next!</div>
        </AppLayout>
    );
};

export default Home;
