<!DOCTYPE html>
<html lang="en">
<head>

<title></title>

<link type="text/css" rel="stylesheet" href="stylesheet.css">
</head>

<body>

<div id="header">
  <img class="logo" src="images/logo2.jpg" alt="">
  <h3>Stayfindr</h3>
</div>

<div id="navbar">
   <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="residence.html">Residences</a></li>
    <li><a href="reviews.html">Reviews</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="contact.html">Contact</a></li>
   </ul>

</div>


<div class="main">
  <h1>Find your campus residence</h1>
  <p>Stayfindr connects you to verified hostels and apartments near your campus</p>
  <div class="select-container">
      <select class="select-box">
        <option value="">Select the University</option>
        <option value="First">Makerere University</option>
        <option value="Second">Kyambogo University</option>
        <option value="Third">Uganda Christian University</option>
        <option value="Fourth">Mbale University</option>
        <option value="Fifth">Mbarara University</option>
        <option value="Sixth">Soroti University</option>

      </select>
      <div class="icon-container">
        <img src="">
      </div>
  </div>

</div>

<!-- Featured Hostels Section -->
<section class="featured">
  <h2>Featured Hostels</h2>
  <p>Explore some of our top-rated hostels near campus.</p>

  <div class="featured-grid">
    <!-- Hostel 1 -->
    <div class="featured-card">
      <img src="images/hernes.jpg" alt="Hernes Hostel">
      <h3>Hernes Hostel</h3>
      <button onclick="window.location.href='residence.html'">View Details</button>
    </div>

    <!-- Hostel 2 -->
    <div class="featured-card">
      <img src="images/olympia.jpg" alt="Olympia Hostel">
      <h3>Olympia Hostel</h3>
      <button onclick="window.location.href='residence.html'">View Details</button>
    </div>

    <!-- Hostel 3 -->
    <div class="featured-card">
      <img src="images/sunways.jpg" alt="Sunways Hostel">
      <h3>Sunways Hostel</h3>
      <button onclick="window.location.href='residence.html'">View Details</button>
    </div>
  </div>

  <a href="residence.html" class="cta-btn">See More Hostels</a>
</section>

<div id="footer">
    <h4>&copy; 2025 Stayfindr | Designed by Group 16</h4>
</div>
</body>


</h