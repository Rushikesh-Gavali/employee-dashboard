import { useState } from 'react';

const Dropdown = ({ label, options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        onSelect(value);
    };

    return (
        <div className='mr-8'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
            <select value={selectedOption} onChange={handleChange} className="w-40 ml-4 lg:w-48 px-3 py-2 bg-gray-200 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100">
                <option value="">Select...</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
