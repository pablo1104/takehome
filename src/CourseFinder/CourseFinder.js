import {useState, useCallback, useEffect} from "react";

import SearchInput from "./SearchInput/SearchInput";
import CourseDetails from "./CourseDetails/CourseDetails";
import {getCourseDetails} from "../utils/courseUtils";

import './CourseFinder.scss';


function CourseFinder() {
  const [searchText, setSearchText] = useState('');
  const [department, setDepartment] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [isError, setIsError] = useState(false);
  const handleSearchChange = useCallback((searchValue) => {
    setSearchText(searchValue);
    setIsError(false);
  }, []);
  const handleSubmitSearch = useCallback(()=>{
    const courseDetails = getCourseDetails(searchText);
    console.log(courseDetails);
    if (courseDetails) {
      setDepartment(courseDetails.department);
      setCourse(courseDetails.course);
      setYear(courseDetails.year);
      setSemester(courseDetails.semester);
    } else {
      console.log('error');
      setDepartment('');
      setCourse('');
      setYear('');
      setSemester('');
      setIsError(true);
    }
  }, [searchText]);

  return (
    <div className="course-finder">
      <SearchInput
        onSearchChange={handleSearchChange}
        onSubmitSearch={handleSubmitSearch}
        isError={isError}
        searchText={searchText}
        />
      {department && <CourseDetails
        department={department}
        course={course}
        year={year}
        semester={semester}
      />}
    </div>
  )
}

export default CourseFinder;