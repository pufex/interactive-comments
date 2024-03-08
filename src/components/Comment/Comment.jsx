import React, {useState} from 'react'
import {fetchData, saveData} from "../../API/fetch.jsx";
import { makeGoodDate } from '../../others/makeGoodDate.jsx';
import FormComment from "../FormComment/FormComment.jsx"
import "./Comment.css"
import Form from '../Form/Form.jsx';

const Comment = (props) => {

    const userData = fetchData("user");
    const {id, path, profile, username, date, content, plus, rated, replies, degree, comments, setComments, handleRating, ...rest} = props;

    const [reply, setReply] = useState(false)

    console.log(comments)
    
    const handleNestedReply = (path, theComment) => {
        const addValue = (arr, path, toThisArray, id, iterator, content) => {
            console.log(content)
            arr.map((obj, index) => {
              if(obj[id] == path[iterator]){
                if(path.length-1 == iterator){
                    const newComment = {
                        id: obj[toThisArray].length,
                        username: userData.username,
                        date: makeGoodDate(),
                        profile: userData.profile,
                        content: `${content}{&end}`,
                        plus: 0,
                        rated: false,
                        replies: [],
                    }
                    obj[toThisArray].push(newComment); 
                }
                else addValue(obj[toThisArray], path, toThisArray, id, ++iterator, content)
              }
              return obj;
            })
            return arr;
        } 

        let updatedComments = comments;
        updatedComments = addValue(updatedComments, path, "replies", "id", 0, theComment);
        setComments(updatedComments);
    }

    // const handleRating = (id, rating) => {
    //     let allComments = comments;
    //     if(degree == 0){
        //         allComments[id].plus += rating;
    //         allComments[id].rated = true;
    //         setComments(allComments);
    //         return;
    //     }
    //     allComments = allComments[id].replies;
    //     for(i = 0; i < degree; i++){
    //         allComments = allComments
    //     }
    
    
    // }


    let containerStyles = degree == 0 ? null : {paddingLeft: `${150}px`} 

    const seperateStrings = (string = "", seperator = "") => {
        let arr = [], j = 0;
        while(string.includes(seperator)){
          let index = string.indexOf(seperator);
          const str = string.slice(0, index);
          string = string.slice(index+seperator.length, string.length);
          arr.push(str);
          j++;
        }
        return arr;
      }

    let commentContent = seperateStrings(content, "{&end}");
    commentContent = commentContent.map((paragraph, index) => {
        return <span key={index}>
            {paragraph}
        </span>
    });

    let replyList = replies?.map((reply,index) => {
        console.log(reply.content)
        return <Comment 
            id={index}
            key={index}
            path={path.concat([index])}
            profile={reply.profile}
            username={reply.username}
            date={reply.date}
            content={reply.content}
            plus={reply.plus}
            rated={reply.rated}
            replies={reply.replies}
            degree={degree+1}
            comments={comments}
            setComments={setComments}
            handleRating={handleRating}
        />
    });


    return <div 
        className='comment-container'
        style={containerStyles}
    >
        <div className='comment'>
        {degree > 0 ? <div className='comment-pole'></div> : null}
            <div className='comment-rating'>
                <button
                    className='comment-plus'
                    onClick={() => {
                        Boolean(true)
                    }
                }
                >
                    +
                </button>
                <div className='comment-counter'>
                    {plus}
                </div>
                <button
                    className='comment-minus'
                    onClick={() => {
                            Boolean(false);
                        }
                    }
                >
                    -
                </button>
            </div>
            <div className='comment-right'>
                <div className='comment-info'>
                    <img src={profile} alt="Profile picture" className='profile-picture'/>
                    <div className='comment-author'>
                        <h1 className='comment-username'>
                            {username}
                        </h1>
                        <span className='comment-date'>
                            {date}
                        </span>
                    </div>
                </div>
                <div className='comment-content'>
                    {commentContent}
                </div>
                <div className='comment-buttons'>
                    <button 
                        className={reply ? "comment-reply active" : "comment-reply"}
                        onClick={() => {
                                setReply(!reply);
                            }
                        }

                    >
                        {reply ? "hide" : "reply"}
                    </button>
                </div>
            </div>
        </div>
        <div className='comment-replies' style={replies.length == 0 ? {padding: "0",} : null}>
            {reply ? <FormComment  
                    path={path}
                    degree={degree}
                    handleNestedReply={handleNestedReply}
                    setReply={setReply}
                /> : null
            }
            {replyList}
        </div>
    </div>
}

export default Comment
