import React from "react";

function FaceChatList() {

    const liveList = ['live1', 'live2', 'live3', 'live4', 'live5', 'live6', 'live7'];


    return(
        <div>
            <div className="facechat-list">
                <div className="live-list-title">라이브 중인 채널</div>

                <div className="live-list-container">
                    <div className="live-list">
                        {
                            liveList.map((live, index) => {
                                return (
                                    <div className="live-box">
                                        <div className="live-box-thumbnail"/>
                                        <div className="live-box-info">
                                            <div className="live-box-pofileimg"/>
                                            <div className="live-box-info-box">
                                                <p className="live-box-info-title">Title</p>
                                                <p className="live-box-info-artist">Artist</p>
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
