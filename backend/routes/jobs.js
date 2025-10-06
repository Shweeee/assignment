const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// GET /api/jobs - filters & pagination
router.get('/', async (req, res) => {
  try {
    const {
      q, location, jobType, minSalary, maxSalary, page = 1, limit = 12
    } = req.query;

    const filters = { status: 'published' };

    // Search by title or company
    if (q) {
      filters.$or = [
        { title: { $regex: q, $options: 'i' } },
        { company: { $regex: q, $options: 'i' } },
      ];
    }

    if (location) filters.location = location;
    if (jobType) filters.jobType = jobType;

    // Salary intersection logic
    if (minSalary && maxSalary) {
      filters.$and = [
        { maxSalary: { $gte: Number(minSalary) } },
        { minSalary: { $lte: Number(maxSalary) } }
      ];
    } else if (minSalary) {
      filters.maxSalary = { $gte: Number(minSalary) };
    } else if (maxSalary) {
      filters.minSalary = { $lte: Number(maxSalary) };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Job.find(filters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Job.countDocuments(filters)
    ]);

    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/jobs/:id
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/jobs
router.post('/', async (req, res) => {
  const { title, company, location, jobType, minSalary, maxSalary, description, status, experienceRange, companyImage } = req.body;
  try {
    const job = new Job({ title, company, location, jobType, minSalary, maxSalary, description, status, experienceRange, companyImage });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/jobs/:id
router.put('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/jobs/:id
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted successfully', deletedJob: job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
