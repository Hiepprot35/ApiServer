const { default: mongoose } = require("mongoose");

module.exports=
{
    multipleMogoose: function multipleMogoose(mongooses)
    {
        return mongooses.map(a=>a.toObject());
    }, 
    mogoosetoObject: function (mongoose)
    {
        return mongoose? mongoose.toObject() : mongoose;
    },
};