import React from 'react';
import styles from './style.less';

export const Space = ({children,size = [2,10]}) => {


    const renderChild = children?.map((child,i)=>{
        return (
            <div key={i} style={{padding: `${size[0]}px ${size[1]}px`,}}>
                {child}
            </div>
        )
    })

    return (
        <div className={styles.space}>
            {renderChild}
        </div>
    )
}