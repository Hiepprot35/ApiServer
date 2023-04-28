const data_hiep = require('../models/user.model')
const{mogoosetoObject}=require('../../ulti/mogoose')
class HiepController {
    show(req, res, next) {

        data_hiep.findOne({ slug: req.params.slug })
            .then(
                data => 
                    res.render('courses/show', { data:mogoosetoObject(data) })
                
            )
            .catch(next);
    }
    create(req,res,next)
    {
        res.render('courses/create')
    }

    store(req,res,next)
    {
            const data=new data_hiep(req.body)
            data.save();
            res.render('courses/create')

    }
}
module.exports = new HiepController();