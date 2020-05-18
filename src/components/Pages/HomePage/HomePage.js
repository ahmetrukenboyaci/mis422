import React, { Component } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import InstagramEmbed from "react-instagram-embed";

import "./HomePage.scss";

export default class HomePage extends Component {
  render() {
    return (
      <div className="socialMedia">
        <div className="twitter">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="jack"
            options={{ height: 475 }}
          />
        </div>
        <div className="instagram">
          <InstagramEmbed
            url="https://www.instagram.com/p/BX_UqQvg9Nb/"
            maxWidth={undefined}
            hideCaption={true}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>
    );
  }
}
