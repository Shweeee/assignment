import React, { useState, useEffect, useCallback } from 'react';
import API from './api';
import Header from './components/Header';
import FiltersBar from './components/FiltersBar';
import JobGrid from './components/JobGrid';
import CreateJobModal from './components/CreateJobModal';
import './index.css';

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    q: "",               // backend expects 'q'
    location: "",
    jobType: "",
 salaryRange: [0, 10000000], // 0 to 20 lakh
// full range by default
  });
  const [page, setPage] = useState(1);
  const [openCreate, setOpenCreate] = useState(false);

  // Stable handler for filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setPage(1); // reset page when filters change
    setFilters(newFilters);
  }, []);

  // Fetch jobs from backend
  const fetchJobs = useCallback(async () => {
    try {
      const params = { page, limit: 12 };

      // Add filters only if they have values
      if (filters.q && filters.q.trim() !== "") params.q = filters.q;
      if (filters.location && filters.location !== "") params.location = filters.location;
      if (filters.jobType && filters.jobType !== "") params.jobType = filters.jobType;

      // Add salary only if not full default range
   
      if (filters.salaryRange && 
    (filters.salaryRange[0] !== 0 || filters.salaryRange[1] !== 200000)) {
  params.minSalary = filters.salaryRange[0];
  params.maxSalary = filters.salaryRange[1];
}


      const res = await API.get('/jobs', { params });
      setJobs(res.data.items);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  }, [filters, page]);

  // Fetch jobs on mount and whenever filters/page change
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreate={() => setOpenCreate(true)} />
      <div className="container mx-auto px-4">
        <FiltersBar 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
        <JobGrid jobs={jobs} />
        {jobs.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No jobs found.</p>
        )}
      </div>

      <CreateJobModal 
        open={openCreate} 
        onClose={() => { 
          setOpenCreate(false); 
          fetchJobs(); 
        }} 
      />
    </div>
  );
}
