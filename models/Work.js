import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Branding & Design', 'Social Media Creatives', 'Websites', 'Performance Marketing', 'SEO', 'NFC Digital Cards']
  },
  client: {
    type: String,
    default: ''
  },
  year: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  fullDesc: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  },
  result: {
    type: String,
    default: ''
  },
  resultLabel: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#B2278C'
  },
  icon: {
    type: String,
    default: '📁'
  },
  results: [{
    type: String
  }],
  metrics: [{
    value: String,
    label: String
  }],
  services: [{
    type: String
  }],
  deliverables: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  relatedIds: [{
    type: String
  }],
  liveUrl: {
    type: String,
    default: ''
  },
  featuredImage: {
    url: String,
    publicId: String
  },
  image: {
    type: String,
    default: ''
  },
  instagramReel: {
    type: {
      type: String,
      enum: ['reel', 'post'],
      default: 'reel'
    },
    url: String,
    thumbnail: {
      url: String,
      publicId: String
    },
    embedUrl: String
  },
  gallery: [{
    url: String,
    publicId: String,
    caption: String
  }],
  caseStudy: {
    overview: String,
    challenge: String,
    solution: String,
    results: String,
    testimonial: {
      quote: String,
      author: String,
      position: String
    }
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

workSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

workSchema.pre('validate', function(next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

export default mongoose.model('Work', workSchema);