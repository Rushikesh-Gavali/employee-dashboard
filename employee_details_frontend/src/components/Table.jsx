import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import Dropdown from './Dropdown';
import Pagination from './Pagination';

const Table = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [sortOrder, setSortOrder] = useState('asc');
    const [department, setDepartment] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            let url = `/employees?page=${page}&limit=10`;

            if (department) {
                url = `/employees/filter?department=${department}`;
            } else if (sortOrder) {
                url = `/employees/sort?order=${sortOrder}&page=${page}`;
            }

            try {
                const response = await axiosInstance.get(url);
                const data = response.data.data;
                
                setData(data.records);
                setPage(data.page_number || 1);
                setTotalPages(data.total_pages);
                setTotalRecords(data.total_record_count);
            } catch (error) {
                console.error(error.response?.data?.response_message || 'Failed to fetch data');
            }
        };

        fetchData();
    }, [page, sortOrder, department]);

    const placeholders = Array(10 - data.length).fill(null);

    return (
        <div className="overflow-x-auto">
            <div className="flex flex-wrap w-full mb-4 gap-4">
                <Dropdown label="Sort By Joining Date" options={['asc', 'desc']} onSelect={setSortOrder} />
                <Dropdown label="Find by Department" options={['Engineering', 'Sales', 'Human Resources', 'Marketing', 'Finance']} onSelect={setDepartment} />
            </div>
            <div className="w-full overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                    <thead className="bg-gray-600 dark:bg-gray-900 text-white">
                        <tr>
                            <th className="px-2 lg:px-4 py-2 text-left">ID</th>
                            <th className="px-2 lg:px-4 py-2 text-left">First Name</th>
                            <th className="px-2 lg:px-4 py-2 text-left">Last Name</th>
                            <th className="px-2 lg:px-4 py-2 text-left">Email</th>
                            <th className="px-2 lg:px-4 py-2 text-left">Department</th>
                            <th className="px-2 lg:px-4 py-2 text-left">Joining Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((employee, index) => (
                            <tr key={index} className="text-gray-700 dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-500 border-b border-gray-300 dark:border-gray-900">
                                <td className="px-2 lg:px-4 py-1 lg:py-2">{employee.id}</td>
                                <td className="px-2 lg:px-4 py-1 lg:py-2">{employee.first_name}</td>
                                <td className="px-2 lg:px-4 py-1 lg:py-2">{employee.last_name}</td>
                                <td className="px-2 lg:px-4 py-1 lg:py-2">{employee.email}</td>
                                <td className="px-2 lg:px-4 py-1 lg:py-2">{employee.department}</td>
                                <td className="px-2 lg:px-4 py-1 lg:py-2">{employee.join_date}</td>
                            </tr>
                        ))}
                        {placeholders.map((_, index) => (
                            <tr key={index} className="dark:bg-gray-700">
                                <td className="px-2 lg:px-4 py-1 lg:py-2">&nbsp;</td>
                                <td className="px-2 lg:px-4 py-1 lg:py-2">&nbsp;</td>
                                <td className="px-2 lg:px-4 py-1 lg:py-2">&nbsp;</td>
                                <td className="px-2 lg:px-4 py-1 lg:py-2">&nbsp;</td>
                                <td className="px-2 lg:px-4 py-1 lg:py-2">&nbsp;</td>
                                <td className="px-2 lg:px-4 py-1 lg:py-2">&nbsp;</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <Pagination 
                currentPage={page} 
                onPageChange={setPage} 
                totalPages={totalPages} 
                totalRecords={totalRecords} 
            />
        </div>
    );
};

export default Table;
