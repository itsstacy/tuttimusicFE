import React from "react";

function FaceChatList() {

    const liveList = ['live1', 'live2', 'live3', 'live4', 'live5', 'live6', 'live7'];


    return(
        <div>
            <div className="facechat-list">
                <div className="facechat-list-title">라이브 중인 채널</div>

                <div className="facechat-list-container">
                    <div className="facechat-live-list">
                        {
                            liveList.map((live, index) => {
                                return (
                                    <div className="facechat-live-box">
                                        <div className="main-thumbnail"/>
                                        <div className="facechat-live-info">
                                            <div className="facechat-live-pofileimg"/>
                                            <div className="facechat-info-box">
                                                <p className="facechat-info-title">Title</p>
                                                <p className="facechat-info-artist">Artist</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}

export default FaceChatList;
