import React, { useState, useEffect } from "react";
import "../style/dashboard.css";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { BsFillPersonFill } from "react-icons/bs";
import {
  Button,
  Input,
  List,
  Space,
  Switch,
  Badge,
  Avatar,
  Card,
  Statistic,
  Table,
  Tag,
} from "antd";
import {
  BellOutlined,
  MenuOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  PlusOutlined,
  CalendarOutlined,
  TeamOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import {
  PieChart,
  Pie,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
];
const graphData = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];
const columns = [
  {
    title: "User",
    dataIndex: "user",
    key: "user",
    render: (text) => (
      <Space size="middle">
        <BsFillPersonFill size={20} color="gray" />
        <p>{text}</p>
      </Space>
    ),
  },
  {
    title: "Date Order",
    dataIndex: "dateOrder",
    key: "dateOrder",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => (
      <Tag
        color={
          text === "Completed"
            ? "green"
            : text === "Pending"
            ? "orange"
            : "blue"
        }
      >
        {text}
      </Tag>
    ),
  },
];

const data_order = [
  {
    key: "1",
    user: "John Doe",
    dateOrder: "01-10-2021",
    status: "Completed",
    // image: <BsFillPersonFill size={20} color="gray" />,
  },
  {
    key: "2",
    user: "John Doe",
    dateOrder: "01-10-2021",
    status: "Pending",
    // image: <BsFillPersonFill size={20} color="gray" />,
  },
  {
    key: "3",
    user: "John Doe",
    dateOrder: "01-10-2021",
    status: "Process",
    // image: <BsFillPersonFill size={20} color="gray" />,
  },
  {
    key: "4",
    user: "John Doe",
    dateOrder: "01-10-2021",
    status: "Pending",
    // image: <BsFillPersonFill size={20} color="gray" />,
  },
  {
    key: "5",
    user: "John Doe",
    dateOrder: "01-10-2021",
    status: "Completed",
    // image: <BsFillPersonFill size={20} color="gray" />,
  },
];

const { Search } = Input;
function Fdashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks state changes
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const editTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };
  const [cookies] = useCookies(["token"]);
  let userName = null;

  // If token exists, decode it to get user information
  if (cookies.token) {
    const decodedToken = jwt_decode(cookies.token);
    userName = decodedToken.user?.name;
  }

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8081/logout");
      // Clear the token cookie
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.replace("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <Sidebar />
      <section id="content">
        {/* NAVBAR */}
        <nav className="nav">
          <Input
            type="search"
            className="search-input"
            placeholder="Search Here ..."
          />
          <Switch className="switch-mode" />
          <Badge count={8} className="notification">
            <BellOutlined />
          </Badge>
          <Avatar icon={<BsFillPersonFill />} />
          <div>
            {userName ? (
              <Button type="primary" onClick={handleLogout} className="btn-10">
                Logout
              </Button>
            ) : (
              <>
                <Link to="/">
                  <Button className="btn-1">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="btn-1">Register</Button>
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* NAVBAR */}

        {/* MAIN */}
        <main>
          <div className="head-title">
            <div className="left" style={{ marginLeft: "30px" }}>
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <i className="bx bx-chevron-right"></i>
                </li>
                <li>Home</li>
              </ul>
            </div>
            <a
              href="#"
              className="btn-download"
              style={{ marginRight: "30px", borderRadius: "0" }}
            >
              <i className="bx bxs-cloud-download"></i>
              <span className="text">Wallet Balance : $10</span>
            </a>
          </div>

          <div className="box-info">
            <Card>
              <Statistic
                title="New Order"
                value={1020}
                prefix={<CalendarOutlined />}
              />
              <PieChart width={100} height={100}>
                <Pie
                  dataKey="value"
                  data={data}
                  cx={50}
                  cy={50}
                  innerRadius={25}
                  outerRadius={50}
                  fill="#8884d8"
                />
                <Tooltip />
              </PieChart>
            </Card>

            <Card>
              <Statistic
                title="Visitors"
                value={2834}
                prefix={<TeamOutlined />}
              />
              <PieChart width={100} height={100}>
                <Pie
                  dataKey="value"
                  data={data}
                  cx={50}
                  cy={50}
                  innerRadius={25}
                  outerRadius={50}
                  fill="#82ca9d"
                />
                <Tooltip />
              </PieChart>
            </Card>

            <Card style={{ display: "flex" }}>
              <Statistic
                title="Total Sales"
                value={2543}
                prefix={<DollarCircleOutlined />}
              />
              <PieChart width={100} height={100}>
                <Pie
                  dataKey="value"
                  data={data}
                  cx={50}
                  cy={50}
                  innerRadius={25}
                  outerRadius={50}
                  fill="#ffc658"
                />
                <Tooltip />
              </PieChart>
            </Card>
          </div>

          <div className="table-data">
            <div className="graph">
              <h2>Monthly Performance</h2>
              <LineChart
                width={600}
                height={300}
                data={graphData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </div>

            <div className="todo">
              <div className="head">
                <h3>Your Tasks</h3>
              </div>
              <Input
                placeholder="Add a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onPressEnter={addTask}
                suffix={<Button icon={<PlusOutlined />} onClick={addTask} />}
                style={{ height: "auto" }} // Adjust the height of the input field
              />
              <List
                dataSource={tasks}
                renderItem={(task, index) => (
                  <List.Item
                    className={`task-item ${task.completed ? "completed" : ""}`}
                  >
                    <Space>
                      <Button
                        icon={<CheckOutlined />}
                        onClick={() => toggleCompletion(index)}
                        type={task.completed ? "default" : "primary"}
                      />
                      <Input
                        value={task.text}
                        onChange={(e) => editTask(index, e.target.value)}
                        onPressEnter={() => editTask(index, newTask)}
                        suffix={
                          <Space>
                            <Button
                              icon={<EditOutlined />}
                              onClick={() => editTask(index, newTask)}
                            />
                            <Button
                              icon={<DeleteOutlined />}
                              onClick={() => deleteTask(index)}
                            />
                          </Space>
                        }
                        style={{ height: "auto" }} // Adjust the height of the input field
                      />
                    </Space>
                  </List.Item>
                )}
              />
            </div>

            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
                <SearchOutlined style={{ marginRight: "8px" }} />
                <FilterOutlined />
              </div>
              <Table
                columns={columns}
                dataSource={data_order}
                pagination={{ pageSize: 5 }}
              />
            </div>
          </div>
        </main>
        {/* MAIN */}
      </section>
    </>
  );
}

export default Fdashboard;
