import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/routes.js";
import { Connection } from "./database/db.js";
import cookieParser from "cookie-parser";
import {Server} from "socket.io"
const port = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );
app.use("/",router);
Connection();

app.get("/" , (req , res) => {
    return res.send("Hello!");
});

const server = app.listen(port , () => {
    console.log(`Server is running at ${port}`);
})

///////////////////////////////////////////////////////////////////////////////////////
// socket

const io = new Server(server,{
  cors:{
    origin: ["http://localhost:3000"],
    // credentials: true,
  }
})

io.on("connection",(socket)=>{
  console.log("Connected");
  
  socket.on("setup" , ({sender}) => {
    // console.log(sender);
    socket.join(sender._id);
    console.log(`${sender.name} joined room : ${sender._id}`);
  })
  
  socket.on("getappointment" , ({id,userData}) => {
    // console.log(userData.name);
    socket.in(id).emit("appointmentreq" , {patient : userData});
  })
  
  socket.on("acceptreq" , ({info , pid , did , name}) => {
    // console.log(info , `Request Accepted for ${pid} by ${did}`);
    socket.in(pid).emit("reqaccept" , {info , pid , did , name});
  })
  
  socket.on("deletereq", ({id}) => {
    // console.log(`Request Declined for ${id}`);
    socket.in(id).emit("reqdelete" , {});
  })
  
  socket.on("disconnect",() => {
    console.log("Disconnected");
  })
});