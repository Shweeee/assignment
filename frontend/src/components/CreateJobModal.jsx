import React, { useState } from 'react';
import API from '../api';

export default function CreateJobModal({ open, onClose }) {
  const [form, setForm] = useState({ title:'', company:'', location:'', jobType:'FullTime', minSalary:'', maxSalary:'', description:'', status:'published' });

  if (!open) return null;
  async function handleSubmit(e, status) {
    e.preventDefault();
    const body = { ...form, status };
    await API.post('/jobs', body);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form className="bg-white rounded-2xl p-6 w-full max-w-2xl" onSubmit={e => handleSubmit(e, 'published')}>
        <h3 className="text-center font-semibold mb-4">Create Job Opening</h3>
        {/* 2-column inputs: title/company, location/jobType, salary inputs, description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Job Title" className="border rounded px-3 py-2" />
          <input required value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder="Company Name" className="border rounded px-3 py-2" />
          <input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="Location" className="border rounded px-3 py-2" />
          <select value={form.jobType} onChange={e=>setForm({...form,jobType:e.target.value})} className="border rounded px-3 py-2">
            <option value="FullTime">Full Time</option>
            <option value="Internship">Internship</option>
            <option value="PartTime">Part Time</option>
            <option value="Contract">Contract</option>
          </select>
          <input type="number" placeholder="Min Salary" value={form.minSalary} onChange={e=>setForm({...form,minSalary:e.target.value})} className="border rounded px-3 py-2" />
          <input type="number" placeholder="Max Salary" value={form.maxSalary} onChange={e=>setForm({...form,maxSalary:e.target.value})} className="border rounded px-3 py-2" />
        </div>
        <textarea placeholder="Job Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="w-full border rounded mt-4 p-3 h-32" />
        <div className="flex justify-between mt-4">
          <button type="button" onClick={(e)=>handleSubmit(e,'draft')} className="border rounded px-4 py-2">Save Draft</button>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="border rounded px-4 py-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Publish »</button>
          </div>
        </div>
      </form>
    </div>
  );
}
