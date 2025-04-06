import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './switchedSection.scss';
import { faCirclePlus, faPerson } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListComponent = ({ list, title, link, addItem, handleDelete }) => {
  const navigate = useNavigate();
  
  const handleAddClick = (item) => {
    navigate(item);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const handleLink = (item, link) => {
    if(item?.difficulty){
      const trailName = encodeURIComponent(item?.name);
      const formattedTrailName = trailName.replace(/%20/g, '-');
      return `${link}/${formattedTrailName}`
    } else if (item?.author) {
        return `${link}/${item?._id}`;
    } else {
      return link
    }
  };

  return (
    <div className='profile-section-content'>
      <h4 className='p__section-title'>{title}</h4>
      <div className='section__add_item'>
        <FontAwesomeIcon
          icon={faCirclePlus}
          onClick={() => handleAddClick(addItem)}
        />
      </div>
      <div className='section__array'>
        {list?.map((item, index) => {
          return (
            <Link
              to={handleLink(item, link)}
              key={index}
              className='single-item'
            >
              {item?.creator && (
                <div className='section-content__array'>
                  <div className='left-section__array'>
                    <p className='item-title'>{item.title}</p>
                    <p className='item-desc'>{item.description}</p>
                  </div>
                  <div className='right-section__array'>
                    <p className='item-other-data date'>
                      {formatDate(item.date)}
                    </p>
                    <p className='item-other-data person-icon'>
                      {item.attendees.length}{' '}
                      <FontAwesomeIcon icon={faPerson} />
                    </p>
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ListComponent;
