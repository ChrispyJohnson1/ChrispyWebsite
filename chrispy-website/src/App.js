import './App.css';
import DynamicToC from './components/DynamicTOC';
import ImageStack from './components/ImageStack';
import React, {useEffect, useState} from 'react';

function App() {

  // Defines the section information used within the DynamicToC
  // TODO: Automate this!
  const SectionData = [
    {
      s_id: 'info',
      s_name: 'Information'
    },
    {
      s_id: 'qualifications',
      s_name: 'Qualifications'
    },
    {
      s_id: 'experience',
      s_name: 'Experience'
    },
    {
      s_id: 'resume',
      s_name: 'Resume'
    }
  ]

  // Used for the bouncing scroll indicator in the "hero" section
  useEffect(() => {
    const ScrollIntersectionObserver = new IntersectionObserver(Sections => {
        Sections.forEach(Section => {
            if (Section.intersectionRatio > 0) {
                document.querySelector(`#scroll-indicator`).classList.remove('scroll-indicator-animation');
            } else {
              document.querySelector(`#scroll-indicator`).classList.add('scroll-indicator-animation');
            }
        });
    });
    
    ScrollIntersectionObserver.observe(document.querySelector('#who'));
  });

  // Used for the expanding card grid in the Skills and Qualifications section
  // source: https://chriscoyier.net/2023/04/11/expanding-grid-cards-with-view-transitions/
  useEffect(() => {
    const SQcards = document.querySelectorAll('.skills-qualifs-card');
    const closeButtons = document.querySelectorAll('.SQCloseButton');
  
    SQcards.forEach((SQcard) => {
      SQcard.addEventListener("click", () => {
        SQcards.forEach((SQcard) => {
          SQcard.classList.remove('featured');
        });
    
        SQcard.classList.add('featured');
      });
    });
  
    closeButtons.forEach((closeButton) => {
      closeButton.addEventListener("click", (event) => {
        event.stopPropagation();
  
        SQcards.forEach((SQcard) => {
          SQcard.classList.remove('featured');
        });
      });
    });
  });


  return (
    <div className='App'>                                                       { /* Main React App */ }
      <div id = 'site-wrapper'>                                                 { /* Contains the site content */}
        <div id = 'site-header'>                                                { /* Site Header */ }
          {/* <img id = 'hero-image' src='https://avatars.githubusercontent.com/u/72899896?v=4' alt='ChrispyJohnson PFP'></img>  !PLACEHOLDER  */}
          <div id = 'hero-content'>

            {/* This is used when the viewport width is sufficiently wide */}
            <p id = 'hero-title'>Christopher Johnson</p>

            {/* This splits the first and last name into two lines, and is used when the 
                viewport width is too small for the name fit. */}
            <div>
              <p className = 'hero-title-split'>Christopher </p>
              <p className = 'hero-title-split'>Johnson</p>
            </div>
            
            <div id = 'hero-tags'>
              <p>Computer Science Graduate</p>
              <p>|</p>
              <p>Programmer</p>
              <p>|</p>
              <p>IT Specialist</p>
            </div>
          </div>
          <div id = 'scroll-indicator' className = 'scroll-indicator-animation'>
            <p>Scroll</p>
            <p>↓</p>
          </div>
        </div>
        <div id = 'site-grid'>
          <div>                                                                 { /* Sections of Site */}
            <section id = 'who' className = 'custom-section'>
              <h1>{'Who:'}</h1>
              <div id = 'who-container'>
                <ImageStack></ImageStack>
                <div id = 'who-captions'>
                  <div id = 'who-1' className = 'who-caption'>
                    <p>I am a 21 year old Computer Science Graduate from Ontario Tech University, that is very passionate about all things technology and IT.</p>
                  </div>

                  <div id = 'who-2'  className = 'who-caption'>
                    <p>I love helping people, especially with their technology issues. So much so, that I was jokingly known as the "IT Guy" in school.</p>
                  </div>

                  <div id = 'who-3'  className = 'who-caption'>
                    <p>Ever since I was a kid, I have always loved technology. My dad would bring home old computers that I would spend hours tinkering with and trying to fix.</p>
                  </div>

                  <div id = 'who-4'  className = 'who-caption'>
                    <p>That means I have experience building computers, as well as maintaining them. I am capable of replacing broken components or upgrading computers whenever needed.</p>
                  </div>
                </div>
              </div>
            </section>

            <section id = 'strengths' className = 'custom-section'>
              <h1>{'Strengths:'}</h1>
              <div id = 'strengths-grid'>
                <div className = 'strength-card'>
                  <h1>1. Tech-lover</h1>
                  <p>I'm very passionate about technology and I'm well-versed in many aspects of it.</p>
                </div>
                <div className = 'strength-card'>
                  <h1>2. Fast Learner</h1>
                  <p>With tech, I learn very quickly. Once I have experience, I can pick it up with ease.</p>
                </div>
                <div className = 'strength-card'>
                  <h1>3. Highly Organized</h1>
                  <p>University taught be to be very organized. I use calendars and reminders to stay on top of any situation.</p>
                </div>
              </div>
            </section>

            <section id = 'location' className = 'custom-section'>
              <h1>{'Location:'}</h1>
              <div id = 'location-grid'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11550.973037096404!2d-80.04491806641845!3d43.632702318292566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b74ed72ea5b13%3A0x5c9e652ed5296bf!2sActon%2C%20ON!5e0!3m2!1sen!2sca!4v1715658853445!5m2!1sen!2sca" title='Acton Map' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                <div id = 'location-captions'>
                  <div className = 'location-caption'>
                    <p>I live in Acton, Ontario, which is only a 20-25 minute drive from Guelph and Milton.</p>
                  </div>

                  <div className = 'location-caption'>
                    <p>I have my G licence, a car, and I'm willing to drive long distances if required.</p>
                  </div>
                </div>
              </div>
            </section>

            <section id = 'skills-qualifications' className = 'custom-section'>
              <h1>{'Skills & Qualifications:'}</h1>
              <div id = 'skills-qualifs-grid'>

                <div className = 'skills-qualifs-card'>
                  <div>
                    <h1><u>Qualification:</u> Bachelor of Science (CS)</h1>
                    <div className = 'SQContent'>
                      <p>I achieved my Bachelor of Science (Honors) in Computer Science from Ontario Tech University. It gave me a much greater understanding of how to work with many aspects of technology, from programming languages to network architectures. It also gave me a lot of experience working on a team, and taught me how to properly manage my time. Most importantly, it taught me how to learn.</p>
                    </div>
                    <button className = 'SQCloseButton'>✕</button>
                  </div>
                </div>

                <div className = 'skills-qualifs-card'>
                  <div>
                    <h1><u>Skill:</u> Programming</h1>
                    <div className = 'SQContent'>
                      I have experience in many different programming languages, such as: 
                      <div id = "programming-languages">
                        <ul>
                          <li>C/C++</li>
                          <li>Python</li>
                          <li>Java</li>
                          <li>Kotlin</li>
                        </ul>
                        <ul>
                          <li>HTML + CSS + JavaScript</li>
                          <li>R</li>
                          <li>SQL</li>
                        </ul>
                      </div>

                      <p>Experience with these langauges, as well as foundational programming constructs, allows me to work on many different projects and codebases.</p>
                    </div>
                    <button className = 'SQCloseButton'>✕</button>
                  </div>
                </div>

                <div className = 'skills-qualifs-card'>
                  <div>
                    <h1><u>Skill:</u> Data Science</h1>
                    <div className = 'SQContent'>
                      <p>My knowledge of data science techniques and algorithms allows me to efficiently gather and analyze data, in order to gain a better understanding of patterns and trends.</p>

                      <p>I also have experience in data visualization, specifically with R. I can create insightful, ethical, and visually appealing graphics that can be used for data analysis.</p>
                    </div>
                    <button className = 'SQCloseButton'>✕</button>
                  </div>
                </div>

                <div className = 'skills-qualifs-card'>
                  <div>
                    <h1><u>Skill:</u> Teamwork</h1>
                    <div className = 'SQContent'>
                      <p>I have experience working with and leading teams in various projects. In university, I was often the one to take the leadership role, and coordinate teams to meet deadlines and work together in a productive way.</p>
                    </div>
                    <button className = 'SQCloseButton'>✕</button>
                  </div>
                </div>

                <div className = 'skills-qualifs-card'>
                  <div>
                    <h1><u></u></h1>
                    <div className = 'SQContent'>

                    </div>
                    <button className = 'SQCloseButton'>✕</button>
                  </div>
                </div>

                <div className = 'skills-qualifs-card'>
                  <div>
                    <h1><u></u></h1>
                    <div className = 'SQContent'>

                    </div>
                    <button className = 'SQCloseButton'>✕</button>
                  </div>
                </div>
              </div>
            </section>

            <section id = 'experience-projects' className = 'custom-section'>
              <h1>{'Projects & Experience:'}</h1>
            </section>

            <section id = 'resume' className = 'custom-section'>
              <h1>{'Resume:'}</h1>
            </section>
          </div>
          
          {/* <DynamicToC SectionData={SectionData}></DynamicToC> */}                  { /* Table of Contents */ } 
        </div>
        <div id = 'site-footer'>                                                { /* Site Footer */ }

        </div>
      </div>
    </div>
  );
};

export default App;
