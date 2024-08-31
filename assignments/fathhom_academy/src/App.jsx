// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Header from "./components/Header";
import { createBrowserRouter } from "react-router-dom";
import CourseList from "./components/CourseList";
import { Outlet } from "react-router-dom";
import Course from "./components/Course";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <Outlet>
        <CourseList />
        <Course />
      </Outlet>
      <footer
        style={{ height: "110px", padding: "15px 30px" }}
        className="bg-dark-subtle text-center"
      >
        <Stack direction="horizontal">
          <Stack direction="vertical" gap="4">
            <div>Fathhom Academy</div>
            <div>@ All Rights Reserved 2024</div>
          </Stack>
          <Stack direction="vertical" gap="4">
            <div>Contact us</div>
            <div>fathhomhelp@gmail.com</div>
          </Stack>
          <Stack direction="vertical" gap="4">
            <div>Links</div>
            <div>skill-impover.com</div>
          </Stack>
        </Stack>
      </footer>
    </>
  );
}
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <CourseList />,
      },
      {
        path: "/course",
        element: <Course />,
      },
    ],
  },
]);
