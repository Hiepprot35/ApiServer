const studentsRouter = require('./student');
// const hiepRouter = require('./hiep');
const loginRouter = require('./login');

function routes(app) {
    // app.use('/',test)
    // app.use('/home', newsRouter)
    // app.use('/login', loginRouter)

    app.use('/', studentsRouter)

    // app.use('/', newsRouter)

   
};
module.exports = routes
