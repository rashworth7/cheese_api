const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({ message: "Bad request" });
      } else {
        res.status(201).json({ message: "OK" });
      }
    });
  },
  
  GetUserByID: async (req, res) => {
    const userID = req.params.id;
    const authenticated_user_id = req.user_id;

    try {
      const user = await User.findById(userID);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else if (userID !== authenticated_user_id) {
        res.status(401).json({ message: "Unauthorised User" });
      } else {
        res.status(200).json({ username: user.username, email: user.email });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "server error" }); 
    }
  },

  Me: (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    const { user_id } = TokenGenerator.verify(token);

    User.findById(user_id, (err, user) => {
      if (err) {
        throw err;
      } else {
        const { _id, email, username, profilePic } = user;
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({userId : _id, email: email, username: username, profilePic: profilePic, token : token});
      }
    });
  },
};

module.exports = UsersController;
