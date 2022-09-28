import User from "../models/User.js "

export const createUser = async (req, res, next) => {
    const newUser = new User(req.body)

    try {
        const saveUser = await newUser.save();
        res.status(200).json(saveUser)

    } catch (err) {
        next(err);
    }


};
//update
export const updateUser = async (req, res, next) => {

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateUser);

    } catch (err) {
        next(err);
    }

};
//Delete
export const deleteUser = async (req, res, next) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted");

    } catch (err) {
        next(err);
    }

}

//Get Hotel
export const getUser = async (req, res, next) => {

    try {
        const User = await User.findById(req.params.id)
        res.status(200).json(User);

    } catch (err) {
        next(err);
    }

};

//Get All
export const getUsers = async (req, res, next) => {


    try {
        const Users = await User.find();
        res.status(200).json(Users);

    } catch (err) {
        next(err)
    }

};


