import { useState, useEffect } from 'react'
import {saveData} from "./API/fetch.jsx"
import { makeGoodDate } from './others/makeGoodDate.jsx'
import Nav from "./components/Nav/Nav"
import Form from "./components/Form/Form"
import Comment from "./components/Comment/Comment"
import Hover from "./components/Hover/Hover"
import './App.css'



let user = {
  username: "Andrzej Morozowski",
  profile: "/images/profile-picture-mine.jpg",
  userCode: "UE21ruSC",
}

saveData("user", user);

let data = [
  {
    id: 0,
    username: "Adrian Rozenek",
    date: "18:33, 23rd May 2023",
    profile: "/images/profile-picture-0.jpg",
    content: "I personally think that your opinion is wrong. Here's why:{&end}First of all, your a bad person. You abuse people, making them believe that you're this mild person, but in reality you're a disgusting monster.{&end}Secondly, I hate you. You should commit a suicide, NOW!{&end}Lastly, don't starve yourself to death. Just an opinion; if you die, you're not gonna suffer any longer, boy.{&end}That's it.{&end}",
    plus: -7,
    rated: false,
    rateNote: undefined,
    userCode: "tJyqQOk6",
    replies: [
      {
        id: 0,
        username: "Mihael Gorbaczow",
        date: "18:39, 23rd May 2023",
        profile: "/images/profile-picture-1.jpg",
        content: "Why are you so hateful, Adrian? There is no need to be so vile...{&end}",
        plus: 8,
        rated: false,
        rateNote: undefined,
        userCode: "de9w9b4k",
        replies: [],
      },
      {
        id: 1,
        username: "Adrian Rozenek",
        date: "18:40, 23rd May 2023",
        profile: "/images/profile-picture-0.jpg",
        content: "You're so clueless, aren't you, Mike?? You stupid ni-...{&end}",
        plus: -3,
        rated: false,
        rateNote: undefined,
        userCode: "tJyqQOk6",
        replies: [],
      },
    ]
  },
  {
    id: 1,
    username: "Błażej Mickiewicz",
    date: "19:02, 23rd May 2023",
    profile: "/images/profile-picture-2.jpg",
    content: "Yo, is it just me, or is this madafaker making ain't no sense, nigga? You're wild mah boy...{&end}",
    plus: 6,
    rated: false,
    rateNote: undefined,
    userCode: "bT84gvar",
    replies: [
      {
        id: 0,
        username: "Piotr Marciniak",
        date: "19:23, 23rd May 2023",
        profile: "/images/profile-picture-3.jpg",
        content: "Not just you, this post is just 2 paragraphs of random gibberish... And oddly enough, some people got triggered.{&end}",
        plus: 2,
        rated: false,
        rateNote: undefined,
        userCode: "bNBGyKUb",
        replies: [],
      },
      {
        id: 1,
        username: "Adrian Rozenek",
        date: "19:30, 23rd May 2023",
        profile: "/images/profile-picture-0.jpg",
        content: "Just you, buddy. And hey, don't use the n-word, that's racist.{&end}",
        plus: -1,
        rated: false,
        rateNote: undefined,
        userCode: "tJyqQOk6",
        replies: [],
      }
    ]
  }
]

// localStorage.setItem("comments", JSON.stringify(data));



function App() {
  
  const [hoverData, setHover] = useState({display: false,message: "",x: 0,y: 0,})
  const [formVisibility, setFormVisibility] = useState(false);
  const [mainLikes, setLikes] = useState([false, 4, undefined])
  const [comments, setComments] = useState(data);

  const handleNewComment = (content) => {
    let newComments = {
      id: 0,
      username: user.username,
      date: makeGoodDate(),
      profile: user.profile,
      content: `${content}{&end}`,
      plus: 0,
      rated: false,
      rateNote: undefined,
      userCode: user.userCode,
      replies: [],
    }
    setComments([...comments, newComments])
  } 

  const handleRating = () => {
    Boolean(true);
  }

  let commentList = comments.map((comment, index) => {
    return <Comment 
      id={index}
      path={[index]}
      key={index}
      profile={comment.profile}
      username={comment.username}
      date={comment.date}
      content={comment.content}
      plus={comment.plus}
      rated={comment.rated}
      replies={comment.replies}
      degree={0}
      comments={comments}
      setComments={setComments}
      handleRating={handleRating}
      rateNote={comment.rateNote}
      userCode={comment.userCode}
    />
  })

  return <>
    <Nav />
    <Hover 
      hoverData={hoverData}
    />
    <main className='post'>
      <div className='post-container'>
        <div className={mainLikes[0] ? "plus-panel plus-panel--inactive" : "plus-panel"}>
          <button 
            className='add-plus'
            onClick={() => {mainLikes[0] ? null : setLikes([true, mainLikes[1]++, true])}}
            onMouseMove={(e)=> {setHover({display: true, message: "Add positive plus", x: e.clientX, y: e.clientY})}}
            onMouseOut={()=> {setHover({display: false, message: "", x: 0, y: 0})}}
          >
            +
          </button>
          <div className={mainLikes[2] ? "plus-counter plused" : "plus-counter minused"}> 
            {mainLikes[1]}
          </div>
          <button 
            className='add-minus'
            onClick={() => {mainLikes[0] ? null : setLikes([true, mainLikes[1]--, false])}}
            onMouseMove={(e)=> {setHover({display: true, message: "Add negative minus", x: e.clientX, y: e.clientY})}}
            onMouseOut={()=> {setHover({display: false, message: "", x: 0, y: 0})}}
          >
            -
          </button>
        </div>
        <div className="post-right">
          <div className='post-author'>
            <img src="/images/profile-picture-post.jpg" alt="Post Author's profile picture" className='profile-picture'/>
            <div className='author-info'>
              <h3 className='author-name'>
                Andrzej Skorupa
              </h3>
              <span className='author-date'>
                17:33, 23rd May 2023
              </span>
            </div>
          </div>
          <div className='post-content'>
            <span className='post-line'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis earum ad consequuntur. Quaerat, iure optio cumque vel atque libero odio. Fugit nostrum, qui quod culpa quae itaque autem sed natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur fugiat laboriosam voluptatibus excepturi est neque! Ipsa reprehenderit corrupti quod incidunt aut libero assumenda necessitatibus voluptates iure, provident quidem fugiat dicta!
            </span>
            <span className='post-line'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, est? Deleniti odio inventore, quas doloribus accusantium fugiat maxime possimus ipsam modi explicabo dolorem neque a, natus eligendi consectetur cumque dolor! Lorem
            </span>
          </div>
          <div className='post-options'>
            <button
              className={formVisibility ? "reply active" : "reply"}
              onClick={() =>{
                  setFormVisibility(!formVisibility)
                }
              }
            >
              {formVisibility ? "hide" : "reply"}
            </button>
          </div>
        </div>
      </div>
    </main>
    {
      formVisibility ? <Form 
          handleNewComment={handleNewComment}
          setFormVisibility={setFormVisibility}
        /> : null
    }
  <div className="comment-section">
    {commentList}
  </div>
  </>
}

export default App
