const reducer = (state, action) => {
  switch (action.type) {
    case "course_enrollment": {
      const courseData = state.map((course) => {
        if (course.courseId == action.payload.id) {
          return {
            ...course,
            isEnrolled: true,
          };
        }
        return course;
      });
      return courseData;
    }
    case "lesson_completed": {
      const course = state.find(
        (course) => action.payload.id == course.courseId
      );
      const updatedLectures = course.lectures.map((lecture) => {
        if (action.payload.lectureId == lecture.lectureId) {
          return { ...lecture, isCompleted: true };
        }
        return lecture;
      });
      const courseData = state
        .map((course) => {
          if (course.courseId == action.payload.id) {
            return {
              ...course,
              lectures: updatedLectures,
            };
          }
          return course;
        })
        .map((course) => {
          let count = 0;
          course.lectures.forEach((lecture) => {
            if (lecture.isCompleted) count++;
          });

          const progress = Math.floor(100 * (count / course.lectures.length));
          return { ...course, progress };
        });
      return courseData;
    }
  }
};

export default reducer;
