/**
 * Получение цвета по номеру в списке. 
 * Без указания номера возвращается случайный цвет из списка
 * 
*/

import rand from './randomSeed';

const colors = [ 
    '#81C578', 
    '#FFC100',
    '#E67159',
    '#5ABFC0',
    '#E4AEDC',
    '#6CA6BA',
    '#F99C40',
    '#AC98D4',
    '#C19E97',
    '#F2A1A6',
    '#979643',
    '#E2A145',
    '#708BAF',
    '#C8E69B',
    '#64B9DF',
    '#A6798F',
    '#B39969',
    '#A6A080',
    '#E69083',
    '#C5BD73',
    '#4F9BB8',
    '#98C2C0',
    '#A3C299',
    '#81B977',
    '#CA7EC5',
    '#A7EEEE'
];
const colorsCount = colors.length;

/**
 * Возвращает цвет из списка
 * 
 * @param {Integet} number - Номер в списке
 * @return {String} color - Цвет
 */
const colorize = (id) => {
    let index;
    
    if (id === undefined) {
        index = randomInteger(0, colorsCount - 1);
    }
    else {
        //	index = number;
        //	if (number >= colorsCount - 1) {
        //	    index = number % colorsCount;
        //	}
        let gen = rand.create(id);
        index = gen(colorsCount);
    }

    return colors[index];
};

/**
 * Случайное число из диапазона
 * 
 * @param {Integet} min
 * @param {Integet} max
 * @return {Integet} 
 */
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

export default colorize;