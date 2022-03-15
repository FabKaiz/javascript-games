const allBtns = document.querySelectorAll('a')

// Hide image and reset positioning
const hideImg = (e) => {
  e.target.nextElementSibling.style.visibility = 'hidden';
  e.target.nextElementSibling.style.opacity = '0'
  e.target.nextElementSibling.style.transform = "rotate(0deg)";
}

// Reveal image and set styles animations
const showImg = (e) => {
  e.target.nextElementSibling.style.visibility = 'visible';
  e.target.nextElementSibling.style.opacity = '1'

  if (e.target.nextElementSibling.classList.contains('right')) {
    e.target.nextElementSibling.style.transform = "translatey(80px) rotate(3deg)";
  } else {
    e.target.nextElementSibling.style.transform = "translatey(80px) scale(1.2) rotate(-10deg)";
  }
}

// Show images on each button hover
allBtns.forEach(btn => {
  btn.addEventListener('mouseover', (e) => showImg(e))
  btn.addEventListener('mouseout', (e) => hideImg(e))
})

