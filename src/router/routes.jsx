import GroupIcon from '@mui/icons-material/Group';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CommentIcon from '@mui/icons-material/Comment';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import LogoutIcon from '@mui/icons-material/Logout';
const routes = [
    {
        path: "/main",
        content: "Users",
        icon: <GroupIcon/>
    },
    {
        path: "/main/brand",
        content: "Posts",
        icon: <LocalPostOfficeIcon/>
    },
    {
        path: "/main/albums",
        content: "Albums",
        icon: <PhotoLibraryIcon/>
    },
    {
        path: "/main/comments",
        content: "Comments",
        icon: <CommentIcon/>
    },
    {
        path: "/main/photos",
        content: "Photos",
        icon: <PhotoSizeSelectActualOutlinedIcon/>
    },
    {
        path: "/main/todos",
        content: "Todos",
        icon: <ListAltOutlinedIcon/>
    },
    {
        path: "/main/newcar",
        content: "NewCar",
        icon: <TimeToLeaveIcon/>
    },
]

export default routes