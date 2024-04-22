import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
function EditorBody({ bodyChangeHandler }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContent);
    console.log(`${htmlContent}, from line number 13 editor body...`);
    const mailBody = rawContent.blocks[0].text;
    // bodyChangeHandler(mailBody);
    bodyChangeHandler({ body: `${htmlContent}`, bodyInText: mailBody });
  }, [editorState]);
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  return (
    <div className="myEditor">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
}

export default EditorBody;
