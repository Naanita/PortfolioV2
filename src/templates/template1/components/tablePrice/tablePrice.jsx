import './table.css';
import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const dataTable = [
    {
        id: 1,
        accountSize: '$5.000',
        price: 25,
        profitTarget: '5% / 5% / 5% / 5%',
        maxDrawdown: '10%',
        dailyDrawdown: '5%',
        leverage: 'Up to 1:200 / RFC 1:100',
        minimumTrade: '4',
        maximumDays: 'Unlimited',
        profitSplit: '80% / 90%',
        refundOfFees: '200%',
        MaximumFunding:'10.000'
    },
    {
        id: 2,
        accountSize: '$10.000',
        price: 25,
        profitTarget: '5% / 5% / 5% / 5%',
        maxDrawdown: '10%',
        dailyDrawdown: '5%',
        leverage: 'Up to 1:200 / RFC 1:100',
        minimumTrade: '4',
        maximumDays: 'Unlimited',
        profitSplit: '80% / 90%',
        refundOfFees: '200%',
        MaximumFunding: '20.000'
    },
    {
        id: 3,
        accountSize: '$20.000',
        price: 25,
        profitTarget: '5% / 5% / 5% / 5%',
        maxDrawdown: '10%',
        dailyDrawdown: '5%',
        leverage: 'Up to 1:200 / RFC 1:100',
        minimumTrade: '4',
        maximumDays: 'Unlimited',
        profitSplit: '80% / 90%',
        refundOfFees: '200%',
        MaximumFunding: '30.000'
    },
    {
        id: 4,
        accountSize: '$40.000',
        price: 25,
        profitTarget: '5% / 5% / 5% / 5%',
        maxDrawdown: '10%',
        dailyDrawdown: '5%',
        leverage: 'Up to 1:200 / RFC 1:100',
        minimumTrade: '4',
        maximumDays: 'Unlimited',
        profitSplit: '80% / 90%',
        refundOfFees: '200%',
        MaximumFunding: '40.000'
    }
];


const TablePrice = () => {

    const titleref = useRef(null);
    const descriptionref = useRef(null);
    const mainContainer = useRef(null);
    const tableRef = useRef(null);  


    useEffect(() => {
        const splitTitle1 = new SplitType(titleref.current, { type: "chars, words, lines" });
        const splitTitle2 = new SplitType(descriptionref.current, { type: "chars, words, lines" });



        gsap.from(splitTitle2.lines, {
            scrollTrigger: {
                trigger: mainContainer.current,
                start: "top center",
                end: "bottom top",
                toggleActions: "play none none none",
            },
            opacity: 0,
            y: 80,
            stagger: .03,
        },)

        gsap.from(splitTitle1.chars, {
            scrollTrigger: {
                trigger: mainContainer.current,
                start: "top center",
                end: "bottom top",
                toggleActions: "play none none none",
            },
            opacity: 0,
            y: 80,
            rotateX: 90,
            stagger: .03,
        })

        gsap.from(tableRef.current, {
            scrollTrigger: {
                trigger: mainContainer.current,
                start: "top center",
                end: "bottom top",
                toggleActions: "play none none none",
            },
            scale: 0,
            duration: 1,
            ease: "back",
        })
    }, []);


    return(
        <div className="min-vh-100 bg-temp1-1 position-relative z-4 pt-5" ref={mainContainer} style={{paddingBottom:"20rem"}}>
            <div className="border-animatedRounded animated-true" style={{ height: '900px', width: "900px",top:"5%", left: '50%', transform: "translateX(-50%)" }}>
                <div className='blackspace'></div>
            </div>
            <div className="container-fluid">
                <div className='inset container bordertableCus2 vh-100 position-absolute'></div>
                <div className='container-fluid bordertableCus p-0'>
                    <div className="tableCardTitle container" style={{ height: "300px" }}>
                        <div className='pointWhite topLess1 endLess0-2 position-absolute'></div>
                        <div className='pointWhite bottomLess1 endLess0-2 position-absolute'></div>
                        <div className='pointWhite topLess1 startLess0-2 position-absolute'></div>
                        <div className='pointWhite bottomLess1 startLess0-2 position-absolute'></div>
                        <h1 className="display-1 line-height-1 text-white m-0 text-center" style={{ paddingTop: "3rem" }} ref={titleref}>Best prices in prop industry!</h1>
                        <p className="fs-5 text-white-800-2 text-center" ref={descriptionref}>Choose your training program and account size.</p>
                        <ul class="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
                            <div className='navIntercont'>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Copper</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Bronze</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Silver</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#pills-disabled" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false">Diamond</button>
                            </li>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className='container-fluid px-xl-13' ref={tableRef}>
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                            <div className='table-responsive-md borderTable overflow-hidden px-4 mt-5 bg-table'>
                                <table className='table w-100 position-relative z-1 bg-transparentAll table-borderless border-columns m-0 bg-table'>
                                    <tbody className=''>
                                        <tr>
                                            <th className='text-white pt-5'>
                                                <h4>
                                                Account Size
                                                </h4>
                                            </th>
                                            {dataTable.map((data) => (
                                                <td className='text-white text-center pt-5' key={`accountSize-${data.id}`}>
                                                    <h6>Virtual capital size</h6>
                                                    <h4>{data.accountSize}</h4>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <th className='py-4'></th>
                                            {dataTable.map((data) => (
                                                <td className='py-4' key={`price-${data.id}`}>
                                                    <div className='btn-table'>
                                                    Buy for {data.price}$
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <th className='text-white'>
                                                <h4>Profit Target</h4>
                                            </th>
                                            {dataTable.map((data) => (
                                                <td className='contentTableP' key={`profitTarget-${data.id}`}>{data.profitTarget}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <th className='text-white'>
                                                <h4>Max Drawdown</h4>
                                            </th>
                                            {dataTable.map((data) => (
                                                <td className='contentTableP' key={`maxDrawdown-${data.id}`}>{data.maxDrawdown}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <th className='text-white'>
                                                <h4>Daily Drawdown</h4>
                                            </th>
                                            {dataTable.map((data) => (
                                                <td className='contentTableP' key={`dailyDrawdown-${data.id}`}>{data.dailyDrawdown}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <th className='text-white'>
                                                <h4>Leverage</h4>
                                            </th>
                                            {dataTable.map((data) => (
                                                <td className='contentTableP' key={`leverage-${data.id}`}>{data.leverage}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <th className='text-white'>
                                                <h4>Minimum Trade</h4>
                                            </th>
                                            {dataTable.map((data) => (
                                                <td className='contentTableP' key={`minimumTrade-${data.id}`}>{data.minimumTrade}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <th className='text-white'>
                                                <h4>Maximum Days</h4>
                                            </th>
                                            {dataTable.map((data) => (
                                                <td className='contentTableP' key={`maximumDays-${data.id}`}>{data.maximumDays}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <th className='text-white'>
                                                <h4>Profit Split</h4>
                                            </th>
                                            {dataTable.map((data) => (
                                                <td className='contentTableP' key={`profitSplit-${data.id}`}>{data.profitSplit}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <th className='text-white'>
                                                <h4>Refund Of Fees</h4>
                                            </th>
                                            {dataTable.map((data) => (
                                                <td className='contentTableP' key={`refundOfFees-${data.id}`}>{data.refundOfFees}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <th className='text-white'>
                                                <h4>Maximum Funding</h4>
                                            </th>
                                            {dataTable.map((data) => (
                                                <td className='contentTableP' key={`MaximumFunding-${data.id}`}>${data.MaximumFunding}</td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

 }
export default TablePrice;