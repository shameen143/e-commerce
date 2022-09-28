import Hotel from "../models/Hotel.js "

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)

    try {
        const saveHotel = await newHotel.save();
        res.status(200).json(saveHotel)

    } catch (err) {
        next(err);
    }


};
//update
export const updateHotel = async (req, res, next) => {

    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateHotel);

    } catch (err) {
        next(err);
    }

};
//Delete
export const deleteHotel = async (req, res, next) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");

    } catch (err) {
        next(err);
    }

}

//Get Hotel
export const getHotel = async (req, res, next) => {

    try {
        const Hotel = await Hotel.findById(req.params.id)
        res.status(200).json(Hotel);

    } catch (err) {
        next(err);
    }

};

//Get All
export const getHotels = async (req, res, next) => {


    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);

    } catch (err) {
        next(err);
    }

};
export const countByCity = async (req, res, next) => {
    const cities=req.query.cities.split(",")


    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);

    } catch (err) {
        next(err);
    }

};
export const countByType = async (req, res, next) => {


    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }
            ))
        res.status(200).json(list);

    } catch (err) {
        next(err);
    }

};


