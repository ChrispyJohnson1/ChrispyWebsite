import {useEffect} from 'react';  // to add the InteractionObserver
                                  // once the component is rendered.

// This element is the scrollable, dynamic table of contents that tracks the 
// position of the user on the webpage, and allows the user to 'jump' to any 
// section when clicked.

export default function DynamicToC({SectionData}) {
    // allows the list to track the position of the user on the webpage.
    // source: https://www.bram.us/2020/01/10/smooth-scrolling-sticky-scrollspy-navigation/
    useEffect(() => {
        const ToCIntersectionObserver = new IntersectionObserver(Sections => {
            Sections.forEach(Section => {
                const SectionID = Section.target.getAttribute('id');
                if (Section.intersectionRatio > 0) {
                    document.querySelector(`nav li a[href='#${SectionID}']`).parentElement.classList.add('active');
                } else {
                    document.querySelector(`nav li a[href='#${SectionID}']`).parentElement.classList.remove('active');
                }
            });
        });

        document.querySelectorAll('.custom-section').forEach((section) => {ToCIntersectionObserver.observe(section)});
    });

    return (
        <nav className = 'ToC-nav'>
            <ul className = 'ToC-ul'>
                {SectionData.map((Section) => (
                    <li className = 'ToC-li' key = {Section.s_id}><a href = {`#${Section.s_id}`}>{Section.s_name}</a></li>
                ))}
            </ul>
        </nav>
    );
}