import Header from '../components/Header';
import Table from '../components/Table';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
            <Header />
            <div className="p-4">
                <Table />
            </div>
        </div>
    );
};

export default Home;
