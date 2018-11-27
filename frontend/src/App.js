import React, { Component } from 'react';
import InputRow from './components/input-group';
import Header from './components/header';
import Footer from './components/footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from './config';

class App extends Component {
    state = {
        submitInProgress: false,
        showThankYouPage: false,
        inputGroups: [
            {
                'key': 'main',
                'isGuest': false,
                'inputs': {
                    'name': '',
                    'phoneNumber': ''
                },
                'inputErrors': {
                    'name': '',
                    'phoneNumber': '',
                }
            },
        ]
    };

    handleAddRow = () => {
        this.setState((state) => {
            const  inputGroups = state.inputGroups.slice(0);
            const newInput = {
                'key': (new Date()).getTime(),
                'isGuest': true,
                'inputs': {
                    'name': '',
                    'phoneNumber': ''
                },
                'inputErrors': {
                    'name': '',
                    'phoneNumber': '',
                }
            };
            inputGroups.push(newInput);
            return {
                inputGroups
            };
        });
    }

    prepareApiData = (inputs) => {
        const mainRecord = inputs.find((item) => {
            return item.key === 'main';
        });
        const guests = inputs.filter((item) => {
            return item.key !== 'main';
        }).map((item) => {
           return {
               name: item.inputs.name,
               phone: item.inputs.phoneNumber,
           }
        });
        return {
            'name': mainRecord.inputs.name,
            'phone': mainRecord.inputs.phoneNumber,
            guests
        };
    }

    handleSubmit = () => {
        let hasErrors = false;
        const inputGroups = this.state.inputGroups.map((item) => {
            const clonned = JSON.parse(JSON.stringify(item));
            clonned.inputErrors.name = '';
            clonned.inputErrors.phoneNumber = '';
            return clonned;
        });

        this.setState((state) => {
            return {
                submitInProgress: true,
                inputGroups
            };
        });

        const filtered = [];
        inputGroups.forEach((item) => {
            const clonned = JSON.parse(JSON.stringify(item));
            const { name, phoneNumber } = clonned.inputs;
            if(!name) {
                hasErrors = true;
                clonned.inputErrors.name = clonned.isGuest ? 'Select the guest name' : 'Select the visitor name';
            }
            if(!phoneNumber) {
                hasErrors = true;
                clonned.inputErrors.phoneNumber = 'Enter phone number';
            } else {
                if(!this.validatePhoneNumber(phoneNumber)) {
                    hasErrors = true;
                    clonned.inputErrors.phoneNumber = 'Invalid phone number';
                }
            }
            filtered.push(clonned);
        });

        if(hasErrors) {
            setTimeout(() => {
                this.setState({
                    submitInProgress: false,
                    inputGroups: filtered
                });
            }, 1500);
            return;
        } else {
            const apiData = this.prepareApiData(this.state.inputGroups);
            const endpoint = `${API_URL}/api/visitors`;
            axios.post(endpoint, apiData).then((response) => {
                setTimeout(() => {
                    this.setState({
                        submitInProgress: false,
                        showThankYouPage: true
                    });
                }, 1500);
            }).catch((error) => {
                setTimeout(() => {
                    this.setState({
                        submitInProgress: false
                    }, () => {
                        toast.error("Whoops, Something went wrong!");
                    });
                }, 1500);
            });
        }
    }


    handlePhoneNumberChange = (key, e) => {
        const { value } = e.target;
        this.setState((state) => {
            const inputGroups = state.inputGroups.map((group) => {
                const clonned = JSON.parse(JSON.stringify(group));
                if(clonned.key === key) {
                    clonned.inputs.phoneNumber = value;
                    clonned.inputErrors.phoneNumber = '';
                }
                return clonned;
            });
            return {
                inputGroups
            }
        });
    }

    validatePhoneNumber = (number) => {
        const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/img; //eslint-disable-line
        return regex.exec(number);
    }

    getPhoneNumber = (value) => {
        let phoneNumber = null;
        if(value.phone) {
            phoneNumber = value.phone;
        } else if(value.default_address && value.default_address.phone) {
            phoneNumber = value.default_address.phone;
        } else if(value.addresses && value.addresses.length) {
            value.addresses.forEach((address) => {
               if(!phoneNumber && address.phone) {
                    phoneNumber = address.phone;
               }
            });
        }

        return phoneNumber;
    }

    handleNameSelect = (payload) => {
        const { groupKey } = payload;
        const phoneNumber = this.getPhoneNumber(payload.selectedValue);
        const name = `${payload.selectedValue.first_name} ${payload.selectedValue.last_name}`;
        this.setState((state) => {
            const inputGroups = state.inputGroups.map((group) => {
                const clonned = JSON.parse(JSON.stringify(group));
                if(clonned.key === groupKey) {
                    if(!clonned.inputs.phoneNumber) {
                        clonned.inputs.phoneNumber = phoneNumber || '';
                    } else {
                        if(phoneNumber) {
                            clonned.inputs.phoneNumber = phoneNumber;
                        }
                    }
                    clonned.inputs.name = name;
                    clonned.inputErrors.name = '';
                }
                return clonned;
            });
            return {
                inputGroups
            }
        });
    }

    handleRemoveGroup = (group) => {
        this.setState((state) => {
            const inputGroups = state.inputGroups.slice(0).filter((value) => {
                return value.key !== group.key;
            });
            return {
                inputGroups
            };
        });
    }

    render() {
        const {
            inputGroups,
            submitInProgress,
            showThankYouPage,
        } = this.state;
        return (
            <div className="container d-flex justify-content-center">
                <ToastContainer />
                {
                    !showThankYouPage && (
                        <form className='event-form'>
                            <Header
                                onSubmit={ this.handleSubmit }
                                submitInProgress={ submitInProgress }
                            />
                            {
                                inputGroups.map((value, iterationKey) => {
                                    const { isGuest } = value;
                                    return (
                                        <div className='item' key={iterationKey}>
                                            <InputRow
                                                onRemoveGroup={ this.handleRemoveGroup }
                                                onNameSelect={ this.handleNameSelect }
                                                onPhoneNumberChange={ this.handlePhoneNumberChange }
                                                isGuest={ !!isGuest }
                                                group={ value }
                                            />
                                        </div>
                                    );
                                })
                            }
                            <Footer
                                onAddRow={ this.handleAddRow }
                            />
                        </form>
                    )
                }
                {
                    showThankYouPage && (
                        <h2 className='thank-you'>
                            Thank you, your form submitted :)
                        </h2>
                    )
                }
            </div>
        );
    }
}

export default App;
