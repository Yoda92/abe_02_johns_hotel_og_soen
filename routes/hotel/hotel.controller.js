const { HttpError } = require("../../middleware/errorHandler");
const hotelService = require("./hotel.service");

const getHotels = (req, res, next) => {
  hotelService
    .getHotels()
    .then((hotels) => res.status(200).json(hotels))
    .catch((error) => next(error));
};

const addHotel = (req, res, next) => {
  const { hotelName, streetName, houseNumber, zip } = req.body;
  if (!hotelName || !streetName || !houseNumber || !zip) {
    throw new HttpError(
      400,
      "hotelName, streetName, houseNumber or zip missing"
    );
  }
  const verifiedUser = req.verifiedUser;
  if (!verifiedUser) {
    throw new HttpError(403, "Token not verified.");
  }

  hotelService
    .addHotel(hotelName, streetName, houseNumber, zip, verifiedUser)
    .then((hotel) => res.status(200).send(hotel))
    .catch((error) => next(error));
};

const getHotel = (req, res, next) => {
  const { name } = req.param;
  hotelService
    .getHotel(name)
    .then((hotel) => res.status(200).send(hotel))
    .catch((error) => next(error));
};

const addRoom = (req, res, next) => {
  const { hotelName, roomNumber, numberOfBeds } = req.body;
  if (!hotelName || !roomNumber || !numberOfBeds) {
    throw new HttpError(400, "Hotelname, roomNumber or numberOfBeds missing.");
  }
  const verifiedUser = req.verifiedUser;
  if (!verifiedUser) {
    throw new HttpError(403, "Token not verified.");
  }
  hotelService
    .addRoom(hotelName, roomNumber, numberOfBeds, verifiedUser)
    .then((room) => res.status(200).send(room))
    .catch((error) => next(error));
};

module.exports = {
  getHotels,
  getHotel,
  addHotel,
  addRoom,
};
