import "../../assets/css/messageBot.css";

export default function Message({ ConfirmResponse, message, user, friend }) {
  let own = message.own
  return (
    <>
      <div className={own ? "message own" : "message"} >
        <div className="messageTop" >

          {user.image.startsWith("https") && own == true && <>
            <p className="messageText">{message.text}</p>
            <img src={user.image} className="messageImg" referrerpolicy="no-referrer"></img></>}

          {!user.image.startsWith("https") && own == true && <>
            <p className="messageText">{message.text}</p>
            <img className="messageImg" src={require('../../assets/uploads/user/' + user.image)} alt="" /></>}

          {own == false && <><img className="messageImgNotOwner" src={require('../../assets/img/chatbot1.png')} alt="" />
            <p className="messageText" >{message.text}</p>
          </>}
        </div>
      </div>

      {message.responses &&
        <div className="message" style={{ marginTop: "1%" }}>
          <div className="messageTop" >
            <a className="messageImgNotOwner" style={{ backgroundColor: "white", borderColor: "white" }} alt="" />
            {message.responses.length > 1 && message.responses.map((rsp, indexr) =>
              <label style={{ marginRight: "2%" }}><a onClick={() => { ConfirmResponse(rsp) }} key={indexr} className="messageTextResponse">{rsp}</a></label>
            )}
          </div>
        </div>}
    </>
  );
}
