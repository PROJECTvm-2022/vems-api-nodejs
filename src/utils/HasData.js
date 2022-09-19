/**
 *
 * @returns {function(*): boolean}
 * @constructor
 * @param name
 * @param values
 */
const HasData = (name, ...values) => (context) => {
    const { data } = context;

    const value = data[name];

    // console.log(value);

    return values.indexOf(value) >= 0;
};

export default HasData;
