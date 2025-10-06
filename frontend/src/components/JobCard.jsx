export default function JobCard({ job }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center text-xl">A</div>
          <div>
            <h3 className="font-semibold">{job.title}</h3>
            <div className="text-sm text-gray-500">{job.experienceRange} · {job.location} · {job.maxSalary ? `₹${(job.maxSalary/100000).toFixed(0)} LPA` : ''}</div>
          </div>
        </div>
        <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">24h Ago</div>
      </div>
   <p className="text-sm text-gray-600 mt-3 line-clamp-3">{job.description?.summary}</p>
      <div className="mt-4">
        <button className="w-full bg-blue-500 text-white py-2 rounded-md">Apply Now</button>
      </div>
    </div>
  );
}
