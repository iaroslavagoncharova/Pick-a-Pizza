// styling for modal
  const currentDate = new Date();

  // Get the current month and year
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  
  // Set the minimum values for the expiration date inputs
  document.getElementById('expiration-date-month').setAttribute('min', currentMonth);
  document.getElementById('expiration-date-year').setAttribute('min', currentYear);
  
  // Optionally, you can set the default values to the current month and year
  document.getElementById('expiration-date-month').value = currentMonth;
  document.getElementById('expiration-date-year').value = currentYear;