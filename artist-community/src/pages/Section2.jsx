import React from "react";
import { useState } from "react";
import axios from "axios";

import Userfeed from "./Userfeed";
import URL from "../config";
import user_profile from "../assets/user_profile.png";
import camera from "../assets/input_camera.png";
import tray from "../assets/input_tray.png";

const Section2 = () => {
  // const handleOnClick = () => {
  //   alert("handleOnClick() 잘 실행되고 있어염");
  // };

  // const handleOnKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleOnClick();
  //   }
  // };

  const [post, setPost] = useState("");
  const [user, setUser] = useState(3);

  const enter = (e) => {
    if (e.keyCode == 13) {
      // 엔터키가 눌렸을 때
      // console.log(post);
      // console.log(user);
      axios
        .post(
          `${URL}`,
          { content: post, user: user },
          {
            headers: {
              // 헤더에 필요한 데이터를 여기에 추가
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setUser((prev) => {
            let num = prev >= 5 ? 2 : prev;
            num++;
            return num;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onChange = (e) => {
    setPost(e.target.value);
  };

  return (
    <div className="inner">
      <input
        type="text"
        placeholder="LIKELION에 포스트를 남겨보세요."
        // onKeyDown={handleOnKeyPress}
        onChange={onChange}
        onKeyDown={(e) => enter(e)}
      />
      <div className="user_profile">
        <img
          src={user_profile}
          width={"38px"}
          style={{ marginLeft: "130px" }}
        />
      </div>
      <div className="camera_tray">
        <img src={camera} width={"30px"} />
        <img src={tray} width={"30px"} style={{ marginLeft: "10px" }} />
      </div>

      <Userfeed num={user} />
    </div>
  );
};

export default Section2;
