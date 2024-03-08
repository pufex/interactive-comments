import React from 'react'
import "./FormComment.css"

const FormComment = (props) => {


    const {path, degree, handleNestedReply, setReply, ...rest} = props;

    const formSqueeze = {
        paddingLeft: `${degree+1*150}px`,
    }

    return <form 
        className='another-form'
        style={formSqueeze}
        onSubmit={(e) => {
                e.preventDefault();
                handleNestedReply(path, e.target[0].value);
                e.target[0].value = "";
                setReply(false);
            }
        }
    >  
        <h3 className='another-header'>
            What's your problem, man?
        </h3>
        <textarea
            className='another-textarea'
        ></textarea>
        <button
            type='submit'
            className='another-submit'
        >
            Send
        </button>
    </form>
}

export default FormComment
