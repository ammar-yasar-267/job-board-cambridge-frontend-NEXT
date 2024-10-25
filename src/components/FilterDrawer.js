import React, { useState, useEffect } from 'react';
import { 
  SlidersHorizontal, 
  X as CloseIcon,
  ArrowUpDown,
  Calendar,
  Wallet,
  Briefcase,
  Clock
} from 'lucide-react';

const FilterDrawer = ({ isOpen, onClose, onFilterChange, initialFilters }) => {
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const FilterOption = ({ icon: Icon, title, value, onChange, options }) => (
    <div className="border-b border-gray-100 py-4 last:border-0">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={18} className="text-gray-500" />
        <h3 className="font-medium text-gray-700">{title}</h3>
      </div>
      <select
        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const filterOptions = [
    {
      icon: ArrowUpDown,
      title: "Sort by",
      value: filters.sortBy || "",
      onChange: (e) => handleFilterChange('sortBy', e.target.value),
      options: [
        { value: "", label: "Default" },
        { value: "relevance", label: "Relevance" },
        { value: "date_asc", label: "Date posted" },
        { value: "salary_asc", label: "Salary (Low to High)" },
        { value: "salary_desc", label: "Salary (High to Low)" }
      ]
    },
    {
      icon: Calendar,
      title: "Date posted",
      value: filters.datePosted || "",
      onChange: (e) => handleFilterChange('datePosted', e.target.value),
      options: [
        { value: "", label: "Any time" },
        { value: "1", label: "Last 24 hours" },
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" }
      ]
    },
    {
      icon: Wallet,
      title: "Salary",
      value: filters.salaryRange || "",
      onChange: (e) => handleFilterChange('salaryRange', e.target.value),
      options: [
        { value: "", label: "Any" },
        { value: "0-30000", label: "Up to £30,000" },
        { value: "30000-50000", label: "£30,000 - £50,000" },
        { value: "50000-75000", label: "£50,000 - £75,000" },
        { value: "75000-100000", label: "£75,000 - £100,000" },
        { value: "100000-999999", label: "£100,000+" }
      ]
    },
    {
      icon: Briefcase,
      title: "Contract type",
      value: filters.contractType || "",
      onChange: (e) => handleFilterChange('contractType', e.target.value),
      options: [
        { value: "", label: "Any" },
        { value: "permanent", label: "Permanent" },
        { value: "contract", label: "Contract" }
      ]
    },
    {
      icon: Clock,
      title: "Hours",
      value: filters.hours || "",
      onChange: (e) => handleFilterChange('hours', e.target.value),
      options: [
        { value: "", label: "Any" },
        { value: "full_time", label: "Full Time" },
        { value: "part_time", label: "Part Time" }
      ]
    }
  ];

  const FilterContent = () => (
    <>
      <div className="space-y-1">
        {filterOptions.map((option, index) => (
          <FilterOption key={index} {...option} />
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={() => {
            const resetFilters = Object.keys(filters).reduce((acc, key) => ({ ...acc, [key]: "" }), {});
            setFilters(resetFilters);
            onFilterChange(resetFilters);
          }}
          className="w-full py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all"
        >
          Reset all
        </button>
      </div>
    </>
  );

return (
    <>
        {/* Mobile Filter Toggle Button */}
        <button
            className="md:hidden flex items-center gap-2 bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition-all"
            onClick={() => onClose(true)}
        >
            <SlidersHorizontal size={18} />
            <span className="font-medium">Filters</span>
        </button>

        {/* Overlay */}
        {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                     onClick={() => onClose(false)} />
        )}

        {/* Desktop Filters */}
        <div className="hidden md:block bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="font-bold text-xl mb-4 text-gray-800">Filters</h3>
            <FilterContent />
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
            <>
                {/* Adjusted backdrop layer */}
                <div
                    className="fixed right-0 top-0 bottom-0 w-[90%] max-w-[400px] bg-black bg-opacity-50 z-40 transition-opacity md:hidden"
                    onClick={() => onClose(false)}
                />
                <div
                    className={`fixed right-0 top-0 h-full w-[90%] max-w-[400px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
                        isOpen ? 'translate-x-0' : 'translate-x-full'
                    } md:hidden`}
                >
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-4 border-b">
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal size={20} className="text-green-600" />
                                <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                            </div>
                            <button
                                onClick={() => onClose(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-all"
                            >
                                <CloseIcon size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            <FilterContent />
                        </div>
                    </div>
                </div>
            </>
        )}
    </>
);
};

export default FilterDrawer;