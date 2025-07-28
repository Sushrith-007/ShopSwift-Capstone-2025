const express = require('express');
const { body } = require('express-validator');
const { protect, authorize } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/errorHandler');
const { upload, cloudinary } = require('../config/cloudinary');
const {
  uploadProductImages: uploadProductImagesController,
  deleteProductImage,
  setPrimaryProductImage,
  uploadCategoryImage: uploadCategoryImageController,
  deleteCategoryImage,
  uploadUserAvatar: uploadUserAvatarController,
  deleteUserAvatar,
  getUploadStats
} = require('../controllers/uploadController');

const router = express.Router();

// Product Images Upload Route
router.post('/products', protect, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }
    // Process uploaded files
    const uploadedFiles = req.files.map(file => ({
      url: file.path,
      publicId: file.filename
    }));
    res.status(200).json({ success: true, data: uploadedFiles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Product image routes
router.post(
  '/products/:id/images',
  protect,
  authorize('admin'),
  upload.array('images', 10), // Max 10 images
  [
    body('alt').optional().trim().isLength({ max: 255 })
  ],
  handleValidationErrors,
  uploadProductImagesController
);

router.delete(
  '/products/:id/images/:imageId',
  protect,
  authorize('admin'),
  deleteProductImage
);

router.put(
  '/products/:id/images/:imageId/primary',
  protect,
  authorize('admin'),
  setPrimaryProductImage
);

// Category image routes
router.post(
  '/categories/:id/image',
  protect,
  authorize('admin'),
  upload.single('image'),
  [
    body('alt').optional().trim().isLength({ max: 255 })
  ],
  handleValidationErrors,
  uploadCategoryImageController
);

router.delete(
  '/categories/:id/image',
  protect,
  authorize('admin'),
  deleteCategoryImage
);

// User avatar routes
router.post(
  '/avatar',
  protect,
  upload.single('avatar'),
  uploadUserAvatarController
);

router.delete(
  '/avatar',
  protect,
  deleteUserAvatar
);

// Admin statistics
router.get(
  '/stats',
  protect,
  authorize('admin'),
  getUploadStats
);

module.exports = router;