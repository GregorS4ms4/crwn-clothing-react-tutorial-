import React from "react";
import './collection-preview.styles.scss';
import CollectionItem from "../collection-item/collection-item.component";

const CollectionPreviw=({title,items})=>(
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {
                items.filter((item,idx)=>idx<4).map(({id, ...otherCollectionProps})=>(
                <CollectionItem key={id} {...otherCollectionProps} /> 
                
                ))}
        </div>

    </div>
);
export default CollectionPreviw