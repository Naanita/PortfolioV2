import React from 'react';

const InfiniteLeft = (props) => {
    return (
        <div className="wrapper" style={{height:"50px"}}>
            {React.Children.map(props.children, (child, index) =>
                React.cloneElement(child, { className: `${child.props.className} itemLeft item${index + 1}` })
            )}
        </div>
    );
};
export default InfiniteLeft;