
const Header = () => {
    const userName = "admin";

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <header className="flex items-center justify-between px-4 py-2 bg-white shadow dark:bg-gray-900">
            <div className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</div>
            <div className="flex items-center space-x-4">
                <span className="text-gray-700 dark:text-gray-300">{userName}</span>
                <button onClick={handleLogout} className="p-2 text-white bg-red-600 rounded-md hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700">
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
