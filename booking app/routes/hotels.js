import express from 'express';
import Hotel from '../models/Hotel.js';
import { countByCity, countByType, createHotel, getHotelRooms } from '../Controllers/hotels.js';
import { updateHotel } from '../Controllers/hotels.js';
import { deleteHotel } from '../Controllers/hotels.js';
import { getHotel } from '../Controllers/hotels.js';
import { getHotels } from '../Controllers/hotels.js';
import { verifyAdmin } from '../utils/VerifyToken.js';


const router=express.Router();


//Create
router.post('/',verifyAdmin, createHotel);
   
//update
router.put('/:id',verifyAdmin,updateHotel);
   
  
//Delete
router.delete('/find/:id',verifyAdmin,deleteHotel);

//Get Hotel
router.get('/find/:id',getHotel);
   
    


//Get All
router.get('/',getHotels);
router.get('/countByCity',countByCity);
router.get('/countByType',countByType);
router.get('/room/:id',getHotelRooms);

    
   
 


export default router