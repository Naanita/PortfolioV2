// import './home.css';
import { useEffect } from 'react';
import Layout from '../../components/layout/Layout.jsx';
import Blocks from '../../components/blocks/Blocks.jsx';
import WhatIs from '../../components/whatIs/whatIs.jsx';

const Template1Home = () => {
    
    return (
        <>
            <Layout />
            <Blocks />
            <WhatIs />
            <div className='bg-primary vh-100 position-relative z-4'>

            </div>
        </>
    );
}
export default Template1Home;