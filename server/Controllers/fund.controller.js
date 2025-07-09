const axios = require("axios");
const Users = require("../Models/user.model");

const getMutualFunds = async (req, res) => {
    const apiUrl = 'https://api.mfapi.in/mf';
    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
        console.log("Successful data fetched from API");
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

const getMutualFundsById = async (req, res) => {
    const { schemeCode } = req.params;
    const apiUrl = `https://api.mfapi.in/mf/${schemeCode}`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
        console.log("Successful data fetched from API");
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

// Save a mutual fund
const saveMutualFunds = async (req, res) => {
    try {
        let { schemeCode } = req.body;
        schemeCode = Number(schemeCode);
        const email = req.user.email;

        const user = await Users.findOne({email});
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.savedFunds.includes(schemeCode)) {
            return res.status(400).json({ message: 'Fund already saved' });
        }

        user.savedFunds.push(schemeCode);
        await user.save();

        res.json({ message: 'Fund saved successfully', savedFunds: user.savedFunds });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get saved mutual funds
const getSavedMutualFunds = async (req, res) => {
    try {
        const email = req.user.email;
        if (!email) {
            console.log("Email not found in token:", req.user);
            return res.status(400).json({ message: 'Email missing in token' });
        }

        const user = await Users.findOne({ email });
        if (!user) {
            console.log("User not found for email:", email);
            return res.status(404).json({ message: 'User not found' });
        }

        if (!Array.isArray(user.savedFunds)) {
            console.log("Saved funds is not an array");
            return res.status(400).json({ message: 'Invalid savedFunds format' });
        }

        const savedFundsDetails = await Promise.all(
            user.savedFunds.map(async (schemeCode) => {
                try {
                    const response = await axios.get(`https://api.mfapi.in/mf/${schemeCode}`);
                    return response.data;
                } catch (error) {
                    console.error(`Error fetching fund ${schemeCode}:`, error.message);
                    return null;
                }
            })
        );

        const filteredFunds = savedFundsDetails.filter(fund => fund !== null);
        res.json(filteredFunds);
    } catch (error) {
        console.error("Error in getSavedMutualFunds:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Remove saved fund
const deleteSavedMutualFunds = async (req, res) => {
    try {
        let { schemeCode } = req.params;
        schemeCode = Number(schemeCode);
        const email = req.user.email;

        const user = await Users.findOne({email})
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.savedFunds = user.savedFunds.filter(code => code !== schemeCode);
        await user.save();

        res.json({ message: 'Fund removed successfully', savedFunds: user.savedFunds });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getMutualFunds,
    getMutualFundsById,
    saveMutualFunds,
    getSavedMutualFunds,
    deleteSavedMutualFunds,
};
