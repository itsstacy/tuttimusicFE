import React, {useRef, useState} from "react";
import moment from "moment";
import {MdDelete} from "react-icons/md";
import {deleteComment, editAComment} from "../redux/modules/songSlice";
import {useDispatch } from "react-redux";
import{HiOutlineDotsVertical} from "react-icons/hi" ;
import {MdEdit} from "react-icons/md";

function EditComment(props) {
  console.log(props)
  const comment = props.comment
  const username = props.username
  const dispatch = useDispatch();
  const editedComment = useRef(null);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.comment);
  const [dropdown, setDropdown] = useState(false);
  const currentTime = moment().format();

  //delete a comment
  const DeleteComment=(id)=>{
    console.log(id);
    if(window.confirm("정말로 삭제하시겠습니까?")) {
    dispatch(deleteComment({
      token: props.token,
      feedid: props.feedid,
      commentid: comment.id,
    }))
  }
    setDropdown(false); 
  }

  //save edited comment
  const SaveEditedComment=()=>{
    dispatch(editAComment({
      token: props.token,
      feedid: props.feedid,
      commentid: comment.id,
      modifiedAt: currentTime,
      comment: editValue,
    }))
    setEditing(false);
    setDropdown(false); 
  }


  return (
<div className="column-wrap">
    {editing === false?
        <>
          <p className="comment-writer">
          {comment.artist}
          <span className="spantime">
            {moment(`${comment.modifiedAt}`).startOf('minute').fromNow()}
          </span>
          </p>
          <div className="row-wrap flex-between">
            <p className="comment-text">
            {comment.comment}
            </p>

            {comment.artist === username?
            <div className="relative-wrap">              
              <div className="icon-round-button"
                onClick={()=>{
                  setDropdown(!dropdown);
                }}>
                  <HiOutlineDotsVertical/>
              </div>
              {dropdown ===true?
                <div className="dropdown-box">

                  <div 
                  className="dropdown-menu"                 
                  onClick={()=>{
                    setEditing(true);
                  }}>                                        
                  <p><MdEdit className="edit-comment-icon"/> Edit </p>
                  </div>

                  <div 
                  className="dropdown-menu"
                  onClick={()=>{
                      DeleteComment(comment.id)
                    }}>
                    <p><MdDelete className="trashcan"/> Delete </p>
                  </div>
                </div>
                :
                null
              }
            </div>
            : null
            }


          </div>
        </>
    : 
      <div className="row-wrap">
        <input
        className="edit-comment-input"
        type='text'
        value={editValue}
        ref={editedComment}
        onChange={(e)=>{
          setEditValue(e.target.value)
        }}
        />
        <button 
        className="btn btn-primary"
        onClick={()=>{
          SaveEditedComment()
        }}>
        확인
        </button>
      </div>

    }
    </div>


  )
}

export default EditComment