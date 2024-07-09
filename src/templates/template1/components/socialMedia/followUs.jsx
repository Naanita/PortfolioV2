import './social.css';


const socialMedia = [
    {
        id: 1,
        name: "facebook",
        url: "https://www.facebook.com/",
        icon: '<i class="fa-brands fa-facebook-f"></i>',
    },
    {
        id: 2,
        name: "twitter",
        url: "https:'//twitter.com/",
        icon: '<i class="fa-brands fa-x-twitter"></i>',
    },
    {
        id: 3,
        name: "instagram",
        url: "https://www.instagram.com/",
        icon: '<i class="fa-brands fa-instagram"></i>',
    },
    {
        id: 4,
        name: "linkedin",
        url: "https://www.linkedin.com/",
        icon: '<i class="fa-brands fa-linkedin-in"></i>',
    },
    {
        id: 5,
        name: "youtube",
        url: "https://www.youtube.com/",
        icon: '<i class="fa-brands fa-youtube"></i>',
    }
]

const FollowUS = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <p className="fw-bold text-white me-2 m-0 bouncecale">Follow Us:</p>
            <div className="d-flex justify-content-between flex-wrap">
                {socialMedia.map((item, index) => (
                    <a key={item.id} href={item.url} target="_blank" className={`${index > 0 ? 'ms-1' : ''} icons bouncecale`} rel="noreferrer" dangerouslySetInnerHTML={{ __html: item.icon }}>
                    </a>
                ))}
            </div>
        </div>
    )
 }
export default FollowUS;