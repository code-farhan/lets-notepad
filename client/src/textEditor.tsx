import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { DELTA } from "../../server/src/server.dtos";

export default function TextEditor() {
  const [socket, setSocket] = useState<any>();
  const [quill, setQuill] = useState<any>();
  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!socket || !quill) return;
    const handler = (delta: DELTA, oldDelta: DELTA, source: string) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;
    const handler = (delta: string) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);
    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper: any) => {
    if (!wrapper) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, { theme: "snow" });
    setQuill(q);
  }, []);
  return <div className="container" ref={wrapperRef}></div>;
}
