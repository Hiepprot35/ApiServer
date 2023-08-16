class functionUse {
 reuturndate(datenow) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();

    // current minutes
    const minutes = now.getMinutes();
    
    // current seconds
    const seconds = now.getSeconds();
    // Định dạng ngày tháng năm theo định dạng YYYY-MM-DD
    const currentDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours}:${minutes}:${seconds}`;
    console.log(currentDate)
    return currentDate;
}
 reuturnID(KhoaID,ClassID,index) {
        let id;
        id=`SV${KhoaID}00${ClassID}00${index+1}`

        return  id
   

}

}
module.exports = new functionUse()