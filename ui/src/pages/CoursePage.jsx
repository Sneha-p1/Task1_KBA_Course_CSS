import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { getUserType } from './LoginPage';
import '../App.css'; 
const CoursePage = () => {

    // const [course, setCourse] = useState(null);
    // const [loading, setLoading] = useState(true)
    // const {id} = useParams()
    // // console.log(courses)
    // useEffect(() => {
    //     const fetchCourse = async () => {
    //         try {
    //             const res = await fetch(`http://localhost:5000/courses/${id}`);
    //             const data = await res.json()
    //             setCourse(data)
    //         } catch (error) {
    //             console.log('error', error)
    //         } finally {
    //             setLoading(false)
    //         }
    //     };
    //     fetchCourse()
    // }, [])

    const course = useLoaderData();
    const { id } = useParams()
    const navigate = useNavigate()
    const userType = getUserType()

    const deleteCourse = async () => {
        const confirm = window.confirm('Sure want to delete ?')
        if (!confirm) return;
        const res = await fetch(`/api/courses/${id}`,
            { method: 'DELETE' }
        )
        navigate('/courses')
    }

    return (
        <>
            {/* {loading?<h1>Loading ...</h1>:      */}
            <div className="coursepage-container">
                <div className="pageinnerContainer">

                    <section>
                        <a className="pagebackLink" href='/courses'>  Back to Courses</a>
                    </section>

                    <div className="pagecard">
                        <img
                            src="./banner-kba.png"
                            alt="Course Thumbnail"
                            className="pageimg"
                        />
                        <div className="pagecontent">
                            <div className="pagetitleSection">
                                <h1 className="pagetitle">
                                    {course.title}
                                </h1>
                                <div className="priceButtonSection">
                                    <span className="price">
                                        {course.price}
                                    </span>
                                    <button className="pagebutton">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h2 className="pageheading">
                                    Description
                                </h2>
                                <p>{course.description} </p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <h2 className="pageheading">
                                    Prerequisites
                                </h2>
                                <ul className="pagelist">
                                    <li>Basic understanding of blockchain technology</li>
                                    <li>Familiarity with programming languages</li>
                                    <li>Internet access</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="pageheading">
                                    Features
                                </h2>
                                <ul className="pagelist">
                                    <li>40 hours of content</li>
                                    <li>Certificate of completion</li>
                                    <li>Access to community forums</li>
                                    <li>Downloadable resources</li>
                                    <li>24/7 support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="actions">
                    {userType == 'admin' && <>

                        <Link to={`/edit-course/${id}`} className="action-button edit-button">Edit Course</Link>
                        <button onClick={() => deleteCourse(id)} className="action-button remove-button">Remove Course</button>

                    </>}


                </div>
            </div>
            {/* } */}


        </>
    )
};

const courseLoader = async ({ params }) => {
    const res = await fetch(`/api/courses/${params.id}`);
    const data = await res.json()
    return data;
}
// export default CoursePage
export { CoursePage as default, courseLoader }