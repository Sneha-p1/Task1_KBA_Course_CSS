import React, { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom';
import '../App.css'

const EditCoursePage = () => {

  const course = useLoaderData()

  const [title, setTitle] = useState(course.title);
  const [courseId, setCourseId] = useState(course.courseId)
  const [type, setType] = useState(course.type);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(course.price)
  const navigate = useNavigate()

  const submitForm = (e) => {
    e.preventDefault()
    const updatedCourse = {
      title,
      courseId,
      type,
      description,
      price
    }
   const res = updateCourseSubmit(updatedCourse)
   navigate(`/courses/${courseId}`)
  }

  const updateCourseSubmit = async (updatedCourse) =>{
    const res = await fetch(`/api/courses/${courseId}`, {
      method: 'PUT',
      headers:{
        'Content-Type' : "application/json",
      },
      body: JSON.stringify(updatedCourse)
    })
    return res;
  }

  return (
    <>

      <section className="Editsection">
        <div className="Editcontainer">
          <div className="Editform-container ">

            <form  onSubmit={submitForm}>
              <h2 className="Editform-title">
                Update Course
              </h2>

              <div className="Editform-group">
                <label className="Editform-label">
                  Course Name
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="Editinput-field"
                  placeholder="eg. Certified Blockchain Associate"
                  required
                  value={title}
                  onChange={(e)=> setTitle(e.target.value)}

                />
              </div>


              <div className="Editform-group">
                <label
                  htmlFor="type"
                  className="Editform-label"
                >
                  Course Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="Editselect-field"
                  required
                  value={type}
                  onChange={(e)=> setType(e.target.value)}

                >
                  <option value="Self-Paced">Self-Paced</option>
                  <option value="Instructor-Led">Instructor-Led</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="Editform-group">
                <label
                  htmlFor="description"
                  className="Editform-label"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="Edittextarea-field"
                  rows="4"
                  placeholder="Small description on the course"
                  value={description}
                  onChange={(e)=> setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="Editform-group">
                <label
                  htmlFor="type"
                  className="Editform-label"
                >
                  Price
                </label>
                <select
                  id="price"
                  name="price"
                  className="Editselect-field"
                  required
                  value={price}
                  onChange={(e)=> setPrice(e.target.value)}
                >
                  <option value="Rs.5000">Rs.5000</option>
                  <option value="Rs.3500">Rs.3500</option>
                  <option value="Rs.15000">Rs.15000</option>
                </select>
              </div>

              <div>
                <button
                  className="Editbutton"
                  type="submit"
                >
                  Update Course
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default EditCoursePage