import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ayushigupta:6397762861@cluster0.zb4wcsb.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}