import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Spinner, ProgressBar, Badge } from "react-bootstrap";

const AIML = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    country: "",
    category: "",
    duration: "",
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    "Gaming",
    "Music",
    "Entertainment",
    "Sports",
    "News & Politics",
    "People & Blogs",
    "Film & Animation",
    "Comedy",
    "Education",
    "Howto & Style",
    "Travel & Events",
    "Science & Technology",
    "Autos & Vehicles",
    "Pets & Animals",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        process.env.REACT_APP_YT_PREDICT,
        formData
      );
      setPredictionResult(response.data);
    } catch (err) {
      setError("An error occurred while fetching prediction.");
    } finally {
      setLoading(false);
    }
  };

  const renderEmotions = (emotionData) => {
    if (emotionData && emotionData.length > 0) {
      return (
        <div className="d-flex flex-wrap">
          {emotionData[0].map((emotion, index) => (
            <Badge key={index} pill bg="info" text="dark" className="m-1 p-2">
              {emotion.label}: {(emotion.score * 100).toFixed(2)}%
            </Badge>
          ))}
        </div>
      );
    }
    return <p>No emotion detected</p>;
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 display-4 fw-bold text-primary">
        📊 YouTube Trending Prediction Tool
      </h1>
      <p className="lead text-center mb-4 text-secondary">
        🚀 Predict your YouTube video's trending potential with AI-powered
        analysis!
      </p>
      <Card className="shadow-lg p-4 border-0 rounded-4">
        <h3 className="text-center mb-4">🎥 Enter Video Details</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Video Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              name="description"
              className="form-control"
              placeholder="Video Description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="tags"
              className="form-control"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="country"
              className="form-control"
              placeholder="Targeted Country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="duration"
              className="form-control"
              placeholder="Video Duration (minutes)"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" variant="success" className="w-100 py-2">
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "🚀 Predict Trending Probability"
            )}
          </Button>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {predictionResult && (
          <div className="mt-4 p-3 bg-light rounded-3">
            <h4 className="text-success">📈 Prediction Result</h4>
            <h5 className="text-success">📈 Trending Probability</h5>
            <ProgressBar
              now={parseFloat(predictionResult.yt_pred_proba)}
              label={`${parseFloat(predictionResult.yt_pred_proba).toFixed(
                2
              )}%`}
              className="mb-3"
            />
            <h5 className="text-info">🎬 Emotion Analysis for Title</h5>
            {renderEmotions(predictionResult.video_title_result)}
            <h5 className="text-info mt-3">
              📝 Emotion Analysis for Description
            </h5>
            {renderEmotions(predictionResult.video_description_result)}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AIML;
