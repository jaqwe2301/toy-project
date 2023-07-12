import React from "react";
import { useState } from "react";
import axios from "axios";
import URL from "../config";

import user_profile from "../assets/user_profile.png";
import heartEmpty from "../assets/heart-empty.svg";
import heartRed from "../assets/heart-red.svg";
import comment from "../assets/comment-removebg-preview.png";
import { useEffect } from "react";

function User({ user }) {
  const name =
    user.user === 3 ? "_yoonjit" : user.user === 4 ? "nueog2" : "Yunjin";
  const userDate = new Date(user.pub_date);
  const month =
    userDate.getMonth() + 1 >= 10
      ? userDate.getMonth() + 1
      : "0" + (userDate.getMonth() + 1);
  const day =
    userDate.getDate() >= 10 ? userDate.getDate() : "0" + userDate.getDate();
  const hour =
    userDate.getHours() >= 10 ? userDate.getHours() : "0" + userDate.getHours();
  const minute =
    userDate.getMinutes() >= 10
      ? userDate.getMinutes()
      : "0" + userDate.getMinutes();
  const date = `${month}.${day} ${hour}.${minute}`;
  return (
    <div className="user_box">
      <div className="user_box2">
        <img src={user_profile} width={"38px"} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <p style={{ marginTop: "0px", marginBottom: "0px" }}>{name}</p>
          <p
            style={{
              marginTop: "0px",
              fontSize: "10px",
              color: "grey",
              marginBottom: "0px",
            }}
          >
            {date}
          </p>
        </div>
      </div>
      <div>
        <p>{user.content}</p>
      </div>
      <div className="heart_comment" style={{ marginBottom: "5px" }}>
        <img
          src={user.like ? heartRed : heartEmpty}
          width={"30px"}
          style={{ marginRight: "5px" }}
        />
        <img src={comment} width={"30px"} />
      </div>
    </div>
  );
}

function Userfeed() {
  const [users, setUsers] = useState([
    { content: "", like: false, pub_date: new Date(), user: 3 },
  ]);

  useEffect(() => {
    axios
      .get(`${URL}`, {
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const users = [
  //   {
  //     id: 1,
  //     username: "윤지수3",
  //     time: "07.10 14:34",
  //     text: "프론트 대장 김민혁 최고~~~",
  //   },
  //   {
  //     id: 2,
  //     username: "윤지수2",
  //     time: "07.10 13:34",
  //     text: "프론트 대장 김민혁 최고~~",
  //   },
  //   {
  //     id: 3,
  //     username: "윤지수1",
  //     time: "07.10 12:34",
  //     text: "프론트 대장 김민혁 최고~",
  //   },
  // ];

  return (
    <div>
      {users.map((user) => (
        <User user={user} />
      ))}
    </div>
  );
}

export default Userfeed;
