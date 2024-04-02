import React, { Component } from 'react';
import QuickReply from './QuickReply';


class QuickReplies extends Component {
    constructor(props) {
        super(props)
        this._handleClick = this._handleClick.bind(this)
    }

    _handleClick(event, payload, text) {
        this.props.replyClick(event, payload, text)
    }
    renderQuickReply(reply, i) {
        return <QuickReply key={i} click={this._handleClick} reply={reply} />
    }

    renderQuickReplies(quickReplies) {
        if (quickReplies) {
            // return quickReplies.map((reply, i) => {
            //         return this.renderQuickReply(reply, i);
            //     }
            // )
            return (
                <div className="quick-replies-flex-container">
                    {quickReplies.map((reply, i) => this.renderQuickReply(reply, i))}
                </div>
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="quick-replies-container">
                {this.props.text && <p className="quick-replies-text">{this.props.text.stringValue}</p>}
                <div className="quick-replies">
                    {this.renderQuickReplies(this.props.payload)}
                </div>
            </div>
        )
    }
}

export default QuickReplies;