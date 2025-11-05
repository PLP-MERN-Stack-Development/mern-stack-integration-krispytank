const mongoose = require('mongoose');
const Category = require('./models/Category');

const seedCategories = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-blog');

    // Check if categories already exist
    const existingCategories = await Category.find();
    if (existingCategories.length > 0) {
      console.log('Categories already exist:', existingCategories.map(c => c.name));
      console.log('Adding default categories if missing...');
    }

    // Default categories to seed
    const defaultCategories = [
      { name: 'General', description: 'General topics and discussions' },
      { name: 'Tech', description: 'Technology and programming related posts' },
      { name: 'Lifestyle', description: 'Lifestyle, health, and personal development' },
      { name: 'Business', description: 'Business, finance, and entrepreneurship' },
      { name: 'Entertainment', description: 'Movies, music, games, and entertainment' },
    ];

    // Filter out categories that already exist
    const existingNames = existingCategories.map(c => c.name);
    const categoriesToAdd = defaultCategories.filter(cat => !existingNames.includes(cat.name));

    if (categoriesToAdd.length === 0) {
      console.log('All default categories already exist.');
      return;
    }

    // Insert missing categories
    await Category.insertMany(categoriesToAdd);
    console.log('Default categories seeded successfully:', categoriesToAdd.map(c => c.name));
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
seedCategories();
