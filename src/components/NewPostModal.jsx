import { useState } from "react";

async function handleSubmit(title, text) {
  const url = "http://localhost:3000/admin/addnew";
  const newbody = {
    title: title,
    text: text,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(newbody),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    window.location.href = "/posts";
  } catch (error) {
    console.log(error);
  }
}

function NewPostModal(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleCancel = () => {
    props.setNewModal(false);
  };

  return (
    <>
      <div className={`newpostmodal ${props.newModalShow}`}>
        <div className="newpostcontainer">
          <form method="none" action={(e) => e.preventDefault()}>
            <div className="title">
              <label htmlFor="title"> Change title</label>
              <input
                type="text"
                name="title"
                defaultValue={props.title}
                onChange={(e) => handleTitle(e)}
              />
            </div>
            <div className="textEdit">
              <label htmlFor="text"> Change post body</label>
              <textarea
                defaultValue={props.text}
                onChange={(e) => handleText(e)}
              />
            </div>
          </form>
          <button onClick={() => handleSubmit(title, text)}>
            Apply change
          </button>
          <button onClick={() => handleCancel()}>Cancel</button>
        </div>
      </div>
    </>
  );
}

export default NewPostModal;
