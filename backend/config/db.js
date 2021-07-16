import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log(`Mongo connected:${conn.connection.host}`.rainbow)
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    process.exit(1);
  }
};
export default connectDB