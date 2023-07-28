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
 reuturnID(ClassID,index) {
    if(ClassID==1)
    {
        const id=`25${index+1}`
        const num = parseInt(id); // num sẽ có giá trị là NaN

        return  num
    }


}

}
module.exports = new functionUse()