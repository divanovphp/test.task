import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Footer = ({
    onAddRow
}) => {
    return (
        <div className='footer text-right'>
            <button onClick={onAddRow} type="button" className="btn btn-secondary">Add guest</button>
        </div>
    );
}

Footer.propTypes =  {
    onAddRow: PropTypes.func.isRequired
}

export default Footer;
