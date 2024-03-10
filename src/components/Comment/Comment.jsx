import React, {useState} from 'react'
import {fetchData, saveData} from "../../API/fetch.jsx";
import { makeGoodDate } from '../../others/makeGoodDate.jsx';
import FormComment from "../FormComment/FormComment.jsx"
import "./Comment.css"
import Form from '../Form/Form.jsx';

const Comment = (props) => {

    const userData = fetchData("user");
    const {id, path, profile, username, date, content, plus, rated, replies, degree, comments, setComments, handleRating, rateNote, userCode, ...rest} = props;

    const [reply, setReply] = useState(false)

    console.log(comments, plus)
    
    const handleNestedRating = (path, rateSign) => {
        console.log(1);
        console.log(path)
        const changeRating = (arr, path, keepsRepeating, id, iterator, rate) => {
            console.log(path)
            arr.map((obj, index) => {
                console.log(path)
                console.log(iterator);
                console.log(obj[id], path[iterator])
                console.log(Boolean(obj[id] == path[iterator]))
                if(obj[id] == path[iterator]){
                    console.log(`Found ${iterator+1} time${iterator+1 > 1 ? "s" : ""}`)
                    if(path.length-1 == iterator){
                        obj.rated = true; 
                        obj.rateNote = rate ? true : false;
                        rate ? ++obj.plus : --obj.plus;
                    }
                    else changeRating(obj[keepsRepeating], path, keepsRepeating, id, ++iterator, rate)
                }
                return obj;
            })
            return arr;
        } 
        let updatedComments = comments.slice();
        updatedComments = changeRating(updatedComments, path, "replies", "id", 0, rateSign);
        localStorage.setItem("comments", JSON.stringify(updatedComments));
        setComments(updatedComments);
        console.log(comments);
    }

    const handleNestedDelete = (path) => {
        const deleteComment = (arr, path, toThisArray, id, iterator) => {
            arr.map((obj, index) => {
              if(obj[id] == path[iterator]){
                if(path.length-1 == iterator){
                    return null;
                }
                else deleteComment(obj[toThisArray], path, toThisArray, id, ++iterator)
              }
              return obj;
            })
            return arr.filter((obj) => obj != null);
        } 

        let updatedComments = comments.slice();
        updatedComments = deleteComment(updatedComments, path, "replies", "id", 0);
        console.log(updatedComments)
        localStorage.setItem("comments", JSON.stringify(updatedComments))
        setComments(updatedComments);
    }

    const handleNestedReply = (path, theComment) => {
        const addValue = (arr, path, toThisArray, id, iterator, content) => {
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
                        rateNote: undefined,
                        userCode: userData.userCode,
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
        localStorage.setItem("comments", JSON.stringify(updatedComments))
        setComments(updatedComments);
        console.log(comments);
    }


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
            userCode={reply.userCode}
            rateNote={reply.rateNote}
        />
    });

    let ratingStyle;
    switch(rateNote){
        case true: 
            ratingStyle = {color: "green"};
            break;
        case false: 
            ratingStyle = {color: "red"};
            break;
        default:  
            ratingStyle = {color: "auto"};
            break;
    }

    let userButtons = <>
        <button
            className='comment-edit'
            onClick={Boolean(true)}
        >
            Edit
        </button>
        <button
            className='comment-delete'
            onClick={() => {handleNestedDelete(path)}}
        >
            Delete
        </button>
    </>

    return <div 
        className='comment-container'
        style={containerStyles}
    >
        <div className='comment'>
        {degree > 0 ? <div className='comment-pole'></div> : null}
            <div className='comment-rating'>
                { !rated ? <button
                        className='comment-plus'
                        onClick={() => {
                            !rated ? handleNestedRating(path, true) : null;
                        }
                    }
                    >
                      +
                    </button> : null
                }
                <div className='comment-counter' style={ratingStyle}>
                    {plus}
                </div>
                {   !rated ? <button
                        className='comment-minus'
                        onClick={() => {
                                !rated ? handleNestedRating(path, false) : null;
                            }
                        }
                    >
                        -
                    </button> : null
                }
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
                    {
                        userCode == userData.userCode ? userButtons : null
                    }
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
