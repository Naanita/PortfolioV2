import {useRef, useState} from 'react';
import './contact.css';
import linkedin from '../../assets/svg/linkedIn.svg';
import wp from '../../assets/svg/wp.svg';
import cv from '../../assets/svg/cv.svg';
import cvpdf from '../../assets/doc/CV.pdf';



const Contact = () => {
    const whatHappend = useRef(null);
    const formRef = useRef(null);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        };
        try {
            const response = await fetch('https://formspree.io/f/mkgwwlnn', options);
            if (response.ok) {
                whatHappend.current.textContent = 'Form successfully submitted! I will get back to you as soon as possible.';
                setIsSent(true);
                formRef.current.reset();
            } else {
                whatHappend.current.textContent = 'Oops! Something went wrong. Please try again.';
                setIsSent(false);
            }
        } catch (error) {
            whatHappend.current.textContent = 'Oops! Something went wrong. Please try again.';
            setIsSent(false);
        }
    };
    return (
        <>
            <div className="container-fluid position-relative d-flex justify-content-center align-items-center flex-column overflow-hidden bg-soft pb-5" style={{ minHeight: '100vh'}}>
                <div className="border-animated animated-true" style={{ top: "93%", left: "0%" }}></div>
                <div className="border-animated animated-true" style={{ top: "98%", left: "0%", }}></div>
                <div className="border-animated animated-true" style={{ top: "70%", left: "45%", transform:'rotate(90deg)', scale: "-1" }}></div>


                <h1 className="pt-5 text-dark display-1Plus2 line-height-1  text-center">Contact</h1>
                <p className="fs-5 w-xl-50 text-dark-400 fw-light line-height-1  text-center">Let me put my experience and knowledge at your service to empower your team and develop a web application that makes a difference.</p>
                <div className='container d-flex justify-content-center mt-5'>
                    <div className='row g-4 w-100'>
                        <div className='col-xl-6 col-md-6 col-sm-12'>
                            <div className='overflow-hidden h-100' style={{borderRadius:"12px"}}>
                                <iframe  className='h-100 w-100' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254508.39472667477!2d-74.27261661242908!3d4.648620627506904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2zQm9nb3TDoSwgQm9nb3Rh!5e0!3m2!1sen!2sco!4v1719521532920!5m2!1sen!2sco" width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                        <div className='col-xl-6 col-md-6 col-sm-12  d-flex flex-column justify-content-center'>
                            <h6 className='text-dark line-height-1 text-start'>Social Media and CV</h6>
                            <div className='d-flex align-items-center mb-2'>
                                <a className="position-relative tooltip-container" href='https://www.linkedin.com/in/sebastiangrajalesm/' target='_blank'>
                                    <span className="tooltip">LinkedIn</span>
                                    <img src={linkedin} alt='LinkedIn' className="skillsbyexp" />
                                </a>
                                <a className="position-relative tooltip-container" href='https://api.whatsapp.com/send/?phone=573229153217&text&type=phone_number&app_absent=0' target='_blank'>
                                    <span className="tooltip">WhatsApp</span>
                                    <img src={wp} alt='WhatsApp' className="skillsbyexp" />
                                </a>
                                <a className="position-relative tooltip-container" href={cvpdf} download>
                                    <span className="tooltip">CV</span>
                                    <img src={cv} alt='CV' className="skillsbyexp" />
                                </a>
                            </div>
                            <form ref={formRef} className='row w-100 g-4' onSubmit={handleSubmit}>
                                <h6 className='text-dark line-height-1 text-start'>Or do it directly here:</h6>
                                <div className='col-xl-6 col-md-6 col-sm-12'>
                                    <label htmlFor="email" className='m-0 text-start text-dark fColvetica required'>Email</label>
                                    <div className='position-relative'>
                                        <input
                                            autoComplete="off"
                                            className='input-cus'
                                            placeholder="Type your email"
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-xl-6 col-md-6 col-sm-12'>
                                    <label htmlFor="name" className='m-0 text-start text-dark fColvetica required'>Name</label>
                                    <div className='position-relative'>
                                        <input
                                            autoComplete="off"
                                            className='input-cus'
                                            placeholder="Type your Name"
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-xl-12 col-md-12 col-sm-12'>
                                    <label htmlFor="message" className='m-0 text-start text-dark fColvetica required'>Message</label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        placeholder="Type your message here"
                                        className='text-area-cus'
                                        required
                                    ></textarea>
                                    <div ref={whatHappend} className={`${isSent ? 'text-check' : 'text-x'} fs-6 text-center mt-2`}></div>
                                    <button type='submit' className='btnAb hoverEffect-1 text-center w-100 d-block mt-2 border-0 pink-hover'>
                                        <span>
                                            <div className="group-hover">Send</div>
                                            <div className="group-hover">Send</div>
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Contact;