const Pagination = ({ currentPage, onPageChange,totalPages }) => {
    const nextPage = () => onPageChange(currentPage + 1);
    const prevPage = () => onPageChange(currentPage - 1);

    return (
        <div className="flex justify-between lg:justify-center mt-4">
            <button onClick={prevPage} className="w-32 px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700" disabled={currentPage === 1}>
                Previous
            </button>
            <span className="lg:hidden px-4 py-2 text-gray-900 dark:text-gray-100">{currentPage}/{totalPages}</span>
            <span className="hidden lg:inline px-4 py-2 text-gray-900 dark:text-gray-100">Page {currentPage} of {totalPages}</span>
            <button onClick={nextPage} className="w-32 px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700">
                Next
            </button>
        </div>
    );
};

export default Pagination;
