import React from 'react';
import preloader from '../../../assets/img/loading.gif';

let Preloader = (props) => {
    return <div className='preloader'><img src={preloader} /> </div>
}

export default Preloader