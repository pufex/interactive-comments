import React, {useRef} from 'react'
import "./Hover.css"

const Hover = (props) => {
    
    const {hoverData, ...rest} = props;
    const hoverRef = useRef(null);


    let hoverStyles = {
        left: `${hoverData.x}px`,
        top: `${hoverData.y}px`,
    }

    if(!hoverData.display) return <></>
    else return <div 
                    ref={hoverRef}
                    className='hover'
                    style={hoverStyles}
                >
        <span className='hover-message'>
            {hoverData.message}
        </span>
        {/* <span className='hover-triangle'></span> */}
    </div>
}

export default Hover
