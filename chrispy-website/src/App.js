import './App.css';
import DynamicToC from './components/DynamicTOC';
import ImageStack from './components/ImageStack';
import React, {useEffect} from 'react';
import $ from 'jquery';
import GitHubIcon from './resources/github-mark-white.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'

function App() {

  // Defines the section information used within the DynamicToC
  // TODO: Automate this!
  const SectionData = [
    {
      s_id: 'who',
      s_name: 'Who?'
    },
    {
      s_id: 'strengths',
      s_name: 'My Strengths'
    },
    {
      s_id: 'location',
      s_name: 'Location'
    },
    {
      s_id: 'skills-qualifications',
      s_name: 'My Skills & Qualifications'
    },
    {
      s_id: 'experience-projects',
      s_name: 'My Work'
    },
    {
      s_id: 'resume',
      s_name: 'Resume & Socials'
    }
  ]

  // IntersectionObserver for the bouncing scroll indicator in the "hero" section
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
  }, []);

  // Event Listener for the expanding card grid in the Skills and Qualifications section
  // source: https://chriscoyier.net/2023/04/11/expanding-grid-cards-with-view-transitions/
  useEffect(() => {
    const SQcards = document.querySelectorAll('.skills-qualifications-card');
    const SQCloseButtons = document.querySelectorAll('.SQ-close-button');
  
    // add event listeners to the Skill/Qualification cards (onClick)
    SQcards.forEach((SQcard) => {
      SQcard.addEventListener('click', () => {
        SQcards.forEach((SQcard) => {
          SQcard.classList.remove('featured');
        });
    
        SQcard.classList.add('featured');
      });
    });
  
    // add event listeners to the close buttons for the Skill/Qualification cards (onClick)
    SQCloseButtons.forEach((SQCloseButton) => {
      SQCloseButton.addEventListener('click', (event) => {
        event.stopPropagation();
  
        SQcards.forEach((SQcard) => {
          SQcard.classList.remove('featured');
        });
      });
    });
  }, []);

  // Event Listener for displaying Project and Experience information in the 'EP-viewer' div
  useEffect(() => {
    const EPItems = document.querySelectorAll('.EP-item');  // the content shown in the 'EP-list' section
    const EPCloseButton = document.querySelector('#EP-close-button');

    // add event listeners to the EP list items (onClick)
    EPItems.forEach((EPItem) => {
      EPItem.addEventListener('click', (event) => {
        // select the heading and paragraph text from the current EP Item
        var EPItem_h1 = event.currentTarget.querySelector('h1').textContent            /* header element */
        var EPItem_body_items = event.currentTarget.querySelector('.EP-item-body').childNodes  /* elements */
        
        /* project repo text */
        var project_repo_text;
        event.currentTarget.querySelector('.PRT') != null ? project_repo_text = event.currentTarget.querySelector('.PRT').textContent : project_repo_text = null;

        /* project repo link */
        var project_repo_link;
        event.currentTarget.querySelector('.PRL') != null ? project_repo_link = event.currentTarget.querySelector('.PRL').textContent : project_repo_link = null;

        // removed "featured" class from all EP-items
        EPItems.forEach((EPItem) => {
          EPItem.classList.remove('featured');
        });

        // add the 'featured' class to the EP-item
        var EPItem_id = event.currentTarget.getAttribute('id')
        $('#' + EPItem_id).addClass('featured')
        
        // remove the title, text, and repo button from EP-viewer if they exist
        $('#EP-viewer-title').remove();
        $('#EP-viewer-body').remove();
        $('.repo-button').remove();

        // hide the placeholder
        $('#EP-viewer-placeholder').attr('class', 'hide-EPV-placeholder');
        
        // change the vertical alignment within the EP-viewer container
        // (for stylistic purposes)
        $('#EP-viewer').css('align-content', 'unset');

        // append the title and content to the EP-viewer
        $('#EP-viewer').append("<h1 id = 'EP-viewer-title'>" + EPItem_h1 + ":</h1>");
        $('#EP-viewer').append("<div id = 'EP-viewer-body'></div>") /* Add the body, then append to it */
        EPItem_body_items.forEach((EPItem_body_item) => {
          /* MUST be cloned, otherwise the element is removed when it is appended! */
          $('#EP-viewer-body').append(EPItem_body_item.cloneNode(true))
        });

        // if the text and link are included in the EP-item, render a link to the repository
        // in the EP-viewer
        if (project_repo_text != null && project_repo_link != null) {
          console.log(project_repo_text)
          $('#EP-viewer').append("<a href = '" + project_repo_link + "'><div class = 'repo-button'><img src = '" + GitHubIcon + "'>" + project_repo_text + "</div></a>");
        }

        // make the close button visible
        $('#EP-close-button').css({'display': 'block', 'cursor': 'pointer'})
      })
    });

    EPCloseButton.addEventListener('click', (event) => {
      event.stopPropagation();

      // removed "featured" class from all EP-items
      EPItems.forEach((EPItem) => {
        EPItem.classList.remove('featured');
      });
      
      // remove the title, text abd repo button from EP-viewer
      $('#EP-viewer-title').remove();
      $('#EP-viewer-body').remove();
      $('.repo-button').remove();

      // set the vertical alignment to center content
      $('#EP-viewer').removeAttr('style');

      // re-enable the placeholder
      $('#EP-viewer-placeholder').removeClass('hide-EPV-placeholder');

      // make the close button invisible again
      $('#EP-close-button').removeAttr('style');
    });


    // add event listeners to the 
  }, []);


  return (
    <div className='App'>                                                       { /* Main React App */ }
      <div id = 'site-wrapper'>                                                 { /* Contains the site content */}
        <div id = 'site-header'>                                                { /* Site Header */ }
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
              <h1 className = 'section-header'>{'Who?'}</h1>
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
              <h1 className = 'section-header'>{'Strengths:'}</h1>
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
              <h1 className = 'section-header'>{'Location:'}</h1>
              <div id = 'location-grid'>
                <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11550.973037096404!2d-80.04491806641845!3d43.632702318292566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b74ed72ea5b13%3A0x5c9e652ed5296bf!2sActon%2C%20ON!5e0!3m2!1sen!2sca!4v1715658853445!5m2!1sen!2sca' title='Acton Map' allowFullScreen='' loading='lazy' referrerPolicy='no-referrer-when-downgrade'></iframe>
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
              <h1 className = 'section-header'>{'Skills & Qualifications:'}</h1>
              <div id = 'skills-qualifs-grid'>

                <div className = 'skills-qualifications-card'>
                  <div>
                    <h1><u>Qualification:</u> Bachelor of Science (CS)</h1>
                    <div className = 'SQContent'>
                      <p>I achieved my Bachelor of Science (Honors) in Computer Science from Ontario Tech University. It gave me a much greater understanding of how to work with many aspects of technology, from programming languages to network architectures. It also gave me a lot of experience working on a team, and taught me how to properly manage my time. Most importantly, it taught me how to learn.</p>
                    </div>
                    <button className = 'SQ-close-button'>✕</button>
                  </div>
                </div>

                <div className = 'skills-qualifications-card'>
                  <div>
                    <h1><u>Skill:</u> Programming</h1>
                    <div className = 'SQContent'>
                      I have experience in many different programming languages, such as: 
                      <div id = 'programming-languages'>
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
                    <button className = 'SQ-close-button'>✕</button>
                  </div>
                </div>
                
                <div className = 'skills-qualifications-card'>
                  <div>
                    <h1><u>Skill:</u> Building and Maintaining Computers</h1>
                    <div className = 'SQContent'>
                      <p>I have experience working on and building tower computers. I've built my own personal computer, as well as worked on others computers for fun. I'm comfortable replacing any component in a tower, such as RAM, GPUs, disk drives, and more.</p>

                      <p>I have also worked on laptops, having done various levels of maintenance on my own personal laptops (from replacing RAM and SSDs to removing and replacing the cooler).</p>
                    </div>
                    <button className = 'SQ-close-button'>✕</button>
                  </div>
                </div>

                <div className = 'skills-qualifications-card'>
                  <div>
                    <h1><u>Skill:</u> Data Science</h1>
                    <div className = 'SQContent'>
                      <p>My knowledge of data science techniques and algorithms allows me to efficiently gather and analyze data, in order to gain a better understanding of patterns and trends.</p>

                      <p>I also have experience in data visualization, specifically with R. I can create insightful, ethical, and visually appealing graphics that can be used for data analysis.</p>
                    </div>
                    <button className = 'SQ-close-button'>✕</button>
                  </div>
                </div>

                <div className = 'skills-qualifications-card'>
                  <div>
                    <h1><u>Skill:</u> Teamwork and Leadership</h1>
                    <div className = 'SQContent'>
                      <p>I have experience working with and leading teams in various projects. In university, I was often the one to take the leadership role and coordinate teams to meet deadlines and work together in a organized and productive way.</p>

                      <p>It is my intention to bring those same team-oriented and leadership qualities to any position I hold.</p>
                    </div>
                    <button className = 'SQ-close-button'>✕</button>
                  </div>
                </div>

                <div className = 'skills-qualifications-card'>
                  <div>
                    <h1><u>Skill:</u> Operating Systems</h1>
                    <div className = 'SQContent'>
                      <p>I have extensive experience with Windows, from basic configuration like configuring networks, updating drivers, installing software etc., to more advanced troubleshooting techniques like using the Windows Event Viewer or Task Scheduler.</p>

                      <p>I also have experience with Linux, and I'm able to use it to a reasonable effectiveness.</p>
                    </div>
                    <button className = 'SQ-close-button'>✕</button>
                  </div>
                </div>

                <div className = 'skills-qualifications-card'>
                  <div>
                    <h1><u>Skill:</u> Virtualization</h1>
                    <div className = 'SQContent'>
                      <p>I have experience with virtualization software like VMWare and VirtualBox, and have some experience with Docker, and can effectively work with all three to configure and work with VMs/Containers.</p>
                    </div>
                    <button className = 'SQ-close-button'>✕</button>
                  </div>
                </div>
              </div>
            </section>

            <section id = 'experience-projects' className = 'custom-section'>
              <h1 className = 'section-header'>{'Projects & Experience:'}</h1>
              <div id = 'EP-grid'>
                <div id = 'EP-list'>
                  <div className = 'EP-item' id = 'work-experience'>
                    <h1>Work Experience</h1>
                    <div className = 'EP-item-body'>
                      <p>I have some work experience from a summer job I held between university semesters. While this experience may not be fully applicable to the position I'm applying for, I feel that it has prepared me in three key ways:</p>
                      <ul>
                        <li><b><u>Accountability</u></b>: it helped me learn to be accountable for my work, and take responsibility for my successes <u>and</u> my failures.</li>
                        <li><b><u>Teamwork</u></b>: it taught me how to work on a team in a real-world environment, with real-world consequences.</li>
                        <li><b><u>Preparedness</u></b>: it allowed me to better understand the meaning of preparedness, and how that applies to a working environment. An example of this would be how important punctuality is in a work setting.</li>
                      </ul>
                    </div>
                  </div>

                  <div className = 'EP-item' id = 'chrispywebsite'>
                    <h1>ChrispyWebsite</h1>
                    <div className = 'EP-item-body'>
                      <p>The website you're reading right now was programmed entirely by <b>me</b> -- with help from the internet, of course.</p>

                      <p> I decided that instead of just handing in a PDF resume, or using some website template, I should create my own. This is the first site that I've ever made, besides a few smaller school projects.</p>

                      <p>I figured this would be a good showcase of my programming skills, as well as my ability to problem solve. If you want to view the source code, it's available in the GitHub repository linked below.</p>
                    </div>
                    <p className = 'PRT'>ChrispyWebsite GitHub</p>
                    <p className = 'PRL'>https://github.com/ChrispyJohnson1/ChrispyWebsite</p>
                  </div>

                  {/* <div className = 'EP-item' id = ''>
                    <h1></h1>
                    <div className = 'EP-item-body'>
                      
                    </div>
                  </div> */}
                </div>
                <div id = 'EP-viewer'>  {/* This will be filled by the EventViewer on the EP-items */}
                  <button id = 'EP-close-button'>✕</button>
                  <p id = 'EP-viewer-placeholder'>
                    Interact with an item for more information!
                  </p>
                </div>
              </div>
            </section>

            <section id = 'resume' className = 'custom-section'>
              <div id = 'resume-container'>
                  <div className = 'resume-section' id = 'resume-link'>
                    <h1>Download my resume here:</h1>
                    <a href = ''>
                      <div id = 'resume-download-button'>
                        <FontAwesomeIcon icon = {faDownload} id = 'download-icon' />   {/* Download Icon */}
                        Resume Download
                        </div>
                    </a>
                  </div>
                  <div className = 'resume-section' id = 'socials-content'>
                    <h1>Socials:</h1>
                    <div id = 'socials-links'>
                      {/* LinkedIn Link */}
                      <a href = ''>
                        <div className = 'social-button' id = 'linkedin'>
                          <FontAwesomeIcon icon={faLinkedinIn} className = 'social-icon' />  {/* LinkedIn Icon */}
                          LinkedIn
                        </div>
                      </a>

                      {/* GitHub Link */}
                      <a href = 'https://github.com/chrispyjohnson1/'>
                        <div className = 'social-button' id = 'github'>
                          <FontAwesomeIcon icon={faGithub} className = 'social-icon' />  {/* LinkedIn Icon */}
                          GitHub
                        </div>
                      </a>

                      {/* Twitter Link */}
                      <a href = ''>
                        <div className = 'social-button' id = 'twitter'>
                          <FontAwesomeIcon icon={faTwitter} className = 'social-icon' />  {/* LinkedIn Icon */}
                          Twitter
                        </div>
                      </a>
                    </div>
                  </div>
              </div>
            </section>
          </div>
          
          {/* <DynamicToC SectionData={SectionData}></DynamicToC>                  { /* Table of Contents */ }  */}
        </div>
        <div id = 'site-footer'>                                                { /* Site Footer */ }
          <p>Version 1.0</p>
          <p>Designed and created by Christopher Johnson</p>
        </div>
      </div>
    </div>
  );
};

export default App;
