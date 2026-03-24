import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const setupAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    const adminExists = await Admin.findOne({ email: 'info@mediamind.com' });
    
    if (!adminExists) {
      await Admin.create({
        name: 'Admin',
        email: 'info@mediamind.com',
        password: 'media@mind'
      });
      console.log('Admin user created successfully');
      console.log('Email: admin@example.com');
      console.log('Password: admin123');
    } else {
      console.log('Admin user already exists');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

setupAdmin();