const studentsRouter = require('./student');
const messageRouter=require('./message')
function routes(app) {
    
    app.use('/api', studentsRouter)
    app.use('/api/message/', messageRouter)


   
};
module.exports = routes
