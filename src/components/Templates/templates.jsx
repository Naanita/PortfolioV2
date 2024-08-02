import Card1 from '../Cards/card1';
import imgtemp from '../../assets/img/template1.png'

const Templates = () => { 
    return (
        <div className="container-fluid position-relative d-flex justify-content-center align-items-center bg-soft overflow-hidden flex-column" style={{ minHeight: '100vh' }}>
            <h1 className='text-dark display-1Plus2 pt-5 text-center mb-5'>Template</h1>
            <div className='container'>
                    <Card1
                        link='/template/1'
                        title='Fology'
                        img={imgtemp}
                        types={['HTML', 'CSS3', 'React', 'React frameworks', 'GSAP']}
                    />
                </div>
        </div>
    )
}
export default Templates;