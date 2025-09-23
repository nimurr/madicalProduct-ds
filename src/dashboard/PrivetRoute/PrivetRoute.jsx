import React from 'react';

const PrivetRoute = ({ children }) => {

    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.user?.role !== 'masterAdmin') {
        return;
    }

    return children
}

export default PrivetRoute;
