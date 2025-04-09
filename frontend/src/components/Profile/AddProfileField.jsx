import React, { useState } from 'react';
import Button from '../Shared/Button/Button';
import './addProfileField.scss';
import Modal from '../Shared/Modal/Modal';
import { Form } from "antd";
import InputField from '../Shared/InputField/InputField';
import SelectField from '../Shared/SelectField/SelectField';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const AddProfileField = ({ title, logo, label, type, name }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [userData, setUserData] = useState({...user});

    const handleCloseModal = () => {
        setIsAdding(false);
        form.resetFields();
    };

    const handleAddField = () => {
        setIsAdding(true);
    };

    const handleInputChange = (fieldName, value) => {
        setUserData(prevState => ({
            ...prevState,
            [fieldName]: value,
        }));
    };

    const handleSaveField = () => {

        // form.validateFields().then(values => {
        //     const interestsArray = values.interests ? values.interests.split(",").map(interest => interest.trim()) : [];
      
        //     const updatedFields = {
        //         ...values,
        //         interests: interestsArray,
        //         socialMedia: {
        //             facebook: values["socialMedia.facebook"],
        //             twitter: values["socialMedia.twitter"],
        //             instagram: values["socialMedia.instagram"],
        //         },
        //     };
      
        //     authService.updateUser(updatedFields, loggedUser.user._id)
        //         .then(res => {
        //             const updatedUser = res.data;
        //             dispatch(setLoggedUser({ ...loggedUser, user: updatedUser }));
        //             setUserData(updatedUser);
        //             message.success(`${label} added successfully`);
        //             handleCloseModal();
        //         })
        //         .catch(error => {
        //             console.error(error);
        //             message.error(`Failed to add ${label}`);
        //         });
        // });
    };

    const genderOptions = [
        { value: '', label: 'Select Gender' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ];

    return (
        <div className='add-profile-field'>
            <div className='field-content'>
                <h5 className='profile-field-title'>{title}</h5>
                {logo && <div className='profile-field-logo'>{logo}</div>}
                <Button
                    className="basic-btn green"
                    type="button"
                    onClick={() => handleAddField()}
                >
                    {title}
                </Button>
            </div>
            {isAdding &&
                <Modal onClose={() => handleCloseModal()}>
                    <h2 className='content-title'>{title}</h2>
                    <Form
                        form={form}
                        layout="vertical"
                        className="add-form"
                    >
                        <Form.Item
                            label={label}
                            name={name}
                        >
                            {(type === 'text' || type === 'number') &&
                                <InputField
                                    classname="text-input"
                                    type={type}
                                    label={label}
                                    value={userData[name]}
                                    min={0}
                                    max={100}
                                    onChange={(e) => handleInputChange(name, e.target.value)}
                                />
                            }
                            {type === 'select' &&
                                <SelectField
                                    classname="select-field"
                                    label={label}
                                    value={userData[name]}
                                    options={name === 'gender' && genderOptions}
                                    onChange={(value) => handleInputChange(name, value)}
                                />
                            }
                            {type === 'textarea' &&
                                <textarea
                                    className='text-input'
                                    rows={4}
                                    placeholder={label}
                                    value={userData[name]}
                                    onChange={(e) => handleInputChange(name, e.target.value)}
                                />
                            }
                        </Form.Item>
                        <Button
                            className="basic-btn green"
                            type="button"
                            onClick={() => handleSaveField()}
                        >
                            Add {label}
                        </Button>
                    </Form>
                </Modal>
            }
        </div>
    );
};

export default AddProfileField;
