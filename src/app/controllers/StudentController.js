const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const jwt = require('jsonwebtoken');
// const upload = multer({ dest: 'uploads/' });
const student = require('../models/students.model');
const User = require('../models/user.model');

const functionUse = require('./function/returndate');
// Hàm xử lý khi nhận yêu cầu GET "/getAllStudents"
async function getAllStudents(req, res, next) {
  try {
    const allStudents = await student.getAllStudents();
    res.send(allStudents);
  } catch (error) {
    res.json("Fail");
  }
}
async function getStudentByMSSV(req, res, next) {
  try {
    
  
      const StudentByMSSV = await student.getStudentByMSSV(req.params.mssv);
      
      res.status(200).send(StudentByMSSV)
    
  } catch (error) {
    res.json(error)
    res.status(402)

  }
}

// Hàm xử lý khi nhận yêu cầu POST "/createstudent"
async function createstudent(req, res, next) {
  console.log("OKE")

  try {
    const d = new Date();
    const img = req.body.img.data
    console.log(req.body.img.data)
    const formData = req.body

    const RefreshToken = jwt.sign({ MSSV: formData.MSSV }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
    console.log("OKE")
    try {
      const hhexString = img && img.map(byte => byte.toString(16).padStart(2, '0')).join('');
      const count = await student.getCountClass(formData.Class)
      console.log(count)
      const new_student = {
        MSSV: functionUse.reuturnID(formData.Khoa, formData.Class, count),
        Name: formData.Name,
        Address: formData.Address,
        Birthday: formData.Birthday,
        SDT: formData.SDT,
        Khoa: formData.Khoa,
        Class: formData.Class,
        Sex: formData.Sex,
        img: hhexString || "img",
        create_by:formData.create_by,
        create_at: functionUse.reuturndate()
      }
      const newUser = {

        username: new_student.MSSV,
        password: new_student.SDT,
        RefreshToken: RefreshToken,
        RoleID: 2,
        create_at: functionUse.reuturndate()
      }
      const message = await student.store(new_student);
      const createUser = await User.create(newUser)
      res.status(200)
    }
    catch (error) {
      console.log(error)
    }


  } catch (err) {
    res.send(err)
  }
}

async function getAllClassApi(req, res, next) {

  try {
    const getAllClass = await student.getAllClassInfomation();
    res.send(getAllClass);
  }
  catch (error) {
    res.send(error)
  }
}
async function getAllKhoaApi(req, res, next) {

  try {
    const getAllKhoa = await student.getAllKhoaInfomation();
    res.send(getAllKhoa);
  }
  catch (error) {
    res.send(error)
  }
}
// Hàm xử lý khi nhận yêu cầu GET "/createView"
async function createView(req, res, next) {
  try {
    const getAllClass = await student.getAllClassInfomation();
    res.render('courses/create', { classData: getAllClass });
  } catch (error) {
    console.log("Lỗi");
    res.render("/");
  }
}

// Hàm xử lý khi nhận yêu cầu GET "/"
async function index(req, res, next) {
  try {
    const allStudents = await student.getAllStudents();
    allStudents.forEach(element => {
      if (element.img) {
        element.img = 'data:image/jpeg;base64,' + element.img.toString('base64');
      }
    });
    res.render('home', { data: allStudents });
  } catch (error) {
    console.log("Lỗi");
    res.render("/");
  }
}

// Hàm xử lý khi nhận yêu cầu GET "/create"
async function create(req, res, next) {
  try {
    const result = await student.findallUser();
    res.render('courses/create', { data: result });
  } catch (error) {
    console.log("Lỗi");
    res.render("/");
  }
}

// Hàm xử lý khi nhận yêu cầu POST "/store"
async function store(req, res, next) {
  try {
    const new_student = {
      MSSV: req.body.MSSV,
      name: req.body.name,
      address: req.body.address,
      sex: req.body.sex,
      password: req.body.password,
      img: req.body.img
    };
    const message = await student.create(new_student);
    res.redirect("/dangky", { message: "Thành công" });
  } catch (error) {
    res.redirect("/dangky", { message: "Thất bại" });
    console.log(error);
  }
}

// Hàm xử lý khi nhận yêu cầu GET "/findid/:id"
async function findid(req, res, next) {
  try {
    const result = await student.findId(req.params.id);
    if (result.img) {
      result.img = 'data:image/jpeg;base64,' + result.img.toString('base64');
    }
    res.render('courses/change', { data: result });
  } catch (error) {
    res.render("/");
  }
}

// Hàm xử lý khi nhận yêu cầu POST "/change"
async function change(req, res, next) {
  try {
    upload.single('image')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.error('Lỗi tải lên tệp: ' + err.message);
        next(err);
      } else if (err) {
        console.error('Lỗi tải lên tệp: ' + err.message);
        next(err);
      } else {
        const imageFile = req.file; // Lấy tệp ảnh từ yêu cầu
        // const imageBuffer = fs.readFileSync(imageFile.path);
        // const imageBytes = Array.from(imageBuffer);
        // const imageData = Buffer.from(imageBytes);

        const new_student = {
          MSSV: req.body.MSSV,
          name: req.body.Name,
          address: req.body.Address,
          Sex: req.body.Sex,
          Class: req.body.Class,
          password: req.body.password,
          img: imageFile.buffer
        };

        await student.saveChange(new_student, req.body.MSSV);
        console.log('Dữ liệu đã được lưu trữ thành công');
        res.redirect("/");
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllStudents,
  createstudent,
  createView,
  index,
  create,
  store,
  findid,
  change,
  getAllClassApi,
  getStudentByMSSV,
  getAllKhoaApi
};
