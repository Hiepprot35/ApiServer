const { connect, dbconnection } = require('../models/db.model')
const ClassModel = (studentInfo) => {


}
ClassModel.getAllClassMonHoc = async (MaMonHoc) => {
    const query = "Select * from lophoctheomon where MonHocID=?"
    const classes = await new Promise((resolve, reject) => {
        dbconnection.query(query, [MaMonHoc], (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    }
    )
    return classes
}
module.exports = ClassModel
