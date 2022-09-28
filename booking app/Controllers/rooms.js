import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
//import { createError } from "../utils/error.js";



export const createRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelid
    const newRoom=new Room(req.body)


try{
    const saveRoom=await newRoom.save()

    try{
        await Hotel.findByIdandUpdate(hotelId, 
            {$push:{
            rooms:saveRoom._id},
        });
    }catch(err){
        next(err);
    }
    res.status(200).json(saveRoom);
}catch(err){
    next(err);
}
};

export const updateRoom = async (req, res, next) => {

    try {
        const updateHotel = await Room.findByIdAndUpdate(req.params.id, { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateRoom);

    } catch (err) {
        next(err);
    }

};
//Delete
export const deleteRoom = async (req, res, next) => {
    const hotelId=req.params.hotelid;

    try {
        await Room.findByIdAndDelete(req.params.id);
        try{
            await Hotel.findByIdandUpdate(hotelId, 
                {$pull:{
                rooms:req.params.id},
            });
        }catch(err){
            next(err);
        }

        res.status(200).json("Room has been deleted");

    } catch (err) {
        next(err);
    }

}

//Get Hotel
export const getRoom = async (req, res, next) => {

    try {
        const room = await room.findById(req.params.id)
        res.status(200).json(room);

    } catch (err) {
        next(err);
    }

};

//Get All
export const getRooms = async (req, res, next) => {


    try {
        const rooms = await rooms.find();
        res.status(200).json(rooms);

    } catch (err) {
        next(err);
    }

};