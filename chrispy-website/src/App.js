import './styles/App.css';
import ImageStack from './components/ImageStack';
import React, {useEffect} from 'react';
import $ from 'jquery';
import GitHubIcon from './resources/github-mark-white.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'

function App() {
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

  // IntersectionObserver for Image Stack animation
  // Note: the animation only runs once per page visit!
  useEffect(() => {
    const ScrollIntersectionObserver = new IntersectionObserver(ImageStack => {
      // there can only be one ImageStack!
      if (ImageStack[0].isIntersecting) {
        // movement animations
        document.querySelector(`#image-stack-image-one`).classList.add('image-animation');
        document.querySelector(`#image-stack-image-two`).classList.add('image-animation');
        document.querySelector(`#image-stack-image-three`).classList.add('image-animation');

        // opacity animation
        document.querySelector(`#image-stack`).classList.add('image-stack-opacity-animation')
      } 
    }, {threshold: 0.35});
    
    ScrollIntersectionObserver.observe(document.querySelector('#image-stack'));
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

    // add event listeners to the Experience & Projects list items (onClick)
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
        // $('#EP-viewer').css('align-content', 'unset');

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
          $('#EP-viewer-body').append("<a href = '" + project_repo_link + "'><div class = 'repo-button'><img src = '" + GitHubIcon + "' alt = 'The GitHub logo.'>" + project_repo_text + "</div></a>");
        }

        // make the close button visible
        $('#EP-close-button').css({'display': 'block', 'cursor': 'pointer'})
      })
    });

    // add the EventListener to the Experience & Projects close button
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
  }, []);


  return (
    <div className='App'>                                                       { /* Main React App */ }
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
              <p>•</p>
              <p>Programmer</p>
              <p>•</p>
              <p>IT Enthusiast</p>
            </div>

          </div>
          <div id = 'scroll-indicator' className = 'scroll-indicator-animation'>
            <p>Scroll</p>
            <p>↓</p>
          </div>
        </div>
        <div id = 'site-content'>                                               { /* Sections of Site */}
          <section id = 'who' className = 'custom-section'>
            <h1 className = 'section-header'>{'Who?'}</h1>
            <div id = 'who-container'>
              <ImageStack></ImageStack>
              <div id = 'who-captions'>
                <div id = 'who-1' className = 'who-caption'>
                  <p>I am a 22 year old Computer Science Graduate from Ontario Tech University, that is very passionate about technology and IT.</p>
                </div>

                <div id = 'who-2'  className = 'who-caption'>
                  <p>Ever since I was a kid, I have always loved technology. My dad would bring home old computers that I would spend hours tinkering with and trying to fix.</p>
                </div>

                <div id = 'who-3'  className = 'who-caption'>
                  <p>That means I have experience building computers, as well as maintaining them. I am capable of replacing broken components or upgrading computers whenever needed.</p>
                </div>

                <div id = 'who-4'  className = 'who-caption'>
                  <p>Along with my love for technology, I also love helping people — especially with their tech problems. Answering questions about tech, and helping people solve their tech issues is one of my favourite things to do.</p>
                </div>

                <div id='who-5' className = 'who-caption'>
                  <p></p>
                </div>
              </div>
            </div>
          </section>

          <section id = 'strengths' className = 'custom-section'>
            <h1 className = 'section-header'>{'Strengths:'}</h1>
            <div id = 'strengths-grid'>
              <div className = 'strength-card'>
                <h1>1. Tech Lover</h1>
                <p>I'm very passionate about technology and I love working with it.</p>
              </div>
              <div className = 'strength-card'>
                <h1>2. Fast Learner</h1>
                <p>Once I have experience with something, I can pick it up pretty quickly.</p>
              </div>
              <div className = 'strength-card'>
                <h1>3. Well Organized</h1>
                <p>University taught me to be very organized. I use calendars and reminders to stay on top of everything.</p>
              </div>
            </div>
          </section>

          <section id = 'location' className = 'custom-section'>
            <h1 className = 'section-header'>{'Location:'}</h1>
            <div id = 'location-grid'>
              <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11550.973037096404!2d-80.04491806641845!3d43.632702318292566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b74ed72ea5b13%3A0x5c9e652ed5296bf!2sActon%2C%20ON!5e0!3m2!1sen!2sca!4v1715658853445!5m2!1sen!2sca' title='Acton Map' allowFullScreen='' loading='lazy' referrerPolicy='no-referrer-when-downgrade'></iframe>
              <div id = 'location-captions'>
                <div className = 'location-caption'>
                  <p>I currently live in Acton, Ontario, which is a 20-25 minute drive from Guelph and Milton. However, I will be moving in the next 12 months.</p>
                </div>

                <div className = 'location-caption'>
                  <p>I have my G licence, a car, and I'm willing to drive long distances if needed. I am also comfortable with driving as a part of work duties.</p>
                </div>
              </div>
            </div>
          </section>

          <section id = 'skills-qualifications' className = 'custom-section'>
            <h1 className = 'section-header'>{'Skills & Qualifications:'}</h1>
            <p id = 'SQ-caption'>Click or tap on an item for more info</p>
            <div id = 'skills-qualifs-grid'>

              <div className = 'skills-qualifications-card'>
                <div>
                  <h1><b>Qualification:</b> Bachelor of Science (CS)</h1>
                  <div className = 'SQContent'>
                    <p>I achieved a Bachelor of Science (Honors) in Computer Science from Ontario Tech University. My time in university gave me a greater understanding of a wide range of technologies, from programming languages to network architectures. It also gave me a lot of experience working on a team, and taught me how to properly manage my time. Most importantly, it taught me how to learn.</p>
                  </div>
                  <button className = 'SQ-close-button'>✕</button>
                </div>
              </div>

              <div className = 'skills-qualifications-card'>
                <div>
                  <h1><b>Skill:</b> Programming</h1>
                  <div className = 'SQContent'>
                    I have experience in many different programming languages, such as: 
                    <div id = 'programming-languages'>
                      <ul>
                        <li>C/C++</li>
                        <li>Python</li>
                        <li>R</li>
                        <li>Java</li>
                        <li>Kotlin</li>
                        <li>SQL</li>
                      </ul>
                      <ul>
                        <li>
                          Web Development:
                          <ul>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>
                            JavaScript
                            <ul>
                              <li>React</li>
                              <li>jQuery</li>
                              <li>Vue</li>
                            </ul>
                          </li>
                          </ul>
                        </li>
                      </ul>
                    </div>

                    <p>Experience with these langauges, as well as foundational programming constructs, allows me to work on many different projects and codebases.</p>
                  </div>
                  <button className = 'SQ-close-button'>✕</button>
                </div>
              </div>
              
              <div className = 'skills-qualifications-card'>
                <div>
                  <h1><b>Skill:</b> Building and Maintaining Computers</h1>
                  <div className = 'SQContent'>
                    <p>I have experience working on and building tower computers. I've built my own personal computer, as well as worked on others computers for fun. I'm comfortable replacing any component in a tower, such as RAM, CPUs, HDDs/SSDs, and more.</p>

                    <p>I have also worked on laptops, having done various levels of maintenance on my own personal laptops (from replacing RAM and SSDs to removing and replacing the cooler).</p>
                  </div>
                  <button className = 'SQ-close-button'>✕</button>
                </div>
              </div>

              <div className = 'skills-qualifications-card'>
                <div>
                  <h1><b>Skill:</b> Data Science</h1>
                  <div className = 'SQContent'>
                    <p>My knowledge of data science techniques and algorithms allows me to efficiently gather and analyze data, in order to gain a better understanding of patterns and trends.</p>

                    <p>I also have experience in data visualization, specifically with R and Python. I can create insightful, ethical, and visually appealing graphics that can be used for data analysis.</p>
                  </div>
                  <button className = 'SQ-close-button'>✕</button>
                </div>
              </div>

              <div className = 'skills-qualifications-card'>
                <div>
                  <h1><b>Skill:</b> Teamwork and Leadership</h1>
                  <div className = 'SQContent'>
                    <p>I have experience working with and leading teams in various projects. In university, I was often the one to take the leadership role and coordinate teams to meet deadlines and work together in an organized and productive way.</p>

                    <p>It is my intention to bring those same team-oriented and leadership qualities to any position I hold.</p>
                  </div>
                  <button className = 'SQ-close-button'>✕</button>
                </div>
              </div>

              <div className = 'skills-qualifications-card'>
                <div>
                  <h1><b>Skill:</b> Operating Systems</h1>
                  <div className = 'SQContent'>
                    <p>I have extensive experience with Windows, from basic configuration like configuring networks, updating drivers, installing software etc., to more advanced troubleshooting techniques like using the Windows Event Viewer or Task Scheduler.</p>

                    <p>I also have experience with Linux and macOS, and I'm able to use both to a reasonable effectiveness.</p>
                  </div>
                  <button className = 'SQ-close-button'>✕</button>
                </div>
              </div>

              <div className = 'skills-qualifications-card'>
                <div>
                  <h1><b>Skill:</b> Virtualization</h1>
                  <div className = 'SQContent'>
                    <p>I have experience with virtualization software like VMWare and VirtualBox, and have some experience with Docker. I can effectively work with all three to configure and work with VMs/Containers.</p>
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
                      <li><b>Accountability</b>: it helped me learn to be accountable for my work, and take responsibility for my successes <b>and</b> my failures.</li>
                      <li><b>Teamwork</b>: it taught me how to work on a team in a real-world environment, with real-world consequences.</li>
                      <li><b>Preparedness</b>: it allowed me to better understand the meaning of preparedness, and how that applies to a working environment.</li>
                    </ul>
                  </div>
                </div>

                <div className = 'EP-item' id = 'chrispywebsite'>
                  <h1>Personal Website</h1>
                  <div className = 'EP-item-body'>
                    <p>The website you're reading was programmed entirely by <b>me</b> —  with help from the internet, of course.</p>

                    <p> I thought that, instead of <i>just</i> handing in a PDF resume, or using a website template, I should create my own. And this is the first site that I've ever made, besides a few smaller school projects.</p>

                    <p>I figured this would be a good showcase of my programming skills, as well as my ability to problem solve.</p>

                    <p>If you want to view the source code, it's available in the GitHub repository linked below.</p>
                  </div>
                  <p className = 'PRT'>ChrispyWebsite GitHub</p>
                  <p className = 'PRL'>https://github.com/ChrispyJohnson1/ChrispyWebsite</p>
                </div>

                {
                  /* Template: */
                  /* <div className = 'EP-item' id = ''>
                    <h1></h1>
                    <div className = 'EP-item-body'>
                      
                    </div>
                  </div> */
                }
              </div>
              <div id = 'EP-viewer'>  {/* This will be filled by the EventViewer on the EP-items */}
                <button id = 'EP-close-button'>✕</button>
                <p id = 'EP-viewer-placeholder'>
                  Interact with an item to see more information!
                </p>
              </div>
            </div>
          </section>

          <section id = 'resume' className = 'custom-section'>
            <div id = 'resume-container'>
                <div className = 'resume-section' id = 'resume-link'>
                  <h1>Download my resume here:</h1>
                  <a href = 'https://drive.google.com/file/d/1lxhWgMayt0LctZ0N5nxHW-Xx92pUzYDv/view?usp=drive_link' target='blank'>
                    <div id = 'resume-download-button'>
                      <FontAwesomeIcon icon = {faDownload} id = 'download-icon' />   {/* Download Icon */}
                      Download
                      </div>
                  </a>
                </div>
                <div className = 'resume-section' id = 'socials-content'>
                  <h1>Socials:</h1>
                  <div id = 'socials-links'>
                    {/* LinkedIn Link */}
                    <a href = 'https://linkedin.com/in/chrispyjohnson/'>
                      <div className = 'social-button' id = 'linkedin'>
                        <FontAwesomeIcon icon={faLinkedinIn} className = 'social-icon' />  {/* LinkedIn Icon */}
                        LinkedIn
                      </div>
                    </a>

                    {/* GitHub Link */}
                    <a href = 'https://github.com/chrispyjohnson1/'>
                      <div className = 'social-button' id = 'github'>
                        <FontAwesomeIcon icon={faGithub} className = 'social-icon' />  {/* GitHub Icon */}
                        GitHub
                      </div>
                    </a>

                    {/* Twitter Link */}
                    <a href = 'https://twitter.com/chrispyjohnson_'>
                      <div className = 'social-button' id = 'twitter'>
                        <FontAwesomeIcon icon={faTwitter} className = 'social-icon' />  {/* Twitter Icon */}
                        Twitter
                      </div>
                    </a>
                  </div>
                </div>
            </div>
          </section>
        </div>
        <div id = 'site-footer'>                                                { /* Site Footer */ }
          <p>Version 1.1.4</p>
          <p>Designed and created by Christopher Johnson</p>
          <p>Last updated August 11th, 2024</p>
        </div>
    </div>
  );
};

export default App;
