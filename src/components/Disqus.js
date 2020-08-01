import React from "react"
import Disqus from "disqus-react"

export default function DisqusBox(props) {
    const classes = props.classes;
    const disqusShortname = "personal-finance-alpha"; //found in your Disqus.com dashboard
    const disqusConfig = {
        url: "https://personal-finance-alpha.azurewebsites.net", //this.props.pageUrl
        identifier: "comments", //this.props.uniqueId
        title: "Personal Finance" //this.props.title
    };

    return (
        <div className={classes.articleContainer}>
            <h1>Feature Requests</h1>
            <p>Drop your comments, suggestions and feature requests below.</p>
            <Disqus.DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
            />
        </div>
    )
}