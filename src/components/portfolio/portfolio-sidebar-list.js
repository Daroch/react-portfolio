import React from 'react';

const PortfolioSidebarList = props => {


    const PortfolioList = props.data.map(item => {
        return (
        <div key={item.id} className='portfolio-item-wrapper'>
           <div className='portfolio-thumb-image'><img src={item.thumb_image_url} /></div>
            <h1 className='title'>{item.name}</h1>
            <h2>{item.id}</h2>
            <button className='btn' onClick={() => props.handleDeleteClick(item)}>Delete</button>
        </div>);
    });



    return <div className='portfolio-sidebar-list-wrapper'>{PortfolioList}</div>;
};

export default PortfolioSidebarList;
