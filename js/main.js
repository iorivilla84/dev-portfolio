import { siteMainNav } from './components/mainNav.js';
import { displaySkills } from './components/display-skills.js';
import { copyRights } from './components/footer.js';
import { displayPortfolioGrid } from './components/display-portfolio.js';
import { displayDevExperience } from './components/display-experience.js';
import { displayAboutMeList } from './components/display-about-me-list.js';

document.addEventListener('DOMContentLoaded', () => {
    siteMainNav.init();
    displaySkills.init();
    copyRights.init();
    displayPortfolioGrid.init();
    displayDevExperience.initAccordion();
    displayAboutMeList.initAboutMe();
});
