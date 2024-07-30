const settingsDao = require("../DatabaseAndDao/settingsDao");

const getAllSettings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const settings = await settingsDao.getAllSettings(userId);
    if (settings) {
      res.json(settings);
    } else {
      res.status(404).json({ message: "Theres no settings available" });
    }
  } catch (error) {
    console.error("Error obtaining settings:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateSettings = async (req, res) => {
  if (!req.user) {
    return res
      .status(403)
      .send("Access denied. Administrator privileges required.");
  }
  try {
    const settingsId = req.params.settingsId;
    const userId = req.user.userId;
    const updatedSettingsData = req.body;
    await settingsDao.updateSettings(userId, settingsId, updatedSettingsData);
    res.json({ message: "Settings successfully updated" });
  } catch (error) {
    console.error("Error updating settings:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllSettings, updateSettings };
