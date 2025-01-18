import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const countries = [
  "United Arab Emirates",
  "Bahrain",
  "Algeria",
  "Egypt",
  "Iraq",
  "Jordan",
  "Kuwait",
  "Lebanon",
  "Libya",
  "Morocco",
  "Oman",
  "Qatar",
  "Saudi Arabia",
  "Tunisia",
  "Yemen",
  "Azerbaijan",
  "Belarus",
  "Bulgaria",
  "Bangladesh",
  "Bosnia and Herzegovina",
  "Czechia",
  "Denmark",
  "Austria",
  "Switzerland",
  "Germany",
  "Greece",
  "Australia",
  "Belgium",
  "Canada",
  "United Kingdom",
  "Ghana",
  "Ireland",
  "Israel",
  "India",
  "Jamaica",
  "Kenya",
  "Malta",
  "Nigeria",
  "New Zealand",
  "Singapore",
  "Uganda",
  "United States",
  "South Africa",
  "Zimbabwe",
  "Argentina",
  "Bolivia",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Dominican Republic",
  "Ecuador",
  "Spain",
  "Guatemala",
  "Honduras",
  "Mexico",
  "Nicaragua",
  "Panama",
  "Peru",
  "Puerto Rico",
  "Paraguay",
  "El Salvador",
  "Uruguay",
  "Venezuela",
  "Estonia",
  "Finland",
  "Philippines",
  "France",
  "Senegal",
  "Croatia",
  "Hungary",
  "Indonesia",
  "Iceland",
  "Italy",
  "Japan",
  "Georgia",
  "Kazakhstan",
  "South Korea",
  "Luxembourg",
  "Laos",
  "Lithuania",
  "Latvia",
  "North Macedonia",
  "Malaysia",
  "Norway",
  "Nepal",
  "Netherlands",
  "Poland",
  "Brazil",
  "Portugal",
  "Moldova",
  "Romania",
  "Russia",
  "Sri Lanka",
  "Slovakia",
  "Slovenia",
  "Montenegro",
  "Serbia",
  "Sweden",
  "Tanzania",
  "Thailand",
  "Turkey",
  "Ukraine",
  "Pakistan",
  "Vietnam",
  "Hong Kong",
  "Taiwan",
  "Cyprus",
  "Cambodia",
  "Liechtenstein",
  "Papua New Guinea",
];

const monthOrder = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Home = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCountry) {
      setError("⚠️ Please select a country.");
      return;
    }

    setLoading(true);
    setError("");
    setStats(null);

    try {
      const response = await axios.post(process.env.REACT_APP_YT_STATS, {
        country: selectedCountry,
      });

      setStats(response.data);
    } catch (error) {
      console.error("API Error:", error);
      setError("❌ Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paginatedVideos =
    stats && stats.top_videos
      ? stats.top_videos.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : [];

  const renderBarChart = (labels, data, title) => ({
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: "#4e54c8",
      },
    ],
  });

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div
        className="p-5 mb-5 rounded-4 shadow-lg"
        style={{
          backgroundImage: `linear-gradient(to right, #667eea, #764ba2)`,
          color: "#fff",
        }}
      >
        <div className="text-center">
          <h1 className="display-4 fw-bold">
            {selectedCountry
              ? `YouTube Trends in ${selectedCountry}`
              : "Discover Global YouTube Trends"}
          </h1>
          <p className="lead mt-3">
            {selectedCountry
              ? `Analyze trending videos and content performance in ${selectedCountry}.`
              : "Select a country to explore its trending YouTube videos and unlock insights for growth."}
          </p>
        </div>
      </div>

      {/* Country Selection */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <select
              className="form-select form-select-lg rounded-pill shadow-sm"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">🌍 Select a Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <button
              type="submit"
              className="btn btn-dark btn-lg w-100 shadow-sm"
            >
              {loading ? "Loading..." : "📊 Analyze"}
            </button>
          </div>
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {stats && (
        <>
          {/* Statistics Cards */}
          <div className="row g-4">
            {[
              { title: "Total Videos", value: stats.video_count },
              { title: "Avg. Days to Trend", value: stats.avg_days_to_trend },
              { title: "Avg. Duration", value: stats.mean_duration + " min" },
              { title: "Max Duration", value: stats.max_duration + " min" },
              { title: "Min Duration", value: stats.min_duration + " min" },
              { title: "Avg. Likes", value: stats.mean_likes },
              { title: "Max Likes", value: stats.max_likes },
              { title: "Min Likes", value: stats.min_likes },
            ].map((stat, index) => (
              <div key={index} className="col-md-3">
                <div className="card text-white bg-primary shadow-sm">
                  <div className="card-body">
                    <h5>{stat.title}</h5>
                    <h2>{stat.value}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row mt-5">
            <div className="col-md-6">
              <h4 className="text-center">📊 Category Distribution</h4>
              <Bar
                data={renderBarChart(
                  Object.keys(stats.category_distribution),
                  Object.values(stats.category_distribution),
                  "Category Count"
                )}
              />
            </div>

            <div className="col-md-6">
              <h4 className="text-center">📆 Monthly Uploads</h4>
              <Bar
                data={renderBarChart(
                  monthOrder,
                  monthOrder.map(
                    (month) => stats.month_distribution[month] || 0
                  ),
                  "Monthly Uploads"
                )}
              />
            </div>
          </div>

          {/* Trending Videos with Pagination */}
          <h3 className="mt-5">🔥 Detailed Trending Videos</h3>
          <div className="row">
            {paginatedVideos.map((video, index) => (
              <div className="col-md-4" key={index}>
                <div className="card mb-4 shadow-sm">
                  <img
                    src={video.video_default_thumbnail}
                    alt={video.video_title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{video.video_title}</h5>
                    <p>
                      <strong>Published At:</strong> {video.video_published_at}
                    </p>
                    <p>
                      <strong>Category ID:</strong> {video.video_category_id}
                    </p>
                    <p>
                      <strong>Duration:</strong>{" "}
                      {video.video_duration_minutes
                        ? video.video_duration_minutes.toFixed(2)
                        : "N/A"}{" "}
                      min
                    </p>
                    <p>
                      <strong>Views:</strong> {video.video_view_count}
                    </p>
                    <p>
                      <strong>Likes:</strong> {video.video_like_count}
                    </p>
                    <p>
                      <strong>Tags:</strong> {video.video_tags}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {video.video_description.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>

              {Array.from({
                length: Math.ceil(stats.top_videos.length / itemsPerPage),
              }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default Home;
