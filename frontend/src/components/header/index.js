import React from 'react';
import PropTypes from 'prop-types';
import  './index.scss';

const Header = ({
    onSubmit,
    submitInProgress
}) => {
    return (
        <h3 className='header text-center'>
            <span>
                Please fill out the form
            </span>
            <div className='submit-button-wrapper'>
                {
                    submitInProgress && (
                        <button type="button" className="btn btn-info disabled" id="load" disabled="disabled"><i className="fa fa-spinner fa-spin "></i> Processing</button>
                    )
                }
                {
                    !submitInProgress && (
                        <button type="button" onClick={ onSubmit } className="btn btn-info">Submit</button>
                    )
                }
            </div>
        </h3>
    );
}

Header.propTypes =  {
    onSubmit: PropTypes.func.isRequired,
    submitInProgress: PropTypes.bool.isRequired
}

export default Header;
