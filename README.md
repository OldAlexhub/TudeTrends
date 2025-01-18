# YouTube Trending Prediction Tool

## 📊 Project Overview

This project is an AI-powered web application designed to help YouTubers predict the trending probability of their videos. By analyzing inputs like video title, description, tags, category, and duration, this tool provides insights into how likely a video is to trend. Additionally, it offers emotion analysis for both the video title and description, aiding in content optimization.

---

## 🚀 Features

### **Trending Prediction Tool**

- Predicts the trending probability of a YouTube video using AI models.
- Emotion analysis for video title and description.
- Dynamic visualization of prediction results using progress bars and emotion badges.

### **YouTube Statistics Dashboard**

- View country-specific YouTube statistics.
- Bar charts for category distribution and monthly uploads.
- Detailed view of trending videos with pagination and media display.

---

## 🛠️ Tech Stack

### **Frontend**

- **React.js** for interactive UI components.
- **Axios** for API communication.
- **Bootstrap** & **React-Bootstrap** for modern and responsive design.
- **Chart.js** for data visualization.

### **Backend**

- **Python Flask** for building REST APIs.
- **Machine Learning Models** (Random Forest, Emotion Detection, SentenceTransformer, pipeline) for predictions.

---

## 💡 How It Works

1. **Input Form**

   - Users enter video details: title, description, tags, category, country, and duration.

2. **Prediction Request**

   - Submits the data to the backend API (`/youtubepredict`) using Axios.

3. **Results Display**

   - Trending probability is displayed using a progress bar.
   - Emotion analysis for title and description is shown with interactive badges.

4. **YouTube Statistics**
   - Users can select a country to analyze its trending video statistics via the `/youtubestats` endpoint.
   - Data is visualized with bar charts and detailed trending video cards.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue for suggestions and improvements.

---

Happy Predicting! 🚀📊
