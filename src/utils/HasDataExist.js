/**
 *
 * @returns {function(*): boolean}
 * @constructor
 * @param name
 */
const HasDataExist = (name) => (context) => {
    const { data } = context;

    const value = data[name];

    return typeof value !== 'undefined';
};

export default HasDataExist;
