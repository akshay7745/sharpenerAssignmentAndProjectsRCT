import { createContext, useEffect, useReducer } from "react";
import { courseData } from "../utils/courseData";
import reducer from "../utils/reducer";
export const courseContext = createContext();

const CourseContextProvider = ({ children }) => {
  const [courses, dispatch] = useReducer(reducer, courseData);
  console.log(courses, "from context");
  // useEffect(() => {
  //   // fetch course data only once
  //   getCourseData();
  // }, []);

  // const getCourseData = async () => {
  //   const data = []; //fetched from backend
  //   dispatch({ type: "course_data_restored", payload: data });
  // };
  return (
    <courseContext.Provider value={{ dispatch, courses }}>
      {children}
    </courseContext.Provider>
  );
};

export default CourseContextProvider;
