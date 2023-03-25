import React from "react";

const Avatar = () => {
  const avatars = [
    "https://tecdn.b-cdn.net/img/new/avatars/2.webp",
    "https://tecdn.b-cdn.net/img/new/avatars/1.webp",
    "https://tecdn.b-cdn.net/img/new/avatars/3.webp",
    "https://tecdn.b-cdn.net/img/new/avatars/4.webp",
    "https://tecdn.b-cdn.net/img/new/avatars/5.webp",
    "https://tecdn.b-cdn.net/img/new/avatars/6.webp",
    "https://tecdn.b-cdn.net/img/new/avatars/7.webp",
    "https://tecdn.b-cdn.net/img/new/avatars/8.webp",
    "https://tecdn.b-cdn.net/img/new/avatars/9.webp",
    "https://tecdn.b-cdn.net/img/new/avatars/10.webp",
  ];

  //select random avatar
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

  return (
    <div class='relative'>
      <img class='w-10 h-10 rounded-full' src={randomAvatar} alt='Avatar' />
      <span class='bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full'></span>
    </div>
  );
};

export default Avatar;
