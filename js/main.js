import { displaySiteInfo } from "./components/site.js"
import { siteMainNav } from './components/display-main-nav.js';
import { displayHeroBanner } from './components/display-hero-banner.js';
import { displaySkills } from './components/display-skills.js';
import { displayFooterContent } from './components/footer.js';
import { displayPortfolioGrid } from './components/display-portfolio.js';
import { displayDevExperience } from './components/display-experience.js';
import { displayAboutMeList } from './components/display-about-me-list.js';
import { displayBackground } from './components/display-background.js';
import { displayContactInfo } from './components/display-contact-info.js';

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
    displayContactInfo.init();
});
