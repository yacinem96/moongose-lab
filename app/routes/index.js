const express = require('express');

router=express.Router();

module.exports=() => {

    router.get("/",(req,res)=>{
        res.send("test test ayouuuuub");
    });


    return  router;
};