import { Link ,useNavigate} from "react-router-dom";
import {
  FaHome,
  FaFolderOpen,
  FaPlusCircle,
  FaFileUpload,
  FaSignOutAlt,
  FaExclamationCircle,
  
} from "react-icons/fa";

function Sidebar() {
    const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        ⚖️ Legal CMS
      </h1>

      <nav className="flex flex-col gap-5">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/cases"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaFolderOpen />
          Cases
        </Link>

        <Link
          to="/add-case"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaPlusCircle />
          Add Case
        </Link>

        <Link
          to="/upload"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaFileUpload />
          Upload Documents
        </Link>
        <Link
  to="/issues"
  className="flex items-center gap-3 hover:text-yellow-400"
>
  <FaExclamationCircle />
  Client Issues
</Link>

        <button
  onClick={handleLogout}
  className="flex items-center gap-3 text-left hover:text-red-400"
>
  <FaSignOutAlt />
  Logout
</button>

      </nav>
    </div>
  );
}

export default Sidebar;