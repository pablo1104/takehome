const delimiters = ['-', '.'];

export function getCourseDetails(searchText) {
  const splittedText = searchText.split(' ');
  let courseDetailsCompleted = false;
  let isError = false;
  const courseDetails = {
    "department": '',
    "course": '',
    "year": '',
    "semester": '',

  }
  console.log(splittedText);

  if (splittedText.length <= 1 || splittedText.length >4)
    return null;

  splittedText.forEach((value, index) => {
    if (index === 0) {
      if(hasNumber(value) && isLetter(value[0])) {
        let courseFinished = false;
        console.log(value);
        [...value].forEach((letter, index) => {
          console.log(letter, isNumber(letter));
          if (isLetter(letter) && !courseFinished) {
            courseDetails.department += letter;
          } else if (delimiters.includes(letter) && !courseFinished) {
            courseFinished = true;
          } else if (isNumber(letter)) {
            courseFinished = true;
            courseDetails.course += letter;
          }
        });
      } else {
        courseDetails.department = value;
      }
    }

    if (index === 1) {
      if (!courseDetails.course) {
        if (!hasLetter(value)) {
          courseDetails.course = value;
        } else {
          return null;
        }
      } else {
        const dataFrom = getSemesterAndYear(value);

        courseDetails.semester = dataFrom?.semester;
        courseDetails.year = dataFrom?.year;
      }
    }

    if (index >=2 && !courseDetailsCompleted) {
      const dataFrom = getSemesterAndYear(value);
      console.log(dataFrom);
      courseDetails.semester = courseDetails.semester || dataFrom?.semester;
      courseDetails.year = courseDetails.year || dataFrom?.year;

      if (courseDetails.year && courseDetails.semester) {
        courseDetailsCompleted = true;
      }
    } else if(index >=2 && courseDetailsCompleted) {
     isError = true;
    }
  });

  courseDetails.year = normalizeYear(courseDetails.year);
  courseDetails.semester = normalizeSemester(courseDetails.semester);

  if (!courseDetails.semester || !courseDetails.year || !courseDetails.course || !courseDetails.department || isError) {
    return null;
  }

  return courseDetails;
}

const semesterMapping = {
  's': "Spring",
  'su': "Summer",
  'f': "Fall",
  'w': "Winter",
}

function normalizeSemester(semester) {

  if (semester.length <=2) {
    return semesterMapping[semester.toLowerCase()];
  } else {
    return semester;
  }

}

function normalizeYear(year) {
  return year.length === 4 ? year : '20' + year;
}

function getSemesterAndYear(value) {
  const dataSemesterAndYear = {
    year: '',
    semester: '',
  }
  console.log(value, hasLetter(value));
  if (!hasNumber(value)) {
    dataSemesterAndYear.semester = value;
  } else if (!hasLetter(value)) {
    console.log('test')
    dataSemesterAndYear.year = value;
  } else {
    if (isShortSummerWithYearAtBeginning(value) || isShortSummerWithYearAtEnd(value)) {
      [...value].forEach((elementValue, indexElement) => {
        if (isNumber(elementValue)) {
          dataSemesterAndYear.year += elementValue
        } else {
          dataSemesterAndYear.semester += elementValue;
        }
      });
    } else {
      return null
    }
  }

  return dataSemesterAndYear;
}

function isShortSummerWithYearAtEnd(value) {
  return /(f|w|s|su)(\d{2}|\d{4})$/gi.test(value) || /(fall|winter|spring|summer)(\d{2}|\d{4})$/gi.test(value);
}

function isShortSummerWithYearAtBeginning(value) {
  return /(\d{2}|\d{4})(f|w|s|su)$/gi.test(value) || /(\d{2}|\d{4})(fall|winter|spring|summer)$/gi.test(value);
}

function hasNumber(valueToCompare) {
  return /\d/.test(valueToCompare);
}

function hasLetter(valueToCompare) {
  return /[a-zA-Z]/i.test(valueToCompare);
}

function isLetter(valueToCompare) {
  return /^[a-zA-Z]/.test(valueToCompare);
}

function isNumber(valueToCompare) {
  return /^[0-9]/.test(valueToCompare);
}
