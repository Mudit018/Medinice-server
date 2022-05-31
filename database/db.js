import mongoose from "mongoose";

const DB = "mongodb+srv://yash091:8542955586@cluster0.fiqqq.mongodb.net/?retryWrites=true&w=majority";

export const Connection = () => {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    
    })
    .then(() => console.log("Connection to database is made successfully..."))
    .catch((err) => {
      console.log(err);
    });
};
