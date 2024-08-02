// import './home.css';
import { useEffect } from 'react';
import Layout from '../../components/layout/Layout.jsx';
import Blocks from '../../components/blocks/Blocks.jsx';
import WhatIs from '../../components/whatIs/whatIs.jsx';
import Start from '../../components/start/start.jsx';
import HowWork from '../../components/howWorks/howwork.jsx';
import Payouts from '../../components/payouts/payouts.jsx';
import Programs from '../../components/programs/program.jsx';
import TablePrice from '../../components/tablePrice/tablePrice.jsx';
import WorldTrader from '../../components/worldTrader/worldTrader.jsx';
import Prop from '../../components/propTrading/prop.jsx';
import Timeline from '../../components/timeline/timeline.jsx';
import Footer from '../../components/footer/footer.jsx';
const Template1Home = () => {
    
    return (
        <>
            <Layout />
            <Blocks />
            <WhatIs />
            <Start />
            <HowWork />
            <Payouts />
            <TablePrice/>
            {/* <Programs /> */}
            <WorldTrader />
            {/* <Prop /> */}
            <Timeline />
            <Footer />
        </>
    );
}
export default Template1Home;