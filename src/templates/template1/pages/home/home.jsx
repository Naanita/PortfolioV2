// import './home.css';
import { useEffect } from 'react';
import Layout from '../../components/layout/Layout.jsx';
import Blocks from '../../components/blocks/Blocks.jsx';
import WhatIs from '../../components/whatIs/whatIs.jsx';
import Start from '../../components/start/start.jsx';
import HowWork from '../../components/howWorks/howwork.jsx';
import Payouts from '../../components/payouts/payouts.jsx';

const Template1Home = () => {
    
    return (
        <>
            <Layout />
            <Blocks />
            <WhatIs />
            <Start />
            <HowWork />
            <Payouts />
        </>
    );
}
export default Template1Home;