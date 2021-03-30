import {elements} from './base.js';

export const displayHomepage = () => {
    if (elements.homePage.classList.contains('hidden')) {
        elements.homePage.classList.remove('hidden');
    }
}