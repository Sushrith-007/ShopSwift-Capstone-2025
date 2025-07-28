const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Check if required Cloudinary environment variables are provided
const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
  console.warn('Cloudinary environment variables not provided. Image upload functionality will be disabled.');
  
  // Create mock multer middleware that handles files locally or rejects
  const mockMulter = {
    single: (fieldname) => (req, res, next) => {
      req.file = null;
      next();
    },
    array: (fieldname, maxCount) => (req, res, next) => {
      req.files = [];
      next();
    },
    fields: (fields) => (req, res, next) => {
      req.files = {};
      next();
    },
  };

  module.exports = {
    cloudinary: null,
    uploadProductImages: mockMulter,
    uploadCategoryImage: mockMulter,
    uploadUserAvatar: mockMulter,
    deleteImage: () => Promise.reject(new Error('Cloudinary not configured')),
    deleteMultipleImages: () => Promise.reject(new Error('Cloudinary not configured')),
    getImageInfo: () => Promise.reject(new Error('Cloudinary not configured')),
    transformImageUrl: (publicId) => `/placeholder-image.jpg`,
    generateResponsiveUrls: (publicId) => ({
      thumbnail: '/placeholder-image.jpg',
      small: '/placeholder-image.jpg',
      medium: '/placeholder-image.jpg',
      large: '/placeholder-image.jpg',
      original: '/placeholder-image.jpg',
    }),
  };
  return;
}

// Configure Cloudinary
cloudinary.config(cloudinaryConfig);

// Configure storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'shopswift',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});

// Configure upload middleware
const upload = multer({ storage: storage });

// Helper functions
const deleteImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

const deleteMultipleImages = async (publicIds) => {
  return await cloudinary.api.delete_resources(publicIds);
};

const getImageInfo = async (publicId) => {
  return await cloudinary.api.resource(publicId);
};

const transformImageUrl = (publicId) => {
  return cloudinary.url(publicId, {
    secure: true,
    width: 500,
    crop: 'fill'
  });
};

const generateResponsiveUrls = (publicId) => ({
  thumbnail: cloudinary.url(publicId, { width: 100, height: 100, crop: 'fill' }),
  small: cloudinary.url(publicId, { width: 300, crop: 'scale' }),
  medium: cloudinary.url(publicId, { width: 500, crop: 'scale' }),
  large: cloudinary.url(publicId, { width: 800, crop: 'scale' }),
  original: cloudinary.url(publicId)
});

module.exports = {
  cloudinary,
  upload, // Export the upload instance directly
  deleteImage,
  deleteMultipleImages,
  getImageInfo,
  transformImageUrl,
  generateResponsiveUrls
};