import React, { useState } from "react";
import GoogleAd from "./GoogleAd";

const gradePoints = { S: 10, A: 9, B: 8, C: 7, D: 6, E: 5, F: 0 };

const VITCGPACalculator = () => {
  const [courses, setCourses] = useState([{ credits: "", grade: "" }]);
  const [gpa, setGPA] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [prevCredits, setPrevCredits] = useState("");
  const [prevCGPA, setPrevCGPA] = useState("");
  const [currentCredits, setCurrentCredits] = useState("");
  const [estimatedGPA, setEstimatedGPA] = useState("");
  const [cgpa, setCGPA] = useState(null);

  const handleAddCourse = () => {
    setCourses([...courses, { credits: "", grade: "" }]);
  };

  const handleCalculateGPA = () => {
    let totalCredits = 0;
    let weightedSum = 0;

    courses.forEach(({ credits, grade }) => {
      if (credits && grade && gradePoints[grade] !== undefined) {
        totalCredits += parseInt(credits);
        weightedSum += parseInt(credits) * gradePoints[grade];
      }
    });

    if (totalCredits > 0) {
      const calculatedGPA = (weightedSum / totalCredits).toFixed(2);
      setGPA(calculatedGPA);
      generateSuggestion(parseFloat(calculatedGPA), totalCredits);
    }
  };

  const handleCalculateCGPA = () => {
    if (prevCredits && prevCGPA && currentCredits && estimatedGPA) {
      const prevCreds = parseInt(prevCredits);
      const currCreds = parseInt(currentCredits);
      const prevGPA = parseFloat(prevCGPA);
      const currGPA = parseFloat(estimatedGPA);

      if (prevCreds > 0 && currCreds > 0) {
        const totalCompletedCredits = prevCreds + currCreds;
        const totalCGPA = ((prevCreds * prevGPA) + (currCreds * currGPA)) / totalCompletedCredits;
        setCGPA(totalCGPA.toFixed(2));
      }
    }
  };

  const generateSuggestion = (gpa, totalCredits) => {
    let impactSuggestion = "";
    if (totalCredits > 0) {
      const alternativeGPA = Math.min(gpa + 0.5, 10).toFixed(2);
      impactSuggestion = `If you had received a higher grade in a high-credit course, your GPA could have been around ${alternativeGPA}.`;
    }

    if (gpa >= 9) {
      setSuggestion("Great job! Keep maintaining high grades to stay above 9. " + impactSuggestion);
    } else if (gpa >= 8.5) {
      setSuggestion("You're doing well! Aim for more A and S grades to boost your GPA. " + impactSuggestion);
    } else if (gpa >= 8) {
      setSuggestion("Good work! Try focusing on subjects with higher credit weight to improve. " + impactSuggestion);
    } else {
      setSuggestion("Consider improving grades in higher credit courses to have a bigger impact on GPA. " + impactSuggestion);
    }
  };

  return (
    <div className="p-6 space-y-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center">VIT CGPA CALCULATOR</h1>
      
      {/* GPA Calculation Section */}
      <h2 className="text-lg font-semibold">GPA Calculation</h2>
      {courses.map((course, index) => (
        <div key={index} className="flex space-x-4 items-center mb-2">
          <select 
            className="w-28 border p-2 rounded-lg"
            value={course.credits}
            onChange={(e) => {
              const newCourses = [...courses];
              newCourses[index].credits = e.target.value;
              setCourses(newCourses);
            }}
          >
            <option value="">Credits</option>
            {[...Array(20).keys()].map((num) => (
              <option key={num + 1} value={(num + 1).toString()}>{num + 1}</option>
            ))}
          </select>
          
          <select 
            className="w-28 border p-2 rounded-lg"
            value={course.grade}
            onChange={(e) => {
              const newCourses = [...courses];
              newCourses[index].grade = e.target.value;
              setCourses(newCourses);
            }}
          >
            <option value="">Grade</option>
            {Object.keys(gradePoints).map((grade) => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>
      ))}

      {/* Buttons for GPA Calculation */}
      <div className="flex space-x-4 justify-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleAddCourse}>Add Course</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleCalculateGPA}>Calculate GPA</button>
      </div>
      
      {/* Display Calculated GPA */}
      {gpa && (
        <div className="text-center">
          <p className="text-xl font-bold">Your GPA: {gpa}</p>
          <p className="text-sm text-gray-700 mt-1">{suggestion}</p>
        </div>
      )}

      {/* CGPA Calculation Section */}
      <h2 className="text-lg font-semibold mt-3">CGPA Calculation</h2>
      <div className="space-y-2">
        <input type="number" className="w-full border p-2 rounded-lg" placeholder="Total Completed Credits" onChange={(e) => setPrevCredits(e.target.value)} />
        <input type="number" className="w-full border p-2 rounded-lg" placeholder="Previous CGPA" onChange={(e) => setPrevCGPA(e.target.value)} />
        <input type="number" className="w-full border p-2 rounded-lg" placeholder="Current Semester Credits" onChange={(e) => setCurrentCredits(e.target.value)} />
        <input type="number" className="w-full border p-2 rounded-lg" placeholder="Estimated GPA" onChange={(e) => setEstimatedGPA(e.target.value)} />
        <button className="bg-purple-500 text-white px-4 py-2 rounded-lg" onClick={handleCalculateCGPA}>Calculate CGPA</button>
      </div>
      
      {/* Display Calculated CGPA */}
      {cgpa && (
        <div className="text-center mt-2">
          <p className="text-xl font-bold">Your CGPA: {cgpa}</p>
        </div>
      )}

      {/* Bottom Ad - Only keeping one ad at the bottom */}
      <div className="mt-4">
        <GoogleAd slot="1122334455" format="auto" responsive={true} />
      </div>
    </div>
  );
};

export default VITCGPACalculator;
