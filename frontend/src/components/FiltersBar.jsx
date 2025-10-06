import React, { useState, useEffect } from "react";
import { Briefcase, MapPin, DollarSign, Search } from "lucide-react";

export default function FiltersBar({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);

  // Sync localFilters with parent filters
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Debounced effect for search input 'q'
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ ...localFilters });
    }, 300);
    return () => clearTimeout(timer);
  }, [localFilters.q, onFilterChange]);

  // Instant updates for other filters
  useEffect(() => {
    onFilterChange({ ...localFilters });
  }, [
    localFilters.location,
    localFilters.jobType,
    localFilters.salaryRange,
    onFilterChange
  ]);

  const handleChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSalaryChange = (e, index) => {
    const value = parseInt(e.target.value);
    const newRange = [...localFilters.salaryRange];
    newRange[index] = value;
    if (newRange[0] <= newRange[1]) handleChange("salaryRange", newRange);
  };

  return (
    <div className="bg-white shadow-sm rounded-full py-3 px-6 flex items-center justify-between mt-6 mx-auto max-w-6xl">
      
      {/* Search */}
      <div className="flex items-center space-x-2 pl-4 border-r pr-6 text-gray-600">
        <Search size={18} className="text-purple-500" />
        <input
          type="text"
          placeholder="Search by Job title, Role or Company..."
          className="outline-none bg-transparent text-sm w-40"
          value={localFilters.q}
          onChange={(e) => handleChange("q", e.target.value)}
        />
      </div>

      {/* Location */}
      <div className="flex items-center space-x-2 border-r px-6 text-gray-600">
        <MapPin size={18} className="text-pink-500" />
        <select
          value={localFilters.location}
          className="outline-none bg-transparent text-sm text-gray-700"
          onChange={(e) => handleChange("location", e.target.value)}
        >
          <option value="">Any Location</option>
          <option value="Chennai">Chennai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Kochi">Kochi</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      {/* Job Type */}
      <div className="flex items-center space-x-2 border-r px-6 text-gray-600">
        <Briefcase size={18} className="text-purple-500" />
        <select
          value={localFilters.jobType}
          className="outline-none bg-transparent text-sm text-gray-700"
          onChange={(e) => handleChange("jobType", e.target.value)}
        >
          <option value="">Any Type</option>
          <option value="FullTime">Full-time</option>
          <option value="PartTime">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      {/* Salary Range */}
      <div className="flex items-center space-x-4 pl-6 text-gray-700">
        <DollarSign size={18} className="text-green-500" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-600">Salary Per Month</span>
          <span className="text-sm font-semibold text-black">
            ₹{(localFilters.salaryRange[0] / 1000).toFixed(0)}k - ₹{(localFilters.salaryRange[1] / 1000).toFixed(0)}k
          </span>
        </div>
        <div className="relative w-32">
          <input
            type="range"
            min="0"
            max="2000000"
            step="5000"
            value={localFilters.salaryRange[0]}
            onChange={(e) => handleSalaryChange(e, 0)}
            className="absolute w-full accent-black cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="2000000"
            step="5000"
            value={localFilters.salaryRange[1]}
            onChange={(e) => handleSalaryChange(e, 1)}
            className="absolute w-full accent-black cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
