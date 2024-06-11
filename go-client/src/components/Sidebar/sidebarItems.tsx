import { FaUserFriends, FaRobot, FaHouseUser, FaGlobe, FaBook, FaPuzzlePiece } from 'react-icons/fa';

export const sidebarItems = [
    {
      option: 'vs Bot',
      link: '/local',
      icon: <FaRobot />
    },
    {
      option: 'Play Local',
      link: '/local',
      icon: <FaHouseUser />
    },
    {
      option: 'Play Online',
      link: '/multi',
      icon: <FaGlobe />
    },
    {
      option: 'Puzzles',
      link: '/puzzles',
      icon: <FaPuzzlePiece />
    },
    {
      option: 'User',
      link: '/user',
      icon: <FaUserFriends />
    },
    {
      option: 'About',
      link: '/about',
      icon: <FaBook />
    },
];