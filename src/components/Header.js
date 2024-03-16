import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <h1><FontAwesomeIcon icon={faCloudSun} /> Weather App</h1>
    )
}

export default Header
