const Trip = require('../../models/trip');

exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({}).lean();
        return res.status(200).json(trips);
    } catch (err) {
        console.error('getTrips error:', err);
        return res.status(500).json({ message: 'Server error retrieving trips.' });
    }
};

exports.getTripByCode = async (req, res) => {
    try {
        const { tripCode } = req.params;
        const trip = await Trip.findOne({ code: tripCode }).lean();
        if (!trip) return res.status(404).json({ message: `Trip with code ${tripCode} not found.` });
        return res.status(200).json(trip);
    } catch (err) {
        console.error('getTripByCode error:', err);
        return res.status(500).json({ message: 'Server error retrieving trip.' });
    }
};
