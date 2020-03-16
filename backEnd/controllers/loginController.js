const express = require('express');
const Twitter = require('../model/twitter.model');
const router = express.Router();



router.post('/signin', (req,res)=>{
  let tweetData= req.body
  let tweet= new Twitter(tweetData)

  tweet.save((error, signedUser)=>{
    if(error){
      console.log(error)
    }else{
      res.status(200).send(signedUser)
    }

  })
})
  
router.post('/login', (req,res)=>{
  let tweetData= req.body

    Twitter.findOne({email: tweetData.email}, (error,tweet)=>{
      if(error){
        console.log(error)
      }else{
        if(!tweet){
          res.status(401).send('Invalid Password')
        }else{
          res.status(200).send(tweet)
        }
      }
    })




  })
module.exports=router



















































// // module.exports.login = async function (req, res) {
// //     let fetchedUser;
// //     console.log(req.body.username);

// //     Twitter.findOne({ 'username': req.body.username })
// //     .then(user => {
// //       console.log(user);
// //       if (!user) {
// //         return res.status(401).json({
// //           message: "Authorization failed"
// //         });
// //       }
// //       fetchedUser = user;
// //         return bcrypt.compare(req.body.password, user.password);
// //     })
// //     .then(result => {
// //       console.log(result);
// //       if (!result) {
// //        // res.status(401).json({
// //         //  message: "Worng password"
// //         //});
// //         console.log('wrong password');
// //       }
// //       console.log("I am here");
// //       const token = jwt.sign(
// //         {
// //           username: fetchedUser.username,
// //           userId: fetchedUser._id,
// //         },
// //         process.env.JWT_SECRET,
// //         { expiresIn: "2h" }
// //       );
// //       return res.status(200).json({
// //         _token: token,
// //         _expiresIn: 7200,
// //         _username: fetchedUser.username,
// //         message: "Login Successfull."
// //       });
// //     })
// //     .catch(error => {
// //       return res.status(401).json({
// //         message: "Auth Failed",
// //         error: error
// //       });
// //     });
// // }

// module.exports.signup = async function (req, res) {
//     bcrypt.hash(req.body.password, 10).then(password => {
//         const user = new Twitter({
//           username: req.body.username,
//           password: password,
//           email: req.body.email,
//           dateofbirth: req.param.dob,
//           isActive: true,
//           followers: [],
//           following: [],
//           tweets:[]
//         });
    
//         Twitter
//           .save()
//           .then(result => {
//             res.status(201).json({
//               message: "Twitter created!",
//               result: result
//             });
//           })
//           .catch(err => {
//             res.status(500).json({
//               error: err
//             });
//           });
//       });
// }