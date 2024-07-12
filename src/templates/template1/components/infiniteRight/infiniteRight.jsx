import React from 'react';
import "./infiniteRight.css";

const InfiniteRight = (props) => {
    return (
        <div className="wrapper" style={{ height: "50px" }}>
            {React.Children.map(props.children, (child, index) =>
                React.cloneElement(child, { className: `${child.props.className} itemRight item${index + 1}` })
            )}
        </div>
    );
};
export default InfiniteRight;