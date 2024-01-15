/**
 * Форматирование даты 
 * 
 * @example 
 * dateFormat("2017-07-31T11:07:36.813000"); // 31 июля 2017 года в 11:07
 * 
 * @param {String} datetime - Исходная дата
 * @param {Boolean} withYear - Флаг, определяет отображается год или нет
 * @return {String} result;
 */
const dateFormat = (datetime, withYear = true) => {

    if (!datetime){
        return;
    }
    
    if (typeof datetime === 'object') datetime = datetime.toJSON();

    let datetimeParts	    = datetime.split('T', 2);
    let [year, month, day]  = datetimeParts[0].split('-');
    let [hour, minute]	    = datetimeParts[1].split(':');
    let result;
    
    let DATE = new Date(year, month - 1, day, hour, minute);
    //DATE.setTime( DATE.getTime() - DATE.getTimezoneOffset() * 60 * 1000 );
    
    let monthsNames = {
        0: 'января', 
        1: 'февраля', 
        2: 'март‎а', 
        3: 'апреля', 
        4: 'мая', 
        5: 'июня', 
        6: 'июля', 
        7: 'август‎а',
        8: 'сентября', 
        9: 'октября', 
        10: 'ноября', 
        11: 'декабря'
    };
    
    const leadingZero = (num) => `0${num}`.slice(-2);
    
    let time = leadingZero(DATE.getHours()) + ':' + leadingZero(DATE.getMinutes());

    if (withYear) {
        result = `${DATE.getDate()} ${monthsNames[DATE.getMonth()]} ${DATE.getFullYear()} года в ${time}`;
    }
    else {
        result = `${Number(DATE.getDate())} ${monthsNames[DATE.getMonth()]} в ${time}`;
    }
    
    return result;
};

export default dateFormat;