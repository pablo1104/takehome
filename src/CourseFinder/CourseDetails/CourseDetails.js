import './CourseDetails.scss';

function CourseDetails({
  course,
  department,
  semester,
  year,
}) {
  return (
    <div className="course-details">
      <h2 className="course-details__name">{department} {course}</h2>
      <div className="course-details__data">
        <table className="course-details__data__details">
          <tr>
            <td className="course-details__data__details__label">Department</td>
            <td> {department}</td>
          </tr>
          <tr>
            <td className="course-details__data__details__label">Course</td>
            <td>{course}</td>
          </tr>
          <tr>
            <td className="course-details__data__details__label">Year</td>
            <td>{year}</td>
          </tr>
          <tr>
            <td className="course-details__data__details__label">Semester</td>
            <td>{semester}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default CourseDetails;