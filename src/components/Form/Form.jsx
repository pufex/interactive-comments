import React, {useState} from 'react'
import { fetchData } from '../../API/fetch';
import "./Form.css"

const Form = (props) => {

    const {handleNewComment, setFormVisibility, ...rest} = props;
    const [content, setContent] = useState("");
    return <form 
        className='form'
        onSubmit={(e) => {
                e.preventDefault();
                console.dir(e.target[0].value);
                handleNewComment(e.target[0].value);
                
            }
        }
    >
        <h4 className='form-title'>
            What's on your mind, sicko?
        </h4>
        <textarea 
            className='form-content'
            required
            autoComplete='off'
            placeholder='Your comment goes here...' 
            value={content} 
            onClick={(e) => {Boolean(true)}}
            onChange={(e)=> {setContent(e.target.value)}}
        ></textarea>
        <div className='form-buttons'>
            <button
                className='cancel'
                onClick={() => {
                        setFormVisibility(false)
                    }
                }
            >
                Cancel
            </button>
            <button type='submit' className="send">
                Send
            </button>
        </div>
    </form>
}

export default Form
