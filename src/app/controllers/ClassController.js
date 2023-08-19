const ClassModel = require('../models/class.model')
class ClassController
{
    async getClassMonHoc(req,res,next)
    {
        console.log(req.body.MaMonHoc)
        try {
            const classes= await ClassModel.getAllClassMonHoc(req.body.MaMonHoc);
            res.send(classes)
        } catch (error) {
            res.send(error)
        }
       
    }
}
module.exports = new ClassController();