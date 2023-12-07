  
  function initializeCountdown() {
    const storedTimestamp = localStorage.getItem('countdownTimestamp');

    const initialTimestamp = storedTimestamp ? parseInt(storedTimestamp, 10) : Date.now();

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    
    const countdownDuration = getRandomInt(10, 20) * 60;
    const endTime = initialTimestamp + countdownDuration * 1000;

    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(updateCountdown, 1000);

    function updateCountdown() {
      const currentTime = Date.now();
      const remainingTime = Math.max(0, endTime - currentTime);
      const minutes = Math.floor(remainingTime / (60 * 1000));
      const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

      countdownElement.textContent = `${minutes}:${seconds}`;

    
      if (remainingTime === 0) {
        clearInterval(countdownInterval);
        countdownElement.textContent = 'Your order is ready';
      }
    }

 
    localStorage.setItem('countdownTimestamp', initialTimestamp.toString());


    updateCountdown();
  }

  window.onload = initializeCountdown;