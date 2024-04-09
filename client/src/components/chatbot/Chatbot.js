import React, { Component } from 'react'
import axios from 'axios'
import Message from './Messages'
import Card from './Cards'
import Cookies from 'universal-cookie'
import { v4 as uuid } from 'uuid'
import './CardStyle.css'
import MapComponent from './MapComponent'
import QuickReplies from './QuickReplies'
import './Chatbotstyle.css'
import MapDirections from './MapDirections'
import NFC from './NFC'
import HAS from './HAS'




const cookies = new Cookies()

class Chatbot extends Component {
    messagesEnd
    talkInput
    constructor(props) {
        super(props)
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this)
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this)

        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);

        this.state = {
            messages: [],
            showBot: true,
            currentCardIndex: 0,
            showMap: false, // Indicates if the map should be shown
            mapLocation: null, // Holds the latitude and longitude for the map
            welcomeSent: false,
        }

        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/' })
        }
    }

    
    async df_text_query(queryText) {
        let says = {
            speaks: 'user',
            msg: {
                text: {
                    text: queryText
                }
            }
        };
    
        let messages = [...this.state.messages, says]; // Accumulate messages for a single update
    
        const res = await axios.post('/api/df_text_query', { text: queryText, userID: cookies.get('userID') });
    
        res.data.fulfillmentMessages.forEach((msg) => {
            console.log(JSON.stringify(msg))
            messages.push({
                speaks: 'bot',
                msg: msg
            });
        });
    
        this.setState({ messages: messages });
    }
    
    async df_event_query(eventName) {
        const res = await axios.post('/api/df_event_query', { event: eventName, userID: cookies.get('userID') });
    
        let messages = [...this.state.messages]; // Start with current messages
    
        res.data.fulfillmentMessages.forEach((msg) => {
            messages.push({
                speaks: 'bot',
                msg: msg
            });
        });
    
        this.setState({ 
            messages: messages,
            welcomeSent: true
         });
    }

    componentDidMount() {
        if (!this.state.welcomeSent) { // Only send the welcome event if it hasn't been sent already
            this.df_event_query('Welcome');
        }
    }

   

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        
        if (this.talkInput) {
            this.talkInput.focus();
        }
    }

    _handleQuickReplyPayload(event, payload, text) {
        event.preventDefault();
        event.stopPropagation();

        this.setState(prevState => ({
            messages: prevState.messages.slice(0, -1)
        }), () => {
            // After the state is updated and quick replies are removed, send the query
            this.df_text_query(text);
        });


    }

    nextCard = () => {
        this.setState(prevState => ({
            currentCardIndex: prevState.currentCardIndex + 1
        }))
    }
    
    prevCard = () => {
        this.setState(prevState => ({
            currentCardIndex: Math.max(prevState.currentCardIndex - 1, 0)
        }))
    }

    show(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ showBot: true });
    }

    hide(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ showBot: false });
    }

    renderCards(cards) {
        if (cards.length === 0) return null;
        
        const card = cards[this.state.currentCardIndex];
        return (
            <div className="card-slider-container">
                <button className="slide-button prev-button" onClick={this.prevCard} disabled={this.state.currentCardIndex <= 0}>{"<"}</button>
                <div className="card-container">
                    <Card key={this.state.currentCardIndex} payload={card.structValue} />
                </div>
                <button className="slide-button next-button" onClick={this.nextCard} disabled={this.state.currentCardIndex >= cards.length - 1}>{">"}</button>
            </div>
        );
    } 

    renderOneMessage(message, i) {
        if (message.msg && message.msg.text && message.msg.text.text) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
        } else if (message.msg && message.msg.payload.fields.cards) {
            // Extracting cards data from the message
            const cards = message.msg.payload.fields.cards.listValue.values;
            // Adjusting to ensure we're only rendering cards when they exist
            if (cards && cards.length > 0) {
                return (
                    <div key={i} className="card-panel grey lighten-5 z-depth-1">
                        <div style={{overflow: 'hidden'}}>
                            <div className="col s2">
                                <img src="/CT.png" alt="Bot" className="bot-logo" />
                            </div>
                            <div style={{ overflow: 'auto', overflowY: 'scroll' }}>
                                {/* Updated to use renderCards for single card view with navigation */}
                                <div style={{ height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {this.renderCards(cards)}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

        } else if (message.msg && message.msg.payload.fields.map) {
    
            const mapData = message.msg.payload.fields.map.structValue.fields

            return (
                <MapComponent
                    mapMode={mapData.mapMode.stringValue}
                    apiKey={mapData.apiKey.stringValue}
                    center={mapData.center.stringValue}
                    zoom={mapData.zoom.stringValue}
                    maptype={mapData.maptype.stringValue}
                />
            )
        } else if (message.msg &&
            message.msg.payload &&
            message.msg.payload.fields &&
            (message.msg.payload.fields.quick_replies || message.msg.payload.fields.quick_buttons || message.msg.payload.fields.quick_asks || message.msg.payload.fields.quick_suggestions)
        ) {
            let chosenPayload;

    if (message.msg.payload.fields.quick_replies) {
        chosenPayload = message.msg.payload.fields.quick_replies.listValue.values;
    } else if (message.msg.payload.fields.quick_buttons) {
        chosenPayload = message.msg.payload.fields.quick_buttons.listValue.values;
    } else if (message.msg.payload.fields.quick_asks) {
        chosenPayload = message.msg.payload.fields.quick_asks.listValue.values;
    } else if (message.msg.payload.fields.quick_suggestions) { // Logic to handle quick_suggestions
        chosenPayload = message.msg.payload.fields.quick_suggestions.listValue.values;
    }

            const quickRepliesPayload = chosenPayload;
          
            return <QuickReplies
                text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
                key={i}
                replyClick={this._handleQuickReplyPayload}
                speaks={message.speaks}
                
                payload={quickRepliesPayload}
                   />
              
        } else if(message.msg && message.msg.payload.fields.mapdir){
                const mapData = message.msg.payload.fields.mapdir.structValue.fields;
            return (
                <MapDirections
                    // Props for MapDirections
                    key={i}
                    mapMode={mapData.mapMode.stringValue}
                    apiKey={mapData.apiKey.stringValue}
                    origin={mapData.origin.stringValue.replace(/\+/g, ' ')} // Replacing '+' with space for readability
                    destination={mapData.destination.stringValue.replace(/\+/g, ' ')} // Replacing '+' with space for readability
                    zoom={mapData.zoom.stringValue}
                    maptype={mapData.maptype.stringValue}
                />
            )

         } else if(message.msg && message.msg.payload.fields.nfc){
            const nfcData = message.msg.payload.fields.nfc.structValue.fields;
            return (
                <NFC
            key={i} // Assuming 'i' is the index in a map function, ensuring each NFC component has a unique key.
            url={nfcData.url.stringValue} // Assuming 'url' is directly accessible and is a string
            description={nfcData.description.stringValue} // Assuming 'description' is directly accessible and is a string
                />
            )
         } else if(message.msg && message.msg.payload.fields.HAS){
            const hasData = message.msg.payload.fields.HAS.structValue.fields;
            return (
                <HAS
            key={i} // Assuming 'i' is the index in a map function, ensuring each NFC component has a unique key.
            url={hasData.url.stringValue} // Assuming 'url' is directly accessible and is a string
            description={hasData.description.stringValue} // Assuming 'description' is directly accessible and is a string
                />
            )
         }
        return null
    }
    renderMessages(returnedMessages) {
        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return this.renderOneMessage(message, i);
            }
            )
        } else {
            return null
        }
    }
    _handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value)
            e.target.value = ''
        }
    }
    render() {
        if (this.state.showBot) {
            return (
                <div className="chatbot-container">
                    <nav className="nav-wrapper-chatbot">
                        <img src="/CT.png" alt="Chatbot Logo" className="logo-left" />
                        <a href="/" className="brand-logo-chatbot"> ClinBot @ CT</a>    
                    <ul className="right">
                        <li><a href="/" onClick={this.hide} className="chat-close"> x </a></li>
                    </ul>
                    </nav>
                    <div id="chatbot"  style={{ minHeight: 388, maxHeight: 388, width:'100%', overflow: 'auto'}}>
                    {this.renderMessages(this.state.messages)}
                        <div ref={(el) => { this.messagesEnd = el; }}
                             style={{ float:"left", clear: "both" }}>
                        </div>
                    </div>
                    <div className=" col s12" >
                        <input style={{margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%'}} ref={(input) => { this.talkInput = input; }} placeholder="Ask ClinBot:"  onKeyPress={this._handleInputKeyPress} id="user_says" type="text" />
                    </div>
                </div>
            )
        }else {
            return (
                <div style={{ minHeight: 0, maxHeight: 60, width: 60, position: 'fixed', bottom: 20, right: 20, border: '1px solid lightgray', borderRadius: '32px', cursor: 'pointer'}}>
                    <img src={"/CT.png" } alt="CT ChatBot" className="bubble-image" onClick={this.show}/>
                    <div ref={(el) => { this.messagesEnd = el; }}
                         style={{ float:"left", clear: "both" }}>
                    </div>
                </div>
                )
            }
    }
}
  
export default Chatbot;
