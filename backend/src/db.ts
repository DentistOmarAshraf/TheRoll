import mongoose from "mongoose";

export default async function connectToDB(): Promise<void> {
  try {
    await mongoose.connect("mongodb://localhost/SomeDBN");
    console.log("Connected To MongoDB");
  } catch (e) {
    console.log(e);
    console.log("Not Connected");
    process.exit(1);
  }
}
