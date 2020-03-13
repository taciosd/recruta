
export default class DateUtil {

    getCurrentDate() {
        return new Date();
    };
    
    getCurrentDateStr(printHms) {
        var tempDate = new Date();
        const year = tempDate.getFullYear();
        const month = (tempDate.getMonth()+1);
        let date = tempDate.getDate() + '/' + month + '/' + year;
        if (printHms) {
            date += tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        }
    
        return date;
    }
}