var express          = require('express'),
    router           = express.Router(),
    mongoose          = require('mongoose'),
    bookModel        = require('../models/book.model');
    userModel        = require('../models/user.model');




/* Get All Books */
router.get('/getAll' , (req , res)=>{
    console.log('Get All Books');
    bookModel.find({} , (err , books)=>{
        if(err){
            return res.status(500).send("there was problem finding the candidates");
        }
        else{
            console.log(books);
            res.send(books);
        }
    });
});


/* Get Book By ID*/
router.get('/GetBookById/:id' , (req , res)=>{
    console.log('Get Book By ID');
    bookModel.findById(req.params.id)
    .then(book=>{
        console.log(book);
        res.status(200).json(book);
    })
    .catch((err) => res.status(500).send(`there was problem find user ${err}`));
});


/* Get Book followers*/
router.get('/GetBookFollowers/:id' , (req , res)=>{
    console.log('Get Book Followers');
    bookModel.findById(req.params.id)
    .then(book=>{
        console.log(book);
        userModel.find({_id : {$in: book.followers}})
        .then(users=>{
            console.log(users);
            res.status(200).json(users);
        });
    })
    .catch((err) => res.status(500).send(`there was problem find user ${err}`));
});


/* Add Followers to Book*/
router.post('/AddFollowerToBook' , (req , res)=>{
    console.log('POST request: /AddFollowerToBook');
    var bookId   = req.body.bookId;
    var followerId = req.body.followerId;
    console.log(bookId , followerId);
    bookModel.findByIdAndUpdate({_id: bookId}, {$addToSet: { followers: followerId}}, { 'new': true})
    .then(()=> res.status(200).json({update : 'success'}))
    .catch((err) => res.status(500).send(`there was problem find book ${err}`));
});



module.exports = router;