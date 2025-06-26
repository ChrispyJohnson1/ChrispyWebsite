import './styles/App.css';
import ImageStack from './components/ImageStack';
import React, {useEffect} from 'react';
import $ from 'jquery';
import GitHubIcon from './resources/github-mark-white.png'
import GoogleDriveIcon from './resources/google-drive-mark.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faBluesky, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

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
        
        // Used if the link is a GitHub repository:

        /* project repo text */
        var project_repo_text;
        event.currentTarget.querySelector('.PRT') != null ? project_repo_text = event.currentTarget.querySelector('.PRT').textContent : project_repo_text = null;

        /* project repo link */
        var project_repo_link;
        event.currentTarget.querySelector('.PRL') != null ? project_repo_link = event.currentTarget.querySelector('.PRL').textContent : project_repo_link = null;

        // Used if the link is a Google Drive file:
        
        /* post link text */
        var post_link_text;
        event.currentTarget.querySelector('.PLT') != null ? post_link_text = event.currentTarget.querySelector('.PLT').textContent : post_link_text = null;

        /* post drive link */
        var post_drive_link;
        event.currentTarget.querySelector('.PDL') != null ? post_drive_link = event.currentTarget.querySelector('.PDL').textContent : post_drive_link = null;

        // removed "featured" class from all EP-items
        EPItems.forEach((EPItem) => {
          EPItem.classList.remove('featured');
        });

        // add the 'featured' class to the EP-item
        var EPItem_id = event.currentTarget.getAttribute('id')
        $('#' + EPItem_id).addClass('featured')
        
        // remove the title, text, repo and drive button from EP-viewer if they exist
        $('#EP-viewer-title').remove();
        $('#EP-viewer-body').remove();
        $('.repo-button').remove();
        $('.google-drive-button').remove();


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

        // if the repo text and link are included in the EP-item, render a link to the repository
        // in the EP-viewer
        if (project_repo_text != null && project_repo_link != null) {
          $('#EP-viewer-body').append("<a href = '" + project_repo_link + "'><div class = 'repo-button'><img src = '" + GitHubIcon + "' alt = 'The GitHub logo.'>" + project_repo_text + "</div></a>");
        }

        // alternatively, if the google drive text and link are included in the EP-item, render a button for the link
        // in the EP-viewer
        if (post_link_text != null && post_drive_link != null) {
          $('#EP-viewer-body').append("<a href = '" + post_drive_link + "'><div class = 'google-drive-button'><img src = '" + GoogleDriveIcon + "' alt = 'The GitHub logo.'>" + post_link_text + "</div></a>");
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
              <p>BSc Computer Science</p>
              <p>•</p>
              <p>CompTIA A+ Certified</p>
              <p>•</p>
              <p>Tech Enthusiast</p>
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
                  <p>I am recent Computer Science Graduate from Ontario Tech University, with a CompTIA A+ certification, that is very passionate about technology and IT.</p>
                </div>

                <div id = 'who-2'  className = 'who-caption'>
                  <p>My lifelong passion for technology and my natural curiosity towards technical topics has pushed me towards my greatest achievements.</p>
                </div>

                <div id = 'who-3'  className = 'who-caption'>
                  <p>I've created numerous programs with a variety of programming languages, built computers from scratch, and reconfigured Windows more times than I can count.</p>
                </div>

                <div id = 'who-4'  className = 'who-caption'>
                  <p>Along with my love for technology, I also love helping people — especially with their technology problems. Answering questions, and helping people solve their tech issues, is one of my favourite things to do.</p>
                </div>
{/* 
                <div id='who-5' className = 'who-caption'>
                  <p></p>
                </div> */}
              </div>
            </div>
          </section>

          <section id = 'strengths' className = 'custom-section'>
            <h1 className = 'section-header'>{'Strengths:'}</h1>
            <div id = 'strengths-grid'>
              <div className = 'strength-card'>
                <h1>1. CompTIA A+ Certified</h1>
                <p>The CompTIA A+ certification is proof of my technical skills and knowledge, and my ability to utilize them.</p>
              </div>
              <div className = 'strength-card'>
                <h1>2. Problem Solving</h1>
                <p>The ability to solve problems quickly <i>and</i> accurately is of utmost importance in an IT role.</p>
              </div>
              <div className = 'strength-card'>
                <h1>3. Communication Skills</h1>
                <p>My communication skills allow me to convey information in an clear, easy to understand way. This is crucial in an IT role where writing concise, logical documentation is vital.</p>
              </div>
            </div>
          </section>

          <section id = 'location' className = 'custom-section'>
            <h1 className = 'section-header'>{'Location:'}</h1>
            <div id = 'location-grid'>
              <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46248.276679679715!2d-79.65285371093826!3d43.574940452875296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b46e6f763d199%3A0xb8d1fa62c1027e43!2sCooksville%2C%20Mississauga%2C%20ON!5e0!3m2!1sen!2sca!4v1750814616269!5m2!1sen!2sca' title='Acton Map' allowFullScreen='' loading='lazy' referrerPolicy='no-referrer-when-downgrade'></iframe>
              <div id = 'location-captions'>
                <div className = 'location-caption'>
                  <p>I live in Cooksville in Mississauga, Ontario, which is central within the Greater Toronto Area. This means that I am available to work in a wide range of locations.</p>
                </div>

                <div className = 'location-caption'>
                  <p>I have my G licence, a car, and am willing to drive long distances if needed. I am also comfortable with driving as a part of work duties.</p>
                </div>
              </div>
            </div>
          </section>

          <section id = 'skills-qualifications' className = 'custom-section'>
            <h1 className = 'section-header'>{'Skills & Qualifications:'}</h1>
            <p id = 'SQ-caption'>Interact with an item for more information</p>
            <div id = 'skills-qualifs-grid'>

              <div className = 'skills-qualifications-card'>
                <div>
                  <h1><b>Qualification:</b> Bachelor of Science, Computer Science</h1>
                  <div className = 'SQContent'>
                    <p>I achieved a Bachelor of Science (Honors) in Computer Science from Ontario Tech University. My time in university gave me a greater understanding of a wide range of technologies, from programming languages to network architectures. It also gave me a tremendous amount of experience working on a team, and taught me how to properly manage my time. Most importantly, it taught me how to learn.</p>
                  </div>
                  <button className = 'SQ-close-button'>✕</button>
                </div>
              </div>

              <div className = 'skills-qualifications-card'>
                <div>
                  <h1><b>Qualification:</b> CompTIA A+ Certification</h1>
                  <div className = 'SQContent'>
                    <p>The CompTIA A+ certification taught me critical skills related to troubleshooting, system configuration, operating systems and much, much more. It has given me the necessary tools to build the foundation for a career in IT. </p>
                  </div>
                  <button className = 'SQ-close-button'>✕</button>
                </div>
              </div>

              <div className = 'skills-qualifications-card'>
                <div>
                  <h1><b>Skill:</b> Programming</h1>
                  <div className = 'SQContent'>
                    <p>I have experience in many different programming languages, such as: </p>
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
                    <p>I have experience working as a member of a team during various projects. In university, I was often the one to take the leadership role and coordinate to meet deadlines and work together in an organized and productive way.</p>

                    <p>I intend to bring those same team-oriented and leadership qualities to any position I hold.</p>
                  </div>
                  <button className = 'SQ-close-button'>✕</button>
                </div>
              </div>

              <div className = 'skills-qualifications-card'>
                <div>
                  <h1><b>Skill:</b> Operating Systems</h1>
                  <div className = 'SQContent'>
                    <p>I have extensive experience with Windows, from basic configuration like configuring networks, updating drivers, installing software etc., to more advanced troubleshooting techniques like using the Windows Event Viewer or Task Scheduler.</p>

                    <p>I am also proficient with macOS, having used a Mac on a daily basis for over a year. Additionally, I am well-versed with Linux, being particularly familiar with it's command-line interface.</p>
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
                <div className = 'EP-item' id = 'home-nas'>
                    <h1>Home NAS</h1>
                    <div className = 'EP-item-body'>
                      <p>Creator of a custom Network Attached Storage (NAS) device using the TrueNAS Core operating system. This allows easy storage and access of files over the local area network using a network sharing protocol (such as SMB). The device was created by modifying an old workstation to meet the requirements of this application. This project highlights my ability to configure systems for a specific task, while being mindful of cost. It also shows my skills with operating systems and networking.</p>
                    </div>
                </div>

                <div className = 'EP-item' id = 'SOHO-guide'>
                    <h1>Network Setup Guide</h1>
                    <div className = 'EP-item-body'>
                      <p>Authored a comprehensive guide detailing the fundamentals of network configuration for a small/home office. It provides guidance on the necessary configuration steps, such as changing the default router passwords and configuring the wireless connectivity, and describing more advanced settings to check. This article demonstrates my networking knowledge and my ability to clearly communicate technical information.</p>
                    </div>
                    <p className = 'PLT'>Network Setup Guide</p>
                    <p className = 'PDL'>https://drive.google.com/file/d/1tmAxR9fiYUUjx71WCxPXsJoSb8zl-bDw/view?usp=drive_link</p>
                </div>

                <div className = 'EP-item' id = 'chrispywebsite'>
                  <h1>Personal Website</h1>
                  <div className = 'EP-item-body'>
                    <p>Creator of a website programmed using the React JavaScript library, that holds information about me, my abilities, accomplishments, and experience. Showcases my programming skills, as well as my ability to discover unique solutions to problems.</p>

                    <p>If you want to view the source code, it's available in the GitHub repository linked below.</p>
                  </div>
                  <p className = 'PRT'>ChrispyWebsite GitHub</p>
                  <p className = 'PRL'>https://github.com/ChrispyJohnson1/ChrispyWebsite</p>
                </div>

                <div className = 'EP-item' id = 'data-vis-report'>
                  <h1>Data Visualization Assignment</h1>
                  <div className = 'EP-item-body'>
                    <p>Authored a report analyzing global energy production, including visualizations created entirely with the R programming language. Accompanying these visualizations are conclusions drawn about the state of the global energy environment. In the report, there are a variety of visualizations, each highlighting a different aspect of energy production (such as the share of global energy production for each country, the composition of the energy produced over time, and the percentage of renewable energy produced per country). This highlights my ability to create visualizations from raw data, as well as my capacity to draw meaningful conclusions from those visualizations.</p>
                  </div>
                  <p className = 'PLT'>Data Visualization Assignment</p>
                  <p className = 'PDL'>https://drive.google.com/file/d/16PxvTPPQ-k3Mh8pu-4F_DPQ04jl_CKnG/view?usp=drive_link</p>
                </div>
                

                <div className = 'EP-item' id = 'custom-compiler'>
                    <h1>Custom Compiler</h1>
                    <div className = 'EP-item-body'>
                      <p>Co-creator of a custom compiler language (using ANTLR & Kotlin) that supports complex data types and structures, conditional statements, loops, and other essential programming constructs. It was intentionally designed for easy expansion to support more complex features.</p>
                      <p>You can view the source code for the project using the link below.</p>
                    </div>
                    <p className = 'PRT'>Custom Compiler GitHub</p>
                    <p className = 'PRL'>https://github.com/ScholarChrispy/CompilersFP</p>
                </div>

                <div className = 'EP-item' id = 'work-experience'>
                  <h1>Work Experience</h1>
                  <div className = 'EP-item-body'>
                    {/* <p>I have some work experience from a summer job I held between university semesters. While this experience isn't directly related to IT, I feel that it has prepared me in three key ways:</p> */}
                    <p>My only job experience was gained from a position I held between university semesters, as well as after graduation. While this job wasn't IT related, it did teach me some fundamental skills applicable to any workplace:</p>
                    <ul>
                      <li><b>Accountability</b>: it helped me learn to be accountable for my work, and take responsibility for my successes <b>and</b> my failures.</li>
                      <li><b>Teamwork</b>: it taught me how to work on a team in a real-world environment, with real-world consequences.</li>
                      <li><b>Preparedness</b>: it allowed me to better understand the meaning of preparedness, and how that applies to a working environment.</li>
                    </ul>
                  </div>
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
                  <a href = 'https://drive.google.com/file/d/1r9nBWxVLKQsz2htH_xoHGr_NBIouRF40/view?usp=drive_link' target='blank'>
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

                    {/* Bluesky Link */}
                    <a href = 'https://bsky.app/profile/chrispyjohnson.bsky.social'>
                      <div className = 'social-button' id = 'bluesky'>
                        <FontAwesomeIcon icon={faBluesky} className = 'social-icon' />  {/* Twitter Icon */}
                        Bluesky
                      </div>
                    </a>
                  </div>
                </div>
            </div>
          </section>
        </div>
        <div id = 'site-footer'>                                                { /* Site Footer */ }
          <p>Version 2.0</p>
          <p>Designed and programmed by Christopher Johnson</p>
          <p>Last updated June 25th, 2025</p>
        </div>
    </div>
  );
};

export default App;
