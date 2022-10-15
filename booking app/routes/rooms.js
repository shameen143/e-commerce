import express from 'express';
import { createRoom,updateRoom, deleteRoom, getRoom, getRooms, updateRoomAvailability } from '../Controllers/rooms.js';
import {verifyAdmin} from '../utils/verifyToken.js';

const router=express.Router();
router.post('/:hotelid',verifyAdmin, createRoom);
   
//update
router.put('/:id',verifyAdmin,updateRoom);
router.put('availability/:id',updateRoomAvailability    );
   
  
//Delete
router.delete('/:id/:hotelid',verifyAdmin,deleteRoom);

//Get Hotel
router.get('/',getRoom);
   
    


//Get All
router.get('/',getRooms);


export default router