import { useState, useEffect, useContext } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import { useDispatch } from "react-redux";
import { openModal } from "../../services/features/AddTaskModal/ModalSlice";
import { AuthContext } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import { ThemeContext } from "../../contexts/ThemeProvider";
 
export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch()
  const { user, logOut } = useContext(AuthContext)
  const navigate = useNavigate()
  const {theme, setTheme} = useContext(ThemeContext)

   // theming...
   useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document
      .getElementsByTagName("html")[0]
      .setAttribute("data-theme", localStorage.getItem("theme"));
  }, [theme]);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleLogOut = () => {
    logOut()
    .then(res => {
      navigate('/login')
    })
    .catch(err => console.log(err))
  }

  const handleAddTask = () => {
    if (!user && !user?.uid) {
      toast.error('Login first')
      // navigate('/login')
      return
    }
    dispatch(openModal('addTaskModal'))
  }
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal dark:text-white"
      >
        <Link to="/" className="flex items-center gap-1 font-bold">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal dark:text-white"
      >
        <Link to="/mytasks" className="flex items-center gap-1 font-bold">
          My Tasks
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal dark:text-white"
      >
        <Link to="/completed" className="flex items-center gap-1 font-bold">
          Completed Tasks
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal dark:text-white"
      >
        <Link onClick={handleAddTask} className="flex items-center gap-1 font-bold">
            <FaPlus/>
          Add a Task
        </Link>
      </Typography>
    </ul>
  );
 
  return (
    <Navbar className="mx-auto  py-2 px-4 lg:px-8 lg:py-4 dark:bg-dark-bg/90 dark:border-0">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          variant="h5"
          className="mr-4 cursor-pointer py-1.5 font-semibold"
        >
          <Link to="/" className="bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">My Tasks</Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>

        <div>
        {/* theme toogler */}
        <div className="flex items-center gap-3 ml-auto lg:ml-0 lg:mr-3">
                    <div>
                    <svg
              onClick={() => setTheme("light")}
              className={`${
                theme === "light" ? "hidden" : "block"
              } cursor-pointer w-8 h-8 dark:fill-white`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              onClick={() => setTheme("dark")}
              className={`${
                theme === "dark" ? "hidden" : "block"
              } cursor-pointer w-8 h-8 dark:fill-white`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
            </div>

          {/* profile */}
        {
          user && user.uid ?
          <Menu>
            <MenuHandler>
            <Avatar className="cursor-pointer" src={user?.photoURL} alt="avatar" variant="circular" size="sm" />
            </MenuHandler>
            <MenuList>
                <Link onClick={handleLogOut}>
              <MenuItem>
                Log out
              </MenuItem>
                </Link>
            </MenuList>
          </Menu>
          :
          <Link to="/login">
          <Button variant="gradient" size="sm" className="hidden lg:inline-block">
            <span>Login</span>
          </Button>
        </Link>
        }
        </div>
        </div>

        {/* menu toggler */}
        <IconButton
          variant="text"
          className="ml-2 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6 dark:text-white"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 dark:text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        {navList}
        {
          !(user && user.uid) && <Link to="/login">
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Login</span>
          </Button>
          </Link>
        }
      </MobileNav>
      <AddTaskModal/>
    </Navbar>
  );
}