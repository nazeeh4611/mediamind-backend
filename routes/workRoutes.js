import express from 'express';
import {
  getWorks,
  getWorkBySlug,
  getWorkById,
  getAdminWorks,
  getAdminWorkById,  // <-- Import this
  createWork,
  updateWork,
  deleteWork
} from '../controllers/workController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadImage } from '../utils/upload.js';

const router = express.Router();

const multiUpload = uploadImage.fields([
  { name: 'featuredImage', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]);

// ── Public routes ──────────────────────────────────────────────
router.get('/', getWorks);
router.get('/slug/:slug', getWorkBySlug);
router.get('/:id', getWorkById);  // Public route to get work by ID

// ── Admin / protected routes ───────────────────────────────────
router.get('/admin/all', protect, getAdminWorks);
router.get('/admin/:id', protect, getAdminWorkById);  // Admin route to get work by ID

router.post('/', protect, multiUpload, createWork);
router.put('/:id', protect, multiUpload, updateWork);
router.delete('/:id', protect, deleteWork);

// ── Error handler ──────────────────────────────────────────────
router.use((error, req, res, next) => {
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'File too large. Maximum size is 5MB' });
  }
  next(error);
});

export default router;