window.addEventListener('scroll', reveal);

function reveal() {
  let reveals = document.querySelectorAll('.reveal');
  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 150;

    if (revealTop < windowHeight - revealPoint && !reveals[i].classList.contains('revealed')) {
      reveals[i].classList.add('active');
      reveals[i].classList.add('revealed'); // Mark as revealed
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  reveal();
});
