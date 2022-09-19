const roleNames = {
    1: 'user',
    2: 'admin',
    3: 'sub-admin',
};

/**
 *
 * @param roles {"user"|"admin"|"sub-admin"}
 * @returns {function(...[*]=)}
 * @constructor
 */
const IsUser = (...roles) => (context) => {
    const { params } = context;

    //if (typeof params.provider === 'undefined') return context;

    if (!roles.length) return true;

    const { user } = params;

    if (!user) return context;

    if (!user.role || user.role === 0) return false;

    const role = roleNames[user.role];

    return roles.indexOf(role) >= 0;
};

export default IsUser;
