import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PortfolioSidebarList = props => {


    const PortfolioList = props.data.map(item => {
        return (
        <div key={item.id} className='portfolio-item-wrapper'>
            <div className='portfolio-thumb-image'><img src={item.thumb_image_url} /></div>
            <div className='text-content'>
                <div className='title'>{item.name}</div>
                <a className='update-icon' onClick={() => props.handleEditClick(item)}>
                <FontAwesomeIcon icon="edit" />
                </a>
                <a className='delete-icon' onClick={() => props.handleDeleteClick(item)}>
                <FontAwesomeIcon icon="trash" />
                </a>
            </div>
        </div>);
    });



    return <div className='portfolio-sidebar-list-wrapper'>{PortfolioList}</div>;
};

export default PortfolioSidebarList;
