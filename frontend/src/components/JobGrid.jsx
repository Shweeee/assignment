import JobCard from './JobCard';

export default function JobGrid({ jobs }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      {jobs.map(j => <JobCard key={j._id} job={j} />)}
    </div>
  );
}
