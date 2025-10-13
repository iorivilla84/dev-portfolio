import { displaySiteInfo } from "./components/site.js"
import { siteMainNav } from './components/display-main-nav.js';
import { displayHeroBanner } from './components/display-hero-banner.js';
import { displaySkills } from './components/display-skills.js';
import { displayFooterContent } from './components/footer.js';
import { displayPortfolioGrid } from './components/display-portfolio.js';
import { displayDevExperience } from './components/display-experience.js';
import { displayAboutMeList } from './components/display-about-me-list.js';
import { displayBackground } from './components/display-education.js';
import { displayRecommendationsInfo } from './components/display-recommendations.js';
import { displayContactInfo } from './components/display-contact-info.js';

/**
 * Scrolls to the section with the same id as the current hash after the content is loaded.
 */
const scrollToHash = () => {
    if (window.location.hash) {
        const sectionTarget = document.querySelector(window.location.hash);
        if (sectionTarget) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    sectionTarget.scrollIntoView({ behavior: "auto", block: "start" });
                }, 500);
            }, 500);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    displaySiteInfo.init();
    siteMainNav.init();
    displayHeroBanner.init()
    displaySkills.init();
    displayFooterContent.init();
    displayPortfolioGrid.init();
    displayDevExperience.init();
    displayAboutMeList.init();
    displayBackground.init();
    displayRecommendationsInfo.init()
    displayContactInfo.init();
    setTimeout(scrollToHash, 700);
});

window.addEventListener('load', scrollToHash);
