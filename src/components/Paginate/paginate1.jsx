import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ExperiencePagination = ({ exp }) => {
    const { id } = useParams();
    const [selectedExperience, setSelectedExperience] = useState(null);

    useEffect(() => {
        const experience = exp.find(item => item.id.toString() === id);
        setSelectedExperience(experience);
    }, [id, exp]);

    const currentIndex = exp.findIndex(item => item.id.toString() === id);
    const prevId = currentIndex > 0 ? exp[currentIndex - 1].id : null;
    const nextId = currentIndex < exp.length - 1 ? exp[currentIndex + 1].id : null;

    return (
        <div className={`row g-4 w-100 my-4 ${!prevId ? 'justify-content-end' : ''}`}>
            {prevId && (
                <div className="col-6">
                    <Link to={`/experience/${prevId}`} className='btnAb hoverEffect-1 text-center w-100 d-block'>
                        <span>
                            <div className="group-hover fs-2">Previous</div>
                            <div className="group-hover fs-2">Previous</div>
                        </span>
                    </Link>
                </div>
            )}
            {nextId && (
                <div className="col-6">
                    <Link to={`/experience/${nextId}`} className='btnAb hoverEffect-1 text-center w-100 d-block'>
                        <span>
                            <div className="group-hover fs-2">Next</div>
                            <div className="group-hover fs-2">Next</div>
                        </span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ExperiencePagination;