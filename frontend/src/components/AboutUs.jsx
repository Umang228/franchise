import React from 'react'
import Navbar from './admin/Navbar'
import CoursesNavbar from './admin/CoursesNavbar'

const AboutUs = () => {
  const images = [
    'images/edu.jpg']

  return (
    <div>
      <Navbar/>
      <CoursesNavbar/>

        <div class="img">
          <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{ width: '1278px', height: '700px' }} alt="image" />
        </div>
        <div class="text">
          <h1>About <span>Us</span></h1>
          <br />

          <div class="slogan"><p> History is not only created by swords and wars, it can also be created by the pen,
            as they say, "The pen is mightier than the sword".</p></div>
          <section>
            <div className="container">
              <div className="image-section">
                <img src="images/edu.jpg" alt="image" />
              </div>
              <div className="text-section">
                <div className="text-content"><p>
                  CA Atul Agarwal & CA Ajay Agarwal both emerged as the topper of CA Final,
                  creating a history of ICAI in May 2018 & May 2019 respectively at the age of 21. They were also the rank holders in CA Inter & CA Foundation.
                </p>  <br /><p>  All India Rank 1 CA Atul is also the only candidate in the history of ICAI to score the highest ever marks (83) in Audit paper. Being a Gold Medalist in Audit & DT, he scored 618/800 marks (77. 25%) in CA Final Exams.
                  </p>   <br /> <p>  All India Rank 1 CA Ajay topped the May 2019 CA Final with the highest marks in the history of ICAI in the last 70 years, following the lead of his brother CA Atul . He scored 650 marks (81.25%) in CA Final being the Gold Medalist in 4 subjects FR, SFM, DT and ISCA.
                  </p> <br /><p>   They achieved this double feat by relying on ICAI Study Material more than any other aspect of CA preparation. They believe that the concept of studying for 18 hours to crack CA is not a good idea. One has to be consistent throughout.
                  </p>     <br />  <p>  <b>To get a rank in CA Exams – ICAI Material, Consistent Revision & Mock Test are key to success.</b>
                  </p>
                </div>
              </div>
            </div>

          </section>

          <section>
            <div className="container">
              <div className="text-sectionTwo">
                <h1 style={{ textAlign: 'center' }}>Our <span>Vision</span></h1>
                <br />

                <div className="text-content"><p>We started AIR1CA with a vision in effectively engaging students,
                  ensuring their learning, and shaping their development.
                  We believe in providing real value to our students with no  false guidance and
                  show them the sure path to success. We want to revolutionize the existing
                  ecosystem in the CA Coaching Industry for teaching students.
                </p></div>
              </div>
              <div className="image-sectionTwo">
                <img src="images/edu.jpg" alt="image" />
              </div>
            </div>
          </section>

          <section>
            <div className="container">
              <div className="image-sectionThree">
                <img src="images/edu.jpg" alt="image" />
              </div>

              <div className="text-sectionThree">
                <h1 style={{ textAlign: 'center' }}>Our <span>Mission</span></h1>
                <br />
                <div className="text-content"><p>
                  Our mission is to get 100% results in CA Exams. We want that the deserving candidate does  not fail due to wrong guidance &amp; wrong coaching.
                  <br />
                  <br />
                  AIR1CA’s mission is to create and nurture a team of successful students who can be recognized as a swiss knife in the rapidly growing CA ecosystem. We want us to be identified as an innovative leader in the world of CA by enlightening our students which revolutionizes the way they study and therefore help them to stay ahead of their competition.
                </p></div>
              </div>
            </div>
          </section>
          <section>
            <div class="containerTwo">
              <div className="text-sectionFour">
                <h1 style={{ textAlign: 'center' }}>Our <span>Values</span></h1>
                <br />
                <div className="text-content">
                  <div className="one"> <p>Student Success<br /> Making our student successful is #1 on our priority list
                    nothing else is more importat for us than this</p> </div>
                  <div className="two"><p>  Continuous learning  <br />Continous and insatiable hunger for learning makes us and our students stay ahead of the competition.
                  </p></div>
                  <div className="three"><p>Trust & Accountability<br /> Trust is  glue thats hold us  all together and we also hold ourselves accountable for our actions and the associated results.
                  </p></div>
                  <div className="four"><p>Smart Study <br />Only hard work is not sufficient to succeed. We gotta do it with smartness. we believe in the formula of reading 1 book  10 times instaed of 10 books 1 time.
                  </p></div>
                  <div className="five"><p>Communication<br />We value and emphasize communication as we think it is the key to all the problems and it also help us understand ourselves, our students.
                  </p></div>
                <div className="six"><p>Leadership<br />  We believe in leadership as it is the art of getting someone else to do something you want done because he wants to do it.
                </p></div>
              </div>
            </div>
        </div>
         </section>
       </div>
    </div >
  )
}

export default AboutUs
