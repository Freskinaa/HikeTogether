import React from 'react';
import './fieldsToComplete.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faVenusMars,
  fa5,
  faLocationDot,
  faIdBadge
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import AddProfileField from './AddProfileField';
import { useSelector } from 'react-redux';

const FieldsToComplete = ({fields}) => {
  const user = useSelector(state => state.auth.user)

  const fieldInfos = (field) => {
    switch(field) {
      case 'description': 
        return {
          title: 'Add description',
          type: 'textarea',
          label: 'Description',
          name: 'description',
          logo: <FontAwesomeIcon className='field-icon' icon={faIdBadge}/>
        }
      case 'age': 
        return {
          title: 'Add age',
          type: 'number',
          label: 'Age',
          name: 'age',
          logo: <FontAwesomeIcon className='field-icon' icon={fa5}/>
        }
      case 'gender': 
        return {
          title: 'Add gender',
          type: 'select',
          label: 'Gender',
          name: 'gender',
          logo: <FontAwesomeIcon className='field-icon' icon={faVenusMars}/>
        }
      case 'location': 
        return {
          title: 'Add location',
          type: 'text',
          label: 'Location',
          name: 'location',
          logo: <FontAwesomeIcon className='field-icon' icon={faLocationDot}/>
        }
      case 'phoneNumber': 
        return {
          title: 'Add phone number',
          type: 'text',
          label: 'Phone Number',
          name: 'phoneNumber',
          logo: <FontAwesomeIcon className='field-icon' icon={faPhone}/>
        }
      case 'socialMedia.facebook': 
        return {
          title: 'Share facebook',
          type: 'text',
          label: 'Facebook',
          name: 'socialMedia.facebook',
          logo: <FontAwesomeIcon className='field-icon' icon={faFacebookF}/>
        }
      case 'socialMedia.instagram': 
        return {
          title: 'Share instagram',
          type: 'text',
          label: 'Instagram',
          name: 'socialMedia.instragram',
          logo: <FontAwesomeIcon className='field-icon' icon={faInstagram}/>
        }
      case 'socialMedia.twitter': 
        return {
          title: 'Share twitter',
          type: 'text',
          label: 'Twitter',
          name: 'socialMedia.twitter',
          logo: <FontAwesomeIcon className='field-icon' icon={faTwitter}/>
        }
      default:
        return {
          title: '',
          type: '',
          label: '',
          name: '',
          logo: null
        };
    }
  };

  return (
    <div className='fields-to-complete-container'>
        <div className='fields-to-complete-content'>
        {fields?.map((field, index) => {
          const { title, logo, label, type, name } = fieldInfos(field);
          if (title && logo && label && type && name) {
            return (
              <AddProfileField 
                key={index}
                title={title}
                logo={logo}
                field={field}
                label={label}
                type={type}
                name={name}
              />
            );
          }
          return null; 
        })}
        </div>
    </div>
  )
}

export default FieldsToComplete;