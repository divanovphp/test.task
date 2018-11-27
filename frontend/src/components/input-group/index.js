import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import classnames from 'classnames';
import AsyncSelect from "react-select/lib/Async";
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import { API_URL } from '../../config';



const InputRow = ({
    onRemoveGroup,
    onNameSelect,
    onPhoneNumberChange,
    isGuest,
    group
}) => {
    const promiseOptions = (inputValue) => {
        const endpoint = `${API_URL}/api/customers`;
        const filterOptions = options => {
            return options.map(option => {
                return {
                    value: option,
                    label: `${option.first_name} ${option.last_name}`,
                    color: '#00B8D9',
                    isFixed: true,
                }
            })
        };
        return new Promise((resolve, reject) => {
            axios.get(endpoint, {params: {
                'search': inputValue
            }}).then((response) => {
                const { data } = response;
                resolve(filterOptions(data));
            }).catch((error) => {
                reject(error);
            });
        });
    }


    const phoneInputStyles = classnames({
        'form-control': true,
        'is-invalid': group.inputErrors.phoneNumber
    });

    return (
        <div className='selection-row'>
            <ReactTooltip
                id='guest-delete-tooltip'
                effect='solid'
            />
            <div className='row'>
                <div className="col-sm-10">
                <div className="form-group row">
                        <label htmlFor={`input-name-${group.key}`} className={
                            classnames({
                                'col-sm-2 col-form-label': true,
                                'text-danger': group.inputErrors.name,
                            })
                        }>Name</label>
                        <div className="col-sm-10">
                            <AsyncSelect
                                id={`input-name-${group.key}`}
                                loadOptions={ promiseOptions }
                                onChange={ (selectedValue) => {
                                    const payload = {
                                        groupKey: group.key,
                                        selectedValue: selectedValue.value
                                    }
                                    onNameSelect(payload)
                                } }
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        neutral20: group.inputErrors.name ? 'red' : 'rgb(204, 204, 204)',
                                    },
                                })}
                                placeholder={ isGuest ? 'Enter guest name' : 'Enter visitor name' }
                            />
                            <small className="text-danger">
                                { group.inputErrors.name }
                            </small>
                        </div>
                    </div>
                    <div className="form-group row has-error">
                        <label htmlFor={`input-phone-${group.key}`} className={
                            classnames({
                                'col-sm-2 col-form-label': true,
                                'text-danger': group.inputErrors.phoneNumber,
                            })
                        }>Phone</label>
                        <div className="col-sm-10">
                            <input type="text" className={ phoneInputStyles } id={`input-phone-${group.key}`} placeholder="Enter phone number" value={group.inputs.phoneNumber} onChange={onPhoneNumberChange.bind(this, group.key)} />
                            <small className="text-danger">
                                { group.inputErrors.phoneNumber }
                            </small>
                        </div>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className='close-wrapper'>
                        {
                            isGuest && (
                                <button
                                    data-for='guest-delete-tooltip'
                                    data-tip='Remove guest'
                                    onClick={ (e) => {
                                        e.preventDefault();
                                        onRemoveGroup(group);

                                    } }
                                >
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

InputRow.propTypes = {
    onRemoveGroup: PropTypes.func,
    isGuest: PropTypes.bool,
    group: PropTypes.object.isRequired,
    onNameSelect: PropTypes.func.isRequired,
    onPhoneNumberChange: PropTypes.func.isRequired
};
InputRow.defaultProps = {
    onRemoveGroup: () => {},
    isGuest: false,
};

export default InputRow;
