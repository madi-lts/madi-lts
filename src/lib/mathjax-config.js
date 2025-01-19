const remoteFontURL = 'https://cdn.jsdelivr.net/npm/noto-sans-math@latest/fonts/woff2';
const localFontURL = '@lib/mathjax/es5/output/chtml/fonts/woff-v2';

window.MathJax = {
    // tex: {
    //     inlineMath: [['$', '$']],
    //     displayMath: [['$$', '$$']],
    // },
    // svg: {
    //     displayAlign: 'center',
    // },
    chtml: {
        displayAlign: 'center',
        fontURL: 'https://cdn.jsdelivr.net/npm/noto-sans-math@latest/fonts/woff2',
    }
};