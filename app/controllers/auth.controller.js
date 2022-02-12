const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Seller = db.seller;
//const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  User.findOne({$and:[
        {userName: req.body.userName},
        {email: req.body.email}
      ]   
    })
    .exec((err,user)=>{
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        return res.status(404).send("This account have been used!");       
      }

      const newuser = new User({
          fullName: req.body.fullName,
          lastName: req.body.lastName,
          userName: req.body.userName,
          email: req.body.email,
          phoneNumber:req.body.phoneNumber,
          password: bcrypt.hashSync(req.body.password, 8),
      });

      newuser.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        else{
          res.send("register success!");
        }
      });
  });
};

exports.signin = (req, res) => {
  User.findOne({$or:[
        {userName: req.body.NameOrEmail},
        {email: req.body.NameOrEmail}
      ]   
    })
    //.populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send("User Not found.");
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send("Invalid Password!");
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      // var authorities = [];

      // for (let i = 0; i < user.roles.length; i++) {
      //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      // }

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        userName: user.userName,
        email: user.email,
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

exports.resetpassword = (req, res) => {
  const filter = {email: req.body.email};
  const update = {password: bcrypt.hashSync(req.body.password, 8)};
  console.log("AA");
  console.log(filter);
  console.log(update);

 User.findOneAndUpdate(filter,update,{returnOriginal: false})
 .exec((err, user) => {
    if (err) {
      console.log("BB");
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      console.log("CC");
      return res.status(404).send("Email Not found.");
    }
    res.send("ResetPassword Success!");
  })
};

exports.sellersignup = (req, res) => {
  console.log("A",req.body);
  Seller.findOne({$and:[
      {fullName: req.body.fullName},
      {email: req.body.email}
    ]   
  })
  .exec((err,seller)=>{
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (seller) {
      return res.status(404).send("This account have been used!");       
    }

  const newseller = new Seller({
      fullName: req.body.fullName,
      lastName: req.body.lastName,
      companyName: req.body.companyName,
      companyWebsite: req.body.companyWebsite,
      email:req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      phoneNumber: req.body.phoneNumber
  });

    newseller.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      else{
        res.send("register success!");
      }
    });
  });
};

exports.sellersignin = (req, res) => {
  Seller.findOne({$or:[
        {fullName: req.body.NameOrEmail},
        {email: req.body.NameOrEmail}
      ]   
    })
    //.populate("roles", "-__v")
    .exec((err, seller) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!seller) {
        return res.status(404).send("Seller Not found.");
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        seller.password
      );

      if (!passwordIsValid) {
        return res.status(401).send("Invalid Password!");
      }

      var token = jwt.sign({ id: seller.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      // var authorities = [];

      // for (let i = 0; i < user.roles.length; i++) {
      //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      // }

      req.session.token = token;

      res.status(200).send({
        id: seller._id,
        fullName: seller.fullName,
        email: seller.email,
      });
    });
};