import './App.css';
import DynamicToC from './components/DynamicTOC';
import ImageStack from './components/ImageStack';
import React, {useEffect} from 'react';

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

            <section id = 'qualifications' className = 'custom-section'>
              <h1>{'Qualifications:'}</h1>
            </section>

            <section id = 'experience' className = 'custom-section'>
              <h1>{'Experience:'}</h1>
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
}

export default App;
